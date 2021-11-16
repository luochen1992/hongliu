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
      this.clearPopup(this.listdialog)
    },
    succCallback() {
      var _this = this
      _this.point = { longitude: 112.7014408, latitude: 35.6785451, height: -330.877 }
      _this.polyline = [
        { longitude:112.7111863 , latitude:35.6963880 , height:-291.7652},
        { longitude:112.7108281 , latitude:35.6956799 , height:-299.6770 },
        { longitude:112.7103646 , latitude:35.6947651 , height:-309.9016 },
        { longitude:112.7098722 , latitude:35.6937931 , height:-320.7618 },
        { longitude:112.7095677 , latitude:35.6931919 , height:-327.4779 },
        { longitude:112.7092629 , latitude:35.6925900 , height:-334.2010},
        { longitude:112.7088867 , latitude:35.6918473 , height:-342.4980 },
        { longitude:112.7086052 , latitude:35.6912914 , height:-348.7061},
        { longitude:112.7085704 , latitude:35.6912230 , height:-349.0337 },
        { longitude:112.7079507 , latitude:35.6899973 , height:-347.1787 },
        { longitude:112.7075718 , latitude:35.6892486 , height:-346.0412 },
        { longitude:112.7071252 , latitude:35.6883651 , height:-344.7029 },
        { longitude:112.7062283 , latitude:35.6865912 , height:-342.0079 },
        { longitude:112.7056142 , latitude:35.6853765 , height:-340.1571 },
        { longitude:112.7046857 , latitude: 35.6835403 , height: -337.3549 },
        { longitude:112.7039852 , latitude:35.6821546 , height:-335.2307 },
        { longitude:112.7039513 , latitude:35.6820879 , height:-335.2706 },
        { longitude:112.7033904 , latitude:35.6809785 , height:-338.3687 },
        { longitude:112.7030019	, latitude:35.6802120	, height:-340.5029},
        { longitude:112.7029831	, latitude:35.6801775	, height:-340.4994	},
        { longitude:112.7029687	, latitude:	35.6801442	, height:-340.4847	},
        { longitude:112.7028348	, latitude:35.6798779	, height:-339.6003	},
        { longitude:112.7028182	, latitude:35.6798446	, height:-339.5898	},
        { longitude:112.7028021	, latitude:35.6798095	, height:-338.9415	},
        { longitude:112.7027380	, latitude:	35.6796849	, height:-336.9230	},
        { longitude:112.7027268	, latitude:35.6796617	, height:-336.7271	},
        { longitude:112.7027448	, latitude:35.6796482	, height:-336.3254	},
        { longitude:112.7027668	, latitude:35.6796427	, height:-336.2513	},
        { longitude:112.7027991	, latitude:35.6796260	, height:-336.1760	},
        { longitude:112.7028234	, latitude:35.6795995	, height:-336.1091	},
        { longitude:112.7028867	, latitude:	35.6794665	, height:-336.0984	},
        { longitude:112.7029048	, latitude:35.6794394	, height:	-336.0279	},
        { longitude:112.7029372	, latitude:35.6794259	, height:-335.8691	},
        { longitude:112.7033534	, latitude:35.6793333	, height:-332.9757	},
        { longitude:112.7033816	, latitude:35.6793259	, height:	-332.8699	},

        { longitude:112.7033958	, latitude:35.6793603	, height:-332.9255},
        { longitude:112.7034303	, latitude:35.6794614	, height:-333.4168	},
        { longitude:112.7034459	, latitude:35.6794871	, height:-333.5302	},
        { longitude:112.7034846	, latitude:35.6794879	, height:-333.6421	},
        { longitude:112.7046437	, latitude:35.6792416	, height:-335.1188	},
        { longitude:112.7047294	, latitude:35.6792233	, height:-335.2281	},
        { longitude:112.7047633	, latitude:35.6792161	, height:-335.2708	},
        { longitude:112.7048489	, latitude:35.6791980	, height:-335.3802	},
        { longitude:112.7048699	, latitude:35.6791934	, height:-335.4066	},
        { longitude:112.7049558	, latitude:35.6791752	, height:-335.4979	},
        { longitude:112.7051949	, latitude:35.6791255	, height:-335.6311	},
        { longitude:112.7052411	, latitude:35.6791153	, height:-335.4711	},
        { longitude:112.7052817	, latitude:35.6791065	, height:-335.3307},
        { longitude:112.7064820	, latitude:35.6788456	, height:-326.2990	},
        { longitude:112.7073816	, latitude:35.6786502	, height:-319.5310	},
        { longitude:112.7074276	, latitude:35.6786390	, height:-319.1666	},
        { longitude:112.7074671	, latitude:35.6786313	, height:	-318.8629	},
        { longitude:112.7095916 , latitude:35.6781638, height:-301.6736},
        { longitude: 112.7096769 , latitude:35.6781450, height:-301.0927 },
        { longitude: 112.7106618 , latitude:35.6779278, height: -295.5658 },
        { longitude:112.7117536	, latitude:35.6776872	, height:-289.4400},
        { longitude:112.7118385	, latitude:35.6776683	, height:-289.0717	},
        { longitude:112.7126120	, latitude:35.6774968	, height:-286.7071	},
        { longitude:112.7126975	, latitude:35.6774777	, height:-286.4191	},
        { longitude:112.7137516	, latitude:35.6772483	, height:-282.5052	},
        { longitude:112.7145665	, latitude:35.6770712	, height:-279.4852	},
        { longitude:112.7146177	, latitude:35.6770602	, height:-279.1612	},
        { longitude:112.7146554	, latitude:35.6770522	, height:-278.9187	},
        { longitude:112.7151038	, latitude:35.6769586	, height:-274.7921	},
        { longitude:112.7151563	, latitude:35.6769479	, height:-274.1451},
        { longitude:112.7151897	, latitude:35.6769404	, height:-273.7306	},
        { longitude:112.7157994	, latitude:35.6768116	, height:-264.2617	},
        { longitude:112.7162441 , latitude:35.6767179 , height:-257.3574},
        { longitude:112.7170406 , latitude:35.6765496 , height:-244.9898 },
        { longitude:112.7170873 , latitude:35.6765387 , height:-244.4822 },
        { longitude:112.7171248 , latitude:35.6765317 , height:-244.0868 },
        { longitude:112.7194165 , latitude:35.6760437 , height:-230.3774 },
        { longitude:112.7202306	, latitude:35.6758699, height:-225.5033},
        { longitude:112.7203162	, latitude:35.6758516, height:-224.9440	},
        { longitude:112.7204560	, latitude:35.6758208, height:-223.9540	},
        { longitude:112.7205393	, latitude:	35.6758000, height:-223.6427	},
        { longitude:112.7206337	, latitude:35.6757756, height:-223.6124	},
        { longitude:112.7207211	, latitude:35.6757521, height:-222.0094	},
        { longitude:112.7234768 , latitude:35.6750485 , height:-118.9405},
        { longitude:112.7266045	, latitude:35.6742501, height:-1.9451	},

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
