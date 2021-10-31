<template>
  <div v-if="showdialog" class="waterRoute">
    <div class="water-title">
      <div class="tit-label">水灾应急路线</div>
      <div class="tit-close">
        <i class="el-icon-close" @click="close"></i>
      </div>
    </div>
    <div class="water-cen">
      <div class="waterItem" :class="isshow1 ? 'waterItemsel' : ''" @click="watershow">水灾点</div>
      <div class="waterItem" :class="isshow2 ? 'waterItemsel' : ''" @click="waterRoute">逃灾路线</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'emergwaterRoute',
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  data() {
    return {
      isshow: false,
      showdialog: false,
      isshow1: false,
      isshow2: false,
      drawingflag: false,
      listdialog: []
    }
  },
  mounted() {},
  watch: {
    getNowMenuName(newV, oldV) {
      if (newV === 'emergwaterRoute') {
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
      window.e_route = {}
      if (!_this.showdialog) {
        _this.showdialog = true
        _this.succCallback()
      }
    },
    close() {
      this.setNowMenuName('')
    },
    // 隐藏
    hide() {
      if (window.cesiumvariate._wwdataSource) {
        for (let i = 0; i < window.cesiumvariate._wwdataSource.length; i++) {
          viewer.dataSources.remove(window.cesiumvariate._wwdataSource[i])
        }
        window.cesiumvariate._wwdataSource = null
      }
      this.showdialog = false
      // tooltip.closeAll()
      this.isshow1 = false
      this.isshow2 = false
      viewer.clock.shouldAnimate = false
      if (window.e_route !== undefined) {
        if (window.e_route.waterroute) {
          viewer.entities.remove(window.e_route.waterroute)
          window.e_route.waterroute = null
        }
        if (window.e_route.watermodelEntity) {
          viewer.entities.remove(window.e_route.watermodelEntity)
          window.e_route.watermodelEntity = null
        }
        if (window.e_route.waterprimitive) {
          window.e_route.waterprimitive.remove()
          window.e_route.waterprimitive = null
        }
      }
      // if (window.cesiumvariate.drawControl_w) {
      //   window.cesiumvariate.drawControl_w.removeAll()
      //   window.cesiumvariate.drawControl_w = null
      // }
      this.clearPopup(this.listdialog)
    },
    succCallback() {
      var _this = this
      _this.point = { longitude: 112.7014408, latitude: 35.6785451, height: -330.877 }
      _this.polyline = [
        { longitude: 112.7097048, latitude: 35.6970123, height: -303.1652 },
        { longitude: 112.7096182, latitude: 35.696789, height: -301.7529 },
        { longitude: 112.7095434, latitude: 35.696639, height: -305.5633 },
        { longitude: 112.7094436, latitude: 35.6964624, height: -310.2114 },
        { longitude: 112.7093719, latitude: 35.6963511, height: -314.2664 },
        { longitude: 112.7090916, latitude: 35.6957836, height: -322.1499 },
        { longitude: 112.7090817, latitude: 35.6957451, height: -322.5227 },
        { longitude: 112.7088592, latitude: 35.6953015, height: -335.0163 },
        { longitude: 112.7085567, latitude: 35.6947518, height: -345.7048 },
        { longitude: 112.7082745, latitude: 35.6941568, height: -355.0108 },
        { longitude: 112.7081379, latitude: 35.6939278, height: -356.2514 },
        { longitude: 112.7080906, latitude: 35.6937851, height: -356.694 },
        { longitude: 112.708007, latitude: 35.6936209, height: -360.8012 },
        { longitude: 112.7078641, latitude: 35.6933424, height: -364.2301 },
        { longitude: 112.7075306, latitude: 35.692727, height: -367.1524 },

        { longitude: 112.7073711, latitude: 35.6924011, height: -368.1373 },
        { longitude: 112.7067261, latitude: 35.6910963, height: -362.1399 },
        { longitude: 112.7066827, latitude: 35.6910633, height: -361.9795 },

        { longitude: 112.7065431, latitude: 35.6907498, height: -359.7096 },
        { longitude: 112.7063531, latitude: 35.690384, height: -355.2097 },
        { longitude: 112.7061742, latitude: 35.6900476, height: -351.491 },
        { longitude: 112.7060566, latitude: 35.6897881, height: -347.3217 },
        { longitude: 112.7059945, latitude: 35.6896614, height: -345.3652 },
        { longitude: 112.7059556, latitude: 35.6896244, height: -345.0934 },
        { longitude: 112.7057233, latitude: 35.6891179, height: -341.3342 },

        { longitude: 112.705566, latitude: 35.6888232, height: -336.6042 },
        { longitude: 112.7054168, latitude: 35.6885114, height: -332.2214 },
        { longitude: 112.7050658, latitude: 35.6878535, height: -326.7992 },
        { longitude: 112.7050328, latitude: 35.6877535, height: -326.1044 },
        { longitude: 112.7043417, latitude: 35.6864018, height: -323.1915 },
        { longitude: 112.7040993, latitude: 35.6859255, height: -322.1772 },
        { longitude: 112.7040242, latitude: 35.6857679, height: -324.2889 },
        { longitude: 112.7037591, latitude: 35.6852595, height: -330.9651 },
        { longitude: 112.7034279, latitude: 35.6846149, height: -334.6666 },
        { longitude: 112.7027503, latitude: 35.6832408, height: -341.1286 },
        { longitude: 112.7021292, latitude: 35.6820171, height: -341.5514 },
        { longitude: 112.7017916, latitude: 35.6813902, height: -342.1261 },

        { longitude: 112.7015594, latitude: 35.6809031, height: -343.0376 },
        { longitude: 112.7013578, latitude: 35.6804888, height: -344.2859 },
        { longitude: 112.7014889, latitude: 35.6804751, height: -342.1633 },
        { longitude: 112.7015066, latitude: 35.6804183, height: -342.1752 },

        { longitude: 112.7012518, latitude: 35.6799656, height: -343.4174 },
        { longitude: 112.701151, latitude: 35.6797442, height: -342.5048 },

        { longitude: 112.7008644, latitude: 35.6791842, height: -344.976 },
        { longitude: 112.702616, latitude: 35.6788209, height: -335.2562 },
        { longitude: 112.7031869, latitude: 35.6786932, height: -333.5246 },

        { longitude: 112.703272, latitude: 35.6790183, height: -330.9171 },
        { longitude: 112.7032965, latitude: 35.679085, height: -330.8786 },
        { longitude: 112.7033821, latitude: 35.6793289, height: -330.8314 },
        { longitude: 112.7034118, latitude: 35.6793939, height: -329.701 },
        { longitude: 112.7034378, latitude: 35.679482, height: -331.5909 },
        { longitude: 112.7052521, latitude: 35.6791071, height: -333.6503 },
        { longitude: 112.7057055, latitude: 35.6790078, height: -325.2326 },
        { longitude: 112.7074107, latitude: 35.6786342, height: -317.2294 },
        { longitude: 112.7081901, latitude: 35.678465, height: -312.9999 },
        { longitude: 112.7100018, latitude: 35.6780659, height: -295.8632 },
        { longitude: 112.7113151, latitude: 35.6777839, height: -289.8966 },
        { longitude: 112.71467, latitude: 35.6770699, height: -277.1478 },
        { longitude: 112.7156803, latitude: 35.6768467, height: -266.5502 },
        { longitude: 112.7161921, latitude: 35.6767265, height: -248.0544 },
        { longitude: 112.716297, latitude: 35.6767021, height: -246.7608 },
        { longitude: 112.7204159, latitude: 35.675839, height: -222.0712 },
        { longitude: 112.7208118, latitude: 35.6757327, height: -221.1373 },
        { longitude: 112.7265633, latitude: 35.674259, height: -1.4658 }
      ]
      _this.end = CTMap.JulianDate.fromDate(new Date())
      _this.start = CTMap.JulianDate.addSeconds(_this.end, -(2 + _this.polyline.length * 3), new CTMap.JulianDate())

      
    },
    // 绘制灾害点

    // 绘制
    draw(type) {
      if (this.drawingflag) {
        return
      }
      this.drawingflag = true
      window.cesiumvariate.drawControl_w.startDraw({
        edittype: 'imagepoint',
        style: {
          image: 'img/marker/point.png',
          opacity: 1,
          rotation: 0,
          scale: 1
        },
        type: 'billboard'
      })
    },
    // 水灾
    watershow() {
      window.cesiumvariate._wwdataSource = []
      if (this.isshow1) {
       if (window.e_route.waterprimitive) {
          window.e_route.waterprimitive.remove()
          window.e_route.waterprimitive = null
        }
        this.isshow1 = false
        return
      }
      this.isshow1 = true
      this.addWaterPolygon();
      window.viewer.camera.flyTo({
        destination: window.Cesium.Cartesian3.fromDegrees(this.point.longitude, this.point.latitude, this.point.height + 30), // 经度、纬度、高度
        orientation: {
          heading: window.Cesium.Math.toRadians(0), // 绕垂直于地心的轴旋转
          pitch: window.Cesium.Math.toRadians(-90), // 绕纬度线旋转
          roll: 0 // 绕经度线旋转
        },
        duration: 1 // 飞行到目的地花费时间3秒
      })
     
      //添加时钟
      this.setClock()
      
    },
    setClock() {
      viewer.clock.startTime = this.start
      viewer.clock.stopTime = this.end
      viewer.clock.currentTime = this.start
      viewer.clock.clockRange = CTMap.ClockRange.UNBOUNDED // CLAMPED
      viewer.clock.multiplier = 0.5 // viewer.clock.multiplier / 2
      viewer.clock.shouldAnimate = true
    },
    addWaterPolygon(){ 
      var tt = this;   
      $.get("data/新巷道图层.json",{},function(res)
      {
        //var json = JSON.parse(res);
        var json = res;
        for(var j=0;j<json.Map.length;j++)
        {	
          
          var obj = json.Map[j];
          if(obj.ModelType=="MModel_Passage" )
          {
            if(obj.Name.indexOf("主排水泵房")!=-1)
            {
              var W = obj.W;
              var H = obj.H;
              var xyz = obj.XYZ;
              
              var xyzArr = obj.XYZ.split(';');
              for(var k=0;k<xyzArr.length-1;k++)
              {
                var xyzArr2 = xyzArr[k].split(',');
                var x1 =parseFloat(xyzArr2[0]);
                var y1 =parseFloat(xyzArr2[1]);
                var z1 =parseFloat(xyzArr2[2]);
                xyzArr2 = xyzArr[k+1].split(',');
                var x2 =parseFloat(xyzArr2[0]);
                var y2 =parseFloat(xyzArr2[1]);
                var z2 =parseFloat(xyzArr2[2]);
                
                var coordList=[];
                {
                  var lineV3D = new Cesium.Cartesian3(x2 - x1, y2 - y1, z2 - z1);
                  lineV3D=Cesium.Cartesian3.normalize(lineV3D,lineV3D);
                  var lineV2D = new Cesium.Cartesian3(x2 - x1, y2 - y1, 0);
                  lineV2D=Cesium.Cartesian3.normalize(lineV2D,lineV2D);
                
                  var vLeft= new Cesium.Cartesian3(0,0,0);
                  var vRight= new Cesium.Cartesian3(0,0,0);
                  if (z2 > z1)
                  {
                    //cross(left, right, result)
                    vLeft = Cesium.Cartesian3.cross(lineV3D,lineV2D,vLeft);
                    vRight = Cesium.Cartesian3.cross(lineV2D,lineV3D,vRight);
                  }
                  else
                  {
                    vRight = Cesium.Cartesian3.cross(lineV3D,lineV2D,vRight);
                    vLeft = Cesium.Cartesian3.cross(lineV2D,lineV3D,vLeft);
                  }
                    vRight=Cesium.Cartesian3.normalize(vRight,vRight);
                    vLeft =Cesium.Cartesian3.normalize(vLeft,vLeft);
                  
                      var vLeft1 = vLeft.clone();
                      var vLeft2 = vLeft.clone();
                    var vRight1 = vRight.clone();
                      var vRight2 = vRight.clone();
                  {//left
                      var v = new Cesium.Cartesian3(x1,y1,z1);
                      var upPoint = new Cesium.Cartesian3(0,0,0);
                      upPoint = Cesium.Cartesian3.add(v , Cesium.Cartesian3.multiplyByScalar(vLeft1,W/2-0.05,vLeft1),upPoint) ;
                      
                      var pos = LocalToDegree(upPoint.x,upPoint.y,upPoint.z);
                      coordList.push(pos.x);
                      coordList.push(pos.y);           
                      coordList.push(pos.z-926.255-H/2);
                      
                    
                  }
                  {//right
                      var v = new Cesium.Cartesian3(x1,y1,z1);
                      var upPoint = new Cesium.Cartesian3(0,0,0);
                      upPoint = Cesium.Cartesian3.add(v , Cesium.Cartesian3.multiplyByScalar(vRight1,W/2-0.05,vRight1),upPoint) ;
                      
                      var pos = LocalToDegree(upPoint.x,upPoint.y,upPoint.z);
                      coordList.push(pos.x);
                      coordList.push(pos.y);
                      coordList.push(pos.z-926.255-H/2);
                      
                    
                  }
                  {//right
                      var v = new Cesium.Cartesian3(x2,y2,z2);
                      var upPoint =new Cesium.Cartesian3(0,0,0);
                      upPoint = Cesium.Cartesian3.add(v , Cesium.Cartesian3.multiplyByScalar(vRight2,W/2-0.05,vRight2),upPoint) ;
                      
                      var pos = LocalToDegree(upPoint.x,upPoint.y,upPoint.z);
                      coordList.push(pos.x);
                      coordList.push(pos.y);
                      coordList.push(pos.z-926.255-H/2);
                      
                    
                  }
                    
                    {//left
                    var v = new Cesium.Cartesian3(x2,y2,z2);
                    var upPoint = new Cesium.Cartesian3(0,0,0);
                    var  upPoint = Cesium.Cartesian3.add(v , Cesium.Cartesian3.multiplyByScalar(vLeft2,W/2-0.05,vLeft2),upPoint) ;
                    var pos = LocalToDegree(upPoint.x,upPoint.y,upPoint.z);
                    coordList.push(pos.x);
                    coordList.push(pos.y);
                    coordList.push(pos.z-926.255-H/2);
                    }
                }
                var a = tt.GetAzimuth(x1,-y1,x2,-y2);
                var length = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)+(z2-z1)*(z2-z1));
                var WW = Math.abs(x2-x1);
                var HH = Math.abs(y2-y1);
                a=a/180*3.1415926535897932384626433832795;//+3.1415926535897932384626433832795/4;//-3.1415926535897932384626433832795/4;
                tt.addSurfaceWater22(coordList,WW/20,HH/20,a);
              }
              //createFlowVolume2( W*2, H*2, 5,coordList);
            }
          }

        }
      });
	

	
    },
    //----------水体-----------------
  
    addSurfaceWater22(waterFace,repeateX=1,repeateY=1,angle=0.0)
    {
      var instanceMesh = new Cesium.GeometryInstance({
         geometry : new Cesium.PolygonGeometry({
            polygonHierarchy : new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArrayHeights(waterFace)),
            //extrudedHeight: 0,//注释掉此属性可以只显示水面
            perPositionHeight : true,//注释掉此属性水面就贴地了
            stRotation:25
          })
      })
        var appcMoudle = new CTMap.waterEffects(viewer);
        var appc = appcMoudle.app(repeateX,repeateY,angle);
        window.cesiumvariate._wwdataSource.push(new Cesium.CustomDataSource(Cesium.createGuid()))
        viewer.dataSources.add(window.cesiumvariate._wwdataSource[window.cesiumvariate._wwdataSource.length - 1])
        var custom_flowMesh = window.cesiumvariate._wwdataSource[window.cesiumvariate._wwdataSource.length - 1]._primitives.add(
        new Cesium.Primitive({
          geometryInstances: instanceMesh,
          appearance: appc,
          asynchronous: false,
          show:true,// 默认隐藏
        })
      )
      /*var waterPrimitive = new Cesium.Primitive({
        show:true,// 默认隐藏
        allowPicking:false,
        geometryInstances : instanceMesh,
        // 可以设置内置的水面shader
        appearance : appc

      });
      viewer.scene.primitives.add(waterPrimitive);*/
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
    },
    // 逃灾路线
    waterRoute() {
      if (this.isshow2) {
        if (window.e_route.waterroute) {
          viewer.entities.remove(window.e_route.waterroute)
          window.e_route.waterroute = null
        }
        if (window.e_route.watermodelEntity) {
          viewer.entities.remove(window.e_route.watermodelEntity)
          window.e_route.watermodelEntity = null
        }
        this.isshow2 = false
        return
      }
      this.isshow2 = true
      var _this = this
      var polyline = this.polyline
      const ptList = []

      var keyPos = new CTMap.SampledPositionProperty()
      keyPos.backwardExtrapolationDuration = 2
      keyPos.backwardExtrapolationType = CTMap.ExtrapolationType.HOLD
      keyPos.forwardExtrapolationType = CTMap.ExtrapolationType.HOLD
      const orientation = new CTMap.VelocityOrientationProperty(keyPos)

      for (var j = 0; j < polyline.length; j++) {
        var position = Cesium.Cartesian3.fromDegrees(polyline[j].longitude, polyline[j].latitude, polyline[j].height)

        const ctime = CTMap.JulianDate.addSeconds(_this.start, 1 + j * 3, new CTMap.JulianDate())
        keyPos.addSample(ctime, position)
        ptList.push(position)
      }
      let offset = 0
      window.e_route.waterroute = viewer.entities.add({
        availability: new Cesium.TimeIntervalCollection([
          new Cesium.TimeInterval({
            start: _this.start,
            stop: _this.end,
            isStartIncluded: true,
            isStopIncluded: false
          })
        ]),
        position: keyPos,
        // show: false,
        orientation: orientation,
        path: {
          // positions: ptList,
          show: true,
          // positions: points,
          leadTime: 2 + polyline.length * 3,
          trailTime: 2 + polyline.length * 3,
          width: 6.0,
          material: new CTMap.StripeMaterialProperty({
            evenColor: CTMap.Color.fromCssColorString('#FF0000').withAlpha(0.8),
            oddColor: CTMap.Color.fromCssColorString('#9FEE00').withAlpha(0.8),
            repeat: 40,
            orientation: CTMap.StripeOrientation.VERTICAL,
            offset: new CTMap.CallbackProperty((time) => {
              return (offset += 0.0008)
            }, false)
          })
        }
      })
      _this.peopleAnimation(keyPos, orientation)
     // _this.Popup()
    },
    Popup() {
      // 添加弹框
      var tp = new CTMap.tooltip(viewer, 'trackdialog')
      tp.add({
        // geometry: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
        content: {
          header: '<strong>人员定位系统</strong><br><span>类型：人员</span>',
          isclose: true,
          content: `<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
                            <div class="layui-tab-content" style="height: 420px;">
                              <div class="layui-tab-item layui-show">
                              <table class="layuitable">
                              <tbody  align="center" valign="middle">
                                  <tr>
                                  <td style="font-size:20px; color:yellow">人员信息</td><td></td><td rowspan="12"><img src="./img/弹框/u558.jpg" alt="" width="50" ></td>
                                  <tr>
                                  <td>姓名：</td><td>马增军</td>  
                                  </tr>
                                  <tr>
                                  <td>工号：</td><td>20859</td>
                                  </tr>
                                  <tr>
                                  <td>职务：</td><td>辅助员工</td>
                                  </tr>
                                  <td style="font-size:20px; color:yellow">人员信息</td><td></td>
                                  <tr>
                                  <td>总里程：</td><td>7320.04</td>
                                  </tr>
                                  <tr>
                                  <td>剩余里程：</td><td>7320.04</td>
                                  </tr>
                                  <tr>
                                  <td>当前站：</td><td>井口上（环）</td>
                                  </tr>
                                  <tr>
                                  <td>下一站：</td><td>井口上（环）</td>
                                  </tr>
                                  <tr>
                                  <td>下一站距离：</td><td>405.25</td>
                                  </tr>
                                  <tr>
                                  <td>下一站到站：</td><td>2021-07-19 05:30:31</td>
                                  </tr>
                                  <tr>
                                  <td>所在巷道：</td><td>副井</td>
                                  </tr>
                              </table>
                              </div>      
                            </div>
                          </div> `
        }
      })
      this.listdialog.push(tp)
    },
    clearPopup(list) {
      if (list.length > 0) {
        for (var i = 0; i < list.length; i++) {
          list[i].closeAll()
        }
      }
    },

    // 避险动画
    peopleAnimation(keyPos, orientation) {
      window.e_route.watermodelEntity = viewer.entities.add({
        position: keyPos,
        // show: false,
        orientation: orientation,
        model: {
          uri: 'data/矿工2/duizhang01.gltf',
          minimumPixelSize: 64
        }
      })
      // viewer.trackedEntity = window.e_route.watermodelEntity
      viewer.clock.onTick.addEventListener(this.clockonTick)
      viewer.clock.currentTime = this.start
    },
    clockonTick(clock) {
      var _this = this
      if (window.e_route.watermodelEntity && window.e_route.watermodelEntity.orientation) {
        if (window.e_route.watermodelEntity.position.getValue(clock.currentTime) && clock._currentTime <= clock.stopTime) {
          var p1 = window.e_route.watermodelEntity.position.getValue(clock.currentTime)
          var o1 = window.e_route.watermodelEntity.orientation.getValue(clock.currentTime)
          let transform = Cesium.Transforms.eastNorthUpToFixedFrame(p1)
          if (o1 != null) {
            transform = Cesium.Matrix4.fromRotationTranslation(Cesium.Matrix3.fromQuaternion(o1), p1)
            viewer.camera.lookAtTransform(transform, new Cesium.Cartesian3(-25, -1, 3))
          }
        }
        if (clock._currentTime >= clock.stopTime) {
          viewer.clock.onTick.removeEventListener(_this.clockonTick)
          viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
        }
      }
    }
  }
}
</script>

