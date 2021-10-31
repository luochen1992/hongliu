<template>
  <div class="waterroute"></div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'waterroute',
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  data() {
    return {
      handler: null
    }
  },
  mounted() {},
  watch: {
    getNowMenuName(newV, oldV) {
      if (newV === 'waterroute') {
        this.show()
      } else {
        this.hide()
      }
    }
  },
  methods: {
    ...mapMutations({
      setNowMenuName: 'setNowMenuName'
    }),
    // 显示
    show() {
      var _this = this
      _this.addWaterRoute('data/巷道属性.json')
    },
    // 隐藏
    hide() {
       if (window.cesiumvariate._waterdataSource) {
        for (let i = 0; i < window.cesiumvariate._waterdataSource.length; i++) {
          viewer.dataSources.remove(window.cesiumvariate._waterdataSource[i])
        }
        window.cesiumvariate._waterdataSource = null
      }
      if (this.handler) {
        this.handler.destroy()
        this.handler.removeInputAction(window.Cesium.ScreenSpaceEventType.WHEEL)
        window.viewer.screenSpaceEventHandler.removeInputAction(window.Cesium.ScreenSpaceEventType.WHEEL)
        if (this.handler && !this.handler.isDestroyed()) this.handler = this.handler && this.handler.destroy()
        this.handler = null
      }
    },
     addWaterRoute(url) {
      var tt = this
      window.cesiumvariate._waterdataSource = []
      $.get(url, {}, function (res) {
        debugger
        var json = res
        var length = json.Map.length
        for (var j = 0; j < length; j++) {
          if (j < 1500) continue
          var obj = json.Map[j]
          if (obj.ModelType == 'MModel_Passage') {
            if (obj.FireRescue) {
              var W = obj.W
              var H = obj.H
              var xyz = obj.XYZ
              var coordList = []
              var xyzArr = obj.XYZ.split(';')
              if (obj.FireRescueDirect) {
                //与巷道同向
                for (var k = 0; k < xyzArr.length; k++) {
                  var xyzArr2 = xyzArr[k].split(',')
                  var x1 = parseFloat(xyzArr2[0])
                  var y1 = parseFloat(xyzArr2[1])
                  var z1 = parseFloat(xyzArr2[2])
                  /*xyzArr2 = xyzArr[k+1].split(',');
                  var x2 =parseFloat(xyzArr2[0]);
                  var y2 =parseFloat(xyzArr2[1]);
                  var z2 =parseFloat(xyzArr2[2]);*/

                  var pos = tt.LocalToDegree(x1, y1, z1 - 922)
                  coordList.push(pos.x)
                  coordList.push(pos.y)
                  coordList.push(pos.z)
                }
              } else {
                //与巷道反向
                for (var k = xyzArr.length - 1; k >= 0; k--) {
                  var xyzArr2 = xyzArr[k].split(',')
                  var x1 = parseFloat(xyzArr2[0])
                  var y1 = parseFloat(xyzArr2[1])
                  var z1 = parseFloat(xyzArr2[2])

                  var pos = tt.LocalToDegree(x1, y1, z1 - 922)
                  coordList.push(pos.x)
                  coordList.push(pos.y)
                  coordList.push(pos.z)
                }
              }
              tt.createFlowVolume2(tt, W, H, 0.1, coordList)
            }
          }
        }
      })
    },
    LocalToDegree(x, y, z) {
      var lon = 112.6910153,
        lat = 35.6808275,
        alt = 0
      x -= 381500
      y -= 3950920
      var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(lon, lat, alt))
      //x=y=z=0;
      const mat4 = Cesium.Matrix4.fromArray([1, 0, 0, 0.0, 0, 1, 0, 0.0, 0, 0, 1, 0.0, x, y, z, 1.0])
      Cesium.Matrix4.multiply(modelMatrix, mat4, modelMatrix)
      var p = new Cesium.Cartesian3(0.0, 0.0, 0.0)
      var pos2 = Cesium.Matrix4.multiplyByPoint(modelMatrix, p, new Cesium.Cartesian3())

      var ellipsoid = viewer.scene.globe.ellipsoid
      var cartesian3 = new Cesium.Cartesian3(pos2.x, pos2.y, pos2.z)
      var cartographic = ellipsoid.cartesianToCartographic(cartesian3)
      var lat2 = Cesium.Math.toDegrees(cartographic.latitude)
      var lng2 = Cesium.Math.toDegrees(cartographic.longitude)
      var alt2 = cartographic.height
      var pos3 = new Cesium.Cartesian3(lng2, lat2, alt2)
      return pos3
    },

    createFlowVolume2(_t, W, H, speed, coordList) {
      if (coordList.length < 6) return
      var imageFile = 'img/blue128.png' //箭头图片
      //var speed = 0.01;  //速度
      var arrowDis = 30.0 //每多少米一个箭头

      /************************开始构建对象**********************************/
      var coordListLB = []
      var coordListLT = []
      var coordListRB = []
      var coordListRT = []
      var x1, y1, z1, x2, y2, z2
      var azi, azi2, W2
      var COS, SIN
      var COS2, SIN2
      for (let i = 0; i < coordList.length - 3; i += 3) {
        x1 = coordList[i] //.x;
        y1 = coordList[i + 1] //.y;
        z1 = coordList[i + 2] - 0.2 //.z;

        x2 = coordList[i + 3] //.x;
        y2 = coordList[i + 4] //.y;
        z2 = coordList[i + 5] - 0.2 //.z;
        W2 = _t.MToDegree(y1, W)
        azi2 = azi = _t.GetAzimuth(x2, y2, x1, y1)
        azi += 90
        azi2 -= 90

        azi = (azi / 180) * Math.PI
        COS = Math.cos(azi) * W2
        SIN = Math.sin(azi) * W2

        azi2 = (azi2 / 180) * Math.PI
        COS2 = Math.cos(azi2) * W2
        SIN2 = Math.sin(azi2) * W2

        /* coordListLB.push(x1,y1,z1);
        coordListLB.push(x2,y2,z2);
        coordListLT.push(x1,y1,z1+H);
        coordListLT.push(x2,y2,z2+H) */

        coordListLB.push(x1 + COS2, y1 + SIN2, z1)
        coordListLB.push(x2 + COS2, y2 + SIN2, z2)
        coordListLT.push(x1 + COS2, y1 + SIN2, z1 + H + 0.4)
        coordListLT.push(x2 + COS2, y2 + SIN2, z2 + H + 0.4)

        coordListRB.push(x1 + COS, y1 + SIN, z1)
        coordListRB.push(x2 + COS, y2 + SIN, z2)

        coordListRT.push(x1 + COS, y1 + SIN, z1 + H + 0.4)
        coordListRT.push(x2 + COS, y2 + SIN, z2 + H + 0.4)
      }
      var coordListLB2 = Cesium.Cartesian3.fromDegreesArrayHeights(coordListLB)
      var coordListLT2 = Cesium.Cartesian3.fromDegreesArrayHeights(coordListLT)
      var coordListRB2 = Cesium.Cartesian3.fromDegreesArrayHeights(coordListRB)
      var coordListRT2 = Cesium.Cartesian3.fromDegreesArrayHeights(coordListRT)

      var k = 0
      var numVertex = 0

      var textureArr = []
      var colorArr = []
      var curdataArr = []
      var stsTemp = []
      var normals = []

      var totalLength = 0
      var addLen = 0
      for (let i = 0; i < coordListLB2.length - 1; i++) {
        var x1 = coordListLB2[i].x
        var y1 = coordListLB2[i].y
        var z1 = coordListLB2[i].z
        var x2 = coordListLB2[i + 1].x
        var y2 = coordListLB2[i + 1].y
        var z2 = coordListLB2[i + 1].z
        totalLength += Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1) + (z2 - z1) * (z2 - z1))
      }
      var links = new Uint32Array((coordListLB2.length - 1) * 8 * 3)
      for (let i = 0; i < coordListLB2.length - 1; i++) {
        var x1 = coordListLB2[i].x
        var y1 = coordListLB2[i].y
        var z1 = coordListLB2[i].z
        var x2 = coordListLB2[i + 1].x
        var y2 = coordListLB2[i + 1].y
        var z2 = coordListLB2[i + 1].z

        var x3 = coordListLT2[i].x
        var y3 = coordListLT2[i].y
        var z3 = coordListLT2[i].z
        var x4 = coordListLT2[i + 1].x
        var y4 = coordListLT2[i + 1].y
        var z4 = coordListLT2[i + 1].z

        var x5 = coordListRB2[i].x
        var y5 = coordListRB2[i].y
        var z5 = coordListRB2[i].z
        var x6 = coordListRB2[i + 1].x
        var y6 = coordListRB2[i + 1].y
        var z6 = coordListRB2[i + 1].z

        var x7 = coordListRT2[i].x
        var y7 = coordListRT2[i].y
        var z7 = coordListRT2[i].z
        var x8 = coordListRT2[i + 1].x
        var y8 = coordListRT2[i + 1].y
        var z8 = coordListRT2[i + 1].z
        var len = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1) + (z2 - z1) * (z2 - z1))
        var st1 = addLen / totalLength
        addLen += len
        var st2 = addLen / totalLength
        {
          curdataArr.push(x1)
          curdataArr.push(y1)
          curdataArr.push(z1)

          curdataArr.push(x2)
          curdataArr.push(y2)
          curdataArr.push(z2)

          curdataArr.push(x3)
          curdataArr.push(y3)
          curdataArr.push(z3)

          curdataArr.push(x4)
          curdataArr.push(y4)
          curdataArr.push(z4)
          stsTemp.push(st1)
          stsTemp.push(0.0)
          stsTemp.push(st2)
          stsTemp.push(0.0)
          stsTemp.push(st1)
          stsTemp.push(1.0)
          stsTemp.push(st2)
          stsTemp.push(1.0)

          links[k++] = numVertex + 0
          links[k++] = numVertex + 1
          links[k++] = numVertex + 3

          links[k++] = numVertex + 0
          links[k++] = numVertex + 3
          links[k++] = numVertex + 2

          numVertex += 4
        }
        {
          curdataArr.push(x3)
          curdataArr.push(y3)
          curdataArr.push(z3)

          curdataArr.push(x4)
          curdataArr.push(y4)
          curdataArr.push(z4)

          curdataArr.push(x7)
          curdataArr.push(y7)
          curdataArr.push(z7)

          curdataArr.push(x8)
          curdataArr.push(y8)
          curdataArr.push(z8)

          links[k++] = numVertex + 0
          links[k++] = numVertex + 1
          links[k++] = numVertex + 3
          stsTemp.push(st1)
          stsTemp.push(0.0)
          stsTemp.push(st2)
          stsTemp.push(0.0)
          stsTemp.push(st1)
          stsTemp.push(1.0)
          stsTemp.push(st2)
          stsTemp.push(1.0)

          links[k++] = numVertex + 0
          links[k++] = numVertex + 3
          links[k++] = numVertex + 2

          numVertex += 4
        }
        {
          curdataArr.push(x7)
          curdataArr.push(y7)
          curdataArr.push(z7)

          curdataArr.push(x8)
          curdataArr.push(y8)
          curdataArr.push(z8)

          curdataArr.push(x5)
          curdataArr.push(y5)
          curdataArr.push(z5)

          curdataArr.push(x6)
          curdataArr.push(y6)
          curdataArr.push(z6)

          links[k++] = numVertex + 0
          links[k++] = numVertex + 1
          links[k++] = numVertex + 3
          stsTemp.push(st1)
          stsTemp.push(0.0)
          stsTemp.push(st2)
          stsTemp.push(0.0)
          stsTemp.push(st1)
          stsTemp.push(1.0)
          stsTemp.push(st2)
          stsTemp.push(1.0)

          links[k++] = numVertex + 0
          links[k++] = numVertex + 3
          links[k++] = numVertex + 2

          numVertex += 4
        }
        {
          curdataArr.push(x5)
          curdataArr.push(y5)
          curdataArr.push(z5)

          curdataArr.push(x6)
          curdataArr.push(y6)
          curdataArr.push(z6)

          curdataArr.push(x1)
          curdataArr.push(y1)
          curdataArr.push(z1)

          curdataArr.push(x2)
          curdataArr.push(y2)
          curdataArr.push(z2)

          links[k++] = numVertex + 0
          links[k++] = numVertex + 1
          links[k++] = numVertex + 3
          stsTemp.push(st1)
          stsTemp.push(0.0)
          stsTemp.push(st2)
          stsTemp.push(0.0)
          stsTemp.push(st1)
          stsTemp.push(1.0)
          stsTemp.push(st2)
          stsTemp.push(1.0)

          links[k++] = numVertex + 0
          links[k++] = numVertex + 3
          links[k++] = numVertex + 2

          numVertex += 4
        }
      }
      var sts = new Float32Array(stsTemp)
      var geometryMesh = new Cesium.Geometry({
        attributes: {
          position: new Cesium.GeometryAttribute({
            componentDatatype: Cesium.ComponentDatatype.DOUBLE,
            componentsPerAttribute: 3,
            values: curdataArr
          }),
          /*normal: new Cesium.GeometryAttribute({
              componentDatatype: Cesium.ComponentDatatype.FLOAT,
              componentsPerAttribute: 3,
              values: normals
            }),*/
          st: new Cesium.GeometryAttribute({
            componentDatatype: Cesium.ComponentDatatype.FLOAT,
            componentsPerAttribute: 2,
            values: sts
          })
        },
        indices: links,
        primitiveType: Cesium.PrimitiveType.TRIANGLES,
        boundingSphere: Cesium.BoundingSphere.fromVertices(curdataArr)
      })
      //,		vertexFormat:Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
      geometryMesh = Cesium.GeometryPipeline.computeNormal(geometryMesh)

      var instanceMesh = new Cesium.GeometryInstance({
        geometry: geometryMesh
      })

      //var cesiumColor = Cesium.Color.fromCssColorString(linecolor);
      var appc = new Cesium.PolylineMaterialAppearance({
        material: new Cesium.Material({
          fabric: {
            uniforms: {
              color: new Cesium.Color(1.0, 0.0, 0.0, 1.0),
              image: imageFile,
              animationSpeed: speed,
              repeat: new Cesium.Cartesian2(totalLength / arrowDis, 1)
            },
            source:
              'czm_material czm_getMaterial(czm_materialInput materialInput) { \n\
    czm_material material = czm_getDefaultMaterial(materialInput);\n\
    vec2 st = repeat *materialInput.st;\n\
    float time = czm_frameNumber*animationSpeed;\n\
    vec4 colorImage = texture2D(image,vec2(fract(st.s - time), st.t));\n\
    material.alpha = colorImage.a;\n\
    material.diffuse = colorImage.rgb;\n\
    return material;\n\
    } \n'
          },
          /* cull: {
                    enabled: true,
                    face: Cesium.CullFace.BACK
                },*/
          translucent: function (material) {
            return false
          }
        })
      })

      window.cesiumvariate._waterdataSource.push(new Cesium.CustomDataSource(Cesium.createGuid()))
      viewer.dataSources.add(window.cesiumvariate._waterdataSource[window.cesiumvariate._waterdataSource.length - 1])
      var custom_flowMesh = window.cesiumvariate._waterdataSource[window.cesiumvariate._waterdataSource.length - 1]._primitives.add(
        new Cesium.Primitive({
          geometryInstances: instanceMesh,
          appearance: appc,
          asynchronous: false
        })
      )
    },
    MToDegree(lat, r) {
      var degree = (2 * Math.PI * Math.cos(((2 * Math.PI) / 360) * lat) * 6378140) / 360
      var degree2 = (1 / degree) * r
      return degree2
    },
    GetAzimuth(X1, Y1, X2, Y2) {
      var tmpValue = 0

      if (X1 == X2 || Y1 == Y2) {
        if (X1 == X2) {
          /// 经度相同
          if (Y2 >= Y1) {
            return 90
          } else {
            return 270
          }
        } else {
          /// 纬度相同
          if (X2 >= X1) {
            return 0
          } else {
            return 180
          }
        }
      }

      tmpValue = Math.atan((Y2 - Y1) / (X2 - X1))
      var resultAngle = Math.abs((tmpValue * 180) / Math.PI)

      if (X2 > X1) {
        if (Y2 >= Y1) {
          /// 第一象限
          return resultAngle
        } else {
          /// 第四象限
          return 360 - resultAngle
        }
      } else {
        /// 第二象限
        if (Y2 >= Y1) {
          return 180 - resultAngle
        } else {
          /// 第三象限
          return 180 + resultAngle
        }
      }
    }

  }
}
</script>

