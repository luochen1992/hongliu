<template>
  <div class="layertree">
    <el-tree
      class="treebasemap"
      :data="basemapdata"
      :props="bmdefaultProps"
      default-expand-all
      @check-change="basecheckChange"
      node-key="id"
      :default-checked-keys="basemapid"
      show-checkbox
    ></el-tree>
    <el-tree
      node-key="_id"
      :data="data"
      show-checkbox
      default-expand-all
      :props="defaultProps"
      :default-checked-keys="defaultcheckdedkeys"
      @check-change="checkChangeHander"
      @check="checkHander"
      @node-click="clickHander"
    ></el-tree>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'layertree',
  computed: {
    ...mapGetters(['getToolBar', 'getLayerListData'])
  },
  data() {
    return {
      dialogindex: null,
      data: [],
      defaultProps: {
        children: '_layers',
        label: 'name'
      },
      defaultcheckdedkeys: [],
      seltile: [],
      searchChecked: false,
      bmdefaultProps: {
        children: 'children',
        label: 'label'
      },
      basemapid: [],
      basemapdata: []
    }
  },
  mounted() {},
  watch: {
    getToolBar(newV, oldV) {
      if (newV === 'layertree') {
        this.show()
      } else {
        this.hide()
      }
    },
    getLayerListData(newV, oldV) {
      this.defaultcheckdedkeys = []
      this.filterLayerList(window.viewer.layerList)
      // this.data = window.viewer.layerList
      function gettreeinfo(item) {
        var arr = []
        for (var i = 0; i < item.length; i++) {
          var nowitem = {
            name: item[i].name,
            _id: item[i]._id
          }
          if (item[i]._layers && item[i]._layers.length > 0) {
            nowitem._layers = gettreeinfo(item[i]._layers)
          }
          arr.push(nowitem)
        }
        return arr
      }
      if (window.viewer.layerList.length > 0) {
        this.data = gettreeinfo(window.viewer.layerList)
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
          title: '图层列表',
          shade: 0,
          skin: 'cv_dialog',
          area: ['250px', 'calc(100% - 300px)'],
          offset: ['200px', 'calc(100% - 340px)'],
          zIndex: 2001,
          content: $('.layertree'),
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
      //tooltip.closeAll()
    },
    basechange() {
      var _this = this
      var selectedImagery = viewer.baseLayerPicker.viewModel.selectedImagery
      _this.basemapdata = [{ id: '1', label: '基础底图', children: [{ id: selectedImagery.name, label: selectedImagery.name }] }]
      _this.basemapid = [selectedImagery.name]
      var basemapdivlist = document.querySelectorAll('.cesium-baseLayerPicker-choices .cesium-baseLayerPicker-item')
      for (var i = 0; i < basemapdivlist.length; i++) {
        document.querySelectorAll('.cesium-baseLayerPicker-choices .cesium-baseLayerPicker-item')[i].onclick = function () {
          _this.basemapdata[0].children[0].label = viewer.baseLayerPicker.viewModel.selectedImagery.name
        }
      }
    },
    basecheckChange(data, checked, indeterminate) {
      if (checked) {
        for (var i = 0; i < viewer.baseLayerPicker.viewModel.imageryProviderViewModels.length; i++) {
          if (viewer.baseLayerPicker.viewModel.imageryProviderViewModels[i].name === this.basemapdata[0].children[0].label) {
            viewer.baseLayerPicker.viewModel.selectedImagery = viewer.baseLayerPicker.viewModel.imageryProviderViewModels[i]
          }
        }
      } else {
        viewer.baseLayerPicker.viewModel.selectedImagery = null
      }
    },
    succCallback() {
      if (this.basemapdata.length === 0) {
        this.basechange()
      }
      //tooltip.className = 'popupSTY'
      //if (!tooltip.viewer) {
      //tooltip.viewer = window.viewer
      //}
      $('.layertree').mCustomScrollbar({
        theme: 'dark-1', // 主题颜色
        scrollButtons: {
          enable: true // 是否使用上下滚动按钮
        },
        advanced: {
          updateOnContentResize: true, // 自动根据动态变换的内容调整滚动条的大小
          updateOnBrowserResize: true // 根据百分比为自适应布局 调整浏览器上滚动条的大小
        },
        autoHideScrollbar: true, // 是否自动隐藏滚动条
        scrollInertia: 100, // 滚动延迟
        horizontalScroll: false // 水平滚动条
      })
      // this.handlerEvent_left()
    },

    // 筛选列表数据
    filterLayerList(info) {
      if (info && info.length > 0) {
        for (var i = 0; i < info.length; i++) {
          if (info[i]._layers) {
            this.filterLayerList(info[i]._layers)
          } else {
            if (info[i]._visible) {
              this.defaultcheckdedkeys.push(info[i]._id)
            }
          }
        }
      }
    },
    // 根据id获取图层
    getLayerById(id) {
      function getlid(item) {
        var arr = null
        for (var i = 0; i < item.length; i++) {
          if (item[i]._id === id) {
            arr = item[i]
            break
          }
          if (item[i]._layers && item[i]._layers.length > 0) {
            var ssid = getlid(item[i]._layers)
            if (ssid != null) {
              arr = ssid
              break
            }
          }
        }
        return arr
      }
      if (window.viewer.layerList.length > 0) {
        return getlid(window.viewer.layerList)
      } else {
        return null
      }
    },
    // 勾选事件
    checkChangeHander(data, checked, indeterminate) {
      var lay = this.getLayerById(data._id)
      if (lay._visible !== checked) lay.setVisible(checked)
    },
    //
    checkHander(data, checked) {},
    // 点击事件
    clickHander(data, Node, info) {
      var lay = this.getLayerById(data._id)
      if (lay._visible) {
        lay.centerAt()
      }
    } // ,
    // // 拾取
    // handlerEvent_left() {
    //   var this_ = this
    //   this.clearToolManager()
    //   this_.handler = new window.Cesium.ScreenSpaceEventHandler(window.viewer.scene.canvas)

    //   // this.clear_ = [
    //   //   function () {
    //   //     var _fea = this_.seltile[0]
    //   //     var _color = this_.seltile[1]
    //   //     if (!_fea.primitive.isDestroyed() && _fea.color && _fea.color.red) {
    //   //       if (_color.red === 1 && _color.green == 1 && _color.blue == 1 && _color.alpha == 1) {
    //   //         _fea.color = new window.Cesium.Color()
    //   //       } else {
    //   //         _fea.color = _color
    //   //       }
    //   //     }
    //   //   },
    //   //   function () {
    //   //     var _fea = this_.seltile[0]
    //   //     var _color = this_.seltile[1]
    //   //     if (!_fea.primitive.isDestroyed() && _fea.content && _fea.content._model) _fea.content._model.color = _color
    //   //   }
    //   // ]
    //   this_.handler.setInputAction(function (movement) {
    //     var fea = window.viewer.scene.pick(movement.position)
    //     var cartesian = this_.getCurrentMousePosition(window.viewer.scene, movement.position)
    //     // if (this_.seltile.length > 0) {
    //     //   this_.clear_[this_.seltile[2]]()
    //     //   this_.seltile = []
    //     // }

    //     tooltip.closeAll()
    //     if (fea) {
    //       var header = ''
    //       var cont = ''
    //       if (fea instanceof window.Cesium.Cesium3DTileFeature) {
    //         if (fea.primitive && fea.primitive.config) {
    //           var prop = fea.primitive.config.prop
    //           if (prop) {
    //             header = fea.getProperty(prop[0])
    //             for (var o in prop[1]) {
    //               // cont += prop[1][o] + '：' + fea.getProperty(o) + '<br/>'
    //               cont += '<div><span>' + prop[1][o] + '：</span><span>' + fea.getProperty(o) + '</span></div>'
    //             }
    //             // // 变色
    //             // this_.seltile = [fea, Object.assign({}, fea.color), 0]
    //             // fea.color = window.Cesium.Color.AQUAMARINE // AQUA;
    //           }
    //         }
    //       } else if (fea.content) {
    //       } else if (fea.id) {
    //         if (fea.primitive && fea.primitive.config && fea.primitive.property) {
    //           var prop2 = fea.primitive.config.prop
    //           if (prop2) {
    //             header = fea.primitive.property[prop2[0]]
    //             for (var oo in prop2[1]) {
    //               cont += '<div><span>' + prop2[1][oo] + '：</span><span>' + fea.primitive.property[oo] + '</span></div>'
    //             }
    //           }
    //         }
    //       }
    //       if (cont !== '') {
    //         // 添加弹窗
    //         tooltip.add({
    //           geometry: cartesian,
    //           content: {
    //             header: header,
    //             isclose: false,
    //             content: cont
    //           }
    //         })
    //       }
    //     } else {
    //       this_.searchlayer(cartesian)
    //     }
    //   }, window.Cesium.ScreenSpaceEventType.LEFT_CLICK)
    // },

    // //
    // getLevel(height) {
    //   if (height > 48000000) {
    //     return 0
    //   } else if (height > 24000000) {
    //     return 1
    //   } else if (height > 12000000) {
    //     return 2
    //   } else if (height > 6000000) {
    //     return 3
    //   } else if (height > 3000000) {
    //     return 4
    //   } else if (height > 1500000) {
    //     return 5
    //   } else if (height > 750000) {
    //     return 6
    //   } else if (height > 375000) {
    //     return 7
    //   } else if (height > 187500) {
    //     return 8
    //   } else if (height > 93750) {
    //     return 9
    //   } else if (height > 46875) {
    //     return 10
    //   } else if (height > 23437.5) {
    //     return 11
    //   } else if (height > 11718.75) {
    //     return 12
    //   } else if (height > 5859.38) {
    //     return 13
    //   } else if (height > 2929.69) {
    //     return 14
    //   } else if (height > 1464.84) {
    //     return 15
    //   } else if (height > 732.42) {
    //     return 16
    //   } else if (height > 366.21) {
    //     return 17
    //   } else {
    //     return 18
    //   }
    // },
    // // 判断是否有图层
    // searchlayer(cartesian) {},
    // getCurrentMousePosition(scene, position) {
    //   var cartesian
    //   //在模型上提取坐标
    //   var pickobject = scene.pick(position) //取模型
    //   if (scene.pickPositionSupported && Cesium.defined(pickobject)) {
    //     //!scene.pickPositionSupported : 不支持深度拾取,无法进行鼠标交互绘制
    //     cartesian = scene.pickPosition(position)
    //     if (cartesian) {
    //       var pgeo = scene.globe.ellipsoid.cartesianToCartographic(cartesian)
    //       if (pgeo.height > 0) return cartesian
    //     }
    //   }

    //   //提取鼠标点的地理坐标
    //   var pickRay = scene.camera.getPickRay(position)
    //   cartesian = scene.globe.pick(pickRay, scene)
    //   return cartesian
    // },
    // clearToolManager() {
    //   if (this.handler) {
    //     this.handler.removeInputAction(window.Cesium.ScreenSpaceEventType.LEFT_CLICK)
    //     if (this.handler && !this.handler.isDestroyed()) this.handler = this.handler && this.handler.destroy()
    //   }
    //   if (this.seltile.length > 0) {
    //     this.clear_[this.seltile[2]]()
    //     this.seltile = []
    //   }
    //   tooltip.closeAll()
    // }
  }
}
</script>

