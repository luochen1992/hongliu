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
            _this.succCallback('data/zuobiao.json')
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
    succCallback(url) {
      var _this = this
      // Cesium.Resource.fetchJson('data/line.json').then(function (jsonData) {
      // _this.pointList = jsonData
        // $.get(url, {}, function (res) {

        // var json = res
        // var length = json.Map.length
        // for (var j = 0; j < length; j++) {
        //       var obj = json.Map[j]
        //       var x = obj.longitude
        //       var y = obj.latitude
        //       var z = obj.height
        //       var coordList = []
        //       var pos = window.LocalToDegree(x, y, z - 922)
        //       coordList.push(pos.x)
        //       coordList.push(pos.y)
        //       coordList.push(pos.z)
        //     }
        //   })
        //   // eslint-disable-next-line no-undef
        //   _this.polyline = coordList
      _this.pointList = [
{ longitude:112.7266045	, latitude:35.6742501, height:-1.9451	},
{ longitude:112.7234768 , latitude:35.6750485 , height:-118.9405},
{ longitude:112.7207211	, latitude:35.6757521, height:-222.0094	},
{ longitude:112.7206337	, latitude:35.6757756, height:-223.6124	},
{ longitude:112.7205393	, latitude:	35.6758000, height:-223.6427	},
{ longitude:112.7204560	, latitude:35.6758208, height:-223.9540	},
{ longitude:112.7203162	, latitude:35.6758516, height:-224.9440	},
{ longitude:112.7202306	, latitude:35.6758699, height:-225.5033},
{ longitude:112.7194165 , latitude:35.6760437 , height:-230.3774 },
{ longitude:112.7171248 , latitude:35.6765317 , height:-244.0868 },
{ longitude:112.7170873 , latitude:35.6765387 , height:-244.4822 },
{ longitude:112.7170406 , latitude:35.6765496 , height:-244.9898 },
{ longitude:112.7162441 , latitude:35.6767179 , height:-257.3574},

{ longitude:112.7157994	, latitude:35.6768116	, height:-264.2617	},
{ longitude:112.7151897	, latitude:35.6769404	, height:-273.7306	},
{ longitude:112.7151563	, latitude:35.6769479	, height:-274.1451},
{ longitude:112.7151038	, latitude:35.6769586	, height:-274.7921	},
{ longitude:112.7146554	, latitude:35.6770522	, height:-278.9187	},
{ longitude:112.7146177	, latitude:35.6770602	, height:-279.1612	},
{ longitude:112.7145665	, latitude:35.6770712	, height:-279.4852	},
{ longitude:112.7137516	, latitude:35.6772483	, height:-282.5052	},
{ longitude:112.7126975	, latitude:35.6774777	, height:-286.4191	},
{ longitude:112.7126120	, latitude:35.6774968	, height:-286.7071	},
{ longitude:112.7118385	, latitude:35.6776683	, height:-289.0717	},
{ longitude:112.7117536	, latitude:35.6776872	, height:-289.4400},
{ longitude: 112.7106618 , latitude:35.6779278, height: -295.5658 },
{ longitude: 112.7096769 , latitude:35.6781450, height:-301.0927 },
{ longitude:112.7095916 , latitude:35.6781638, height:-301.6736},

{ longitude:112.7074671	, latitude:35.6786313	, height:	-318.8629	},
{ longitude:112.7074276	, latitude:35.6786390	, height:-319.1666	},
{ longitude:112.7073816	, latitude:35.6786502	, height:-319.5310	},
{ longitude:112.7064820	, latitude:35.6788456	, height:-326.2990	},
{ longitude:112.7052817	, latitude:35.6791065	, height:-335.3307},
{ longitude:112.7052411	, latitude:35.6791153	, height:-335.4711	},
{ longitude:112.7051949	, latitude:35.6791255	, height:-335.6311	},
{ longitude:112.7049558	, latitude:35.6791752	, height:-335.4979	},
{ longitude:112.7048699	, latitude:35.6791934	, height:-335.4066	},
{ longitude:112.7048489	, latitude:35.6791980	, height:-335.3802	},
{ longitude:112.7047633	, latitude:35.6792161	, height:-335.2708	},
{ longitude:112.7047294	, latitude:35.6792233	, height:-335.2281	},
{ longitude:112.7046437	, latitude:35.6792416	, height:-335.1188	},
{ longitude:112.7034846	, latitude:35.6794879	, height:-333.6421	},
{ longitude:112.7034459	, latitude:35.6794871	, height:-333.5302	},
{ longitude:112.7034303	, latitude:35.6794614	, height:-333.4168	},
{ longitude:112.7033958	, latitude:35.6793603	, height:-332.9255},

{ longitude:112.7033816	, latitude:35.6793259	, height:	-332.8699	},
{ longitude:112.7033534	, latitude:35.6793333	, height:-332.9757	},
{ longitude:112.7029372	, latitude:35.6794259	, height:-335.8691	},
{ longitude:112.7029048	, latitude:35.6794394	, height:	-336.0279	},
{ longitude:112.7028867	, latitude:	35.6794665	, height:-336.0984	},
{ longitude:112.7028234	, latitude:35.6795995	, height:-336.1091	},
{ longitude:112.7027991	, latitude:35.6796260	, height:-336.1760	},
{ longitude:112.7027668	, latitude:35.6796427	, height:-336.2513	},
{ longitude:112.7027448	, latitude:35.6796482	, height:-336.3254	},
{ longitude:112.7027268	, latitude:35.6796617	, height:-336.7271	},
{ longitude:112.7027380	, latitude:	35.6796849	, height:-336.9230	},
{ longitude:112.7028021	, latitude:35.6798095	, height:-338.9415	},
{ longitude:112.7028182	, latitude:35.6798446	, height:-339.5898	},
{ longitude:112.7028348	, latitude:35.6798779	, height:-339.6003	},
{ longitude:112.7029687	, latitude:	35.6801442	, height:-340.4847	},
{ longitude:112.7029831	, latitude:35.6801775	, height:-340.4994	},
{ longitude:112.7030019	, latitude:35.6802120	, height:-340.5029},
{ longitude:112.7033904 , latitude:35.6809785 , height:-338.3687 },
{ longitude:112.7039513 , latitude:35.6820879 , height:-335.2706 },
{ longitude:112.7039852 , latitude:35.6821546 , height:-335.2307 },
{ longitude:112.7046857 , latitude: 35.6835403 , height: -337.3549 },
{ longitude:112.7056142 , latitude:35.6853765 , height:-340.1571 },
{ longitude:112.7062283 , latitude:35.6865912 , height:-342.0079 },
{ longitude:112.7071252 , latitude:35.6883651 , height:-344.7029 },
{ longitude:112.7075718 , latitude:35.6892486 , height:-346.0412 },
{ longitude:112.7079507 , latitude:35.6899973 , height:-347.1787 },
{ longitude:112.7085704 , latitude:35.6912230 , height:-349.0337 },
{ longitude:112.7086052 , latitude:35.6912914 , height:-348.7061},
{ longitude:112.7088867 , latitude:35.6918473 , height:-342.4980 },
{ longitude:112.7092629 , latitude:35.6925900 , height:-334.2010},

{ longitude:112.7095677 , latitude:35.6931919 , height:-327.4779 },
{ longitude:112.7098722 , latitude:35.6937931 , height:-320.7618 },
{ longitude:112.7103646 , latitude:35.6947651 , height:-309.9016 },
{ longitude:112.7108281 , latitude:35.6956799 , height:-299.6770 },
{ longitude:112.7111863 , latitude:35.6963880 , height:-291.7652},



        // { longitude: 112.7108292, latitude: 35.69518, height: -304.8428 },
        // { longitude: 112.7107317, latitude: 35.6949846, height: -308.1725 },
        // { longitude: 112.7105318, latitude: 35.6945681, height: -313.185 },
        // { longitude: 112.7101957, latitude: 35.6939195, height: -325.7606 },

        // { longitude: 112.7100971, latitude: 35.693736, height: -330.338 },
        // { longitude: 112.710005, latitude: 35.693539, height: -329.9675 },
        // { longitude: 112.7099645, latitude: 35.6934588, height: -331.2666 },
        // { longitude: 112.7094939, latitude: 35.6925453, height: -345.6278 },
        // { longitude: 112.7089354, latitude: 35.691394, height: -345.5472 },
        // { longitude: 112.7083987, latitude: 35.6903267, height: -336.748 },
        // { longitude: 112.7083586, latitude: 35.6902516, height: -336.1945 },
        // { longitude: 112.7077414, latitude: 35.6890116, height: -327.5936 },

        // { longitude: 112.707481, latitude: 35.6885152, height: -324.4203 },
        // { longitude: 112.7070284, latitude: 35.6876582, height: -320.6443 },
        // { longitude: 112.7065221, latitude: 35.6866636, height: -319.9562 },
        // { longitude: 112.7054782, latitude: 35.6845776, height: -320.9151 },
        // { longitude: 112.7044007, latitude: 35.6824008, height: -331.4701 },
        // { longitude: 112.7034027, latitude: 35.6804461, height: -336.7989 },
        // { longitude: 112.7027219, latitude: 35.6790724, height: -335.8359 },
        // { longitude: 112.702978, latitude: 35.6789809, height: -334.4832 },
        // { longitude: 112.7032436, latitude: 35.6789193, height: -332.4746 },
        // { longitude: 112.7032825, latitude: 35.6790179, height: -330.9346 },
        // { longitude: 112.7033659, latitude: 35.67929, height: -330.8945 },
        // { longitude: 112.7033858, latitude: 35.6793483, height: -330.8884 },
        // { longitude: 112.7034209, latitude: 35.6794042, height: -329.9834 },
        // { longitude: 112.7034378, latitude: 35.679482, height: -331.5909 },
        // { longitude: 112.7052521, latitude: 35.6791071, height: -333.6503 },
        // { longitude: 112.7057055, latitude: 35.6790078, height: -325.2326 },
        // { longitude: 112.7074107, latitude: 35.6786342, height: -317.2294 },
        // { longitude: 112.7081901, latitude: 35.678465, height: -312.9999 },
        // { longitude: 112.7100018, latitude: 35.6780659, height: -295.8632 },
        // { longitude: 112.7113151, latitude: 35.6777839, height: -289.8966 },
        // { longitude: 112.7117378, latitude: 35.6776827, height: -287.8127 },
        // { longitude: 112.7118477, latitude: 35.6776827, height: -287.5944 },
        // { longitude: 112.71467, latitude: 35.6770699, height: -277.1478 },
        // { longitude: 112.7156803, latitude: 35.6768467, height: -266.5502 },
        // { longitude: 112.7161921, latitude: 35.6767265, height: -248.0544 },
        // { longitude: 112.716297, latitude: 35.6767021, height: -246.7608 },
        // { longitude: 112.7184143, latitude: 35.6762562, height: -236.389 },
        // { longitude: 112.7204159, latitude: 35.675839, height: -222.0712 },
        // { longitude: 112.7208118, latitude: 35.6757327, height: -221.1373 },
        // { longitude: 112.7265633, latitude: 35.674259, height: -1.4658 }
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