<style  lang="scss">

.coalflow {
  width: 100%;
  height: 100%;
  color: #fff;
}
#myChart,
#myChart2,
#myChart4 {
  margin: 0px 62px;
}
#myChart3 {
  margin: 25px 12px 0 60px;
}
.progress {
  padding: 2px;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  border: 1px solid #61aacd;
  /* -webkit-box-shadow: inset 0 1px 2px rgba(11, 18, 247, 0.3), 0 1px rgba(255, 255, 255, 0.08); */
  /* box-shadow: inset 0 1px 2px rgba(16, 65, 244, 0.53), 0 1px #3F51B5; */
}
.jdsty {
  width: 34%;
}

.lxSty {
  list-style: none;
  height: 100%;
  margin-top: 5px;
  margin-left: 0px;
}

.lxSty li {
  height: 10%;
  margin-top: 0px;
  margin-left: 9px;
}

.jq {
  float: left;
  color: #fff;
  padding-left: 12px;
  font-weight: 800;
  letter-spacing: 2px;
  font-size: 15px;
  width: 25%;
}

.float1 {
  float: left;
}

.pu {
  color: #14d0e8;
  float: right;
  position: absolute;
  right: 34px;
  font-size: 0.8vw;
}
.progress-bar {
  position: relative;
  height: 16px;
  border-radius: 16px;
  -webkit-transition: 0.4s linear;
  -moz-transition: 0.4s linear;
  -o-transition: 0.4s linear;
  transition: 0.4s linear;
  -webkit-transition-property: width, background-color;
  -moz-transition-property: width, background-color;
  -o-transition-property: width, background-color;
  transition-property: width, background-color;
  -webkit-box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.25), inset 0 1px rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.25), inset 0 1px rgba(255, 255, 255, 0.1);
}