<style  lang="scss">
.layertree {
  width: 100%;
  height: 100%;
  max-height: 600px;
  color: #fff;
  .el-tree.treebasemap {
    padding-top: 10px;
    padding-bottom: 0px;
  }
  .el-tree {
    padding: 2px;
    padding-bottom: 10px;
    background: transparent;
    color: #fff;
    .el-tree-node__content:hover {
      color: #428bca !important;
      background: transparent !important;
    }
    .el-tree-node.is-current > .el-tree-node__content {
      background-color: transparent !important;
    }
    .el-tree-node__content {
      &:hover {
        color: #428bca !important;
        background: transparent !important;
      }
    }
  }
}
.popupSTY {
  position: absolute;
  z-index: 999;
  color: #fff;
  margin: -80px 0px 0px 0px;
  transform: translate(-50%, -100%);
}
.popupSTY .bx-popup-close {
  float: right;
}
.popupSTY .divpoint-wrap {
  padding: 0;
  width: max-content;
}

.popupSTY .divpoint-center {
  background: linear-gradient(45deg, rgb(22 126 146 / 80%), rgb(125 148 172 / 80%), 40%, rgb(22 117 154 / 80%));
  border: 1px solid #dfe3e273;
  border-radius: 5px;
}

.popupSTY .bx-popup-tip {
  width: 17px;
  background: #fff;
  height: 17px;
  padding: 1px;
  margin: -10px auto 0;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.popupSTY .bx-popup-header-ctn {
  background: #0777aacc;
  color: #fff;
  font-size: 15px;
  padding: 4px;
  margin: 0 0 0 0px;
}

.popupSTY .bx-popup-content-ctn {
  padding: 5px 8px;
}

.popupSTY .bx-popup-content-ctn .bx-popup-content img {
  border-radius: 100px;
}

.popupSTY .directional {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 2px;
  height: 80px;
  background-color: rgba(21, 142, 223, 0.7);
  transform: none;
  margin: 0px 0 -80px 50%;
  border: none;
}
</style>
