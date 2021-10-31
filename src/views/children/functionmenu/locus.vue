<template>
  <div class="locus">
    <table class="layuitable">
      <tbody align="center" valign="middle">
        <tr>
          <td style="font-size: 20px; color: yellow">人员信息</td>
          <td></td>
          <td rowspan="12"><img src="img/dialog/u558.jpg" alt="" width="50" /></td>
        </tr>

        <tr>
          <td>姓名：</td>
          <td>马增军</td>
        </tr>
        <tr>
          <td>工号：</td>
          <td>20859</td>
        </tr>
        <tr>
          <td>职务：</td>
          <td>辅助员工</td>
        </tr>
        <td style="font-size: 20px; color: yellow">人员信息</td>
        <td></td>
        <tr>
          <td>总里程：</td>
          <td>7320.04</td>
        </tr>
        <tr>
          <td>剩余里程：</td>
          <td>7320.04</td>
        </tr>
        <tr>
          <td>当前站：</td>
          <td>井口上（环）</td>
        </tr>
        <tr>
          <td>下一站：</td>
          <td>井口上（环）</td>
        </tr>
        <tr>
          <td>下一站距离：</td>
          <td>405.25</td>
        </tr>
        <tr>
          <td>下一站到站：</td>
          <td>2021-07-19 05:30:31</td>
        </tr>
        <tr>
          <td>所在巷道：</td>
          <td>副井</td>
        </tr>
      </tbody>
    </table>

    <button type="button" @click="startpos" class="layui-btn btn1">开始</button>
    <button type="button" @click="reducepos" class="layui-btn btn2">减速</button>
    <button type="button" @click="addpos" class="layui-btn btn4">加速</button>
    <button type="button" @click="stoppos" class="layui-btn btn5">停止</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'locus',
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  data() {
    return {
      isshow: false,
      issel1: false,
      pointList: [],
      showpeopleid: window.showpeopleid || -1,
      dialogindex: null
    }
  },
  mounted() {},
  watch: {
    getNowMenuName(newV, oldV) {
      if (newV === 'locus') {
        this.show()
        this.isshow = true
      } else {
        if (this.isshow) {
          this.hide()
          this.isshow = false
        }
      }
    },
    showpeopleid: function (newVal, oldVal) {
      if (newVal === -1) {
        this.setNowMenuName('locus')
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
          title: '轨迹回放信息',
          shade: 0,
          skin: 'cv_dialog',
          area: ['380px', 'auto'],
          offset: ['130px', '60px'],
          zIndex: 2001,
          content: $('.locus'),
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
      if (window.cesiumvariate.animation !== null) {
        viewer.entities.remove(window.cesiumvariate.animation)
        window.cesiumvariate.animation = null
      }
      if (window.cesiumvariate.modelEntity !== null) {
        viewer.entities.remove(window.cesiumvariate.modelEntity)
        window.cesiumvariate.modelEntity = null
      }
      if (window.cesiumvariate.lineentity && window.cesiumvariate.lineentity !== null) {
        viewer.entities.remove(window.cesiumvariate.lineentity)
        window.cesiumvariate.lineentity = null
      }
      if (window.cesiumvariate.pathentity && window.cesiumvariate.pathentity !== null) {
        viewer.entities.remove(window.cesiumvariate.pathentity)
        window.cesiumvariate.pathentity = null
      }
      viewer.clock.shouldAnimate = false
    },
    succCallback() {
      var _this = this
      // Cesium.Resource.fetchJson('data/line.json').then(function (jsonData) {
      // _this.pointList = jsonData
      _this.pointList = [
        { longitude: 112.7108292, latitude: 35.69518, height: -304.8428 },
        { longitude: 112.7107317, latitude: 35.6949846, height: -308.1725 },
        { longitude: 112.7105318, latitude: 35.6945681, height: -313.185 },
        { longitude: 112.7101957, latitude: 35.6939195, height: -325.7606 },

        { longitude: 112.7100971, latitude: 35.693736, height: -330.338 },
        { longitude: 112.710005, latitude: 35.693539, height: -329.9675 },
        { longitude: 112.7099645, latitude: 35.6934588, height: -331.2666 },
        { longitude: 112.7094939, latitude: 35.6925453, height: -345.6278 },
        { longitude: 112.7089354, latitude: 35.691394, height: -345.5472 },
        { longitude: 112.7083987, latitude: 35.6903267, height: -336.748 },
        { longitude: 112.7083586, latitude: 35.6902516, height: -336.1945 },
        { longitude: 112.7077414, latitude: 35.6890116, height: -327.5936 },

        { longitude: 112.707481, latitude: 35.6885152, height: -324.4203 },
        { longitude: 112.7070284, latitude: 35.6876582, height: -320.6443 },
        { longitude: 112.7065221, latitude: 35.6866636, height: -319.9562 },
        { longitude: 112.7054782, latitude: 35.6845776, height: -320.9151 },
        { longitude: 112.7044007, latitude: 35.6824008, height: -331.4701 },
        { longitude: 112.7034027, latitude: 35.6804461, height: -336.7989 },
        { longitude: 112.7027219, latitude: 35.6790724, height: -335.8359 },
        { longitude: 112.702978, latitude: 35.6789809, height: -334.4832 },
        { longitude: 112.7032436, latitude: 35.6789193, height: -332.4746 },
        { longitude: 112.7032825, latitude: 35.6790179, height: -330.9346 },
        { longitude: 112.7033659, latitude: 35.67929, height: -330.8945 },
        { longitude: 112.7033858, latitude: 35.6793483, height: -330.8884 },
        { longitude: 112.7034209, latitude: 35.6794042, height: -329.9834 },
        { longitude: 112.7034378, latitude: 35.679482, height: -331.5909 },
        { longitude: 112.7052521, latitude: 35.6791071, height: -333.6503 },
        { longitude: 112.7057055, latitude: 35.6790078, height: -325.2326 },
        { longitude: 112.7074107, latitude: 35.6786342, height: -317.2294 },
        { longitude: 112.7081901, latitude: 35.678465, height: -312.9999 },
        { longitude: 112.7100018, latitude: 35.6780659, height: -295.8632 },
        { longitude: 112.7113151, latitude: 35.6777839, height: -289.8966 },
        { longitude: 112.7117378, latitude: 35.6776827, height: -287.8127 },
        { longitude: 112.7118477, latitude: 35.6776827, height: -287.5944 },
        { longitude: 112.71467, latitude: 35.6770699, height: -277.1478 },
        { longitude: 112.7156803, latitude: 35.6768467, height: -266.5502 },
        { longitude: 112.7161921, latitude: 35.6767265, height: -248.0544 },
        { longitude: 112.716297, latitude: 35.6767021, height: -246.7608 },
        { longitude: 112.7184143, latitude: 35.6762562, height: -236.389 },
        { longitude: 112.7204159, latitude: 35.675839, height: -222.0712 },
        { longitude: 112.7208118, latitude: 35.6757327, height: -221.1373 },
        { longitude: 112.7265633, latitude: 35.674259, height: -1.4658 }
      ]
      _this.loadTaskRout()
      _this.setClock()
      // })
    },

    loadTaskRout() {
      var _this = this
      var start = CTMap.JulianDate.fromDate(new Date())
      var keyPos = new CTMap.SampledPositionProperty()
      keyPos.backwardExtrapolationDuration = 2
      keyPos.backwardExtrapolationType = CTMap.ExtrapolationType.HOLD
      keyPos.forwardExtrapolationType = CTMap.ExtrapolationType.HOLD
      var orientation = new CTMap.VelocityOrientationProperty(keyPos)
      var points = []
      for (var j = 0; j < _this.pointList.length; j++) {
        var ctime = CTMap.JulianDate.addSeconds(start, 8 + j * 6, new CTMap.JulianDate())

        var position = Cesium.Cartesian3.fromDegrees(_this.pointList[j].longitude, _this.pointList[j].latitude, _this.pointList[j].height)
        points.push(position)
        keyPos.addSample(ctime, position)
      }

      window.cesiumvariate.modelEntity = viewer.entities.add({
        position: keyPos,
        // show: false,
        orientation: orientation,
        model: {
          uri: 'data/Cesium_Man.glb',
          minimumPixelSize: 64
        }
      })
      var offset = 0

      window.cesiumvariate.animation = viewer.entities.add({
        position: keyPos,
        // show: false,
        orientation: orientation,
        label: {
          text: '人员A',
          font: '16px 微软雅黑',
          fillColor: CTMap.Color.DEEPSKYBLUE,
          outlineColor: CTMap.Color.BLACK,
          outlineWidth: 1.0,
          pixelOffset: new CTMap.Cartesian2(0, -40),
          showBackground: true,
          backgroundColor: CTMap.Color.BLACK.withAlpha(0.9),
          backgroundPadding: new CTMap.Cartesian2(2, 2),
          disableDepthTestDistance: Number.POSITIVE_INFINITY
        }
        // corridor: {
        //   positions: points,
        //   width: 2.0,
        //   material: new CTMap.StripeMaterialProperty({
        //     evenColor: CTMap.Color.fromCssColorString('#FF0000').withAlpha(0.8),
        //     oddColor: CTMap.Color.fromCssColorString('#9FEE00').withAlpha(0.8),
        //     repeat: 40,
        //     orientation: CTMap.StripeOrientation.VERTICAL,
        //     offset: new CTMap.CallbackProperty((time) => {
        //       return (offset += 0.0008)
        //     }, false)
        //   })
        // }
        // ,
        // ellipse: {
        //   semiMajorAxis: 20,
        //   semiMinorAxis: 20,
        //   //material:CTMap.Color.RED.withAlpha(0.3),
        //   material: CTMap.Color.LIME.withAlpha(0.15)
        // }
        //   rectangle: {
        //     coordinates: new CTMap.CallbackProperty(this.getRectangle, false),
        //     material: CTMap.Color.RED.withAlpha(0.3),
        //     //rotation: new CTMap.CallbackProperty(this.getRotation, false),
        //     classificationType: CTMap.ClassificationType.BOTH
        // }
      })

      var times = keyPos._property._times
      if (window.cesiumvariate.lineentity && window.cesiumvariate.lineentity !== null) {
        viewer.entities.remove(window.cesiumvariate.lineentity)
        window.cesiumvariate.lineentity = null
      }
      window.cesiumvariate.lineentity = viewer.entities.add({
        availability: new Cesium.TimeIntervalCollection([
          new Cesium.TimeInterval({
            start: start,
            stop: times[times.length - 1],
            isStartIncluded: true,
            isStopIncluded: false
          })
        ]),
        position: keyPos,
        // show: false,
        orientation: orientation,
        path: {
          show: true,
          // positions: points,
          leadTime: 8 + _this.pointList.length * 6, // 飞机将要经过的路径，路径存在的时间
          trailTime: 0, // 飞机已经经过的路径，路径存在的时间
          width: 2.0,
          material: CTMap.Color.fromCssColorString('#FF0000').withAlpha(0.8)
          // clampToGround:true,
          // zIndex: 10
        }
      })

      if (window.cesiumvariate.pathentity && window.cesiumvariate.pathentity !== null) {
        viewer.entities.remove(window.cesiumvariate.pathentity)
        window.cesiumvariate.pathentity = null
      }
      // var pathPosition = new Cesium.SampledPositionProperty();
      window.cesiumvariate.pathentity = viewer.entities.add({
        availability: new Cesium.TimeIntervalCollection([
          new Cesium.TimeInterval({
            start: start,
            stop: times[times.length - 1],
            isStartIncluded: true,
            isStopIncluded: false
          })
        ]),
        position: keyPos,
        orientation: orientation,
        path: {
          show: true,
          leadTime: 0, // 飞机将要经过的路径，路径存在的时间
          trailTime: 8 + _this.pointList.length * 6, // 飞机已经经过的路径，路径存在的时间
          resolution: 1,
          width: 5.0,
          material: CTMap.Color.fromCssColorString('#9FEE00').withAlpha(1)
          // material: new Cesium.PolylineOutlineMaterialProperty({
          //   color: Cesium.Color.fromAlpha(Cesium.Color.LIGHTSKYBLUE, 0.5),
          //   outlineWidth: 1,
          //   outlineColor: Cesium.Color.RED
          // }),
          // clampToGround: true,
          // zIndex: 11
        }
      })

      // 添加polygon
    },
    setClock() {
      var _this = this
      var times = window.cesiumvariate.modelEntity.position._property._times
      var start = times[0]
      var end = times[times.length - 1]
      viewer.clock.startTime = start
      viewer.clock.stopTime = end
      viewer.clock.currentTime = start
      viewer.clock.clockRange = CTMap.ClockRange.LOOP_STOP // CLAMPED
      viewer.clock.multiplier = viewer.clock.multiplier // viewer.clock.multiplier / 2
      viewer.flyTo(window.cesiumvariate.animation)
      viewer.clock.shouldAnimate = false
    },
    istracked1() {
      this.issel1 = true
      viewer.trackedEntity = window.cesiumvariate.modelEntity
    },
    istracked2() {
      this.issel1 = false
      viewer.trackedEntity = null
    },
    startpos() {
      viewer.clock.shouldAnimate = true
    },

    reducepos() {
      viewer.clock.multiplier = viewer.clock.multiplier * 0.9
    },
    addpos() {
      viewer.clock.multiplier = viewer.clock.multiplier * 1.1
    },
    stoppos() {
      viewer.clock.shouldAnimate = false
    }
  }
}
</script>

<style  lang="scss">
.locus {
  width: 100%;
  height: 100%;
  color: #fff;
  overflow: hidden;
  .layuitable {
    margin: 5px 0 5px 20px;
  }
  .layui-btn {
    margin-top: 6px;
    margin-left: 16px;
    margin-bottom: 6px;
    height: 25px;
    line-height: 25px;
    width: 70px;
    padding: 0 9px;
  }
}
</style>
