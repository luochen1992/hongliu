<template>
  <div class="overlay">
    <div class="overlayTool">
      <div class="overlayItem" @click="drawPoint()">绘点</div>
      <div class="overlayItem" @click="drawLine()">绘线</div>
      <div class="overlayItem" @click="drawLine_TD()">绘贴地线</div>
      <div class="overlayItem" @click="drawLine_DH()">绘动画线</div>
      <div class="overlayItem" @click="drawPolygon()">绘面</div>
      <div class="overlayItem" @click="drawPolygon_TD()">绘贴地面</div>
      <div class="overlayItem" @click="clear()">清除</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'overlay',
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
      if (newV === 'overlay') {
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
          title: '标注',
          shade: 0,
          skin: 'cv_dialog',
          area: ['250px', 'auto'],
          offset: ['200px', 'calc(100% - 340px)'],
          zIndex: 2001,
          content: $('.overlay'),
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
      if (window.cesiumvariate.drawControl) {
        window.cesiumvariate.drawControl.removeAll()
        window.cesiumvariate.drawControl = null
      }
    },
    succCallback() {
      this.addDrawFun()
    },
    // 添加绘制事件
    addDrawFun(e) {
      window.cesiumvariate.drawControl = new CTMap.DrawTool(window.viewer, {
        hasEdit: true,
        // dragIcon: dragIcon,
        onStopDrawing: function (entity) {
          console.log('onStopDrawing')
        },
        onStartEditing: function (entity) {},
        onChangeEditing: function (entity) {},
        onStopEditing: function (entity) {}
      })
    },
    // 画点
    drawPoint() {
      var defPoint = {
        edittype: 'imagepoint',
        style: {
          image: 'img/marker/point.png',
          opacity: 1,
          rotation: 0,
          scale: 1
        },
        type: 'billboard'
      }
      window.cesiumvariate.drawControl.startDraw(defPoint)
      //  drawControl.hasEdit(true);
    },
    // 画线
    drawLine() {
      var defLine = {
        edittype: 'polyline',
        name: '线',
        style: {
          clampToGround: false,
          color: '#3388ff',
          lineType: 'solid',
          opacity: 1,
          outline: false,
          outlineColor: '#ffffff',
          outlineWidth: 2,
          width: 4
        },
        position: {
          height: false,
          minCount: 2
        },
        type: 'polyline'
      }
      window.cesiumvariate.drawControl.startDraw(defLine)
      //  drawControl.hasEdit(true);
    },
    // 贴地线
    drawLine_TD() {
      var defLine = {
        edittype: 'polyline',
        name: '线',
        style: {
          clampToGround: true,
          color: '#3388ff',
          lineType: 'solid',
          opacity: 1,
          outline: false,
          outlineColor: '#ffffff',
          outlineWidth: 2,
          width: 4
        },
        position: {
          height: false,
          minCount: 2
        },
        type: 'polyline'
      }
      window.cesiumvariate.drawControl.startDraw(defLine)
      //  drawControl.hasEdit(true);
    },
    // 动画线
    drawLine_DH() {
      var defLine = {
        edittype: 'polyline',
        name: '线',
        style: {
          clampToGround: true,
          color: '#3388ff',
          lineType: 'solid',
          opacity: 1,
          outline: false,
          outlineColor: '#ffffff',
          outlineWidth: 2,
          width: 5,
          material: {
            evenColor: '#e0f00f',
            oddColor: '#45c000',
            repeat: 10,
            reverse: false
          }
        },
        position: {
          height: true,
          minCount: 2
        },
        type: 'polyline'
      }
      window.cesiumvariate.drawControl.startDraw(defLine)
      //  drawControl.hasEdit(true);
    },
    // 画面
    drawPolygon() {
      var defPolygon = {
        edittype: 'polygon',
        name: '面',
        style: {
          color: '#3388ff',
          opacity: 0.6,
          outline: true,
          outlineColor: '#ffffff',
          outlineOpacity: 1,
          perPositionHeight: true
        },
        position: {
          height: true,
          minCount: 3
        },
        type: 'polygon'
      }
      window.cesiumvariate.drawControl.startDraw(defPolygon)
      //  drawControl.hasEdit(true);
    },
    // 画贴地面
    drawPolygon_TD() {
      var defPolygon = {
        edittype: 'polygon',
        name: '面',
        style: {
          color: '#3388ff',
          opacity: 0.6,
          outline: true,
          outlineColor: '#ffffff',
          outlineOpacity: 1,
          perPositionHeight: false
        },
        position: {
          height: true,
          minCount: 3
        },
        type: 'polygon'
      }
      window.cesiumvariate.drawControl.startDraw(defPolygon)
      //  drawControl.hasEdit(true);
    },
    // 清除
    clear() {
      window.cesiumvariate.drawControl.removeAll()
    }
  }
}
</script>

<style  lang="scss">
.overlay {
  width: 98%;
  height: 100%;
  color: #fff;
  .overlayTool {
    padding: 10px 0;
    .overlayItem {
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
