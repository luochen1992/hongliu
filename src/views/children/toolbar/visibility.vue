<template>
  <div class="visibility">
    <div class="visibilityTool">
      <div class="visibilityItem" @click="visibility($event)">绘制</div>
      <div class="visibilityItem" @click="clearVisibility($event)">清除</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'visibility',
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
      if (newV === 'visibility') {
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
    // 显示
    show() {
      var _this = this
      if (!_this.dialogindex) {
        _this.dialogindex = window.layui.layer.open({
          type: 1,
          title: '通视分析',
          shade: 0,
          skin: 'cv_dialog',
          area: ['250px', '100px'],
          offset: ['200px', 'calc(100% - 340px)'],
          zIndex: 2001,
          content: $('.visibility'),
          success: function (layero, index) {
            _this.succCallback()
          },
          cancel: function (index, layero) {
            window.layui.layer.close(_this.dialogindex)
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
      if (window.cesiumvariate.drawLayer) {
        window.cesiumvariate.drawLayer.destroy()
        window.cesiumvariate.drawLayer = null
      }
    },
    succCallback() {
      var _this = this
      window.cesiumvariate.drawLayer = new window.Cesium.PrimitiveCollection()
      window.viewer.scene.primitives.add(window.cesiumvariate.drawLayer)
      window.cesiumvariate.drawControl =new CTMap.DrawTool(window.viewer, {
        hasEdit: false,
        // dragIcon: dragIcon,
        onStopDrawing: function (entity) {
          var values = entity.polyline._positions._value
          _this.sight(values[0], values[1])
          window.cesiumvariate.drawControl.removeAll()
        },
        onStartEditing: function (entity) {},
        onChangeEditing: function (entity) {},
        onStopEditing: function (entity) {}
      })
    },
    visibility() {
      var defLine = {
        edittype: 'polyline',
        name: '线',
        style: {
          clampToGround: false,
          color: '#3388ff',
          lineType: 'solid',
          opacity: 1,
          width: 4
        },
        position: {
          height: false,
          maxCount: 2
        },
        minMaxPoints: {
          min: 2,
          max: 2
        },
        type: 'polyline'
      }
      window.cesiumvariate.drawControl.startDraw(defLine)
    },
    /**
     * 射线通视分析
     * @param start  起点空间坐标
     * @param end  终点空间坐标
     */
    sight(startPoint, endPoint) {
      // 1. 优先用射线求交点
      const startLLH = this.cartesianToLonLatHeight(startPoint)
      const endLLH = this.cartesianToLonLatHeight(endPoint)
      const carS = window.Cesium.Cartesian3.fromDegrees(startLLH[0], startLLH[1], startLLH[2])
      const carE = window.Cesium.Cartesian3.fromDegrees(endLLH[0], endLLH[1], endLLH[2])
      const direction = window.Cesium.Cartesian3.normalize(window.Cesium.Cartesian3.subtract(carE, carS, new window.Cesium.Cartesian3()), new window.Cesium.Cartesian3())
      const ray = new window.Cesium.Ray(carS, direction)
      const result = window.viewer.scene.pickFromRay(ray)
      if (window.Cesium.defined(result) && window.Cesium.defined(result.object) && result.position) {
        // 有碰到东西，碰到第一个点之前的可视，之后的不可视
        const distanceEnd = window.Cesium.Cartesian3.distance(result.position, carE)
        if (distanceEnd > 1) {
          this.addPolylinePrimitive(carS, result.position, window.Cesium.Color.GREEN)
          this.addPolylinePrimitive(result.position, carE, window.Cesium.Color.RED)
        } else {
          this.addPolylinePrimitive(carS, carE, window.Cesium.Color.GREEN)
        }
      }
    },
    /**
     * 空间笛卡尔坐标转经纬度(角度制)
     * @param cartesian
     * @returns {*[经度，纬度，高度]}
     */
    cartesianToLonLatHeight(cartesian) {
      var cartographic = window.Cesium.Cartographic.fromCartesian(cartesian)
      var lon = window.Cesium.Math.toDegrees(cartographic.longitude)
      var lat = window.Cesium.Math.toDegrees(cartographic.latitude)
      return [lon, lat, cartographic.height]
    },
    addPolylinePrimitive(spoint, epoint, color, width) {
      if (!width) width = 2
      const polylinePrmitive = new window.Cesium.Primitive({
        geometryInstances: new window.Cesium.GeometryInstance({
          geometry: new window.Cesium.PolylineGeometry({
            positions: [spoint, epoint], // 坐标必须两个和两个以上
            width, // 线宽
            vertexFormat: window.Cesium.PolylineColorAppearance.VERTEX_FORMAT
          }),
          attributes: {
            color: window.Cesium.ColorGeometryInstanceAttribute.fromColor(color) // 绿色可见,红色不可见
          }
        }),
        appearance: new window.Cesium.PolylineColorAppearance({
          translucent: false
        })
      })

      window.cesiumvariate.drawLayer.add(polylinePrmitive)
    },
    clearVisibility() {
      window.cesiumvariate.drawControl.removeAll()
      if (window.cesiumvariate.drawLayer) {
        window.cesiumvariate.drawLayer.removeAll()
      }
    }
  }
}
</script>

<style  lang="scss">
.visibility {
  width: 98%;
  height: 100%;
  color: #fff;
  .visibilityTool {
    padding: 10px 0;
    .visibilityItem {
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
