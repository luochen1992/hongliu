<template>
  <div v-if="showdialog" class="emergygasRoute">
    <div class="emergygas-title">
      <div class="tit-label">瓦斯避灾路线</div>
      <div class="tit-close">
        <i class="el-icon-close" @click="close"></i>
      </div>
    </div>
    <div class="emergygas-cen">
      <div class="emergygasItem" @click="emergygasshow">瓦斯泄露点</div>
      <div class="emergygasItem" @click="emergygasRoute">逃灾路线</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'emergygasRoute',
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  data() {
    return {
      showdialog: false
    }
  },
  mounted() {},
  watch: {
    getNowMenuName(newV, oldV) {
      if (newV === 'emergygasRoute') {
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
      window.a_route={}
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
      viewer.clock.shouldAnimate = false
      if (window.a_route !== undefined) {
        if (window.a_route.gasPs) {
          viewer.scene.primitives.remove(window.a_route.gasPs)
          window.a_route.gasPs = null
        }
        if (window.a_route.gasroute) {
          viewer.entities.remove(window.a_route.gasroute)
          window.a_route.gasroute = null
        }
        if (window.a_route.gasmodelEntity) {
          viewer.entities.remove(window.a_route.gasmodelEntity)
          window.a_route.gasmodelEntity = null
        }
      }
    },
    succCallback() {
      var _this = this
       _this.point = { longitude: 112.73316378253897, latitude: 35.66631038808534, height: -35 }
      _this.polyline = [
        { longitude: 112.73390399850145, latitude: 35.666289326779776, height: -35 },
        { longitude: 112.73392148904392, latitude: 35.66602717300799, height: -35 },
        { longitude: 112.73394189595311, latitude: 35.66548598745071, height: -35 },
        { longitude: 112.73394211686983, latitude: 35.66505676646285, height: -35 },
        { longitude: 112.73347553031888, latitude: 35.664966915531934, height: -35 },
        { longitude: 112.73276535822927, latitude: 35.664958301465575, height: -35 },
        { longitude: 112.73204018648683, latitude: 35.664956629294, height: -35 },
        { longitude: 112.73120697220114, latitude: 35.66495569276803, height: -35 },
        { longitude: 112.73062714436374, latitude: 35.66493370481875, height: -35 },
        { longitude: 112.73005341348447, latitude: 35.66493955743876, height: -35 },
        { longitude: 112.73005454843631, latitude: 35.66499695444775, height: -35 },
        { longitude: 112.7300321597533, latitude: 35.665470090499454, height: -35 },
        { longitude: 112.73001862175794, latitude: 35.66574023612449, height: -35 },
        { longitude: 112.73001022236346, latitude: 35.66602892369369, height: -35 },
        { longitude: 112.72996829144718, latitude: 35.66645694514801, height: -35 },
        { longitude: 112.72996995490864, latitude: 35.66667038848553, height: -35 },
        { longitude: 112.72997297336127, latitude: 35.66691340055543, height: -35 },
        { longitude: 112.72996036570187, latitude: 35.66725681720259, height: -35 },
        { longitude: 112.72995552038465, latitude: 35.66750359229773, height: -35 },
        { longitude: 112.72996503696965, latitude: 35.667765804003054, height: -35 },
        { longitude: 112.72995762690239, latitude: 35.66805700802721, height: -35 },
        { longitude: 112.72995130566903, latitude: 35.668333103167605, height: -35 },
        { longitude: 112.72994706918065, latitude: 35.66864068136103, height: -35 },
        { longitude: 112.7299541626595, latitude: 35.66899222551207, height: -35 },
        { longitude: 112.72994645862362, latitude: 35.669300523162114, height: -35 },
        { longitude: 112.72994162759554, latitude: 35.669721549893865, height: -35 },
        { longitude: 112.72992365626848, latitude: 35.67001285691212, height: -35 },
        { longitude: 112.72991990060503, latitude: 35.670319845792854, height: -35 },
        { longitude: 112.72991803006404, latitude: 35.670575525292946, height: -35 },
        { longitude: 112.72990211713065, latitude: 35.67098067053707, height: -35 },
        { longitude: 112.7298913119214, latitude: 35.67108132592551, height: -35 },
        { longitude: 112.7298913119214, latitude: 35.67108132592551, height: -35 }
      ]
      _this.start = CTMap.JulianDate.fromDate(new Date())
      _this.start.secondsOfDay = _this.start.secondsOfDay - (6 + _this.polyline.length * 2)
      _this.end = CTMap.JulianDate.fromDate(new Date())
    },
    // 水灾
    emergygasshow() {
      var point = this.point
      window.a_route.gasPs = viewer.scene.primitives.add(
        new CTMap.ParticleSystem({
          image: 'img/smoke.png',
          startColor:Cesium.Color.BLUE.withAlpha(0.7),
          endColor: Cesium.Color.YELLOW.withAlpha(0.3),
          startScale: 1.0,
          endScale: 1.2,
          minimumParticleLife: 1,
          maximumParticleLife: 1.5,
          minimumSpeed: 1.0,
          maximumSpeed: 2.0,
          emissionRate: 400,
          lifetime: 2,
          sizeInMeters: true,
          imageSize: new Cesium.Cartesian2(0.6, 0.6),
          emitter:new CTMap.CircleEmitter(CTMap.Math.toRadians(90.0)),
          modelMatrix: Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(point.longitude, point.latitude, point.height))
        })
      )
      window.viewer.camera.flyTo({
        destination: window.Cesium.Cartesian3.fromDegrees(point.longitude, point.latitude, point.height + 30), // 经度、纬度、高度
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
      viewer.clock.clockRange = CTMap.ClockRange.UNBOUNDED
      viewer.clock.multiplier = 4 // viewer.clock.multiplier / 2
      viewer.clock.shouldAnimate = true
    },
    // 逃灾路线
    emergygasRoute() {
      var _this = this
      var polyline = this.polyline
      const ptList = []

      var keyPos = new CTMap.SampledPositionProperty()
      keyPos.backwardExtrapolationDuration = 2
      keyPos.backwardExtrapolationType = CTMap.ExtrapolationType.HOLD
      keyPos.forwardExtrapolationType = CTMap.ExtrapolationType.HOLD
      let orientation = new CTMap.VelocityOrientationProperty(keyPos)

      for (var j = 0; j < polyline.length; j++) {
        var position = Cesium.Cartesian3.fromDegrees(polyline[j].longitude, polyline[j].latitude, polyline[j].height)

        let ctime = CTMap.JulianDate.addSeconds(_this.start, 6 + j * 2, new CTMap.JulianDate())
        keyPos.addSample(ctime, position)
        ptList.push(position)
      }
      let offset = 0
      window.a_route.gasroute = viewer.entities.add({
        availability: new Cesium.TimeIntervalCollection([
          new Cesium.TimeInterval({
            start: _this.start,
            stop: _this.end,
            isStartIncluded: true,
            isStopIncluded: false
          })
        ]),
        position: keyPos,
        //show: false,
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
    },
    // 避险动画
    peopleAnimation(keyPos, orientation) {
      window.a_route.gasmodelEntity = viewer.entities.add({
        position: keyPos,
        // show: false,
        orientation: orientation,
        model: {
          uri: 'data/Cesium_Man.glb',
          minimumPixelSize: 64
        }
      })
      viewer.trackedEntity = window.a_route.gasmodelEntity
    }
  }
}
</script>

<style  lang="scss">
.emergygasRoute {
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
  .emergygas-title {
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
  .emergygas-cen {
    width: 100%;
    height: calc(100% - 32px);
    .emergygasItem {
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
    .emergygasItemsel {
      color: #fff;
      background-color: #2383ac;
      border-color: #ffc107;
    }
  }
}
</style>
