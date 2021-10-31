<template>
  <div class="toolBar">
    <li @click="undergroundMode" title="地下模式">
      <i class="iconfont icon-iconfonttubiao_rizhao"></i>
    </li>
    <!--<li @click="showzhuangtai" title="状态栏">
      <i class="iconfont icon-zhuangtai"></i>
    </li>-->
    <li @click="showKeyboard" title="键盘模式">
      <i class="iconfont icon-zhuangtai"></i>
      <keyboard v-show="keyboardflag > 1" :isKeyboard="keyboardflag"></keyboard>
    </li>
    <li @click="flyroute" title="飞行漫游">
      <i class="iconfont icon-icon-feixingmanyou"></i>
    </li>
    <li @click="showTree" title="图层列表">
      <i class="iconfont icon-tucengliebiao"></i>
    </li>
    <li @click="clickinfo" title="信息查看">
      <i class="iconfont icon-dianchaxun"></i>
      <clickinfo :queryflag="queryflag"></clickinfo>
    </li>
    <li @click="showMeasure" title="图上量算">
      <i class="iconfont icon-liangce"></i>
    </li>
    <li @click="showOverlay" title="标注">
      <i class="iconfont icon-biaozhu1"></i>
    </li>
    <li @click="showTags" title="书签">
      <i class="iconfont icon-shuqian"></i>
    </li>
    <!--<li @click="showVisibility" title="通视分析">
      <i class="iconfont icon-iconfonttubiao_tongshifenxi"></i>
    </li>-->
    <!--<li @click="showSunlight" title="日照分析">
      <i class="iconfont icon-iconfonttubiao_rizhao"></i>
    </li>-->
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Clickinfo from '../children/toolbar/clickinfo.vue'
import Keyboard from '../children/toolbar/Keyboard.vue'
export default {
  components: { Keyboard, Clickinfo },
  name: 'toolBar',
  computed: {
    ...mapGetters(['getToolBar'])
  },
  data() {
    return {
      g_undergroundMode: false,
      normalController: true,
      g_preState: {
        sun: true,
        moon: true,
        skyBox: true,
        skyAtmosphere: true,
        undergroundMode: false,
        globe: true,
        baseColor: new Cesium.Color(0, 0, 0, 0),
        backgroundcolor: new Cesium.Color(0, 0, 0, 0),
        minimumZoomDistance: -1000,
        maximumZoomDistance: 22000000,
        _minimumZoomRate: 10,
        _maximumZoomRate: 5906376272000,
        pickPositionSupported: false,
        _minimumUndergroundPickDistance: -1000.0,
        _maximumUndergroundPickDistance: 3000.0,
        near: 0.0001,
        _zoomFactor: 0.5,
        _maximumRotateRate: 1.77,
        _minimumRotateRate: 1.0 / 5000.0
      },
      data: [],
      keyboardflag: 1,
      queryflag: 1
    }
  },
  mounted() {},
  watch: {},
  methods: {
    ...mapMutations({
      setToolBar: 'setToolBar'
    }),
    // 显示图层列表
    showTree() {
      this.setToolBar('layertree')
    },
    // 信息查看
    clickinfo() {
      this.queryflag = 3 - this.queryflag
    },
    flyroute() {
      this.setToolBar('flyroute')
    },
    // 量测按钮点击
    showMeasure() {
      this.setToolBar('measure')
    },
    // 标注
    showOverlay() {
      this.setToolBar('overlay')
    },
    // 书签
    showTags() {
      this.setToolBar('tags')
    },
    // 通视分析
    showVisibility() {
      this.setToolBar('visibility')
    },
    showSunlight() {
      this.setToolBar('sunlight')
    },
    // 状态栏
    showzhuangtai() {
      if (window.cesiumvariate.mousePosition) {
        window.cesiumvariate.mousePosition.show = !window.cesiumvariate.mousePosition.show
      } else {
        window.cesiumvariate.mousePosition = window.viewer.navigation.mousePosition
      }
    },
    // 键盘模式
    showKeyboard() {
      this.keyboardflag = 3 - this.keyboardflag
    },
    undergroundMode() {
      if (this.g_undergroundMode) {
        this.g_undergroundMode = !this.g_undergroundMode
        this.resetPreState()
        return
      }
      var polygon = viewer.entities.add({
        polygon: {
          hierarchy: {
            positions: [
              Cesium.Cartesian3.fromDegrees(112.5, 35.5, -500),
              Cesium.Cartesian3.fromDegrees(112.9, 35.5, -500),
              Cesium.Cartesian3.fromDegrees(112.9, 35.8, -500),
              Cesium.Cartesian3.fromDegrees(112.5, 35.8, -500)
            ]
          },
          perPositionHeight: true,
          outline: true,
          material: Cesium.Color.BLACK,
          outlineColor: Cesium.Color.BLACK.withAlpha(0.5)
        }
      })
      this.g_undergroundMode = !this.g_undergroundMode
      this.savePreState()

      window.viewer.scene.sun.show = false
      window.viewer.scene.moon.show = false
      window.viewer.scene.skyBox.show = false
      window.viewer.scene.skyAtmosphere.show = false
      // window.viewer.scene.fxaa = true;
      window.viewer.scene.undergroundMode = true // 重要，开启地下模式，设置基色透明，这样就看不见黑色地球了
      window.viewer.scene.globe.show = false // 不显示地球，这条和地球透明度选一个就可以
      window.viewer.scene.globe.baseColor = new Cesium.Color(0, 0, 0, 0)
      window.viewer.scene.backgroundcolor = new Cesium.Color(0, 0, 0, 0)
      // window.viewer.scene.globe.depthTestAgainstTerrain = false;
      // window.viewer.scene.highDynamicRange = false;
      window.viewer.scene.screenSpaceCameraController.minimumZoomDistance = -10 // 相机的高度的最小值
      // window.viewer.scene.pickPositionSupported=true;
      window.viewer.camera.near = 0.0001
      window.viewer.scene.screenSpaceCameraController._zoomFactor = 5 // 默认5，缩放速度

      this.normalController = false
    },
    savePreState() {
      this.g_preState.sun = window.viewer.scene.sun.show
      this.g_preState.moon = window.viewer.scene.moon.show
      this.g_preState.skyBox = window.viewer.scene.skyBox.show
      this.g_preState.skyAtmosphere = window.viewer.scene.skyAtmosphere.show
      this.g_preState.undergroundMode = window.viewer.scene.undergroundMode
      this.g_preState.globe = window.viewer.scene.globe.show
      this.g_preState.baseColor = window.viewer.scene.globe.baseColor
      this.g_preState.backgroundcolor = window.viewer.scene.backgroundcolor
      this.g_preState.minimumZoomDistance = window.viewer.scene.screenSpaceCameraController.minimumZoomDistance
      this.g_preState.maximumZoomDistance = window.viewer.scene.screenSpaceCameraController.maximumZoomDistance
      this.g_preState._minimumZoomRate = window.viewer.scene.screenSpaceCameraController._minimumZoomRate
      this.g_preState._maximumZoomRate = window.viewer.scene.screenSpaceCameraController._maximumZoomRate
      // this.g_preState.pickPositionSupported = window.viewer.scene.pickPositionSupported;
      this.g_preState._minimumUndergroundPickDistance = window.viewer.scene.screenSpaceCameraController._minimumUndergroundPickDistance
      this.g_preState._maximumUndergroundPickDistance = window.viewer.scene.screenSpaceCameraController._maximumUndergroundPickDistance
      this.g_preState.near = window.viewer.camera.near
      this.g_preState._zoomFactor = window.viewer.scene.screenSpaceCameraController._zoomFactor
      this.g_preState._maximumRotateRate = window.viewer.scene.screenSpaceCameraController._maximumRotateRate
      this.g_preState._minimumRotateRate = window.viewer.scene.screenSpaceCameraController._minimumRotateRate
    },

    resetPreState() {
      window.viewer.scene.sun.show = this.g_preState.sun
      window.viewer.scene.moon.show = this.g_preState.moon
      window.viewer.scene.skyBox.show = this.g_preState.skyBox
      window.viewer.scene.skyAtmosphere.show = this.g_preState.skyAtmosphere
      window.viewer.scene.undergroundMode = this.g_preState.undergroundMode
      window.viewer.scene.globe.show = this.g_preState.globe
      window.viewer.scene.globe.baseColor = this.g_preState.baseColor
      window.viewer.scene.backgroundcolor = this.g_preState.backgroundcolor
      window.viewer.scene.screenSpaceCameraController.minimumZoomDistance = this.g_preState.minimumZoomDistance
      window.viewer.scene.screenSpaceCameraController.maximumZoomDistance = this.g_preState.maximumZoomDistance
      window.viewer.scene.screenSpaceCameraController._minimumZoomRate = this.g_preState._minimumZoomRate
      window.viewer.scene.screenSpaceCameraController._maximumZoomRate = this.g_preState._maximumZoomRate
      // window.viewer.scene.pickPositionSupported = this.g_preState.pickPositionSupported;
      window.viewer.scene.screenSpaceCameraController._minimumUndergroundPickDistance = this.g_preState._minimumUndergroundPickDistance
      window.viewer.scene.screenSpaceCameraController._maximumUndergroundPickDistance = this.g_preState._maximumUndergroundPickDistance
      window.viewer.camera.near = this.g_preState.near
      window.viewer.scene.screenSpaceCameraController._zoomFactor = this.g_preState._zoomFactor
      window.viewer.scene.screenSpaceCameraController._maximumRotateRate = this.g_preState._maximumRotateRate
      window.viewer.scene.screenSpaceCameraController._minimumRotateRate = this.g_preState._minimumRotateRate
    }
  }
}
</script>

<style  lang="scss">
.toolBar {
  position: absolute;
  top: 55px;
  right: 5px;
  width: 360px;
  height: 60px;
  color: #ffffff;
  padding: 0px 0px 0 28px;
  z-index: 1001;
  display: none;
  background: url(../../assets/images/right_menu.png);
  li {
    float: left;
    width: 32px;
    height: 32px;
    border: none;
    line-height: 32px;
    font-size: 18px;
    color: #080808;
    text-align: center;
    /* margin-bottom: 10px; */
    cursor: pointer;
    /* margin-left: 10px; */
    margin: 19px 5px;
  }
  #toolBar > li:hover {
    cursor: pointer;
    background-color: aliceblue;
  }
  .toolBar img {
    width: 36px;
    height: 36px;
    color: #fff;
    font-size: 28px;
    font-weight: 600;
    float: left;
    margin-top: 19px;
  }
}
</style>
