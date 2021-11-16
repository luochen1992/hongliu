<template>
  <div v-if="showdialog" class="gasRoute">
    <div class="gas-title">
      <div class="tit-label">瓦斯应急路线</div>
      <div class="tit-close">
        <i class="el-icon-close" @click="close"></i>
      </div>
    </div>
    <div class="gas-cen">
      <div class="gasItem" :class="isshow1 ? 'gasItemsel' : ''" @click="gasshow">瓦斯泄露点</div>
      <div class="gasItem" :class="isshow2 ? 'gasItemsel' : ''" @click="gasRoute">逃灾路线</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'emerggasRoute',
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  data() {
    return {
      isshow: false,
      isshow1: false,
      isshow2: false,
      showdialog: false
    }
  },
  mounted() {},
  watch: {
    getNowMenuName(newV, oldV) {
      if (newV === 'emerggasRoute') {
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
      this.isshow1 = false
      this.isshow2 = false
      this.showdialog = false
      viewer.clock.shouldAnimate = false
      if (window.e_route !== undefined) {
        if (window.e_route.gasPs) {
          viewer.scene.primitives.remove(window.e_route.gasPs)
          window.e_route.gasPs = null
        }
        if (window.e_route.gasroute) {
          viewer.entities.remove(window.e_route.gasroute)
          window.e_route.gasroute = null
        }
        if (window.e_route.gasmodelEntity) {
          viewer.entities.remove(window.e_route.gasmodelEntity)
          window.e_route.gasmodelEntity = null
        }
      }
    },
    succCallback() {
      var _this = this
      _this.point = { longitude: 112.700725, latitude: 35.6981808, height: -367.4591 }
      _this.polyline = [
        { longitude: 112.700725, latitude: 35.6981808, height: -367.4591 },
        { longitude: 112.7004514, latitude: 35.6976457, height: -370.7586 },
        { longitude: 112.6996758, latitude: 35.6961207, height: -355.7794 },
        { longitude: 112.699496, latitude: 35.6957596, height: -355.6912 },
        { longitude: 112.69948, latitude: 35.6957372, height: -355.5749 },
        { longitude: 112.6993856, latitude: 35.6955414, height: -360.6355 },
        { longitude: 112.6991688, latitude: 35.6951474, height: -363.9277 },
        { longitude: 112.6991045, latitude: 35.6949557, height: -369.2594 },
        { longitude: 112.6988625, latitude: 35.6945002, height: -377.5366 },
        { longitude: 112.6983547, latitude: 35.6935137, height: -383.8357 },
        { longitude: 112.6980998, latitude: 35.6929951, height: -387.096 },
        { longitude: 112.6977666, latitude: 35.6923202, height: -387.7047 },
        { longitude: 112.6972179, latitude: 35.6912517, height: -391.5939 },
        { longitude: 112.6970814, latitude: 35.6909945, height: -392.7581 },
        { longitude: 112.6961572, latitude: 35.6891364, height: -405.5668 },
        { longitude: 112.695853, latitude: 35.6885608, height: -404.0868 },
        { longitude: 112.6956788, latitude: 35.6882002, height: -403.8393 },
        { longitude: 112.6955063, latitude: 35.6878438, height: -400.812 },
        { longitude: 112.6954365, latitude: 35.6876819, height: -397.9235 },
        { longitude: 112.6954036, latitude: 35.6876252, height: -398.1246 },
        { longitude: 112.6952516, latitude: 35.6873348, height: -390.4285 },
        { longitude: 112.6951406, latitude: 35.6871439, height: -386.8303 },
        { longitude: 112.6951045, latitude: 35.6870778, height: -386.6795 },
        { longitude: 112.6950941, latitude: 35.6870535, height: -385.7563 },
        { longitude: 112.6950062, latitude: 35.6868737, height: -383.6594 },
        { longitude: 112.6948713, latitude: 35.6866018, height: -381.4289 },
        { longitude: 112.6944342, latitude: 35.6857551, height: -370.8057 },
        { longitude: 112.6943748, latitude: 35.6856204, height: -367.2464 },
        { longitude: 112.6943231, latitude: 35.6855409, height: -367.5949 },
        { longitude: 112.6939833, latitude: 35.6848497, height: -369.0326 },
        { longitude: 112.6936923, latitude: 35.6842827, height: -370.3196 },
        { longitude: 112.6936293, latitude: 35.6841564, height: -370.4679 },

        { longitude: 112.6936054, latitude: 35.6841298, height: -370.6252 },
        { longitude: 112.6934589, latitude: 35.6838455, height: -371.6623 },
        { longitude: 112.6932307, latitude: 35.6833628, height: -375.0407 },
        { longitude: 112.6928867, latitude: 35.6827082, height: -380.666 },
        { longitude: 112.6927685, latitude: 35.6824022, height: -386.8435 },
        { longitude: 112.6928644, latitude: 35.6823927, height: -386.9473 },
        { longitude: 112.6928975, latitude: 35.6818772, height: -385.4178 },
        { longitude: 112.6929096, latitude: 35.6818485, height: -381.7187 },

        { longitude: 112.6929017, latitude: 35.6818165, height: -381.6432 },

        { longitude: 112.694521, latitude: 35.6814432, height: -381.0368 },
        { longitude: 112.6958472, latitude: 35.6811333, height: -377.0551 },
        { longitude: 112.6968149, latitude: 35.6809053, height: -374.8483 },
        { longitude: 112.6981536, latitude: 35.6806605, height: -375.8804 },
        { longitude: 112.6990976, latitude: 35.6804564, height: -369.2482 },
        { longitude: 112.7000262, latitude: 35.6802561, height: -357.2476 },
        { longitude: 112.7017564, latitude: 35.6798803, height: -337.5859 },
        { longitude: 112.7028302, latitude: 35.6796221, height: -334.0836 },
        { longitude: 112.7029183, latitude: 35.679433, height: -333.979 },
        { longitude: 112.7033827, latitude: 35.6793251, height: -330.8468 },
        { longitude: 112.7033928, latitude: 35.6793464, height: -331.3005 },
        { longitude: 112.7034007, latitude: 35.6793941, height: -330.2026 },
        { longitude: 112.7034162, latitude: 35.679464, height: -332.0173 },
        { longitude: 112.7034404, latitude: 35.6794973, height: -332.0947 },

        { longitude: 112.7052521, latitude: 35.6791071, height: -333.6503 },
        { longitude: 112.7057055, latitude: 35.6790078, height: -325.2326 },
        { longitude: 112.7074107, latitude: 35.6786342, height: -317.2294 },
        { longitude: 112.7081901, latitude: 35.678465, height: -312.9999 },
        { longitude: 112.7100018, latitude: 35.6780659, height: -295.8632 },
        { longitude: 112.7113151, latitude: 35.6777839, height: -289.8966 },
        { longitude: 112.7117378, latitude: 35.6776827, height: -287.8127 },
        { longitude: 112.7118477, latitude: 35.6776827, height: -287.5944 },
        { longitude: 112.71467, latitude: 35.6770699, height: -277.1478 },
        { longitude: 112.7156803, latitude: 35.6768467, height: -266.5502 },
        { longitude: 112.7161921, latitude: 35.6767265, height: -248.0544 },
        { longitude: 112.716297, latitude: 35.6767021, height: -246.7608 },
        { longitude: 112.7184143, latitude: 35.6762562, height: -236.389 },
        { longitude: 112.7204159, latitude: 35.675839, height: -222.0712 },
        { longitude: 112.7208118, latitude: 35.6757327, height: -221.1373 },
        { longitude: 112.7265633, latitude: 35.674259, height: -1.4658 }
      ]
      _this.end = CTMap.JulianDate.fromDate(new Date())
      _this.start = CTMap.JulianDate.addSeconds(_this.end, -(2 + _this.polyline.length * 3), new CTMap.JulianDate())
    },
    // 水灾
    gasshow() {
      if (this.isshow1) {
        if (window.e_route.gasPs) {
          viewer.scene.primitives.remove(window.e_route.gasPs)
          window.e_route.gasPs = null
        }
        this.isshow1 = false
        return
      }
      let LineList=[112.7130880,35.6746824,-289.57,
        112.7135756,35.6752652,-290.27,
        112.7139419,35.6757108,-289.69,
        112.7140147,35.6757993,-289.57,
        112.7141260,35.6759317,-289.55,
        112.7143739,35.6762347,-293.08];
      let img = 'img/cloud10.png';
      window.e_route.gasPs = new CTMap.wasiEffects(viewer);
      window.e_route.gasPs.addWasi(LineList,img);
      

     //112.7130880,35.6746824,-289.57
      //定位飞行
      window.viewer.camera.flyTo({
        destination: window.Cesium.Cartesian3.fromDegrees(112.7130880,35.6746824,-178.57), // 经度、纬度、高度
        orientation: {
          heading: window.Cesium.Math.toRadians(0), // 绕垂直于地心的轴旋转
          pitch: window.Cesium.Math.toRadians(-90), // 绕纬度线旋转
          roll: 0 // 绕经度线旋转
        },
        duration: 1 // 飞行到目的地花费时间3秒
      })
    },
    
    // 逃灾路线
    gasRoute() {
      if (this.isshow2) {
        if (window.e_route.gasroute) {
          viewer.entities.remove(window.e_route.gasroute)
          window.e_route.gasroute = null
        }
        if (window.e_route.gasmodelEntity) {
          viewer.entities.remove(window.e_route.gasmodelEntity)
          window.e_route.gasmodelEntity = null
          window.pop_position = null
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
      let orientation = new CTMap.VelocityOrientationProperty(keyPos)

      for (var j = 0; j < polyline.length; j++) {
        var position = Cesium.Cartesian3.fromDegrees(polyline[j].longitude, polyline[j].latitude, polyline[j].height)

        let ctime = CTMap.JulianDate.addSeconds(_this.start, 1 + j * 3, new CTMap.JulianDate())
        keyPos.addSample(ctime, position)
        ptList.push(position)
      }
      let offset = 0
      window.e_route.gasroute = viewer.entities.add({
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
          show: true,
          leadTime: 2 + polyline.length * 2,
          trailTime: 2 + polyline.length * 2,
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
      window.e_route.gasmodelEntity = viewer.entities.add({
        position: keyPos,
        orientation: orientation,
        model: {
          uri: 'data/矿工2/duizhang01.gltf',
          minimumPixelSize: 64
        }
      })
      viewer.clock.onTick.addEventListener(this.clockonTick)
      viewer.clock.clockRange = CTMap.ClockRange.UNBOUNDED // CLAMPED
      viewer.clock.currentTime = this.start
    },
    clockonTick(clock) {
      var _this = this
      if (window.e_route.gasmodelEntity && window.e_route.gasmodelEntity.orientation) {
        if (window.e_route.gasmodelEntity.position.getValue(clock.currentTime) && clock._currentTime <= clock.stopTime) {
          var p1 = window.e_route.gasmodelEntity.position.getValue(clock.currentTime)
          window.pop_position = p1
          var o1 = window.e_route.gasmodelEntity.orientation.getValue(clock.currentTime)
          let transform = Cesium.Transforms.eastNorthUpToFixedFrame(p1)
          var heading = Cesium.Math.toRadians(90.0)
          var pitch = Cesium.Math.toRadians(-10.0)
          var range = 8.0
          if (o1 != null) {
            transform = Cesium.Matrix4.fromRotationTranslation(Cesium.Matrix3.fromQuaternion(o1), p1)
            viewer.camera.lookAtTransform(transform, new Cesium.Cartesian3(-25, 0, 3))
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
.gasRoute {
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
  .gas-title {
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
  .gas-cen {
    width: 100%;
    height: calc(100% - 32px);
    position: inherit;
    .gasItem {
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
    .gasItemsel {
       color: #fff;
      background-color: #2383ac;
      border-color: #ffc107;
    }
  }
}
</style>
