<template>
  <div class="fire">
    <div class="fireTool">
      <div class="fireItem" @click="start()">开始</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'fire',
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  data() {
    return {
      isshow: false,
      issel1: false,
      pointList: [],
      dialogindex: null,
      tickpoint: true,
      endpoint: null,
      isstart: false
    }
  },
  mounted() {},
  watch: {
    getNowMenuName(newV, oldV) {
      if (newV === 'fire') {
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
      if (!_this.dialogindex) {
        _this.dialogindex = window.layui.layer.open({
          type: 1,
          title: '消防',
          shade: 0,
          skin: 'cv_dialog',
          area: ['250px', 'auto'],
          offset: ['130px', '60px'],
          zIndex: 2001,
          content: $('.fire'),
          success: function (layero, index) {
            _this.succCallback()
          },
          cancel: function (index, layero) {
            window.layui.layer.close(_this.dialogindex)
            _this.setNowMenuName(null)
            _this.dialogindex = null
          }
        })
      }
    },
    // 隐藏
    hide() {
      window.layui.layer.close(this.dialogindex)
      this.dialogindex = null
      viewer.clock.shouldAnimate = false
      if(window.firecon != undefined){
        viewer.scene.primitives.remove(window.firecon.waterParticlePrimitive)
        viewer.scene.primitives.remove(window.firecon.particleSystem)
        viewer.entities.remove(window.firecon.modelEntity)
      }
      // viewer.entities.remove(window.firecon.lineentity)
      // viewer.entities.remove(window.firecon.pathentity)
      this.isstart = false
    },
    succCallback() {
      var _this = this

      window.firecon = {}
      window.firecon.modelEntity = null
      // window.firecon.pathentity = null
      // window.firecon.lineentity = null
      window.firecon.waterParticlePrimitive = null
      window.firecon.particleSystem = null
      if (_this.pointList.length > 0) {
        return
      }
      Cesium.Resource.fetchJson('data/line.json').then(function (jsonData) {
        _this.pointList = jsonData
        _this.endpoint = { longitude: 112.72213746079736, latitude: 35.66448468028815, height: -35 }
      })
    },
    // 开始
    start() {
      var _this = this
      if (!_this.pointList || _this.isstart) {
        return
      }
      _this.isstart = true
      viewer.goto(_this.endpoint.longitude, _this.endpoint.latitude, 100)
      _this.fiteshow(_this.endpoint)
      _this.loadTaskRout()
      setTimeout(() => {
        viewer.trackedEntity = window.firecon.modelEntity
        viewer.clock.onTick.addEventListener(_this.ticktimefun)
      }, 5000)
    },
    // 火灾
    fiteshow(endpoint) {
      window.firecon.particleSystem = viewer.scene.primitives.add(
        new CTMap.ParticleSystem({
          image: 'img/smoke.png',
          startColor: Cesium.Color.RED.withAlpha(0.7),
          endColor: Cesium.Color.YELLOW.withAlpha(0.3),
          startScale: 1.0,
          endScale: 5.0,
          minimumParticleLife: 1.2,
          maximumParticleLife: 1.2,
          minimumSpeed: 1.0,
          maximumSpeed: 4.0,
          emissionRate: 40,
          lifetime: 16,
          imageSize: new Cesium.Cartesian2(10, 10),
          emitter: new Cesium.CircleEmitter(2.0),
          modelMatrix: Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(endpoint.longitude, endpoint.latitude, endpoint.height))
        })
      )
    },
    // 消防
    loadTaskRout() {
      var start = CTMap.JulianDate.fromDate(new Date())
      var keyPos = new CTMap.SampledPositionProperty()
      keyPos.backwardExtrapolationDuration = 2
      keyPos.backwardExtrapolationType = CTMap.ExtrapolationType.HOLD
      keyPos.forwardExtrapolationType = CTMap.ExtrapolationType.HOLD
      var orientation = new CTMap.VelocityOrientationProperty(keyPos)
      var points = []
      for (var j = 0; j < this.pointList.length; j++) {
        var ctime = CTMap.JulianDate.addSeconds(start, 8 + j * 6, new CTMap.JulianDate())

        var position = Cesium.Cartesian3.fromDegrees(this.pointList[j].longitude, this.pointList[j].latitude, this.pointList[j].height)
        points.push(position)
        keyPos.addSample(ctime, position)
      }

      if (!window.firecon.modelEntity) {
        window.firecon.modelEntity = viewer.entities.add({
          position: keyPos,
          orientation: orientation,
          model: {
            uri: 'data/消防车.gltf',
            minimumPixelSize: 16
          }
        })
      }

      // if (!window.firecon.lineentity) {
      //   window.firecon.lineentity = viewer.entities.add({
      //     position: points,
      //     // show: false,
      //     orientation: orientation,
      //     polyline: {
      //       positions: points,
      //       width: 4.0,
      //       material: CTMap.Color.fromCssColorString('#FF0000').withAlpha(0.8),
      //       // clampToGround:true,
      //       zIndex: 10
      //     }
      //   })
      // }

      // var times = keyPos._property._times
      // if (!window.firecon.pathentity) {
      //   window.firecon.pathentity = viewer.entities.add({
      //     availability: new Cesium.TimeIntervalCollection([
      //       new Cesium.TimeInterval({
      //         start: start,
      //         stop: times[times.length - 1]
      //       })
      //     ]),
      //     position: keyPos,
      //     orientation: orientation,
      //     polyline: {
      //       width: 6.0,
      //       material: CTMap.Color.fromCssColorString('#9FEE00').withAlpha(1),
      //       clampToGround: true,
      //       zIndex: 11
      //     }
      //   })
      // }
      this.setClock()
    },
    // 喷水
    water(endpoint) {
      var _this = this
      var emitterModelMatrix = new CTMap.Matrix4()
      var translation = new CTMap.Cartesian3()
      var rotation = new CTMap.Quaternion()
      var hpr = new CTMap.HeadingPitchRoll()
      var trs = new CTMap.TranslationRotationScale()
      function computeEmitterModelMatrix(endpoint) {
        var a1 = Cesium.Cartesian3.fromDegrees(
          _this.pointList[_this.pointList.length - 1].longitude,
          _this.pointList[_this.pointList.length - 1].latitude,
          _this.pointList[_this.pointList.length - 1].height
        )
        var a2 = Cesium.Cartesian3.fromDegrees(endpoint.longitude, endpoint.latitude, endpoint.height)
        var t3 = Cesium.Cartesian3.subtract(a1, a2, new Cesium.Cartesian3())

        Cesium.Cartesian3.multiplyByScalar(t3, 1, t3)
        hpr = CTMap.HeadingPitchRoll.fromDegrees(t3.x, t3.y, t3.z, hpr)

        // hpr = CTMap.HeadingPitchRoll.fromDegrees(-100.0, 30.0, 0.0, hpr);
        trs.translation = CTMap.Cartesian3.fromElements(0.0, 0.0, 0, translation)
        trs.rotation = CTMap.Quaternion.fromHeadingPitchRoll(hpr, rotation)

        return CTMap.Matrix4.fromTranslationRotationScale(trs, emitterModelMatrix)
      }
      var gravityScratch = new CTMap.Cartesian3()
      function applyGravity(p, dt) {
        var position = p.position
        Cesium.Cartesian3.normalize(position, gravityScratch)
        Cesium.Cartesian3.multiplyByScalar(gravityScratch, -1 * dt, gravityScratch)
        p.velocity = Cesium.Cartesian3.add(p.velocity, gravityScratch, p.velocity)
      }
      window.firecon.waterParticlePrimitive = viewer.scene.primitives.add(
        new Cesium.ParticleSystem({
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
          emitter: new Cesium.CircleEmitter(1),
          emitterModelMatrix: computeEmitterModelMatrix(endpoint),
          updateCallback: applyGravity
        })
      )
      viewer.scene.preUpdate.addEventListener(_this.update)
      _this.playAnimation()
    },
    setClock() {
      var times = window.firecon.modelEntity.position._property._times
      var start = times[0]
      start.secondsOfDay = start.secondsOfDay - 50
      var end = times[times.length - 1]
      viewer.clock.startTime = start
      viewer.clock.stopTime = end
      viewer.clock.currentTime = start
      viewer.clock.clockRange = CTMap.ClockRange.UNBOUNDED
      viewer.clock.multiplier = 7 // viewer.clock.multiplier / 2
      // viewer.flyTo(window.cesiumvariate.animation)
      viewer.clock.shouldAnimate = true
    },
    ticktimefun(clock) {
      // var position = window.firecon.pathentity.position.getValue(viewer.clock.currentTime)
      if (viewer.clock.currentTime.secondsOfDay >= viewer.clock.stopTime.secondsOfDay && this.tickpoint) {
        this.tickpoint = false
        this.water(this.endpoint)
      }
    },
    playAnimation() {
      var _this = this
      const i = setInterval(function () {
        if (window.firecon.particleSystem.emissionRate === 0) {
          viewer.scene.primitives.remove(window.firecon.particleSystem)
          _this.isstart = false
          clearInterval(i)
          const j = setInterval(function () {
            if (window.firecon.waterParticlePrimitive.emissionRate === 0) {
              viewer.scene.primitives.remove(window.firecon.waterParticlePrimitive)
              // viewer.entities.remove(window.firecon.lineentity)
              // viewer.entities.remove(window.firecon.pathentity)
              viewer.scene.preUpdate.addEventListener(_this.update)
              clearInterval(j)
            } else {
              window.firecon.waterParticlePrimitive.emissionRate -= 10
            }
          }, 100)
        } else {
          window.firecon.particleSystem.emissionRate -= 0.5
        }
      }, 100)
    },
    // 实时计算位置
    update(scene, time) {
      window.firecon.waterParticlePrimitive.modelMatrix = window.firecon.modelEntity.computeModelMatrix(time, new Cesium.Matrix4())
    }
  }
}
</script>

<style  lang="scss">
.fire {
  width: 100%;
  height: 100%;
  color: #fff;
  .fireTool {
    padding: 10px 0;
    .fireItem {
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
    .fireItemsel {
      color: #fff;
      background-color: #2383ac;
      border-color: #ffc107;
    }
  }
}
</style>
