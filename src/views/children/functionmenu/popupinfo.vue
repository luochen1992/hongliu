<template>
  <div class="popupinfo"></div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import tooltip from '../../../js/popup'
export default {
  name: 'popupinfo',
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  data() {
    return {
      isshow: false,
      dialogindex: null,
      entitieslist: []
    }
  },
  mounted() {},
  watch: {
    getNowMenuName(newV, oldV) {
      if (newV === 'popupinfo') {
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
      _this.succCallback()
      // if (!_this.dialogindex) {
      //   _this.dialogindex = window.layui.layer.open({
      //     type: 1,
      //     title: '信息',
      //     shade: 0,
      //     skin: 'cv_dialog',
      //     area: ['330px', 'auto'],
      //     offset: ['40px', 'calc(100% - 380px)'],
      //     zIndex: 2001,
      //     content: $('.popupinfo'),
      //     success: function (layero, index) {
      //       _this.succCallback()
      //     },
      //     cancel: function (index, layero) {
      //       _this.setNowMenuName(null)
      //       _this.dialogindex = null
      //     }
      //   })
      // }
    },
    // 隐藏
    hide() {
      // window.layui.layer.close(this.dialogindex)
      // this.dialogindex = null
      if (this.intervalId) {
        clearInterval(this.intervalId)
      }
      if (this.entitieslist.length > 0) {
        for (var i = 0; i < this.entitieslist.length; i++) {
          window.viewer.entities.remove(this.entitieslist[i])
        }
        this.entitieslist = []
        tooltip.closeAll()
      }
    },
    succCallback() {
      if (!tooltip.viewer) {
        tooltip.viewer = window.viewer
      }
      this.markerShowA()
    },
    markerShowA() {
      var _this = this
      window.flyTo(116.34944, 39.90576, 100, 270, -20, 0)
      var xy = [0.0001, 0.0002]
      if (_this.intervalId) {
        clearInterval(this.intervalId)
      }
      _this.msb_1([xy[0], xy[1]])
      var imgs = ['tdt_img.png', 'tdt_vec.png', 'TerrainSTK.png', 'TerrainEllipsoid.png']
      var ab = 1
      _this.intervalId = setInterval(function () {
        ab++
        for (var p in tooltip.ctnList) {
          if (ab % 3 == 1) {
            // tooltip.ctnList[p][1].querySelector('.bx-popup-header-ctn').innerHTML = _this.getRandomName(3)
            tooltip.ctnList[p][1].querySelector('.bx-popup-content').innerHTML = '<div style="padding: 10px;">' + _this.getRandomName(8) + '</div>'
            tooltip.ctnList[p][1].className = 'bx-popup-ctn popupSTY2'
          } else {
            // tooltip.ctnList[p][1].querySelector('.bx-popup-header-ctn').innerHTML = _this.getRandomName(3)
            tooltip.ctnList[p][1].querySelector('.bx-popup-content').innerHTML = '<div style="padding: 10px;">' + _this.getRandomName(8) + '</div>'
            // tooltip.ctnList[p][1].querySelector('.bx-popup-content').innerHTML = '<div><img src="img/basemaps/' + imgs[Math.floor(Math.random() * 4)] + '" /></div>'
            tooltip.ctnList[p][1].className = 'bx-popup-ctn popupSTY1'
          }
        }
      }, 5000)
      window.tooltip = tooltip
      this.start()
    },
    // 随机生成文字
    // 获取指定范围内的随机数
    randomAccess(min, max) {
      return Math.floor(Math.random() * (min - max) + max)
    },

    // 解码
    decodeUnicode(str) {
      //Unicode显示方式是\u4e00
      str = '\\u' + str
      str = str.replace(/\\/g, '%')
      //转换中文
      str = unescape(str)
      //将其他受影响的转换回原来
      str = str.replace(/%/g, '\\')
      return str
    },

    /*
     *@param Number NameLength 要获取的名字长度
     */
    getRandomName(NameLength) {
      let name = ''
      for (let i = 0; i < NameLength; i++) {
        let unicodeNum = ''
        unicodeNum = this.randomAccess(0x4e00, 0x9fa5).toString(16)
        name += this.decodeUnicode(unicodeNum)
      }
      return name
    },

    msb_1(offsetxy) {
      tooltip.className = 'popupSTY1'
      tooltip.closeAll()
      if (this.entitieslist.length > 0) {
        for (var i = 0; i < this.entitieslist.length; i++) {
          window.viewer.entities.remove(this.entitieslist[i])
        }
        this.entitieslist = []
      }
      var geo = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {
              type: 'C1',
              time: '20210430',
              name: '采样点A',
              img: 'img/basemaps/tdt_img.png'
            },
            geometry: {
              type: 'Point',
              coordinates: [116.344109 + offsetxy[0], 39.9059 + offsetxy[1], 0.1]
            }
          },
          {
            type: 'Feature',
            properties: {
              type: 'C2',
              time: '20210430',
              name: '采样点B',
              img: 'img/basemaps/tdt_vec.png'
            },
            geometry: {
              type: 'Point',
              coordinates: [116.34644 + offsetxy[0], 39.90576 + offsetxy[1], 0.1]
            }
          },
          {
            type: 'Feature',
            properties: {
              type: 'C3',
              time: '20210501',
              name: '采样点C',
              img: 'img/basemaps/tdt_img.png'
            },
            geometry: {
              type: 'Point',
              coordinates: [116.34737 + offsetxy[0], 39.90582 + offsetxy[1], 0.1]
            }
          }
        ]
      }
      this.showTooltip(geo)
    },
    showTooltip(geo) {
      if (geo && geo.features && geo.features.length > 0) {
        // var m = new Cesium.EllipsoidFadeMaterialProperty(Cesium.Color.ORANGE, 1000)
        for (var i = 0; i < geo.features.length; i++) {
          var point = geo.features[i]
          var position = window.Cesium.Cartesian3.fromDegrees(point.geometry.coordinates[0], point.geometry.coordinates[1], point.geometry.coordinates[2])
          var position2 = window.Cesium.Cartesian3.fromDegrees(point.geometry.coordinates[0], point.geometry.coordinates[1], point.geometry.coordinates[2] + 2)
          // //
          var flog = true
          var x = 1
          var color = window.Cesium.Color.fromRandom({
            alpha: 1.0
          })
          // 点
          var point1 = window.viewer.entities.add({
            position: position2,
            point: {
              color: new window.Cesium.CallbackProperty(function () {
                if (flog) {
                  x = x - 0.5
                  if (x <= 0) {
                    flog = false
                  }
                } else {
                  x = x + 0.5
                  if (x >= 1) {
                    flog = true
                  }
                }
                return color.withAlpha(x)
              }, false),
              pixelSize: 8,
              outlineWidth: 0
            }
          })
          this.entitieslist.push(point1)
          // 车
          var entity = window.viewer.entities.add({
            position: position,
            model: {
              uri: 'http://data.marsgis.cn/gltf/mars/qiche.gltf',
              scale: 0.1
            }
          })
          this.entitieslist.push(entity)

          // 添加弹窗
          tooltip.add({
            geometry: position2,
            content: {
              header: '',
              isclose: false,
              content: `
              <div style="padding: 10px;">${point.properties.name}</div>
              `
            }
          })
        }
      }
    },
    start() {
      var _this = this
      var clock = window.viewer.clock
      var scene = window.viewer.scene
      clock.shouldAnimate = true
      scene.postRender.addEventListener(function () {
        for (var i = 0; i < _this.entitieslist.length; i++) {
          var position = _this.entitieslist[i].position.getValue(clock.currentTime)
          var ct = viewer.scene.globe.ellipsoid.cartesianToCartographic(position)
          var y = Cesium.Math.toDegrees(ct.latitude)
          var x = Cesium.Math.toDegrees(ct.longitude) + 0.000005
          var p = Cesium.Cartesian3.fromDegrees(x, y, ct.height)
          _this.entitieslist[i].position = p
        }
        for (var o in tooltip.ctnList) {
          var ct = viewer.scene.globe.ellipsoid.cartesianToCartographic(tooltip.ctnList[o][0])
          var y = Cesium.Math.toDegrees(ct.latitude)
          var x = Cesium.Math.toDegrees(ct.longitude) + 0.000005
          tooltip.ctnList[o][0] = Cesium.Cartesian3.fromDegrees(x, y, ct.height)
        }
      })
    }
  }
}
</script>