<style  lang="scss">
.waterRoute {
  width: 300px;
  height: 100px;
  background-color: #031521;
  border-radius: 2px;
  box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3);
  border: 9px solid rgb(30 175 251);
  border-image: url('../../assets/images/dialog.png') 10 stretch;
  color: #fff;
  position: absolute;
  top: 36px;
  left: -370px;
  .water-title {
    width: 100%;
    height: 30px;
    background: rgb(17, 92, 136);
    .tit-label {
      width: 150px;
      float: left;
      margin: 0 0 0 10px;
      line-height: 34px;
      font-size: 16px;
    }
    .tit-close {
      float: right;
      margin: 3px 5px;
      font-size: 24px;
      cursor: pointer;
    }
  }
  .water-cen {
    width: 100%;
    height: calc(100% - 32px);
    position: inherit;
    .waterItem {
      background: none;
      color: #fff;
      border: 1px solid #e4eaec;
      float: left;
      cursor: pointer;
      padding: 5px;
      margin: 5px 10px;
      font-size: 14px;
      width: 70px;
      text-align: center;
      border-radius: 3px;
      background-color: rgba(192, 215, 233, 0.2);
    }
    .waterItemsel {
      color: #fff;
      background-color: #2383ac;
      border-color: #ffc107;
    }
  }
}
</style>
