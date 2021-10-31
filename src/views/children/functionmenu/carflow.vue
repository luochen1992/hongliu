<template>
  <div class="carflow"></div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'carflow',
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  data() {
    return {
      hotEnable: false,
      isshow: false
    }
  },
  mounted() {},
  watch: {
    getNowMenuName(newV, oldV) {
      if (newV === 'carflow') {
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
      _this.addCarFlow()
    },
    // 隐藏
    hide() {
      var g_hangdaoTileset = viewer.layerList[0]._layers[0].layer
      if (g_hangdaoTileset !== null)
        var dd = g_hangdaoTileset.tileVisible.addEventListener((tile) => {
          var content = tile.content
          var featuresLength = content.featuresLength
          for (var i = 0; i < featuresLength; i++) {
            const feature = content.getFeature(i)
            const model = feature.content._model
            model.colorBlendMode = Cesium.ColorBlendMode.HIGHLIGHT
          }
          const hh = setInterval(function () {
            g_hangdaoTileset.tileVisible.removeEventListener(dd)
            clearInterval(hh)
          }, 100)
        })
      g_hangdaoTileset.style = null
    },

    addCarFlow() {
      //带纹理巷道
      //var handaowenli_tileset ;
      //if(viewer.layerList.length >0 ){
      //  var handaowenli_tileset = viewer.layerList[0]._layers[0];
      //  handaowenli_tileset.setVisible(false);
      //}
      //加载巷道
      //var hotEventListener = 0;
      //注意这个变量，g_hangdaoTileset是巷道3dtile数据，全局变量！！！

      //////////
      this.HangDaoMap()
    },
    HangDaoMap() {
      var tt = this
      //巷道本身
      var g_hangdaoTileset = viewer.layerList[0]._layers[0].layer
      if (g_hangdaoTileset == null) return
      tt.hotEnable = !tt.hotEnable
      //hotEventListener=1;
      var dd = g_hangdaoTileset.tileVisible.addEventListener((tile) => {
        var content = tile.content
        var featuresLength = content.featuresLength
        for (var i = 0; i < featuresLength; i++) {
          const feature = content.getFeature(i)
          const model = feature.content._model
          /*
            Cesium.ColorBlendMode.HIGHLIGHT；材质与设置颜色相乘得到的颜色。
            Cesium.ColorBlendMode.MIX；材质与设置颜色混合得到的颜色，是怎么混合的，还需要研究源码。
            Cesium.ColorBlendMode.REPLACE；设置颜色替换材质
            */

          if (tt.hotEnable) model.colorBlendMode = Cesium.ColorBlendMode.REPLACE
          else model.colorBlendMode = Cesium.ColorBlendMode.HIGHLIGHT
        }
        const hh = setInterval(function () {
          g_hangdaoTileset.tileVisible.removeEventListener(dd)
          clearInterval(hh)
        }, 100)
      })
      if (!tt.hotEnable) {
        g_hangdaoTileset.style = null
      } else {
        tt.PassageHotMap('data/安全监控系统.json', window.g_HangDaoDataList, g_hangdaoTileset)
      }
    },
    PassageHotMap(url, hangDaoDataList, tileset) {
      var tt = this
      if (hangDaoDataList.length == 0) {
        alert('请先加载巷道数据')
        return
      }
      $.get(url, {}, function (res) {
        var json = res
        for (var i = 0; i < hangDaoDataList.length; i++) {
          hangDaoDataList[i].count = 0
        }
        var x1, y1, z1, x2, y2, z2
        var azi
        var aziR
        var COS, SIN
        var xLeft1, yLeft1, xLeft2, yLeft2, xRight1, yRight1, xRight2, yRight2

        for (var kk = 0; kk < json.Map.length; kk++) {
          var obj = json.Map[kk]

          var xyzArr2 = obj.XYZ.split(',')
          var xx = parseFloat(xyzArr2[0])
          var yy = parseFloat(xyzArr2[1])
          var zz = parseFloat(xyzArr2[2])
          for (var i = 0; i < hangDaoDataList.length; i++) {
            var name = hangDaoDataList[i].name
            var coordList = hangDaoDataList[i].coordList
            var W = hangDaoDataList[i].width
            for (var j = 0; j < coordList.length - 3; j += 3) {
              x1 = coordList[j]
              y1 = coordList[j + 1]
              z1 = coordList[j + 2]
              x2 = coordList[j + 3]
              y2 = coordList[j + 4]
              z2 = coordList[j + 5]
              azi = tt.GetAzimuth(x1, y1, x2, y2)

              aziR = ((azi + 90) / 180.0) * 3.1415926535897932384626433832795
              COS = (Math.cos(aziR) * W) / 2
              SIN = (Math.sin(aziR) * W) / 2

              xLeft1 = x1 + COS
              yLeft1 = y1 + SIN
              xLeft2 = x2 + COS
              yLeft2 = y2 + SIN

              COS = -COS
              SIN = -SIN
              xRight1 = x1 + COS
              yRight1 = y1 + SIN
              xRight2 = x2 + COS
              yRight2 = y2 + SIN
              var polygon = [
                [xLeft2, yLeft2],
                [xRight2, yRight2],
                [xRight1, yRight1],
                [xLeft1, yLeft1]
              ]
              if (tt.inPolygon([xx, yy], polygon)) {
                hangDaoDataList[i].count++
              }
            }
          }
        }
        //
        var colorList = []
        colorList[0] = 'rgb(250,227,34)'
        colorList[1] = 'rgb(255,196,24)'
        colorList[2] = 'rgb(251,173,22)'
        colorList[3] = 'rgb(255,142,26)'
        colorList[4] = 'rgb(253,89,27)'
        colorList[5] = 'rgb(255,70,58)'
        colorList[6] = 'rgb(255,41,27)'
        colorList[7] = 'rgb(255,20,27)'
        var minHit = 10000
        var maxHit = -10000
        for (var i = 0; i < hangDaoDataList.length; i++) {
          if (hangDaoDataList[i].count > 0) {
            if (minHit > hangDaoDataList[i].count) minHit = hangDaoDataList[i].count
            if (maxHit < hangDaoDataList[i].count) maxHit = hangDaoDataList[i].count
          }
        }
        var conditions = []
        for (var i = 0; i < hangDaoDataList.length; i++) {
          if (hangDaoDataList[i].count > 0) {
            //console.log(hangDaoDataList[i].name+": "+hangDaoDataList[i].count);
            var v = []
            v[0] = "${newname}==='" + hangDaoDataList[i].name + "'"
            var colorID = ((hangDaoDataList[i].count - minHit) / (maxHit - minHit)) * 8
            colorID = Math.round(colorID)
            if (colorID > 7) colorID = 7
            v[1] = colorList[colorID] //"rgb(255, 0, 0)";
            conditions.push(v)
          }
        }
        var v = []
        v[0] = 'true'
        v[1] = 'rgb(9,252,32)'
        conditions.push(v)

        var ColorStyle = new Cesium.Cesium3DTileStyle({
          color: {
            conditions: conditions
          }
        })
        tileset.style = ColorStyle
        //console.log('sdf');
      })
    },
    GetAzimuth(X1, Y1, X2, Y2) {
      var tmpValue = 0

      if (X1 == X2 || Y1 == Y2) {
        if (X1 == X2) {
          /// 经度相同
          if (Y2 >= Y1) {
            return 90
          } else {
            return 270
          }
        } else {
          /// 纬度相同
          if (X2 >= X1) {
            return 0
          } else {
            return 180
          }
        }
      }

      tmpValue = Math.atan((Y2 - Y1) / (X2 - X1))
      var resultAngle = Math.abs((tmpValue * 180) / Math.PI)

      if (X2 > X1) {
        if (Y2 >= Y1) {
          /// 第一象限
          return resultAngle
        } else {
          /// 第四象限
          return 360 - resultAngle
        }
      } else {
        /// 第二象限
        if (Y2 >= Y1) {
          return 180 - resultAngle
        } else {
          /// 第三象限
          return 180 + resultAngle
        }
      }
    },
    inPolygon(point, vs) {
      var x = point[0],
        y = point[1]
      var inside = false
      for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0],
          yi = vs[i][1]
        var xj = vs[j][0],
          yj = vs[j][1]

        var intersect = yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
        if (intersect) inside = !inside
      }
      return inside
    }
  }
}
</script>

