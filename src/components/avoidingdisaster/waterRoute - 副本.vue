<template>
  <div v-if="showdialog" class="waterRoute">
    <div class="water-title">
      <div class="tit-label">水灾避灾路线</div>
      <div class="tit-close">
        <i class="el-icon-close" @click="close"></i>
      </div>
    </div>
    <div class="water-cen">
      <div class="waterItem" :class="isshow1 ? 'waterItemsel' : ''" @click="draw">水灾点</div>
      <div class="waterItem" :class="isshow2 ? 'waterItemsel' : ''" @click="waterRoute">逃灾路线</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'waterRoute',
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  data() {
    return {
      showdialog: false,
      isshow1: false,
      isshow2: false,
      listdialog: []
    }
  },
  mounted() {},
  watch: {
    getNowMenuName(newV, oldV) {
      if (newV === 'waterRoute') {
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
      window.a_route = {}
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
      this.showdialog = false
      this.clearPopup(this.listdialog);
      //tooltip.closeAll()
      this.isshow1 = false
      this.isshow2 = false
      viewer.clock.shouldAnimate = false
      if (window.a_route !== undefined) {
        if (window.a_route.waterPs) {
          viewer.scene.primitives.remove(window.a_route.waterPs)
          window.a_route.waterPs = null
        }
        if (window.a_route.waterroute) {
          viewer.entities.remove(window.a_route.waterroute)
          window.a_route.waterroute = null
        }
        if (window.a_route.watermodelEntity) {
          viewer.entities.remove(window.a_route.watermodelEntity)
          window.a_route.watermodelEntity = null
        }
        if (window.a_route.waterprimitive) {
          window.a_route.waterprimitive.remove()
          window.a_route.waterprimitive = null
        }
      }
      if (window.cesiumvariate.drawControl_w) {
        window.cesiumvariate.drawControl_w.removeAll()
        window.cesiumvariate.drawControl_w = null
      }
    },
    succCallback() {
      var _this = this
      _this.point = { longitude: 112.6874174, latitude: 35.6779626, height: -404.8488 }
      _this.polyline = [
        { longitude: 112.6875563, latitude: 35.6783782, height: -400.5105 },
        { longitude: 112.6877162, latitude: 35.6788418, height: -396.3231 },
        // { longitude: 112.6877259, latitude: 35.6788812, height: -359.8644 },
        // { longitude: 112.6877685, latitude: 35.6790183, height: -394.603 },
        { longitude: 112.6878385, latitude: 35.6792276, height: -393.238 },
        { longitude: 112.6879896, latitude: 35.6796759, height: -390.5743 },
        { longitude: 112.6883112, latitude: 35.6806359, height: -382.6554 },
        { longitude: 112.6885609, latitude: 35.6813608, height: -379.3064 },
        { longitude: 112.6890188, latitude: 35.6812575, height: -377.3086 }
      ]
      _this.start = CTMap.JulianDate.fromDate(new Date())
      _this.start.secondsOfDay = _this.start.secondsOfDay - (6 + _this.polyline.length * 2)
      _this.end = CTMap.JulianDate.fromDate(new Date())

      window.cesiumvariate.drawControl_w = new CTMap.DrawTool(window.viewer, {
        hasEdit: false,
        // dragIcon: dragIcon,
        onStopDrawing: function (entity) {
          var coodrs = entity.position.getValue()

      var matrix = Cesium.Transforms.eastNorthUpToFixedFrame(coodrs)
      _this.point = Cesium.Matrix4.multiplyByPoint(matrix, Cesium.Cartesian3.fromElements(0, 0, -30), new Cesium.Cartesian3())
          _this.watershow()
          window.cesiumvariate.drawControl_w.removeAll()
        },
        onStartEditing: function (entity) {},
        onChangeEditing: function (entity) {},
        onStopEditing: function (entity) {}
      })
    },
    // 绘制灾害点

    // 绘制
    draw(type) {
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
        if (window.a_route.waterPs) {
          viewer.scene.primitives.remove(window.a_route.waterPs)
          window.a_route.waterPs = null
        }
        if (window.a_route.waterprimitive) {
          window.a_route.waterprimitive.remove()
          window.a_route.waterprimitive = null
        }
      this.isshow1 = true
      var point = this.point
      window.a_route.waterPs = viewer.scene.primitives.add(
        new CTMap.ParticleSystem({
          image: 'img/fountain.png',
          startColor: new Cesium.Color(1, 1, 1, 0.6),
          endColor: new Cesium.Color(0.8, 0.86, 1, 0.4),
          startScale: 1,
          endScale: 2,
          minimumParticleLife: 2,
          maximumParticleLife: 2,
          minimumSpeed: 3,
          maximumSpeed: 6,
          imageSize: new Cesium.Cartesian2(10, 10),
          emissionRate: 220,
          lifetime: 16.0,
          emitter: new Cesium.CircleEmitter(2.0),
          modelMatrix: Cesium.Transforms.eastNorthUpToFixedFrame(point)
        })
      )
      var ellipsoid = viewer.scene.globe.ellipsoid
      var cartographic = ellipsoid.cartesianToCartographic(point)
      var lat = Cesium.Math.toDegrees(cartographic.latitude)
      var lon = Cesium.Math.toDegrees(cartographic.longitude)
      var h = cartographic.height

      var waterFace = [lon - 0.00003, lat - 0.00003, h, lon - 0.00003, lat + 0.00003, h, lon + 0.00003, lat + 0.00003, h, lon + 0.00003, lat - 0.00003, h]

      // window.a_route.waterprimitive = new CTMap.WaterFacePrimitive({ viewer: viewer, normalMapUrl: 'img/waterNormals.png', DegreesArrayHeights: waterFace })

      window.a_route.waterprimitive = new CTMap.WaterFacePrimitive({
        viewer: viewer,
        normalMapUrl: 'img/waterNormals.jpg',
        DegreesArrayHeights: waterFace,
        ClassificationPrimitive: true,
        _extrudedHeight: h,
        startH: -0
      })

      var matrix = Cesium.Transforms.eastNorthUpToFixedFrame(point)
      var p2 = Cesium.Matrix4.multiplyByPoint(matrix, Cesium.Cartesian3.fromElements(0, 0, 50), new Cesium.Cartesian3())
      window.viewer.camera.flyTo({
        destination: p2, // 经度、纬度、高度
        orientation: {
          heading: window.Cesium.Math.toRadians(0), // 绕垂直于地心的轴旋转
          pitch: window.Cesium.Math.toRadians(-90), // 绕纬度线旋转
          roll: 0 // 绕经度线旋转
        },
        duration: 1 // 飞行到目的地花费时间3秒
      })
      this.setClock()
    },
    setClock() {
      viewer.clock.startTime = this.start
      viewer.clock.stopTime = this.end
      viewer.clock.currentTime = this.start
      viewer.clock.clockRange = CTMap.ClockRange.CLAMPED // UNBOUNDED
      viewer.clock.multiplier = 0.5 // viewer.clock.multiplier / 2
      viewer.clock.shouldAnimate = true
    },
    // 逃灾路线
    waterRoute() {
      if (this.isshow2) {
        if (window.a_route.waterroute) {
          viewer.entities.remove(window.a_route.waterroute)
          window.a_route.waterroute = null
        }
        if (window.a_route.watermodelEntity) {
          viewer.entities.remove(window.a_route.watermodelEntity)
          window.a_route.watermodelEntity = null
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

        const ctime = CTMap.JulianDate.addSeconds(_this.start, 6 + j * 2, new CTMap.JulianDate())
        keyPos.addSample(ctime, position)
        ptList.push(position)
      }
      let offset = 0
      window.a_route.waterroute = viewer.entities.add({
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
          leadTime: 6 + polyline.length * 2,
          trailTime: 6 + polyline.length * 2,
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
      _this.Popup()
    },
    Popup() {
      // 添加弹框
      var tp = new CTMap.tooltip(viewer, 'trackdialog')
      this.listdialog.push(tp);
      tp.add({
        // geometry: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
        content: {
          header: '<strong>人员定位系统</strong><br><span>类型：人员</span>',
          isclose: false,
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
    },
    clearPopup(list) {
      if (list.length > 0) {
        list[i].closeAll()
      }
    },
    // 避险动画
    peopleAnimation(keyPos, orientation) {
      window.a_route.watermodelEntity = viewer.entities.add({
        position: keyPos,
        // show: false,
        orientation: orientation,
        model: {
          uri: 'data/Cesium_Man.glb',
          minimumPixelSize: 64
        }
      })
      // viewer.trackedEntity = window.a_route.watermodelEntity
      viewer.clock.onTick.addEventListener(this.clockonTick)
      viewer.clock.currentTime = this.start
    },
    clockonTick(clock) {
      var _this = this
      if (window.a_route.watermodelEntity && window.a_route.watermodelEntity.orientation) {
        if (window.a_route.watermodelEntity.position.getValue(clock.currentTime) && clock._currentTime <= clock.stopTime) {
          var p1 = window.a_route.watermodelEntity.position.getValue(clock.currentTime)
          var o1 = window.a_route.watermodelEntity.orientation.getValue(clock.currentTime)
          let transform = Cesium.Transforms.eastNorthUpToFixedFrame(p1)
          if (o1 != null) {
            transform = Cesium.Matrix4.fromRotationTranslation(Cesium.Matrix3.fromQuaternion(o1), p1)
            viewer.camera.lookAtTransform(transform, new Cesium.Cartesian3(-7, 0, 2))
          }
        }
        if (clock._currentTime >= clock.stopTime) {
          viewer.clock.onTick.removeEventListener(_this.clockonTick)
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
  left: 25px;
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