.progress-bar:before,
.progress-bar:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.progress-bar:before {
  bottom: 0;
  /*   background: url("../img/stripes.png") 0 0 repeat; */
  border-radius: 4px 4px 0 0;
}

.progress-bar:after {
  z-index: 2;
  bottom: 45%;
  border-radius: 4px;
  background-image: -webkit-linear-gradient(top, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  background-image: -moz-linear-gradient(top, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  background-image: -o-linear-gradient(top, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
}
.imgcolor {
  background-image: linear-gradient(to bottom, #07ddf8 0, #75e0ee 100%) !important;
}
#five ~ .progress > .progress-bar {
  width: 15%;
  background-color: #fa2e00;
  background-image: linear-gradient(#fa2e00, #fa2e00) !important;
  height: 74%;
  top: 13%;
}

#twentyfive ~ .progress > .progress-bar {
  width: 20%;
  background-color: #21d3dd;
  background-image: linear-gradient(#f78a3d, #f78a3d) !important;
  height: 74%;
  top: 13%;
}

#fifty ~ .progress > .progress-bar {
  width: 25%;
  background-color: #21d3dd;
  background-image: linear-gradient(#daf73d, #daf73d) !important;
  height: 74%;
  top: 13%;
}

#seventyfive ~ .progress > .progress-bar {
  width: 70%;
  background-color: #21d3dd;
  background-image: linear-gradient(#6bf73d, #6bf73d) !important;
  height: 74%;
  top: 13%;
}

#onehundred ~ .progress > .progress-bar {
  width: 90%;
  background-color: #3df74b;
  background-image: linear-gradient(#3df74b, #3df74b) !important;
  height: 74%;
  top: 13%;
}
.radio {
  display: none;
}

.label {
  display: inline-block;
  margin: 0 5px 20px;
  padding: 3px 8px;
  color: #aaa;
  text-shadow: 0 1px black;
  border-radius: 3px;
  cursor: pointer;
}

.radio:checked + .label {
  color: white;
  background: rgba(0, 0, 0, 0.25);
}

.ulSty {
  list-style: none;
  height: 100%;
  margin-top: 35px;
  margin-left: 35px;
}
.ulSty li {
  height: 50px;
}
.badge {
  display: inline-block;
  min-width: 10px;
  padding: 3px 7px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  background-color: #777;
  border-radius: 10px;
}
// WebKit
@-webkit-keyframes progress-bar-stripes {
  from {
    background-position: 40px 0;
  }
  to {
    background-position: 0 0;
  }
}

// Spec and IE10+
@keyframes progress-bar-stripes {
  from {
    background-position: 40px 0;
  }
  to {
    background-position: 0 0;
  }
}

.progress {
  overflow: hidden;
  height: 20px;
  margin-bottom: 20px;
  float: left;
}

// Bar of progress
.progress-bar {
  float: left;
  width: 0%;
  height: 100%;
  text-align: center;
}

.progress-striped .progress-bar,
.progress-bar-striped {
  background-size: 40px 40px;
}
</style>