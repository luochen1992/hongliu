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
      <div class="waterItem" :class="isshow3 ? 'waterItemsel' : ''" @click="addspeed">加速</div>
      <div class="waterItem" :class="isshow4 ? 'waterItemsel' : ''" @click="reducespeed">减速</div>
      <div class="waterItem" :class="viewtype === '1' ? 'waterItemsel' : ''" @click="changeview(1)">第一人称</div>
      <div class="waterItem" :class="viewtype === '3' ? '' : ''" @click="changeview(3)">镜头跟踪</div>
      <div class="waterItem" :class="isshow5 ? 'waterItemsel' : ''" @click="exitRoute">退出演练</div>
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
      isshow3: false,
      isshow4: false,
      isshow5: false,
      drawingflag: false,
      listdialog: [],
      viewtype: '3'
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
      this.isshow1 = false
      this.isshow2 = false
      this.isshow3 = false
      this.isshow4 = false
      this.isshow5 = false
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
      this.clearPopup(this.listdialog)
    },
    succCallback() {
      var _this = this
      _this.point = { longitude: 110.3210387, latitude: 38.9125500, height: 1082.5227 }
      _this.polyline = [
            { longitude:110.3210387	, latitude:38.9125500	, height:1082.5227},
            { longitude:110.3210395	, latitude:38.9133721	, height:1081.1211},
            { longitude:110.3210399	, latitude:38.9134059	, height:1081.0902},
            { longitude:110.3210399	, latitude:38.9134299	, height:1080.8598},
            { longitude:110.3210397	, latitude:38.9134454	, height:1081.0579},
            { longitude:110.3210393	, latitude:38.9142956	, height:1081.0639},
            { longitude:110.3210397	, latitude:38.9143289	, height:1081.0579},
            { longitude:110.3210388	, latitude:38.9143486	, height:1080.8716},
            { longitude:110.3210398	, latitude:38.9143678	, height:1081.0508},
            { longitude:110.3210396	, latitude:38.9151776	, height:1080.7600},
            { longitude:110.3210398	, latitude:38.9152119	, height:1080.7391},
            { longitude:110.3210398	, latitude:38.9152501	, height:1080.7170},
            { longitude:110.3210395	, latitude:38.9160900	, height:1080.1949},
            { longitude:110.3210398	, latitude:38.9161275 , height:1080.1734},
            { longitude:110.3210397	, latitude:38.9161624 , height:1080.1737},
            { longitude:110.3210397	, latitude:38.9178379	, height:1080.2668},
            { longitude:110.3210366	, latitude:38.9178761	, height:1080.1994},
            { longitude:110.3210397	, latitude:38.9179101	, height:1080.2748},
            { longitude:110.3210390	, latitude:38.9187909	, height:1080.4273},
            { longitude:110.3210391	, latitude:38.9188273	, height:1080.4089},
            { longitude:110.3210396	, latitude:38.9188632	, height:1080.4244},
            { longitude:110.3210398	, latitude:38.9196890	, height:1080.1606},
            { longitude:110.3210397	, latitude:38.9197183	, height:1080.1603},
            { longitude:110.3210394	, latitude:38.9205818	, height:1079.0962},
            { longitude:110.3210389	, latitude:38.9206193	, height:1079.0635},
            { longitude:110.3210388	, latitude:38.9206543	, height:1079.0552},
            { longitude:110.3210393	, latitude:38.9214827	, height:1078.9516},
            { longitude:110.3210382	, latitude:38.9215166	, height:1078.9581},
            { longitude:110.3210393	, latitude:38.9215549	, height:1078.9614},
            { longitude:110.3210385	, latitude:38.9223740	, height:1079.1212},
            { longitude:110.3210368	, latitude:38.9224103	, height:1079.0912},
            { longitude:110.3210386	, latitude:38.9224462	, height:1079.1388},
            { longitude:110.3210385	, latitude:38.9232815	, height:1079.3507},
            { longitude:110.3210388	, latitude:38.9233154	, height:1079.3583},
            { longitude:110.3210387	, latitude:38.9233538	, height:1079.3687},
            { longitude:110.3210386	, latitude:38.9233933	, height:1079.3787},
            { longitude:110.3210386	, latitude:38.9234293	, height:1079.3779},
            { longitude:110.3210387	, latitude:38.9234653	, height:1079.3664},
            { longitude:110.3210386	, latitude:38.9251072	, height:1078.3985},
            { longitude:110.3210387	, latitude:38.9260127	, height:1077.8655},
            { longitude:110.3210389	, latitude:38.9269008	, height:1077.3451},
            { longitude:110.3210377	, latitude:38.9269334	, height:1077.3398},
            { longitude:110.3210385	, latitude:38.9269731	, height:1077.3341},
            { longitude:110.3210385	, latitude:38.9270022	, height:1077.3436},
            { longitude:110.3210383	, latitude:38.9270381	, height:1077.3431},
            { longitude:110.3210385	, latitude:38.9270740	, height:1077.3233},
            { longitude:110.3210395	, latitude:38.9278042	, height:1076.6340},
            { longitude:110.3210357	, latitude:38.9278323	, height:1076.6011},
            { longitude:110.3210395	, latitude:38.9278765	, height:1076.5512},
            { longitude:110.3210404	, latitude:38.9286740	, height:1075.6223},
            { longitude:110.3210393	, latitude:38.9287121	, height:1075.5884},
            { longitude:110.3210406	, latitude:38.9287462	, height:1075.5306},
            { longitude:110.3210407	, latitude:38.9295915	, height:1074.3324},
            { longitude:110.3210404	, latitude:38.9296313	, height:1074.2412},
            { longitude:110.3210409	, latitude:38.9296637	, height:1074.2313},
            { longitude:110.3210404	, latitude:38.9303961	, height:1073.2458},
            { longitude:110.3210405	, latitude:38.9304322	, height:1073.2056},
            { longitude:110.3210399	, latitude:38.9304856	, height:1073.1555},
            { longitude:110.3210412	, latitude:38.9305242	, height:1073.1362},
            { longitude:110.3210403	, latitude:38.9305578	, height:1073.1155},
            { longitude:110.3210398	, latitude:38.9314778	, height:1072.8555},
            { longitude:110.3210391	, latitude:38.9323032	, height:1072.6253},
            { longitude:110.3210411	, latitude:38.9323423	, height:1072.6276},
            { longitude:110.3210392	, latitude:38.9323756	, height:1072.6246},
            { longitude:110.3210385	, latitude:38.9332136	, height:1072.9802},	
            { longitude:110.3210381	, latitude:38.9332471	, height:1072.9705},
            { longitude:110.3209919	, latitude:38.9332499	, height:1073.0916},	
            { longitude:110.3207870	, latitude:38.9332519	, height:1073.4822},	
            { longitude:110.3207396	, latitude:38.9332505	, height:1073.5634},
            { longitude:110.3206949	, latitude:38.9332529	, height:1073.6024},
            { longitude:110.3201879	, latitude:38.9332583	, height:1073.9822},
            { longitude:110.3201417	, latitude:38.9332599	, height:1073.9893},
            { longitude:110.3200955	, latitude:38.9332586	, height:1074.0535},
            { longitude:110.3195073	, latitude:38.9332595	, height:1074.4949},
            { longitude:110.3194558	, latitude:38.9332605	, height:1074.5045},
            { longitude:110.3194147	, latitude:38.9332591	, height:1074.5649},
            { longitude:110.3187133	, latitude:38.9332595	, height:1075.0881},
            { longitude:110.3186825	, latitude:38.9332590	, height:1075.0874},
            { longitude:110.3186206	, latitude:38.9332593	, height:1075.1488}

      ]
      _this.end = CTMap.JulianDate.fromDate(new Date())
      _this.start = CTMap.JulianDate.addSeconds(_this.end, -(2 + _this.polyline.length * 3), new CTMap.JulianDate())

      
    },
    // 绘制灾害点
    addspeed(){
      this.isshow3 = true
      viewer.clock.multiplier = viewer.clock.multiplier * 1.2;
    },
    reducespeed(){
      this.isshow4 = true
      viewer.clock.multiplier = viewer.clock.multiplier * 0.8;
    },
    exitRoute(){
      this.isshow5 = true
      if (window.e_route.waterroute) {
          viewer.entities.remove(window.e_route.waterroute)
          window.e_route.waterroute = null
        }
        if (window.e_route.watermodelEntity) {
          viewer.entities.remove(window.e_route.watermodelEntity)
          window.e_route.watermodelEntity = null
        }
        
        this.isshow1 = false
        this.isshow2 = false
        this.isshow3 = false
        this.isshow4 = false
        this.isshow5 = false
    },
    changeview(type) {
      if (type === 3) {
        this.viewtype = '3'
      } else {
        this.viewtype = '1'
      }
    },
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
                      
                      var pos = window.LocalToDegree(upPoint.x,upPoint.y,upPoint.z);
                      coordList.push(pos.x);
                      coordList.push(pos.y);           
                      coordList.push(pos.z - H/2);
                      
                    
                  }
                  {//right
                      var v = new Cesium.Cartesian3(x1,y1,z1);
                      var upPoint = new Cesium.Cartesian3(0,0,0);
                      upPoint = Cesium.Cartesian3.add(v , Cesium.Cartesian3.multiplyByScalar(vRight1,W/2-0.05,vRight1),upPoint) ;
                      
                      var pos = LocalToDegree(upPoint.x,upPoint.y,upPoint.z);
                      coordList.push(pos.x);
                      coordList.push(pos.y);
                      coordList.push(pos.z - H/2);
                      
                    
                  }
                  {//right
                      var v = new Cesium.Cartesian3(x2,y2,z2);
                      var upPoint =new Cesium.Cartesian3(0,0,0);
                      upPoint = Cesium.Cartesian3.add(v , Cesium.Cartesian3.multiplyByScalar(vRight2,W/2-0.05,vRight2),upPoint) ;
                      
                      var pos = LocalToDegree(upPoint.x,upPoint.y,upPoint.z);
                      coordList.push(pos.x);
                      coordList.push(pos.y);
                      coordList.push(pos.z - H/2);
                      
                    
                  }
                    
                    {//left
                    var v = new Cesium.Cartesian3(x2,y2,z2);
                    var upPoint = new Cesium.Cartesian3(0,0,0);
                    var  upPoint = Cesium.Cartesian3.add(v , Cesium.Cartesian3.multiplyByScalar(vLeft2,W/2-0.05,vLeft2),upPoint) ;
                    var pos = LocalToDegree(upPoint.x,upPoint.y,upPoint.z);
                    coordList.push(pos.x);
                    coordList.push(pos.y);
                    coordList.push(pos.z - H/2);
                    }
                }
                var a = tt.GetAzimuth(x1,-y1,x2,-y2);
                var length = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)+(z2-z1)*(z2-z1));
                var WW = Math.abs(x2-x1);
                var HH = Math.abs(y2-y1);
                a=a/180*3.1415926535897932384626433832795;//+3.1415926535897932384626433832795/4;//-3.1415926535897932384626433832795/4;
                tt.addSurfaceWater22(coordList,WW/20,HH/20,a);
              }
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
      viewer.clock.onTick.addEventListener(this.clockonTick)
      viewer.clock.currentTime = this.start
    },
    clockonTick(clock) {
      var _this = this
      if (window.e_route.watermodelEntity && window.e_route.watermodelEntity.orientation) {
        if (window.e_route.watermodelEntity.position.getValue(clock.currentTime) && clock._currentTime <= clock.stopTime) {
          let center = window.e_route.watermodelEntity.position.getValue(clock.currentTime)
          let orientation = window.e_route.watermodelEntity.orientation.getValue(clock.currentTime)
          let transform = Cesium.Transforms.eastNorthUpToFixedFrame(center)
          if (orientation != null) {
            transform = Cesium.Matrix4.fromRotationTranslation(Cesium.Matrix3.fromQuaternion(orientation), center)
            if (this.viewtype === '3') {
              viewer.camera.lookAtTransform(transform, new Cesium.Cartesian3(-25, -1, 3))
              window.e_route.watermodelEntity.show = true;
            } else {
              //viewer.trackedEntity =window.e_route.watermodelEntity;
					
              viewer.camera.lookAtTransform(transform, new Cesium.Cartesian3(-40, 0, 2.5))
              window.e_route.watermodelEntity.show =false;
            }
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
  width: 345px;
  height: 156px;
  background-color: #031521;
  border-radius: 2px;
  box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3);
  border: 9px solid rgb(30 175 251);
  border-image: url('../../../../../assets/images/dialog.png') 10 stretch;
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
