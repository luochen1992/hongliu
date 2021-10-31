<template>
  <div class="measure">
    <div class="measureTool">
      <div class="btn-group">
        <div id="btn_measure_length" class="tool-btn" @click="measurelength($event)">
          <div class="tool-thum" style="background:#dd751b">
            <img src="img/measure/measure-length.png" alt="空间距离">
          </div>
            <span class="btn_none">空间距离</span>
        </div>
        <!-- <div id="btn_measure_length_td" class="tool-btn" @click="updateLengthForTerrain($event)">
          <div class="tool-thum" style="background:#c092fe">
            <img src="img/measure/measure-length2.png" alt="地表距离">
          </div>
          <span class="btn_none">地表距离</span>
        </div> -->
        <div id="btn_measure_section" class="tool-btn" @click="measureAreaSpace($event)">
          <div class="tool-thum" style="background:#88b8ff">
            <img src="img/measure/measure-section.png" alt="空间面积">
          </div>
          <span class="btn_none">空间面积</span>
        </div>
        <div id="btn_measure_height" class="tool-btn" @click="showSuperHeight($event)">
          <div class="tool-thum" style="background:#55d5a0">
            <img src="img/measure/measure-height.png" alt="高度差">
          </div>
          <span class="btn_none">高度差</span>
        </div>
        <div id="btn_measure_supHeight" class="tool-btn" @click="measureTriangle($event)">
          <div class="tool-thum" style="background:#37bc41">
            <img src="img/measure/measure-height-sup.png" alt="三角测量">
          </div>
          <span class="btn_none">三角测量</span>
        </div>
        <div id="btn_measure_point" class="tool-btn" @click="clearMeasure($event)">
          <div class="tool-thum" style="background:#babc31">
            <img src="img/measure/clear.png" alt="清除">
          </div>
          <span class="btn_none">清除</span>
        </div>
      </div>
      <!--<div class="measureItem" @click="getMousePositon($event)">点取坐标</div>
      <div class="measureItem" @click="measurelength($event)">空间距离</div>
      <div class="measureItem" @click="updateLengthForTerrain($event)">地表距离</div>
      <div class="measureItem" @click="measureAreaSpace($event)">地表面积</div>
      <div class="measureItem" @click="showSuperHeight($event)">高度差</div>
      <div class="measureItem" @click="measureTriangle($event)">三角量测</div>
      <div class="measureItem" @click="clearMeasure($event)">清除</div>-->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'measure',
  computed: {
    ...mapGetters(['getToolBar'])
  },
  data() {
    return {
      dialogindex: null
    }
  },
  mounted() {},
  watch: {
    getToolBar(newV, oldV) {
      if (newV === 'measure') {
        this.show()
      } else {
        this.hide()
      }
    }
  },
  methods: {
    ...mapMutations({
      setToolBar: 'setToolBar'
    }),
    measurelength(e) {
      window.cesiumvariate.meatureControl.measuerLength({
        terrain: false
      })
    },
    measureAreaSpace(e) {
      window.cesiumvariate.meatureControl.measureArea()
    },
    updateLengthForTerrain(e) {
      window.cesiumvariate.meatureControl.measuerLength({
        terrain: true
      })
    },
    showSuperHeight(e) {
      window.cesiumvariate.meatureControl.measureHeight()
    },
    measureTriangle(e) {
      window.cesiumvariate.meatureControl.measureTriangle()
    },
    clearMeasure(e) {
      window.cesiumvariate.meatureControl.clearMeasure()
      viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
    },
    // 显示
    show() {
      var _this = this
      if (!_this.dialogindex) {
        _this.dialogindex = window.layui.layer.open({
          type: 1,
          title: '量算工具',
          shade: 0,
          skin: 'cv_dialog',
          area: ['308px', 'auto'],
          offset: ['200px', 'calc(100% - 340px)'],
          zIndex: 2001,
          content: $('.measure'),
          success: function (layero, index) {
            _this.succCallback()
          },
          cancel: function (index, layero) {
            _this.setToolBar(null)
            _this.dialogindex = null
          }
        })
      }
    },
    // 隐藏
    hide() {
      window.layui.layer.close(this.dialogindex)
      this.dialogindex = null
      if (window.cesiumvariate.meatureControl) {
        window.cesiumvariate.meatureControl.clearMeasure()
        // viewer.scene.primitives.removeAll()
        window.cesiumvariate.meatureControl = null
      }
    },
    succCallback() {
      this.addMeatureFun()
    },
    addMeatureFun() {
      window.cesiumvariate.meatureControl = new CTMap.Measure(window.viewer)
    },
    getMousePositon($event) {
      this.clearMeasure()
      var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
      handler.setInputAction(function (movement) {
        var cartesian3 = viewer.scene.pickPosition(movement.position)
        var scene = viewer.scene
        var ellipsoid = scene.globe.ellipsoid
        // var cartesian3=new Cesium.cartesian3(x,y,z);
        var cartographic = ellipsoid.cartesianToCartographic(cartesian3)
        var lat = Cesium.Math.toDegrees(cartographic.latitude)
        var lng = Cesium.Math.toDegrees(cartographic.longitude)
        var alt = cartographic.height
        alert(lng + ',' + lat + ',' + alt)
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
    }
  }
}
</script>

<style  lang="scss">
.measure {
  width: 100%;
  height: 100%;
  color: #fff;
  .measureTool {
    padding: 10px 0;
    .measureItem {
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
      background-color: rgba(32, 160, 255, 0.2);
    }
  }
  .btn-group {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    padding-left: 20px;
  }
  .tool-btn {
    cursor: pointer;
    user-select: none;
    min-width: 60px;
    height: 96px;
    box-sizing: border-box;
    margin: 0 30px 10px 0;
    text-align: center;
    padding-top: 12px;
  }
.tool-thum {
    transition: all .2s ease;
    width: 50px;
    height: 50px;
    margin: 0 auto;
    border-radius: 50%;
    margin-bottom: 10px;
    background: #fd960f;
    cursor: pointer;
  }
  .tool-thum img {
    width: 24px;
    height: 24px;
    margin: 13px;
  }
.btn_none {
    background: 0 0;
    color: #fff;
  }
}
</style>