<style  lang="scss">
.db_dialog {
  background: url('../../../assets/images/boder.png') no-repeat center top;
}
.db_dialog .layui-layer-content {
  background: rgba(0, 0, 0, 0.3);
}
.db_dialog2 {
  background: url('../../../assets/images/boder2.png') no-repeat center top;
}
.db_dialog2 .layui-layer-content {
  background: rgba(0, 0, 0, 0.3);
}
.carflow {
  width: 100%;
  height: 100%;
  color: #fff;
}
#myChart,
#myChart2,
#myChart4 {
  margin: 0px 62px;
}
#myChart3 {
  margin: 25px 12px 0 60px;
}
.progress {
  padding: 2px;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  border: 1px solid #61aacd;
  /* -webkit-box-shadow: inset 0 1px 2px rgba(11, 18, 247, 0.3), 0 1px rgba(255, 255, 255, 0.08); */
  /* box-shadow: inset 0 1px 2px rgba(16, 65, 244, 0.53), 0 1px #3F51B5; */
}
.jdsty {
  width: 34%;
}

.lxSty {
  list-style: none;
  height: 100%;
  margin-top: 5px;
  margin-left: 0px;
}

.lxSty li {
  height: 10%;
  margin-top: 0px;
  margin-left: 9px;
}

.jq {
  float: left;
  color: #fff;
  padding-left: 12px;
  font-weight: 800;
  letter-spacing: 2px;
  font-size: 15px;
  width: 25%;
}

