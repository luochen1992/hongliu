<template>
  <div class="windflow">
    <!--<div class="page_wind_1">
      <span style="font-size: 19px; margin-left: 34px; color: red">监测数据</span>
      <div style="margin: 10px 10px">
        <div style="float: left; margin-left: 30px">一周产煤量</div>
        <div style="float: right"><img width="200px" height="15px" src="../../assets/images/split.png" /></div>
      </div>
      <div id="wind_myChart" :style="{ width: '400px', height: '390px' }"></div>
      <div style="margin: 10px 10px">
        <div style="float: left; margin-left: 30px">一天用电量</div>
        <div style="float: right"><img width="200px" height="15px" src="../../assets/images/split.png" /></div>
      </div>
      <div id="wind_myChart2" :style="{ width: '400px', height: '390px' }"></div>
    </div>
    <div class="page_wind_2">
      <div style="margin: 10px 10px">
        <div style="float: left; margin-left: 30px">月产量达标分析</div>
        <div style="float: right"><img width="200px" height="15px" src="../../assets/images/split.png" /></div>
      </div>
      <div id="wind_myChart3" :style="{ width: '400px', height: '400px' }"></div>
      <div style="margin: 10px 10px">
        <div style="float: left; margin-left: 30px">历年产量对比</div>
        <div style="float: right"><img width="200px" height="15px" src="../../assets/images/split.png" /></div>
      </div>
      <div id="wind_myChart4" :style="{ width: '400px', height: '400px' }"></div>
    </div>-->
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
// import custmaterial from '../../js/cusmaterial'
export default {
  name: 'windflow',
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  data() {
    return {
      isshow: false
    }
  },
  mounted() {},
  watch: {
    getNowMenuName(newV, oldV) {
      if (newV === 'windflow') {
        this.show()
        this.isshow = true
      } else {
        if (this.isshow) {
          this.hide()
          this.isshow = false
        }
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

      _this.addWindFlow()
    },
    // 隐藏
    hide() {
      if (window.cesiumvariate._dataSource) {
        for (let i = 0; i < window.cesiumvariate._dataSource.length; i++) {
          viewer.dataSources.remove(window.cesiumvariate._dataSource[i])
        }
        window.cesiumvariate._dataSource = null
      }
    },
    addWindFlow() {
      var _t = this
      var imageFile = 'luxian_FreshWind.png' //箭头图片
      var speed = 0.05 //速度
      var arrowDis = 200.0 //每多少米一个箭头
      var W = 4 * 2//巷道宽度 
      var H = 3 //巷道高度
      window.cesiumvariate._dataSource = []
      //巷道中心点坐标串
      var coordList = [
        [
          112.7265107, 35.673958, -0.2371, 112.7262444, 35.6740137, -3.427, 112.7209248, 35.6751598, -212.7426, 112.720328, 35.6752965, -227.4938, 112.7201698, 35.6753482, -227.4645, 112.7200049,
          35.6754905, -227.5777, 112.7198393, 35.675537, -227.5789, 112.7190677, 35.6757207, -230.9203, 112.7181704, 35.6759169, -239.7923, 112.7150923, 35.6765848, -272.3757, 112.7137408, 35.6768703,
          -284.6571, 112.7049783, 35.6787665, -337.4392, 112.7137408, 35.6768703, -284.6571, 112.7049783, 35.6787665, -337.4392, 112.7030474, 35.6791865, -334.6851, 112.70279, 35.6792407, -336.4533,
          112.7023964, 35.6793254, -339.1023, 112.7017242, 35.6794801, -342.321, 112.7009266, 35.6796529, -347.0555, 112.7004672, 35.6797621, -351.508, 112.6985774, 35.680177, -375.0954, 112.6979457,
          35.6803182, -379.6238, 112.6969777, 35.6805314, -383.0482, 112.696719, 35.680541, -383.0821, 112.6960511, 35.6807548, -384.0434, 112.6942969, 35.6811431, -387.0232, 112.6936883, 35.6812694,
          -388.5123, 112.6919301, 35.6816589, -385.8855, 112.6906989, 35.6819357, -383.052, 112.6894216, 35.6822286, -381.0771, 112.6889045, 35.6823325, -380.0, 112.6884433, 35.6824472, -376.2168,
          112.6881745, 35.6824967, -373.0286, 112.6872132, 35.6827192, -371.9627, 112.6855715, 35.683096, -377.1436, 112.6825978, 35.6837492, -400.1601, 112.6797458, 35.6843916, -405.5573
        ],
        [
          112.6670279, 35.6871871, -471.8748, 112.6664811, 35.6873124, -473.5332, 112.6659903, 35.6874346, -475.2762, 112.6646421, 35.6877273, -476.8647, 112.6637732, 35.6879262, -475.4166,
          112.662591, 35.6881828, -479.5298, 112.6624474, 35.6877739, -481.8097
        ],
        [112.7194012, 35.6760538, -229.7596, 112.719037, 35.6757203, -230.9244],
        [
          112.6670279, 35.6871871, -471.8748, 112.6675369, 35.6870816, -474.4456, 112.6679032, 35.6869968, -471.2325, 112.6681567, 35.6869528, -473.1923, 112.6683184, 35.686935, -472.535, 112.6690461,
          35.6867341, -470.2071, 112.6717704, 35.6861867, -439.2405, 112.6746679, 35.6855186, -418.3548, 112.6752735, 35.6853784, -416.5572, 112.6759499, 35.685212, -417.2162, 112.6770966, 35.6849975,
          -414.0933, 112.6797458, 35.6843916, -405.5573
        ],
        [112.7150241, 35.6765998, -272.9015, 112.7151336, 35.6769603, -272.4073],
        [112.7049783, 35.6787665, -337.4392, 112.7052186, 35.6791214, -333.6335],
        [112.7045017, 35.6788738, -336.2421, 112.7047612, 35.6792222, -333.3084],
        [112.6960283, 35.6807365, -384.0555, 112.6958899, 35.6803082, -382.1124],
        [112.6936801, 35.6812779, -388.5151, 112.6938728, 35.6818454, -383.8071, 112.6946732, 35.6819126, -380.5053],
        [112.6916231, 35.6817336, -385.155, 112.6918103, 35.6822635, -382.5077, 112.6918689, 35.6822983, -382.6043, 112.6922271, 35.6823298, -384.9404],
        [112.6912594, 35.6818069, -384.3471, 112.6913829, 35.682159, -380.7516],
        [
          112.7265954, 35.6742517, -0.125, 112.7207992, 35.6757339, -221.5075, 112.7207193, 35.6757529, -221.5497, 112.720621, 35.6757769, -221.5552, 112.7205204, 35.6758004, -221.6149, 112.7204638,
          35.6758205, -221.6282, 112.7193647, 35.676064, -229.9431, 112.716182, 35.6767298, -247.8207, 112.7156678, 35.6768452, -266.754, 112.715145, 35.6769517, -272.3693, 112.7146143, 35.6770631,
          -277.2826, 112.7124769, 35.6775292, -285.1287, 112.7114278, 35.6777596, -288.8218, 112.709958, 35.6780848, -296.1485, 112.7074639, 35.6786328, -317.1741, 112.7057116, 35.6790137, -325.175,
          112.7052497, 35.6791168, -333.6171, 112.7048046, 35.6792078, -333.2918, 112.703446, 35.6794956, -331.5536, 112.7034062, 35.6793937, -329.6539, 112.7033859, 35.6793529, -330.8435,
          112.7033748, 35.6793318, -330.8488, 112.7029118, 35.6794347, -334.0273, 112.7028097, 35.6796265, -334.0687, 112.7016773, 35.679896, -337.9375, 112.7016519, 35.6799013, -337.9674
        ],
        [112.7029207, 35.6794808, -336.5422, 112.703096, 35.6798457, -336.7526],
        [112.7029207, 35.6794808, -336.5422, 112.702813, 35.6792432, -336.3588],
        [
          112.6646345, 35.6877368, -476.7664, 112.6645158, 35.6873069, -482.2794, 112.6643339, 35.6867799, -483.314, 112.66429, 35.6866078, -478.8203, 112.6643118, 35.68656, -478.7905, 112.6649635,
          35.6860286, -476.8266, 112.6645566, 35.6847913, -479.4884, 112.6644158, 35.6843343, -481.6889, 112.6641135, 35.6834639, -488.4519, 112.6639563, 35.6830069, -487.5456, 112.6636828,
          35.6821273, -483.2238, 112.6634294, 35.6814224, -475.9096, 112.6631824, 35.6806271, -475.9439
        ],
        [
          112.6635144, 35.6817147, -478.8639, 112.6632265, 35.6808261, -476.02, 112.663096, 35.6803891, -475.943, 112.662941, 35.6799824, -477.0369, 112.6627884, 35.6795268, -477.1888, 112.6625098,
          35.6786795, -474.687, 112.6623679, 35.6782078, -475.2648, 112.6620635, 35.6773365, -476.5681, 112.6617165, 35.6762977, -475.4832, 112.6612985, 35.6750838, -473.3848, 112.6610387, 35.6742042,
          -474.5204, 112.6605772, 35.6729871, -477.5074, 112.6602719, 35.6720417, -482.632, 112.6601321, 35.6716068, -483.4126, 112.6597135, 35.6703082, -487.6255, 112.6594135, 35.6694286, -489.0467,
          112.6591161, 35.6685553, -487.2843, 112.6588213, 35.6677308, -485.6207
        ],
        [112.6629865, 35.6881521, -478.7055, 112.6630966, 35.6884661, -476.0572, 112.6643703, 35.6881667, -475.4063, 112.6661232, 35.6878015, -472.7039, 112.6689627, 35.6871443, -465.701],
        [
          112.6632433, 35.6806385, -475.882, 112.6651296, 35.6802147, -465.7445, 112.665448, 35.6811874, -468.2935, 112.6659688, 35.6827655, -474.1955, 112.6663331, 35.6838325, -476.9622, 112.6669504,
          35.6856646, -477.2857, 112.6671093, 35.6861544, -472.1148, 112.6647655, 35.6866659, -476.066
        ]
      ]
      for (let i = 0; i < coordList.length; i += 1) {
        if (i == 1 || i == 2 || i == 3 || i == 4 || i == 5 || i == 6 || i == 7 || i == 8 || i == 9 || i == 10 || i == 11 || i == 12 || i == 13 || i == 14 || i == 15) {
          imageFile = 'img/luxian_FreshWind.png'
        } else if (i == 16 || i == 17 || i == 0) {
          imageFile = 'img/luxian_DirtyWind.png'
        }
        _t.CreatObj(_t, imageFile, speed, arrowDis, W, H, coordList[i])
      }

      
    },

    CreatObj(_t, imageFile, speed, arrowDis, W, H, coordList) {
      /************************开始构建对象**********************************/
      var coordListLB = []
      var coordListLT = []
      var coordListRB = []
      var coordListRT = []
      var x1, y1, z1, x2, y2, z2
      var azi, W2
      var COS, SIN
      for (let i = 0; i < coordList.length - 3; i += 3) {
        x1 = coordList[i] //.x;
        y1 = coordList[i + 1] //.y;
        z1 = coordList[i + 2] //.z;

        x2 = coordList[i + 3] //.x;
        y2 = coordList[i + 4] //.y;
        z2 = coordList[i + 5] //.z;
        W2 = _t.MToDegree(y1, W)
        azi = _t.GetAzimuth(x2, y2, x1, y1)
        azi += 90
        azi = (azi / 180) * Math.PI
        COS = Math.cos(azi) * W2
        SIN = Math.sin(azi) * W2
        coordListLB.push(x1, y1, z1)
        coordListLB.push(x2, y2, z2)
        coordListLT.push(x1, y1, z1 + H)
        coordListLT.push(x2, y2, z2 + H)

        coordListRB.push(x1 + COS, y1 + SIN, z1)
        coordListRB.push(x2 + COS, y2 + SIN, z2)

        coordListRT.push(x1 + COS, y1 + SIN, z1 + H)
        coordListRT.push(x2 + COS, y2 + SIN, z2 + H)
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
          translucent: function (material) {
            return false
          }
        })
      })
      window.cesiumvariate._dataSource.push(new Cesium.CustomDataSource(Cesium.createGuid()))
      viewer.dataSources.add(window.cesiumvariate._dataSource[window.cesiumvariate._dataSource.length - 1])
      var custom_flowMesh = window.cesiumvariate._dataSource[window.cesiumvariate._dataSource.length - 1]._primitives.add(
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
.windflow {
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
