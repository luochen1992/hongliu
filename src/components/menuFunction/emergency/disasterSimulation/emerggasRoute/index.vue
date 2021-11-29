<template>
  <div v-if="showdialog" class="gasRoute">
    <div class="gas-title">
      <div class="tit-label">瓦斯应急路线</div>
      <div class="tit-close">
        <i class="el-icon-close" @click="close"></i>
      </div>
    </div>
    <div class="gas-cen">
      <div class="gasItem" :class="isshow1 ? 'gasItemsel' : ''" @click="gasshow">瓦斯泄露点</div>
      <div class="gasItem" :class="isshow2 ? 'gasItemsel' : ''" @click="gasRoute">逃灾路线</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'emerggasRoute',
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  data() {
    return {
      isshow: false,
      isshow1: false,
      isshow2: false,
      showdialog: false
    }
  },
  mounted() {},
  watch: {
    getNowMenuName(newV, oldV) {
      if (newV === 'emerggasRoute') {
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
      window.e_route = {}
      if (!_this.showdialog) {
        _this.showdialog = true
        _this.succCallback()
      }
    },
    close() {
      this.setNowMenuName('')
    },
    // 隐藏
    hide() {
      this.isshow1 = false
      this.isshow2 = false
      this.showdialog = false
      viewer.clock.shouldAnimate = false
      if (window.e_route.gasPs) {
        window.e_route.gasPs.remove()
        window.e_route.gasPs = null
      }
      if (window.e_route !== undefined) {
        
        if (window.e_route.gasroute) {
          viewer.entities.remove(window.e_route.gasroute)
          window.e_route.gasroute = null
        }
        if (window.e_route.gasmodelEntity) {
          viewer.entities.remove(window.e_route.gasmodelEntity)
          window.e_route.gasmodelEntity = null
        }
      }
    },
    succCallback() {
      var _this = this
      _this.point = { longitude: 112.700725, latitude: 35.6981808, height: -367.4591 }
      _this.polyline = [
        { longitude:112.7096853, latitude:35.6969674 , height:-305.4866},
        { longitude:	112.7090409	, latitude:35.6956949	, height:	-308.6565},	
        { longitude:112.7086802	, latitude: 35.6949820	, height:-310.4350	},
        { longitude:112.7083423	, latitude:35.6943142	, height:-312.0959	},
        { longitude:112.7078927	, latitude:	35.6934255	, height:-314.3029	},
        { longitude:112.7075541	, latitude:35.6927570	, height:-315.9624	},
        { longitude:112.7069512	, latitude:35.6915655	, height:-318.9218	},
        { longitude:112.7064452	, latitude: 35.6905660	, height:-321.4005},	
        { longitude:112.7056408	, latitude:35.6889764	, height:-325.3395	},
        { longitude:112.7051805	, latitude:35.6880671	, height:-327.5881	},
        { longitude:112.7049280	, latitude:35.6875677	, height:-328.8234	},
        { longitude:112.7045191	, latitude:35.6867599	, height:-330.8178	},
        { longitude:112.7041274	, latitude:35.6859859	, height:-332.7300	},
        { longitude:112.7038748	, latitude:35.6854865	, height:-333.9616},
        { longitude:112.7022304	, latitude:35.6822367	, height:-341.9662	},
        { longitude:112.7017508	, latitude:35.6812888	, height:-344.2989	},
        { longitude:112.7013508	, latitude:35.6804989	, height:-346.2384	},
        { longitude:112.7013372	, latitude:35.6804644	, height:-346.1817	},
        { longitude:112.7013905	, latitude:35.6804713	, height:-345.7367	},
        { longitude:112.7014815	, latitude:35.6804820	, height:-344.7786	},
        { longitude:112.7015197	, latitude:35.6804816	, height:-344.4582	},
        { longitude:112.7015174	, latitude:35.6804551	, height:-344.2931	},
        { longitude:112.7012959	, latitude:35.6800212	, height:-345.2816	},
        { longitude:112.7012830	, latitude:35.6799875	, height:-345.2854	},
        { longitude:112.7013234	, latitude:35.6799776	, height:-344.7432	},
        { longitude:112.7016158	, latitude:35.6799104	, height:	-340.5953	},
        { longitude:112.7016481	, latitude:35.6799063	, height:-340.2979	},
        { longitude:112.7016987	, latitude:35.6798911	, height:-339.8701	},
        { longitude:112.7018040	, latitude:35.6798661	, height:-339.5129	},
        { longitude: 112.7018459	, latitude:35.6798568	, height:-339.3727	},
        { longitude:112.7018891	, latitude:35.6798464	, height:-339.2270	},
        { longitude:112.7022144	, latitude:35.6797737	, height:-338.1465	},
        { longitude:112.7022502	, latitude:35.6797650	, height:-338.0590},
        { longitude:112.7022995	, latitude:35.6797537	, height:-337.8588	},
        { longitude:112.7024788	, latitude:35.6797115	, height:-337.2421	},
        { longitude:112.7025637	, latitude:35.6796910	, height:-336.9514	},
        { longitude:112.7026815	, latitude:35.6796631	, height:-336.5493	},
        { longitude:112.7027193	, latitude:35.6796537	, height:-336.6301},

        { longitude:112.7027668	, latitude:35.6796427	, height:-336.2513	},
        { longitude:112.7027991	, latitude:35.6796260	, height:-336.1760	},
        { longitude:112.7028234	, latitude:35.6795995	, height:-336.1091	},
        { longitude:112.7028867	, latitude:	35.6794665	, height:-336.0984	},
        { longitude:112.7029048	, latitude:35.6794394	, height:	-336.0279	},
        { longitude:112.7029372	, latitude:35.6794259	, height:-335.8691	},
        { longitude:112.7033534	, latitude:35.6793333	, height:-332.9757	},
        { longitude:112.7033816	, latitude:35.6793259	, height:	-332.8699	},

        { longitude:112.7033958	, latitude:35.6793603	, height:-332.9255},
        { longitude:112.7034303	, latitude:35.6794614	, height:-333.4168	},
        { longitude:112.7034459	, latitude:35.6794871	, height:-333.5302	},
        { longitude:112.7034846	, latitude:35.6794879	, height:-333.6421	},
        { longitude:112.7046437	, latitude:35.6792416	, height:-335.1188	},
        { longitude:112.7047294	, latitude:35.6792233	, height:-335.2281	},
        { longitude:112.7047633	, latitude:35.6792161	, height:-335.2708	},
        { longitude:112.7048489	, latitude:35.6791980	, height:-335.3802	},
        { longitude:112.7048699	, latitude:35.6791934	, height:-335.4066	},
        { longitude:112.7049558	, latitude:35.6791752	, height:-335.4979	},
        { longitude:112.7051949	, latitude:35.6791255	, height:-335.6311	},
        { longitude:112.7052411	, latitude:35.6791153	, height:-335.4711	},
        { longitude:112.7052817	, latitude:35.6791065	, height:-335.3307},
        { longitude:112.7064820	, latitude:35.6788456	, height:-326.2990	},
        { longitude:112.7073816	, latitude:35.6786502	, height:-319.5310	},
        { longitude:112.7074276	, latitude:35.6786390	, height:-319.1666	},
        { longitude:112.7074671	, latitude:35.6786313	, height:	-318.8629	},
        { longitude:112.7095916 , latitude:35.6781638, height:-301.6736},
        { longitude: 112.7096769 , latitude:35.6781450, height:-301.0927 },
        { longitude: 112.7106618 , latitude:35.6779278, height: -295.5658 },
        { longitude:112.7117536	, latitude:35.6776872	, height:-289.4400},
        { longitude:112.7118385	, latitude:35.6776683	, height:-289.0717	},
        { longitude:112.7126120	, latitude:35.6774968	, height:-286.7071	},
        { longitude:112.7126975	, latitude:35.6774777	, height:-286.4191	},
        { longitude:112.7137516	, latitude:35.6772483	, height:-282.5052	},
        { longitude:112.7145665	, latitude:35.6770712	, height:-279.4852	},
        { longitude:112.7146177	, latitude:35.6770602	, height:-279.1612	},
        { longitude:112.7146554	, latitude:35.6770522	, height:-278.9187	},
        { longitude:112.7151038	, latitude:35.6769586	, height:-274.7921	},
        { longitude:112.7151563	, latitude:35.6769479	, height:-274.1451},
        { longitude:112.7151897	, latitude:35.6769404	, height:-273.7306	},
        { longitude:112.7157994	, latitude:35.6768116	, height:-264.2617	},
        { longitude:112.7162441 , latitude:35.6767179 , height:-257.3574},
        { longitude:112.7170406 , latitude:35.6765496 , height:-244.9898 },
        { longitude:112.7170873 , latitude:35.6765387 , height:-244.4822 },
        { longitude:112.7171248 , latitude:35.6765317 , height:-244.0868 },
        { longitude:112.7194165 , latitude:35.6760437 , height:-230.3774 },
        { longitude:112.7202306	, latitude:35.6758699, height:-225.5033},
        { longitude:112.7203162	, latitude:35.6758516, height:-224.9440	},
        { longitude:112.7204560	, latitude:35.6758208, height:-223.9540	},
        { longitude:112.7205393	, latitude:	35.6758000, height:-223.6427	},
        { longitude:112.7206337	, latitude:35.6757756, height:-223.6124	},
        { longitude:112.7207211	, latitude:35.6757521, height:-222.0094	},
        { longitude:112.7234768 , latitude:35.6750485 , height:-118.9405},
        { longitude:112.7266045	, latitude:35.6742501, height:-1.9451	},
      ]
      _this.end = CTMap.JulianDate.fromDate(new Date())
      _this.start = CTMap.JulianDate.addSeconds(_this.end, -(2 + _this.polyline.length * 3), new CTMap.JulianDate())
    },
    // 水灾
    gasshow() {
      if (this.isshow1) {
        if (window.e_route.gasPs) {
          viewer.scene.primitives.remove(window.e_route.gasPs)
          window.e_route.gasPs = null
        }
        this.isshow1 = false
        return
      }
      let LineList=[112.7130880,35.6746824,-289.57,
        112.7135756,35.6752652,-290.27,
        112.7139419,35.6757108,-289.69];
      let img = 'img/cloud10.png';
      let speed = 1.0 / 3600 / 130;
      window.e_route.gasPs = new CTMap.wasiEffects(viewer);
      window.e_route.gasPs.addWasi(LineList,img,speed);
      

     //112.7130880,35.6746824,-289.57
      //定位飞行
      window.viewer.camera.flyTo({
        destination: window.Cesium.Cartesian3.fromDegrees(112.7130880,35.6746824,178.57), // 经度、纬度、高度
        orientation: {
          heading: window.Cesium.Math.toRadians(0), // 绕垂直于地心的轴旋转
          pitch: window.Cesium.Math.toRadians(-90), // 绕纬度线旋转
          roll: 0 // 绕经度线旋转
        },
        duration: 1 // 飞行到目的地花费时间3秒
      })
      //添加时钟
      this.setClock()
    },
     setClock() {
      viewer.clock.startTime = this.start
      viewer.clock.stopTime = this.end
      viewer.clock.currentTime = this.start
      viewer.clock.clockRange = CTMap.ClockRange.UNBOUNDED
      viewer.clock.multiplier = 1 
      viewer.clock.shouldAnimate = true
    },
    // 逃灾路线
    gasRoute() {
      if (this.isshow2) {
        if (window.e_route.gasroute) {
          viewer.entities.remove(window.e_route.gasroute)
          window.e_route.gasroute = null
        }
        if (window.e_route.gasmodelEntity) {
          viewer.entities.remove(window.e_route.gasmodelEntity)
          window.e_route.gasmodelEntity = null
          window.pop_position = null
        }
        this.isshow2 = false
        return
      }
      this.isshow2 = true
      var _this = this
      var polyline = this.polyline
      const ptList = []

      var keyPos = new CTMap.SampledPositionProperty()
      keyPos.backwardExtrapolationDuration = 2
      keyPos.backwardExtrapolationType = CTMap.ExtrapolationType.HOLD
      keyPos.forwardExtrapolationType = CTMap.ExtrapolationType.HOLD
      let orientation = new CTMap.VelocityOrientationProperty(keyPos)

      for (var j = 0; j < polyline.length; j++) {
        var position = Cesium.Cartesian3.fromDegrees(polyline[j].longitude, polyline[j].latitude, polyline[j].height)

        let ctime = CTMap.JulianDate.addSeconds(_this.start, 1 + j * 3, new CTMap.JulianDate())
        keyPos.addSample(ctime, position)
        ptList.push(position)
      }
      let offset = 0
      window.e_route.gasroute = viewer.entities.add({
        availability: new Cesium.TimeIntervalCollection([
          new Cesium.TimeInterval({
            start: _this.start,
            stop: _this.end,
            isStartIncluded: true,
            isStopIncluded: false
          })
        ]),
        position: keyPos,
        //show: false,
        orientation: orientation,
        path: {
          show: true,
          leadTime: 2 + polyline.length * 2,
          trailTime: 2 + polyline.length * 2,
          width: 6.0,
          material: new CTMap.StripeMaterialProperty({
            evenColor: CTMap.Color.fromCssColorString('#FF0000').withAlpha(0.8),
            oddColor: CTMap.Color.fromCssColorString('#9FEE00').withAlpha(0.8),
            repeat: 40,
            orientation: CTMap.StripeOrientation.VERTICAL,
            offset: new CTMap.CallbackProperty((time) => {
              return (offset += 0.0008)
            }, false)
          })
        }
      })
      _this.peopleAnimation(keyPos, orientation)
    },
    // 避险动画
    peopleAnimation(keyPos, orientation) {
      window.e_route.gasmodelEntity = viewer.entities.add({
        position: keyPos,
        orientation: orientation,
        model: {
          uri: 'data/矿工2/duizhang01.gltf',
          minimumPixelSize: 64
        }
      })
      viewer.clock.onTick.addEventListener(this.clockonTick)
      viewer.clock.clockRange = CTMap.ClockRange.UNBOUNDED // CLAMPED
      viewer.clock.currentTime = this.start
    },
    clockonTick(clock) {
      var _this = this
      if (window.e_route.gasmodelEntity && window.e_route.gasmodelEntity.orientation) {
        if (window.e_route.gasmodelEntity.position.getValue(clock.currentTime) && clock._currentTime <= clock.stopTime) {
          var p1 = window.e_route.gasmodelEntity.position.getValue(clock.currentTime)
          window.pop_position = p1
          var o1 = window.e_route.gasmodelEntity.orientation.getValue(clock.currentTime)
          let transform = Cesium.Transforms.eastNorthUpToFixedFrame(p1)
          var heading = Cesium.Math.toRadians(90.0)
          var pitch = Cesium.Math.toRadians(-10.0)
          var range = 8.0
          if (o1 != null) {
            transform = Cesium.Matrix4.fromRotationTranslation(Cesium.Matrix3.fromQuaternion(o1), p1)
            viewer.camera.lookAtTransform(transform, new Cesium.Cartesian3(-25, 0, 3))
          }
        }
        if (clock._currentTime >= clock.stopTime) {
          viewer.clock.onTick.removeEventListener(_this.clockonTick)
          viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
        }
      }
    }
  }
}
</script>

<style  lang="scss">
.gasRoute {
  width: 300px;
  height: 100px;
  background-color: #031521;
  border-radius: 2px;
  box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3);
  border: 9px solid rgb(30 175 251);
  border-image: url('../../../../../assets/images/dialog.png') 10 stretch;
  color: #fff;
  position: absolute;
  top: 36px;
  left: -370px;
  .gas-title {
    width: 100%;
    height: 30px;
    background: rgb(17, 92, 136);
    .tit-label {
      width: 150px;
      float: left;
      margin: 0 0 0 10px;
      line-height: 34px;
      font-size: 16px;
    }
    .tit-close {
      float: right;
      margin: 3px 5px;
      font-size: 24px;
      cursor: pointer;
    }
  }
  .gas-cen {
    width: 100%;
    height: calc(100% - 32px);
    position: inherit;
    .gasItem {
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
    .gasItemsel {
       color: #fff;
      background-color: #2383ac;
      border-color: #ffc107;
    }
  }
}
</style>
