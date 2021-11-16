<template>
  <div v-if="showdialog" class="fireRoute">
    <div class="fire-title">
      <div class="tit-label">火灾应急路线</div>
      <div class="tit-close">
        <i class="el-icon-close" @click="close"></i>
      </div>
    </div>
    <div class="fire-cen">
      <div class="fireItem" :class="isshow1 ? 'fireItemsel' : ''" @click="fireshow">火灾点</div>
      <div class="fireItem" :class="isshow2 ? 'fireItemsel' : ''" @click="fireRoute">逃灾路线</div>
      <div class="fireItem" :class="viewtype === '3' ? 'fireItemsel' : ''" @click="changeview(3)">第三人称</div>
      <div class="fireItem" :class="viewtype === '1' ? 'fireItemsel' : ''" @click="changeview(1)">第一人称</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'emergfireRoute',
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
      viewtype: '3'
    }
  },
  mounted() {},
  watch: {
    getNowMenuName(newV, oldV) {
      if (newV === 'emergfireRoute') {
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
      this.showdialog = false
      this.isshow1 = false
      this.isshow2 = false
      viewer.clock.shouldAnimate = false

      viewer.scene.primitives.remove(window.e_route.fireModel)
      window.e_route.fireModel = null
      
      if (window.e_route !== undefined) {
        if (window.e_route.fiteE) {
          viewer.scene.primitives.remove(window.e_route.fiteE)
          window.e_route.fiteE = null
        }
        if (window.e_route.fiteroute) {
          viewer.entities.remove(window.e_route.fiteroute)
          window.e_route.fiteroute = null
        }
        if (window.e_route.modelEntity) {
          viewer.entities.remove(window.e_route.modelEntity)
          window.e_route.modelEntity = null
          window.pop_position = null
        }
      }
    },
    succCallback() {
      var _this = this
      _this.point = { longitude: 112.7108292, latitude: 35.69518, height: -304.8428 }
      _this.polyline = [
        { longitude: 112.7108292, latitude: 35.69518, height: -304.8428 },
        { longitude: 112.7107317, latitude: 35.6949846, height: -308.1725 },
        { longitude: 112.7105318, latitude: 35.6945681, height: -313.185 },
        { longitude: 112.7101957, latitude: 35.6939195, height: -325.7606 },

        { longitude: 112.7100971, latitude: 35.693736, height: -330.338 },
        { longitude: 112.710005, latitude: 35.693539, height: -329.9675 },
        { longitude: 112.7099645, latitude: 35.6934588, height: -331.2666 },
        { longitude: 112.7094939, latitude: 35.6925453, height: -345.6278 },
        { longitude: 112.7089354, latitude: 35.691394, height: -345.5472 },
        { longitude: 112.7083987, latitude: 35.6903267, height: -336.748 },
        { longitude: 112.7083586, latitude: 35.6902516, height: -336.1945 },
        { longitude: 112.7077414, latitude: 35.6890116, height: -327.5936 },

        { longitude: 112.707481, latitude: 35.6885152, height: -324.4203 },
        { longitude: 112.7070284, latitude: 35.6876582, height: -320.6443 },
        { longitude: 112.7065221, latitude: 35.6866636, height: -319.9562 },
        { longitude: 112.7054782, latitude: 35.6845776, height: -320.9151 },
        { longitude: 112.7044007, latitude: 35.6824008, height: -331.4701 },
        { longitude: 112.7034027, latitude: 35.6804461, height: -336.7989 },
        { longitude: 112.7027219, latitude: 35.6790724, height: -335.8359 },
        { longitude: 112.702978, latitude: 35.6789809, height: -334.4832 },
        { longitude: 112.7032436, latitude: 35.6789193, height: -332.4746 },
        { longitude: 112.7032825, latitude: 35.6790179, height: -330.9346 },
        { longitude: 112.7033659, latitude: 35.67929, height: -330.8945 },
        { longitude: 112.7033858, latitude: 35.6793483, height: -330.8884 },
        { longitude: 112.7034209, latitude: 35.6794042, height: -329.9834 },
        { longitude: 112.7034378, latitude: 35.679482, height: -331.5909 },
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
    // 绘制灾害点

    // 绘制
    draw(type) {
      if (this.drawingflag) {
        return
      }
      this.drawingflag = true
      window.cesiumvariate.drawControl_f.startDraw({
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
    // 火灾
    fireshow() {
      let LineList=[112.7130880,35.6746824,-289.57,
        112.7135756,35.6752652,-290.27,
        112.7139419,35.6757108,-289.69,
        112.7140147,35.6757993,-289.57,
        112.7141260,35.6759317,-289.55,
        112.7143739,35.6762347,-293.08];
      let img = 'img/smoke2.png';
      window.e_route.fireModel = new CTMap.wasiEffects(viewer);
      window.e_route.fireModel.addWasi(LineList,img);
      

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
    fireRoute() {
      if (this.isshow2) {
        if (window.e_route.fiteroute) {
          viewer.entities.remove(window.e_route.fiteroute)
          window.e_route.fiteroute = null
        }
        if (window.e_route.modelEntity) {
          viewer.entities.remove(window.e_route.modelEntity)
          window.e_route.modelEntity = null
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
      const orientation = new CTMap.VelocityOrientationProperty(keyPos)

      for (var j = 0; j < polyline.length; j++) {
        var position = Cesium.Cartesian3.fromDegrees(polyline[j].longitude, polyline[j].latitude, polyline[j].height)

        const ctime = CTMap.JulianDate.addSeconds(_this.start, 1 + j * 3, new CTMap.JulianDate())
        keyPos.addSample(ctime, position)
        ptList.push(position)
      }
      let offset = 0
      window.e_route.fiteroute = viewer.entities.add({
        availability: new Cesium.TimeIntervalCollection([
          new Cesium.TimeInterval({
            start: _this.start,
            stop: _this.end,
            isStartIncluded: true,
            isStopIncluded: false
          })
        ]),
        position: keyPos,
        orientation: orientation,
        path: {
          show: true,
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
    },
    // 避险动画
    peopleAnimation(keyPos, orientation) {
      window.e_route.modelEntity = viewer.entities.add({
        position: keyPos,
        // show: false,
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
      if (window.e_route.modelEntity && window.e_route.modelEntity.orientation) {
        if (window.e_route.modelEntity.position.getValue(clock.currentTime) && clock._currentTime <= clock.stopTime) {
          var p1 = window.e_route.modelEntity.position.getValue(clock.currentTime)
          window.pop_position = p1
          var o1 = window.e_route.modelEntity.orientation.getValue(clock.currentTime)
          let transform = Cesium.Transforms.eastNorthUpToFixedFrame(p1)
          var heading = Cesium.Math.toRadians(90.0)
          var pitch = Cesium.Math.toRadians(-10.0)
          var range = 8.0
          if (o1 != null) {
            transform = Cesium.Matrix4.fromRotationTranslation(Cesium.Matrix3.fromQuaternion(o1), p1)
            if (this.viewtype === '3') {
              viewer.camera.lookAtTransform(transform, new Cesium.Cartesian3(-25, 0, 3))
            } else {
              viewer.camera.lookAtTransform(transform, new Cesium.Cartesian3(-0.000000000001, 0, 0))
            }
          }
        }
        if (clock._currentTime >= clock.stopTime) {
          viewer.clock.onTick.removeEventListener(_this.clockonTick)
          viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
        }
      }
    },
    changeview(type) {
      if (type === 3) {
        this.viewtype = '3'
      } else {
        this.viewtype = '1'
      }
    }
  }
}
</script>

<style  lang="scss">
.fireRoute {
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
  .fire-title {
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
  .fire-cen {
    width: 100%;
    height: calc(100% - 32px);
    position: inherit;
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
