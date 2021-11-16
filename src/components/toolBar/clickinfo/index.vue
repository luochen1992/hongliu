<template></template>

<script>
export default {
  name: 'clickinfo',
  computed: {},
  data() {
    return {}
  },
  props: {
    queryflag: {
      type: Number,
      default: 1
    }
  },
  mounted() {},
  watch: {
    queryflag: {
      handler(newval, oldval) {
        if (newval > 1) {
          this.show()
        } else {
          this.hide()
        }
      },
      immediate: true
    }
  },
  methods: {
    show() {
      if (!window.cesiumvariate.seltile) {
        window.cesiumvariate.seltile = []
      }
      this.handlerEvent_left()
    },
    // 隐藏
    hide() {
      this.clearToolManager()
      if (window.cesiumvariate && window.cesiumvariate.queryshowent) {
        viewer.entities.remove(window.cesiumvariate.queryshowent)
        window.cesiumvariate.queryshowent = null
      }
    },
    // 拾取
    handlerEvent_left() {
      var _this = this
      _this.clearToolManager()
      _this.handler = new window.Cesium.ScreenSpaceEventHandler(window.viewer.scene.canvas)

      this.clear_ = [
        function () {
          var _fea = window.cesiumvariate.seltile[0]
          var _color = window.cesiumvariate.seltile[1]
          if (!_fea.primitive.isDestroyed() && _fea.color && _fea.color.red) {
            if (_color.red === 1 && _color.green === 1 && _color.blue === 1 && _color.alpha === 1) {
              _fea.color = new window.Cesium.Color()
            } else {
              _fea.color = _color
            }
          }
        },
        function () {
          var _fea = window.cesiumvariate.seltile[0]
          var _color = window.cesiumvariate.seltile[1]
          if (!_fea.primitive.isDestroyed() && _fea.content && _fea.content._model) _fea.content._model.color = _color
        }
      ]
      _this.handler.setInputAction(function (movement) {
        var fea = window.viewer.scene.pick(movement.position)
        var cartesian = _this.getCurrentMousePosition(window.viewer.scene, movement.position)
        if (window.cesiumvariate.seltile.length > 0) {
          _this.clear_[window.cesiumvariate.seltile[2]]()
          window.cesiumvariate.seltile = []
        }

        if (window.cesiumvariate.queryshowent) {
          viewer.entities.remove(window.cesiumvariate.queryshowent)
          window.cesiumvariate.queryshowent = null
        }
        // _this.tp.closeAll()
        if (fea) {
          var header = ''
          var cont = '\n'
          if (fea instanceof window.Cesium.Cesium3DTileFeature) {
            if (fea.primitive && fea.primitive.config) {
              var prop = fea.primitive.config.prop
              if (prop) {
                header = fea.getProperty(prop[0])
                for (var o in prop[1]) {
                  var value = fea.getProperty(o)
                  // cont += prop[1][o] + '：' + fea.getProperty(o) + '<br/>'
                  // cont += '<div><span>' + prop[1][o] + '：</span><span>' + fea.getProperty(o) + '</span></div>'

                  cont += '\r' + prop[1][o] + '：' + value + '\r \n'
                }
                // 变色
                window.cesiumvariate.seltile = [fea, Object.assign({}, fea.color), 0]
                fea.color = window.Cesium.Color.RED // AQUA;
              }
            }
          } else if (fea.content) {
          } else if (fea.id) {
            if (fea.primitive && fea.primitive.config && fea.primitive.property) {
              var prop2 = fea.primitive.config.prop
              if (prop2) {
                header = fea.primitive.property[prop2[0]]
                for (var oo in prop2[1]) {
                  cont += '\r' + prop2[1][oo] + '：' + fea.primitive.property[oo] + '\r \n'
                }
              }
            } else if (fea.id.config && fea.id.property) {
              var prop3 = fea.id.config.prop
              if (prop3) {
                header = fea.id.property[prop3[0]]
                for (var oo3 in prop3[1]) {
                  cont += '\r' + prop3[1][oo3] + '：' + fea.id.property[oo3] + '\r \n'
                }
              }
            }
          }
          if (cont !== '') {
            if (window.cesiumvariate.queryshowent) {
              viewer.entities.remove(window.cesiumvariate.queryshowent)
              window.cesiumvariate.queryshowent = null
            }
            window.cesiumvariate.queryshowent = viewer.entities.add({
              position: cartesian, // window.Cesium.Cartesian3.fromDegrees(112.725746891355, 35.66875119646299, 710),
              label: {
                text: cont,
                font: '16px 微软雅黑',
                fillColor: CTMap.Color.GREENYELLOW,
                outlineColor: CTMap.Color.BLACK,
                outlineWidth: 1.0,
                pixelOffset: new CTMap.Cartesian2(0, -40),
                showBackground: true,
                backgroundColor: CTMap.Color.DARKCYAN.withAlpha(0.7),
                backgroundPadding: new CTMap.Cartesian2(2, 2),
                disableDepthTestDistance: Number.POSITIVE_INFINITY
              }
            })
            // // 添加弹窗
            // _this.tp.add({
            //   geometry: cartesian,
            //   content: {
            //     header: header,
            //     isclose: false,
            //     content: cont
            //   }
            // })
          }
        }
      }, window.Cesium.ScreenSpaceEventType.LEFT_CLICK)
    },

    getCurrentMousePosition(scene, position) {
      var cartesian

      //在模型上提取坐标
      var pickobject = scene.pick(position) //取模型
      if (scene.pickPositionSupported && Cesium.defined(pickobject)) {
        //!scene.pickPositionSupported : 不支持深度拾取,无法进行鼠标交互绘制
        cartesian = scene.pickPosition(position)
        // if (cartesian) {
        if (Cesium.defined(cartesian)) {
          // var pgeo = scene.globe.ellipsoid.cartesianToCartographic(cartesian);
          var cartographic = Cesium.Cartographic.fromCartesian(cartesian)
          var height = cartographic.height //模型高度
          if (height >= 0) return cartesian

          //不是entity时，支持3dtiles地下
          if (!Cesium.defined(pickobject.id) && height >= -2000) return cartesian
        }
      }

      //提取鼠标点的地理坐标
      if (scene.mode === Cesium.SceneMode.SCENE3D) {
        var pickRay = scene.camera.getPickRay(position)
        cartesian = scene.globe.pick(pickRay, scene)
      } else {
        cartesian = scene.camera.pickEllipsoid(position, scene.globe.ellipsoid)
      }
      return cartesian
    },
    clearToolManager() {
      if (this.handler) {
        this.handler.removeInputAction(window.Cesium.ScreenSpaceEventType.LEFT_CLICK)
        if (this.handler && !this.handler.isDestroyed()) this.handler = this.handler && this.handler.destroy()
      }
      if (window.cesiumvariate && window.cesiumvariate.seltile && window.cesiumvariate.seltile.length > 0) {
        this.clear_[window.cesiumvariate.seltile[2]]()
        window.cesiumvariate.seltile = []
      }
      if (window.cesiumvariate && window.cesiumvariate.queryshowent) {
        viewer.entities.remove(window.cesiumvariate.queryshowent)
        window.cesiumvariate.queryshowent = null
      }
      // this.tp.closeAll()
    }
  }
}
</script>

<style  lang="scss">
.clickinfo {
  width: 100%;
  height: 100%;
  padding: 10px;
  color: #fff;
  .spacequeryTool {
    padding: 10px 0;
    .spacequeryItem {
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
  }
  .el-button--primary.is-plain {
    background-color: rgba(192, 215, 233, 0.2);
  }
  .iconfont {
    font-size: 16px;
  }
}
.statisdialog {
  position: absolute;
  top: 130px;
  left: calc(50% - 90px);
  width: 180px;
  background: #03263aab;
  border: 3px solid #0f8fca;
  border-radius: 10px;
  color: #fff;
  padding: 10px;
  .tit {
    float: left;
    width: 90px;
    text-align: right;
    padding: 0 10px 0 5px;
  }
}
</style>
