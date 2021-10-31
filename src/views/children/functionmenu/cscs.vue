<template>
  <div class="cscs">
    <div class="measureTool">
      <div class="measureItem" @click="addToolbarButton($event)">开始分析</div>
      <div class="measureItem" @click="setcolor($event)">设置颜色</div>
      <div class="measureItem" @click="setwidthadd($event)">宽度++</div>
      <div class="measureItem" @click="setwidthreduce($event)">宽度--</div>
      <div class="measureItem" @click="setspaceadd($event)">等高距++</div>
      <div class="measureItem" @click="setspacereduce($event)">等高距--</div>
      <div class="measureItem" @click="clearanaly($event)">停止分析</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'cscs',
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
      if (newV === 'fun1') {
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
          title: '等高线分析',
          shade: 0,
          skin: 'cv_dialog',
          area: ['250px', 'auto'],
          offset: ['200px', 'calc(100% - 340px)'],
          zIndex: 2001,
          content: $('.cscs'),
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

      window.cesiumvariate.contour = window.viewer.analysis.contour
      window.cesiumvariate.contour.color = Cesium.Color.WHITE
      window.cesiumvariate.contour.width = 2
      window.cesiumvariate.contour.spacing = 10
      window.viewer.camera.flyTo({
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
        let ptList = Cesium.Cartesian3.fromDegreesArrayHeights(p1)
        ptList.push(ptList[0])

        window.viewer.entities.add({
          polyline: {
            positions: ptList,
            clampToGround: true,
            width: 3
          }
        })
        window.cesiumvariate.contour.setPolygon(p1)
        window.cesiumvariate.contour.open()
        window.viewer.clearGraphic()
      }
    },

    setcolor() {
      window.cesiumvariate.contour.color = Cesium.Color.fromRandom()
    },
    setwidthadd() {
      window.cesiumvariate.contour.width += 2
    },
    setwidthreduce() {
      window.cesiumvariate.contour.width -= 2
    },
    setspaceadd() {
      window.cesiumvariate.contour.spacing += 2
    },
    setspacereduce() {
      window.cesiumvariate.contour.spacing -= 2
    },
    clearanaly() {
      window.viewer.scene.globe.material = undefined
      viewer.entities.removeAll()
    }
  }
}
</script>

<style  lang="scss">
.cscs {
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
