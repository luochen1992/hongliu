<template>
  <div class="elevation">
    <div class="measureTool">
      <div class="measureItem" @click="addToolbarButton($event)">开始分析</div>
      <div class="measureItem" @click="clearanaly($event)">停止分析</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'elevation',
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  data() {
    return {
      isshow: false,
      dialogindex: null
    }
  },
  mounted() {},
  watch: {
    getNowMenuName(newV, oldV) {
      if (newV === 'elevation') {
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
          title: '高程渲染',
          shade: 0,
          skin: 'cv_dialog',
          area: ['250px', 'auto'],
          offset: ['200px', 'calc(100% - 340px)'],
          zIndex: 2001,
          content: $('.elevation'),
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

        window.cesiumvariate.elevation = window.viewer.analysis.elevation
        window.cesiumvariate.elevation.minimumHeight = minHeight
        window.cesiumvariate.elevation.maximumHeight = maxHeight

        var elevationRamp = [0.0, 0.045, 0.1, 0.15, 0.37, 0.54, 1.0]
        window.cesiumvariate.elevation.colorRamp.set(elevationRamp[0], '#000000') // black
        window.cesiumvariate.elevation.colorRamp.set(elevationRamp[1], '#2747E0') // blue
        window.cesiumvariate.elevation.colorRamp.set(elevationRamp[2], '#D33B7D') // pink
        window.cesiumvariate.elevation.colorRamp.set(elevationRamp[3], '#D33038') // red
        window.cesiumvariate.elevation.colorRamp.set(elevationRamp[4], '#FF9742') // orange
        window.cesiumvariate.elevation.colorRamp.set(elevationRamp[5], '#ffd700') // yellow
        window.cesiumvariate.elevation.colorRamp.set(elevationRamp[6], '#ffffff') // white

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
        const ptList = Cesium.Cartesian3.fromDegreesArrayHeights(p1)
        ptList.push(ptList[0])

        window.viewer.entities.add({
            polyline: {
                positions: ptList,
                clampToGround: true,
                width: 3
            }
        })
        window.cesiumvariate.elevation.setPolygon(p1)
        window.cesiumvariate.elevation.open()
        viewer.clearGraphic()
      }
    },

    clearanaly() {
      window.viewer.scene.globe.material = undefined
      window.viewer.entities.removeAll()
    }

  }
}
</script>

<style  lang="scss">
.elevation {
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