.float1 {
  float: left;
}

.pu {
  color: #14d0e8;
  float: right;
  position: absolute;
  right: 34px;
  font-size: 0.8vw;
}
.progress-bar {
  position: relative;
  height: 16px;
  border-radius: 16px;
  -webkit-transition: 0.4s linear;
  -moz-transition: 0.4s linear;
  -o-transition: 0.4s linear;
  transition: 0.4s linear;
  -webkit-transition-property: width, background-color;
  -moz-transition-property: width, background-color;
  -o-transition-property: width, background-color;
  transition-property: width, background-color;
  -webkit-box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.25), inset 0 1px rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.25), inset 0 1px rgba(255, 255, 255, 0.1);
}

.progress-bar:before,
.progress-bar:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.progress-bar:before {
  bottom: 0;
  /*   background: url("../img/stripes.png") 0 0 repeat; */
  border-radius: 4px 4px 0 0;
}

.progress-bar:after {
  z-index: 2;
  bottom: 45%;
  border-radius: 4px;
  background-image: -webkit-linear-gradient(top, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  background-image: -moz-linear-gradient(top, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  background-image: -o-linear-gradient(top, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
}
.imgcolor {
  background-image: linear-gradient(to bottom, #07ddf8 0, #75e0ee 100%) !important;
}
#five ~ .progress > .progress-bar {
  width: 15%;
  background-color: #fa2e00;
  background-image: linear-gradient(#fa2e00, #fa2e00) !important;
  height: 74%;
  top: 13%;
}

#twentyfive ~ .progress > .progress-bar {
  width: 20%;
  background-color: #21d3dd;
  background-image: linear-gradient(#f78a3d, #f78a3d) !important;
  height: 74%;
  top: 13%;
}

#fifty ~ .progress > .progress-bar {
  width: 25%;
  background-color: #21d3dd;
  background-image: linear-gradient(#daf73d, #daf73d) !important;
  height: 74%;
  top: 13%;
}

#seventyfive ~ .progress > .progress-bar {
  width: 70%;
  background-color: #21d3dd;
  background-image: linear-gradient(#6bf73d, #6bf73d) !important;
  height: 74%;
  top: 13%;
}

#onehundred ~ .progress > .progress-bar {
  width: 90%;
  background-color: #3df74b;
  background-image: linear-gradient(#3df74b, #3df74b) !important;
  height: 74%;
  top: 13%;
}
.radio {
  display: none;
}

.label {
  display: inline-block;
  margin: 0 5px 20px;
  padding: 3px 8px;
  color: #aaa;
  text-shadow: 0 1px black;
  border-radius: 3px;
  cursor: pointer;
}

.radio:checked + .label {
  color: white;
  background: rgba(0, 0, 0, 0.25);
}

.ulSty {
  list-style: none;
  height: 100%;
  margin-top: 35px;
  margin-left: 35px;
}
.ulSty li {
  height: 50px;
}
.badge {
  display: inline-block;
  min-width: 10px;
  padding: 3px 7px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  background-color: #777;
  border-radius: 10px;
}
// WebKit
@-webkit-keyframes progress-bar-stripes {
  from {
    background-position: 40px 0;
  }
  to {
    background-position: 0 0;
  }
}

// Spec and IE10+
@keyframes progress-bar-stripes {
  from {
    background-position: 40px 0;
  }
  to {
    background-position: 0 0;
  }
}

.progress {
  overflow: hidden;
  height: 20px;
  margin-bottom: 20px;
  float: left;
}

// Bar of progress
.progress-bar {
  float: left;
  width: 0%;
  height: 100%;
  text-align: center;
}

.progress-striped .progress-bar,
.progress-bar-striped {
  background-size: 40px 40px;
}
</style>
