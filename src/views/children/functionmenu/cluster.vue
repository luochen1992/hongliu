<template>
  <div class="cluster">
    <div class="clusterTool">
      <div :class="'clusterItem ' + (issel1 ? 'clusterItemsel' : '')" @click="cluster1()">人员</div>
      <div :class="'clusterItem ' + (issel2 ? 'clusterItemsel' : '')" @click="cluster2()">设备</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'cluster',
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  data() {
    return {
      showitem: false,
      issel1: true,
      issel2: false,
      dialogindex: null
    }
  },
  mounted() {},
  watch: {
    getNowMenuName(newV, oldV) {
      if (newV === 'cluster') {
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
          title: '聚合展示',
          shade: 0,
          skin: 'cv_dialog',
          area: ['250px', 'auto'],
          offset: ['130px', '60px'],
          zIndex: 2001,
          content: $('.cluster'),
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
      if (window.cesiumvariate.clu1) {
        window.cesiumvariate.clu1.remove()
        window.cesiumvariate.clu1 = null
      }
      if (window.cesiumvariate.clu2) {
        window.cesiumvariate.clu2.remove()
        window.cesiumvariate.clu2 = null
      }
      if (window.cesiumvariate.tp) {
        window.cesiumvariate.tp.closeAll()
        window.cesiumvariate.tp = null
      }
      if (this.handler) {
        this.handler.removeInputAction(window.Cesium.ScreenSpaceEventType.LEFT_CLICK)
        if (this.handler && !this.handler.isDestroyed()) this.handler = this.handler && this.handler.destroy()
        this.handler = null
      }
    },
    succCallback() {
      if (this.issel1) {
        this.cluster1()
      }
      if (this.issel2) {
        this.cluster2()
      }
      window.cesiumvariate.tp = new CTMap.tooltip(viewer)
      this.searchPoint()
    },
    cluster1() {
      if (window.cesiumvariate.clu1) {
        this.issel1 = false
        window.cesiumvariate.clu1.remove()
        window.cesiumvariate.clu1 = null
      } else {
        this.issel1 = true
        window.cesiumvariate.clu1 = new CTMap.Clusterpoint({
          viewer: viewer,
          dataOrUrl: 'data/cluster1.json',
          pixelRange: 25,
          style: [
            {
              num: 1,
              size: 32,
              color: '#1c86d1cc'
            },
            {
              num: 30,
              size: 36,
              color: '#67c23acc'
            },
            {
              num: 80,
              size: 42,
              color: '#f56c6ccc'
            },
            {
              num: 200,
              size: 48,
              color: '#e6a23ccc'
            }
          ],
          img: 'img/marker/point.png'
        })
      }
    },
    cluster2() {
      if (window.cesiumvariate.clu2) {
        this.issel2 = false
        window.cesiumvariate.clu2.remove()
        window.cesiumvariate.clu2 = null
      } else {
        this.issel2 = true
        window.cesiumvariate.clu2 = new CTMap.Clusterpoint({
          viewer: viewer,
          dataOrUrl: 'data/cluster1.json',
          pixelRange: 25,
          style: [
            {
              num: 1,
              size: 32,
              color: '#e6a23c'
            },
            {
              num: 20,
              size: 36,
              color: '#e6a23c'
            },
            {
              num: 30,
              size: 42,
              color: '#e6a23c'
            },
            {
              num: 50,
              size: 48,
              color: '#e6a23c'
            }
          ],
          img: 'img/marker/point2.png'
        })
      }
    },
    searchPoint() {
      var this_ = this
      this_.handler = new window.Cesium.ScreenSpaceEventHandler(window.viewer.scene.canvas)

      this_.handler.setInputAction(function (movement) {
        var fea = window.viewer.scene.pick(movement.position)
        var cartesian = this_.getCurrentMousePosition(window.viewer.scene, movement.position)

        window.cesiumvariate.tp.closeAll()
        if (fea) {
          var cont = ''
          if (fea.id) {
            cont += '<div><span>设备数量：' + fea.id.length + '</span><br>'
            cont += '<div><span>人员数量：5人</span>'
          }

          if (cont !== '') {
            // 添加弹窗
            window.cesiumvariate.tp.add({
              geometry: cartesian,
              content: {
                header: '',
                isclose: false,
                content: cont
              }
            })
          }
        }
      }, window.Cesium.ScreenSpaceEventType.LEFT_CLICK)
    },
    getCurrentMousePosition(scene, position) {
      var cartesian
      // 在模型上提取坐标
      var pickobject = scene.pick(position) // 取模型
      if (scene.pickPositionSupported && Cesium.defined(pickobject)) {
        //! scene.pickPositionSupported : 不支持深度拾取,无法进行鼠标交互绘制
        cartesian = scene.pickPosition(position)
        if (cartesian) {
          var pgeo = scene.globe.ellipsoid.cartesianToCartographic(cartesian)
          if (pgeo.height > 0) return cartesian
        }
      }

      // 提取鼠标点的地理坐标
      var pickRay = scene.camera.getPickRay(position)
      cartesian = scene.globe.pick(pickRay, scene)
      return cartesian
    }
  }
}
</script>

<style  lang="scss">
.cluster {
  width: 100%;
  height: 100%;
  color: #fff;
  .clusterTool {
    padding: 10px 0;
    .clusterItem {
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
    .clusterItemsel {
      color: #fff;
      background-color: #2383ac;
      border-color: #ffc107;
    }
  }
}
</style>
