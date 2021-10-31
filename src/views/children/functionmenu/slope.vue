<template>
  <div class="slope">
    <div class="measureTool">
      <div class="measureItem" @click="addToolbarButton($event)">开始分析</div>
      <div class="measureItem" @click="clearanaly($event)">停止分析</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'slope',
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  data() {
    return {
      dialogindex: null
    }
  },
  mounted() {},
  watch: {
    getNowMenuName(newV, oldV) {
      if (newV === 'slope') {
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
      if (!_this.dialogindex) {
        _this.dialogindex = window.layui.layer.open({
          type: 1,
          title: '坡度分析',
          shade: 0,
          skin: 'cv_dialog',
          area: ['250px', 'auto'],
          offset: ['200px', 'calc(100% - 340px)'],
          zIndex: 2001,
          content: $('.slope'),
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
    },
    succCallback() {
      window.viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
          url: './SampleData/terrain_L11/'
      })
      window.viewer.scene.globe.depthTestAgainstTerrain = true

      var scene = window.viewer.scene
      var center = [-1136550.7143207944, 5368176.604343416, 3254552.2249880456]
      var orientantion = [5.329705527440996, -0.49556751102864816, 6.280446994760659]

        var minHeight = 1800.0 // approximate dead sea elevation
        var maxHeight = 3920.0 // approximate everest elevation

        window.cesiumvariate.slopeAnayze = window.viewer.analysis.slope
        var slopeRamp = [0.0, 0.29, 0.5, Math.sqrt(2) / 2, 0.87, 0.91, 1.0]
        window.cesiumvariate.slopeAnayze.colorRamp.set(slopeRamp[0], '#000000') // black
        window.cesiumvariate.slopeAnayze.colorRamp.set(slopeRamp[1], '#2747E0') // blue
        window.cesiumvariate.slopeAnayze.colorRamp.set(slopeRamp[2], '#D33B7D') // pink
        window.cesiumvariate.slopeAnayze.colorRamp.set(slopeRamp[3], '#D33038') // red
        window.cesiumvariate.slopeAnayze.colorRamp.set(slopeRamp[4], '#FF9742') // orange
        window.cesiumvariate.slopeAnayze.colorRamp.set(slopeRamp[5], '#ffd700') // yellow
        window.cesiumvariate.slopeAnayze.colorRamp.set(slopeRamp[6], '#ffffff') // white

        viewer.camera.flyTo({
            destination: new Cesium.Cartesian3(center[0], center[1], center[2]),
            orientation: {
                heading: orientantion[0],
                pitch: orientantion[1],
                roll: orientantion[2]
            }
        })
    },
    addToolbarButton() {
      var t = this
       window.viewer.trackPolygon(startContour)
      function startContour(p1) {
        window.cesiumvariate.slopeAnayze.setPolygon(p1)
        window.cesiumvariate.slopeAnayze.open()
        viewer.clearGraphic()
      }
    },

    clearanaly() {
      window.cesiumvariate.slopeAnayze.close()
      window.viewer.entities.removeAll()
    }

  }
}
</script>

<style  lang="scss">
.slope {
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
}
</style>