<style  lang="scss">
.popupinfo {
  width: 100%;
  height: 100%;
  color: #fff;
  .popupinfoItem {
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
.popupSTY2 {
  position: absolute;
  z-index: 999;
  color: #fff;
  margin: -80px 0px 0px 0px;
  transform: translate(-50%, -100%);
}
.popupSTY2 .bx-popup-close {
  float: right;
}
.popupSTY2 .divpoint-wrap {
  padding: 0;
  width: max-content;
}

.popupSTY2 .divpoint-center {
  background: linear-gradient(45deg, rgb(22 126 146 / 80%), rgb(125 148 172 / 80%), 40%, rgb(22 117 154 / 80%));
  border: 1px solid #dfe3e273;
  border-radius: 5px;
}

.popupSTY2 .bx-popup-tip {
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

.popupSTY2 .bx-popup-header-ctn {
  background: #0777aacc;
  color: #fff;
  font-size: 15px;
  padding: 4px;
  margin: 0 0 0 0px;
}

.popupSTY2 .bx-popup-content-ctn {
  padding: 5px 8px;
}

.popupSTY2 .bx-popup-content-ctn .bx-popup-content img {
  border-radius: 100px;
}

.popupSTY2 .directional {
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

.popupSTY1 {
  position: absolute;
  z-index: 999;
  color: #fff;
  margin: -80px 0px 0px 0px;
  transform: translate(-50%, -100%);
}

.popupSTY1 .divpoint-wrap {
  padding: 0;
  width: max-content;
}

.popupSTY1 .divpoint-center {
  background: linear-gradient(45deg, rgb(212, 127, 16), rgba(168, 233, 47, 0.65), 40%, rgba(204, 202, 63, 0.65));
  border: 1px solid rgb(226, 195, 64);
  border-radius: 100px;
  box-shadow: 0 0 10px 2px #b57c20;
  text-align: center;
  // animation: turn 5s linear infinite;
}

.popupSTY1 .bx-popup-tip {
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

.popupSTY1 .bx-popup-header-ctn {
  background: rgba(212, 153, 35, 0.49);
  color: #fff;
  font-size: 15px;
  padding: 4px;
  border-radius: 20px;
  margin: 0 0 0 40px;
  position: absolute;
  top: 0;
  left: 50%;
  // animation: popupturn2 5s linear infinite;
}

.popupSTY1 .bx-popup-content-ctn {
  /* padding: 15px; */
}

.popupSTY1 .bx-popup-content-ctn .bx-popup-content img {
  border-radius: 100px;
}

.popupSTY1 .directional {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 2px;
  height: 80px;
  background-color: rgba(223, 240, 40, 0.7);
  transform: none;
  margin: 0px 0 -80px 50%;
  border: none;
}

@keyframes turn {
  0% {
    -webkit-transform: rotateY(0deg);
  }

  25% {
    -webkit-transform: rotateY(90deg);
  }

  50% {
    -webkit-transform: rotateY(180deg);
  }

  75% {
    -webkit-transform: rotateY(270deg);
  }

  100% {
    -webkit-transform: rotateY(360deg);
  }
}

@keyframes popupturn2 {
  0% {
    opacity: 1;
  }

  25% {
    opacity: 0.3;
  }

  30% {
    opacity: 0;
  }

  70% {
    opacity: 0;
  }

  75% {
    opacity: 0.3;
  }

  100% {
    opacity: 1;
  }
}
</style>
