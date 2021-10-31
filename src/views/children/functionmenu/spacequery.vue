<template>
  <div>
    <div class="spacequery">
      <el-button @click="draw('point')" size="mini" round :type="querytype == 1 ? 'warning' : 'primary'" plain icon="iconfont icon-dian">点击查询</el-button>
      <!-- <el-button @click="draw('circle')" size="mini" round :type="querytype == 2 ? 'warning' : 'primary'" plain icon="iconfont icon-yuanchaxunlanse">圆查询</el-button> 
      <el-button @click="draw('polygon')" size="mini" round :type="querytype == 3 ? 'warning' : 'primary'" plain icon="iconfont icon-duobianxingchaxun">多边形查询</el-button>-->
    </div>
    <!-- <div class="statisdialog" v-if="showstatis">
      <div>
        <div class="tit">设备数量:</div>
        {{ statis.equipmentCount }}台
      </div>
      <div>
        <div class="tit">运行设备:</div>
        {{ statis.equipmentStatus.type1 }}台
      </div>
      <div>
        <div class="tit">未运行设备:</div>
        {{ statis.equipmentStatus.type2 }}台
      </div>
      <div>
        <div class="tit">人员数量:</div>
        {{ statis.pop }}人
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { getflgetspacestatisyline } from '@/api/permission'
export default {
  name: 'spacequery',
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  data() {
    return {
      isshow: false,
      querytype: 0,
      showstatis: false,
      statis: { equipmentCount: 60, equipmentStatus: { type1: 20, type2: 40 }, pop: 110 }
    }
  },
  mounted() {},
  watch: {
    getNowMenuName(newV, oldV) {
      if (newV === 'spacequery') {
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
          title: '查询',
          shade: 0,
          skin: 'cv_dialog',
          area: ['300px', 'auto'],
          offset: ['130px', '60px'],
          zIndex: 2001,
          content: $('.spacequery'),
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
      if (window.cesiumvariate.drawControl) {
        window.cesiumvariate.drawControl.removeAll()
        window.cesiumvariate.drawControl = null
      }
      if (window.cesiumvariate.Collection) {
        window.cesiumvariate.Collection.removeAll()
        window.viewer.scene.primitives.remove(window.cesiumvariate.Collection)
        window.cesiumvariate.Collection = null
      }
      this.clearToolManager()
      // if (this.tp) {
      //   this.tp.closeAll()
      //   this.tp = null
      // }
      if (window.cesiumvariate.queryshowent) {
        viewer.entities.remove(window.cesiumvariate.queryshowent)
        window.cesiumvariate.queryshowent = null
      }
      this.showstatis = false
    },
    succCallback() {
      var _this = this
      if (!window.cesiumvariate.seltile) {
        window.cesiumvariate.seltile = []
      }
      window.cesiumvariate.Collection = new Cesium.PrimitiveCollection()
      window.viewer.scene.primitives.add(window.cesiumvariate.Collection)
      // _this.tp = new CTMap.tooltip(window.viewer)
      window.cesiumvariate.drawControl = new CTMap.DrawTool(window.viewer, {
        hasEdit: false,
        // dragIcon: dragIcon,
        onStopDrawing: function (entity) {
          var coodrs = null
          if (_this.querytype === 1) {
            coodrs = entity.position.getValue()
            _this.pointqueryinfo(coodrs)
          }
          if (_this.querytype === 3) {
            coodrs = entity.polygon.hierarchy.getValue().positions
            _this.queryinfo(coodrs)
          }
          window.cesiumvariate.drawControl.removeAll()
        },
        onStartEditing: function (entity) {},
        onChangeEditing: function (entity) {},
        onStopEditing: function (entity) {}
      })
    },
    pointqueryinfo(coodrs) {
      var _this = this
      // _this.showstatis = true
      _this.highlight()
      _this.showtext()
    },
    queryinfo(coodrs) {
      var _this = this
      // _this.showstatis = false
      getflgetspacestatisyline({ coodrs: 1 }).then((res) => {
        // _this.statis = res
        // _this.showstatis = true
        _this.showPointmap(coodrs)
        _this.highlight()
        _this.showtext()
      })
    },
    showPointmap(coodrs) {
      // var _dataSource = new Cesium.CustomDataSource(Cesium.createGuid())
      // window.viewer.dataSources.add(_dataSource)
      // for (var i = 0; i < 10; i++) {
      //   var positions = Cesium.Cartesian3.fromDegrees(112, 32, 22)
      //   _dataSource._primitives.add({
      //     position: positions,
      //     point: {
      //       pixelSize: 12,
      //       color: Cesium.Color.CORNFLOWERBLUE,
      //       outlineColor: Cesium.Color.AQUA,
      //       outlineWidth: 2
      //     }
      //   })
      // }
    },
    // 高亮
    highlight() {
      window.centerAt(112.72787509767183, 35.66842066112541, 3000, 0, 0, 0)

      var coodrs = [
        [112.72627171451475, 35.66711255723721],
        [112.72787509767183, 35.66842066112541],
        [112.72831843783092, 35.66802048913089],
        [112.72667303871513, 35.66673819401017]
      ]
      var startH = 761
      var endH = 759
      window.cesiumvariate.Collection.add(
        new Cesium.ClassificationPrimitive({
          geometryInstances: new Cesium.GeometryInstance({
            geometry: new Cesium.PolygonGeometry({
              polygonHierarchy: new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray([].concat.apply([], coodrs))),
              extrudedHeight: endH,
              height: startH
            }),
            attributes: {
              color: Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(0, 1, 1, 0.8)),
              show: new Cesium.ShowGeometryInstanceAttribute(true)
            }
            // id: '自定义id'
          }),
          classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
        })
      )
    },
    showtext() {
      var _this = this
      if (window.cesiumvariate.queryshowent) {
        viewer.entities.remove(window.cesiumvariate.queryshowent)
        window.cesiumvariate.queryshowent = null
      }
      window.cesiumvariate.queryshowent = viewer.entities.add({
        position: window.Cesium.Cartesian3.fromDegrees(112.72787509767183, 35.66842066112541, 710),
        label: {
          text: ` 设备数量:${this.statis.equipmentCount}台
           运行设备:${this.statis.equipmentStatus.type1}台
          未运行设备:${this.statis.equipmentStatus.type2}台
           人员数量:${this.statis.pop}人`,
          font: '16px 微软雅黑',
          fillColor: CTMap.Color.DARKORANGE,
          outlineColor: CTMap.Color.BLACK,
          outlineWidth: 1.0,
          pixelOffset: new CTMap.Cartesian2(0, -40),
          showBackground: true,
          backgroundColor: CTMap.Color.DARKCYAN.withAlpha(0.7),
          backgroundPadding: new CTMap.Cartesian2(2, 2),
          disableDepthTestDistance: Number.POSITIVE_INFINITY
        }
      })
    },
    // //文字信息
    // showtext() {
    //   var _this = this
    //   _this.tp.closeAll()
    //   _this.tp.add({
    //     geometry: window.Cesium.Cartesian3.fromDegrees(112.72429898288544, 35.66854064582965, 710),
    //     content: {
    //       header: '',
    //       isclose: false,
    //       content: `<div class="statisdialog">
    //   <div>
    //     <div class="tit">设备数量:</div>
    //     ${this.statis.equipmentCount}台
    //   </div>
    //   <div>
    //     <div class="tit">运行设备:</div>
    //     ${this.statis.equipmentStatus.type1}台
    //   </div>
    //   <div>
    //     <div class="tit">未运行设备:</div>
    //     ${this.statis.equipmentStatus.type2}台
    //   </div>
    //   <div>
    //     <div class="tit">人员数量:</div>
    //     ${this.statis.pop}人
    //   </div>
    // </div>`
    //     }
    //   })
    // },
    // 绘制
    draw(type) {
      var _this = this
      var opt = null
      switch (type) {
        case 'point':
          _this.querytype = 1
          _this.handlerEvent_left()
          // opt = {
          //   edittype: 'imagepoint',
          //   style: {
          //     image: 'img/marker/point.png',
          //     opacity: 1,
          //     rotation: 0,
          //     scale: 1
          //   },
          //   type: 'billboard'
          // }
          break
        case 'circle':
          _this.querytype = 2
          opt = {
            edittype: 'ellipse',
            name: '椭圆',
            position: {
              height: false
            },
            style: {
              semiMinorAxis: 500,
              semiMajorAxis: 500,
              height: 0,
              opacity: 0.6,
              fill: true,
              color: '#3388ff',
              outline: true,
              outlineColor: '#ffffff',
              rotation: 0,
              clampToGround: false
            },
            attr: {
              id: '',
              name: '',
              remark: ''
            }
          }
          break
        case 'polygon':
          _this.querytype = 3
          opt = {
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
          break
      }
      if (opt) {
        window.cesiumvariate.drawControl.startDraw(opt)
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
                  if (prop[1][o] === '名称') {
                    value = '4062'
                  }
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
    },
    clearToolManager() {
      if (this.handler) {
        this.handler.removeInputAction(window.Cesium.ScreenSpaceEventType.LEFT_CLICK)
        if (this.handler && !this.handler.isDestroyed()) this.handler = this.handler && this.handler.destroy()
      }
      if (window.cesiumvariate.seltile && window.cesiumvariate.seltile.length > 0) {
        this.clear_[window.cesiumvariate.seltile[2]]()
        window.cesiumvariate.seltile = []
      }
      if (window.cesiumvariate.queryshowent) {
        viewer.entities.remove(window.cesiumvariate.queryshowent)
        window.cesiumvariate.queryshowent = null
      }
      // this.tp.closeAll()
    }
  }
}
</script>

<style  lang="scss">
.spacequery {
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
