<template>
  <div>

    <div class="watersimulation"
         v-if="isshow">
      <div v-for="(item,index) in itemList"
           :key="index"
           class="simulationItem"
           @click="itemHandler_Click(item)">
        <el-image class="img"
                  :src="item.imgUrl"
                  fit="fill"></el-image>
        <span>{{item.title}}</span>
      </div>
    </div>
    <div class="video-wrapper"
         ref="VideoWrapper"
         v-show="videoShow">
      <div class="video-item"
           v-for="(item,index) in videoList"
           :key="index"
           :style="{top:videoHeight}">
        <video-panel :url="item.url"
                     :key="index">
        </video-panel>
      </div>
    </div>

    <!-- 广播联动对话框 -->
    <div class="radio-dialog" v-show="radiodialogshow">
      <div class="radio-title">
        <div class="tit-label">广播联动</div>
        <div class="tit-close">
          <i class="el-icon-close" @click="close"></i>
        </div>
      </div>
      <div class="radio-cen">
        <div class="warningTxt" >注意：工作面透水，请确认是否下发撤离指令！</div>
        <div class="fireItem" :class="isshow1 ? 'fireItemsel' : ''" @click="confirm">确认</div>
        <div class="fireItem" :class="isshow1 ? 'fireItemsel' : ''" @click="cancel">取消</div>
      </div>
    </div>

    <div class="radio-control" v-show="radioControl">
      <audio controls loop id="music1" >
        <source src="video/音频.mp3" type="audio/mpeg" autoplay="autoplay">
      您的浏览器不支持 audio 元素。
      </audio>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import videoPanel from './videoPanel'
import WaterPoint from '../../../../../js/WaterPoint'
export default {
  components: { videoPanel },
  name: 'watersimulation',
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  data() {
    return {
      isshow: false,
      itemList: [
        { title: '仿真模拟', imgUrl: 'img/cicular/watersimulation/仿真模拟.png' },
        { title: '启动预案', imgUrl: 'img/cicular/watersimulation/启动预案.png' },
        { title: '避灾路线', imgUrl: 'img/cicular/watersimulation/避灾路线.png' },
        { title: '逃生演练', imgUrl: 'img/cicular/watersimulation/逃生演练.png' },
        { title: '广播联动', imgUrl: 'img/cicular/watersimulation/广播联动.png' },
        { title: '视频联动', imgUrl: 'img/cicular/watersimulation/视频联动.png' },
        { title: '排水联动', imgUrl: 'img/cicular/watersimulation/排水联动.png' }
      ],
      videoShow: false,
      videoList1: [
        { area: '水泵房', url: 'video/watersimulation/ercaiqubiandiansuo.mp4' },
        { area: '水泵房', url: 'video/watersimulation/zyshuibengfang.mp4' },
        { area: '水泵房', url: 'video/watersimulation/3206yscmd.mp4' },
        { area: '水泵房', url: 'video/watersimulation/3206huishun.mp4' },
        { area: '水泵房', url: 'video/watersimulation/3308yscmd.mp4' }
      ],
      videoList2: [
        { area: '水泵房1', url: 'video/watersimulation/3206yscmd.mp4' },
        { area: '水泵房1', url: 'video/watersimulation/3308zc.mp4' },
        { area: '水泵房1', url: 'video/watersimulation/3308zc67.mp4' },
        { area: '水泵房1', url: 'video/watersimulation/caimeiji.mp4' },
        { area: '水泵房1', url: 'video/watersimulation/chanliangjiankong.mp4' }
      ],
      videoList: undefined,
      videoHeight: undefined,
      radiodialogshow: false,
      isshow1: false,
      radioControl: false
    }
  },
  watch: {
    getNowMenuName(newV, oldV) {
      if (newV === 'watersimulation') {
        this.show()
        this.isshow = true
      } else {
        this.hide()
        this.isshow = false
      }
    }
  },
  mounted() {
    this.$refs.VideoWrapper.style.top = window.innerHeight - 180 + 'px'
    const self = this
    window.onresize = function () {
      self.$refs.VideoWrapper.style.top = window.innerHeight - 180 + 'px'
    }
    this.videoList = this.videoList1

    setInterval(function () {
      self.videoList === self.videoList1 ? (self.videoList = self.videoList2) : (self.videoList = self.videoList1)
    }, 20000)
  },
  created() {},
  destroyed() {
    this.videoShow = false
    this.radiodialogshow = false
  },
  methods: {
    ...mapMutations({
      setNowMenuName: 'setNowMenuName'
    }),
    show() {
      debugger;
      var _this = this
      window.e_route = {}       
      _this.succCallback() 
    },
    hide(){
      if (window.cesiumvariate._wwdataSource) {
        viewer.dataSources.remove(window.cesiumvariate._wwdataSource)  
        window.cesiumvariate._wwdataSource = []
      }
    },
    succCallback() {
      debugger;
      var _this = this
      
      _this.polyline = [
        { longitude:110.3210387, latitude:38.9125500	, height:1082.5227	},
        { longitude:110.3210395	, latitude:38.9133721	, height:1081.1211	},
        { longitude:110.3210399	, latitude:38.9134059	, height:1081.0902	},
        { longitude:110.3210399	, latitude:38.9134299	, height:1080.8598	},
        { longitude:110.3210397	, latitude:38.9134454	, height:1081.0579	},
        { longitude:110.3210393	, latitude:38.9142956	, height:1081.0639	},
        { longitude:110.3210397	, latitude:38.9143289	, height:1081.0579	},
        { longitude:110.3210388	, latitude:38.9143486	, height:1080.8716	},
        { longitude:110.3210398	, latitude:38.9143678	, height:1081.0508	},
        { longitude:110.3210396	, latitude:38.9151776	, height:1080.7600},
        { longitude:110.3210398	, latitude:38.9152119	, height:1080.7391	},
        { longitude:110.3210398	, latitude:38.9152501	, height:1080.7170	},
        { longitude:110.3210395	, latitude:38.9160900	, height:1080.1949	},
        { longitude:110.3210398	, latitude:38.9161275 , height:1080.1734	},
        { longitude:110.3210397	, latitude:38.9161624 , height:1080.1737	},
        { longitude:110.3210397	, latitude:38.9178379	, height:1080.2668	},
        { longitude:110.3210366	, latitude:38.9178761	, height:1080.1994	},
        { longitude:110.3210397	, latitude:38.9179101	, height:1080.2748},
        { longitude:110.3210390	, latitude:38.9187909	, height:1080.4273	},
        { longitude:110.3210391	, latitude:38.9188273	, height:1080.4089	},
        { longitude:110.3210396	, latitude:38.9188632	, height:1080.4244	},
        { longitude:110.3210398	, latitude:38.9196890	, height:1080.1606	},
        { longitude:110.3210397	, latitude:38.9197183	, height:1080.1603	},
        { longitude:110.3210394	, latitude:38.9205818	, height:1079.0962	},
        { longitude:110.3210389	, latitude:38.9206193	, height:1079.0635	},
        { longitude:110.3210388	, latitude:38.9206543	, height:1079.0552	},
        { longitude:110.3210393	, latitude:38.9214827	, height:1078.9516	},
        { longitude:110.3210382	, latitude:38.9215166	, height:1078.9581	},
        { longitude:110.3210393	, latitude:38.9215549	, height:1078.9614	},
        { longitude:110.3210385	, latitude:38.9223740	, height:1079.1212	},
        { longitude:110.3210368	, latitude:38.9224103	, height:1079.0912},
        { longitude:110.3210386	, latitude:38.9224462	, height:1079.1388	},
        { longitude:110.3210385	, latitude:38.9232815	, height:1079.3507	},
        { longitude:110.3210388	, latitude:38.9233154	, height:1079.3583	},
        { longitude:110.3210387	, latitude:38.9233538	, height:1079.3687	},
        { longitude:110.3210386	, latitude:38.9233933	, height:1079.3787	},
        { longitude:110.3210386	, latitude:38.9234293	, height:1079.3779	},
        { longitude:110.3210387	, latitude:38.9234653	, height:1079.3664	},
        { longitude:110.3210386	, latitude:38.9251072	, height:1078.3985	},
        { longitude:110.3210387	, latitude:38.9260127	, height:1077.8655	},
        { longitude:110.3210389	, latitude:38.9269008	, height:1077.3451	},
        { longitude:110.3210377	, latitude:38.9269334	, height:1077.3398	},
        { longitude:110.3210385	, latitude:38.9269731	, height:1077.3341},
        { longitude:110.3210385	, latitude:38.9270022	, height:1077.3436	},
        { longitude:110.3210383	, latitude:38.9270381	, height:1077.3431	},
        { longitude:110.3210385	, latitude:38.9270740	, height:1077.3233	},
        { longitude:110.3210395	, latitude:38.9278042	, height:1076.6340	},
        { longitude:110.3210357	, latitude:38.9278323	, height:1076.6011	},
        { longitude:110.3210395	, latitude:38.9278765	, height:1076.5512	},
        { longitude:110.3210404	, latitude:38.9286740	, height:1075.6223	},
        { longitude:110.3210393	, latitude:38.9287121	, height:1075.5884},
        { longitude:110.3210406	, latitude:38.9287462	, height:1075.5306	},
        { longitude:110.3210407	, latitude:38.9295915	, height:1074.3324	},
        { longitude:110.3210404	, latitude:38.9296313	, height:1074.2412	},
        { longitude:110.3210409	, latitude:38.9296637	, height:1074.2313	},
        { longitude:110.3210404	, latitude:38.9303961	, height:1073.2458	},
        { longitude:110.3210405	, latitude:38.9304322	, height:1073.2056	},
        { longitude:110.3210399	, latitude:38.9304856	, height:1073.1555	},
        { longitude:110.3210412	, latitude:38.9305242	, height:1073.1362	},
        { longitude:110.3210403	, latitude:38.9305578	, height:1073.1155	},
        { longitude:110.3210398	, latitude:38.9314778	, height:1072.8555},
        { longitude:110.3210391	, latitude:38.9323032	, height:1072.6253	},
        { longitude:110.3210411	, latitude:38.9323423	, height:1072.6276	},
        { longitude:110.3210392	, latitude:38.9323756	, height:1072.6246	},
        { longitude:110.3210385	, latitude:38.9332136	, height:1072.9802},	
        { longitude:110.3210381	, latitude:38.9332471	, height:1072.9705	},
        { longitude:110.3209919	, latitude:38.9332499	, height:1073.0916},	
        { longitude:110.3207870	, latitude:38.9332519	, height:1073.4822},	
        { longitude:110.3207396	, latitude:38.9332505	, height:1073.5634	},
        { longitude:110.3206949	, latitude:38.9332529	, height:1073.6024},
        { longitude:110.3201879	, latitude:38.9332583	, height:1073.9822	},
        { longitude:110.3201417	, latitude:38.9332599	, height:1073.9893	},
        { longitude:110.3200955	, latitude:38.9332586	, height:1074.0535	},
        { longitude:110.3195073	, latitude:38.9332595	, height:1074.4949	},
        { longitude:110.3194558	, latitude:38.9332605	, height:1074.5045	},
        { longitude:110.3194147	, latitude:38.9332591	, height:1074.5649	},
        { longitude:110.3187133	, latitude:38.9332595	, height:1075.0881	},
        { longitude:110.3186825	, latitude:38.9332590	, height:1075.0874	},
        { longitude:110.3186206	, latitude:38.9332593	, height:1075.1488}

      ];
      _this.end = CTMap.JulianDate.fromDate(new Date())
      _this.start = CTMap.JulianDate.addSeconds(_this.end, -(2 + _this.polyline.length * 3), new CTMap.JulianDate())  
    },
    close(){
      this.radiodialogshow = false
    },
    itemHandler_Click(item) {
      const title = item.title
      this.videoShow = false
      this.radiodialogshow = false
      this.isshow1 = false
      this.radioControl = false
      switch (title) {
        case '仿真模拟':
          this.waterPointFun()
          break
        case '逃生演练':
          this.escape()
          break
        case '广播联动':
          this.radioLinkage()
          break
        case '视频联动':
          this.videoLinkage()
          break
      }
    },
    waterPointFun(){
      const waterPointCompont = new WaterPoint(window.viewer,this.start,this.end);
      waterPointCompont.waterEmeryPoint();
    },
    escape(){
      const waterPointCompont = new WaterPoint(window.viewer,this.start,this.end,this.polyline);
      waterPointCompont.waterRoute();
    
    },
    videoLinkage() {
      this.videoShow = !this.videoShow
    },
    radioLinkage() {
      this.radiodialogshow = !this.radiodialogshow
      console.log('广播联动')
    },
    confirm() {
      // 1.播放声音文件
      debugger
      this.radioControl = true
      var p = document.getElementById('music1'); 
      // if (p !== null) {             
          //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
          p.play()
      //  }

      // 2.仅广播图标可见
      if (viewer.layerList) {
            debugger
            // viewer.layerList[2]._layers[0].setVisible(false)
            viewer.layerList[2]._layers[0].config.visible = false
            viewer.layerList[2]._layers[1].config.visible = false
      }
      // 3.图标呈现报警状态

      // 4.定位至全局
      window.centerAt2({
            y: 38.79582208834937,
            x: 110.29611873903323,
            z: 12637.238380590987,
            heading: 357.4855148122285,
            pitch: -39.08015686798619,
            roll: 359.9894913368578
      })
    },
    cancel() {
      //关闭警报
      debugger
      var p = document.getElementById('music1'); 
      if (p !== null) {             
          //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
          p.pause()
       }
      this.radiodialogshow = false
      this.radioControl = false
    }
  } 
  
}
</script>

<style  lang="scss" scoped>
.watersimulation {
  position: absolute;
  top: 80px;
  left: -380px;
  min-width: 60px;
  min-height: 200px;
  background: rgba(0, 64, 110, 0.65) !important;
  color: #fff;
  .simulationItem {
    width: 110px;
    height: 30px;
    border: 1px solid #11858d;
    line-height: 30px;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    margin: 15px 5px;
    box-shadow: 4px 2px 6px #035664;
    border-radius: 5px;
    .img {
      width: 20px;
      height: 20px;
      line-height: 30px;
      vertical-align: middle;
      margin: -3px 5px 0 0;
    }
  }
}
.video-wrapper {
  position: absolute;
  display: flex;
  flex-direction: row;
  left: 0px;
  min-width: 1000px;
  min-height: 150px;
  justify-content: center;
  .video-item {
    width: 250px;
    height: 160px;
    margin: 0 5px;
  }
}
.radio-dialog {
  width: 300px;
  height: 135px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAGJJREFUWAnt0rENwCAQBEFMQgluxf03ZiRamIRgyVd6Dfes9/vHxW9efNs5rQP1hxJMUAW0b4MJqoD2bTBBFdC+DSaoAtq3wQRVQPs2mKAKaN8GE1QB7dtggiqgfRtMUAW034cCAaVgY0h9AAAAAElFTkSuQmCC);
  border-radius: 2px;
  box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(30 175 251);
  color: #fff;
  position: absolute;
  top: 300px;
  left: 500px;
  .radio-title {
    width: 100%;
    height: 42px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAwCAYAAAARtFotAAAAAXNSR0IArs4c6QAABS9JREFUSA2tl9th3DoMREUt+28gBaWM28e1ROWcAbli/iPbKwrA4DEAqXU7fj3P8Q+v3v/7/b8eGz8PP96P5+HWiMRzRHyy1mq7C1CUjBa+83jrgt9W5njTYcAvpDzq3d/nW5YBFSx8f55xESdwXOLMpALHq4+lWxloO60LU4Iv3gwvo5YL4THXadIp30pLtz6TVj3o7IvvGF5gI5sfSVCrZ2xyHX4rMFq8UBKKDd+PMW5LPY7BB786wZnVzpIhTBm6B5t4Kr1L7Xf8ylAVV0ymb8HGGLpHhS7PyclnKXl1ZXR0yrraKYD0yCEWPg+d86dg8Beb+VyuqCYWx47vlHXjtByB83p0wIWvxrp0Czx1Jqw+3d/wHcRP47IEObcsczuVkYJlqwejGA+vrfSdlrbJOpCLxlgYVbW4OLEZpkmEE4+u1XkZguqRHaUjhR2fnSI9XmPoxFULZXGqYNanxnVVXQGkecf3Nu7rmSLJTWuJLtZn+KV8aiM185OKcJMRkiMV5VJ7xuZgsO/WzrQHCmveLNehwQu7c/ZMnT1ahOJUux1fc2gn7hnIhifDOejbiJBhdUwabJ8FhY8XD4fjtrzKJSuS8Jk/uXMeyT7PUw3ZkWkWW+9J3pIZbEmWhXUHXNTEUEWgM4hCLivJvcZ24ZOh9KFrjAtFOQ7YCqjio1WulSOlfMXwecfn+Brkm3mD4JMGBEyEWpcuQVZ9Ok569bHj0xSclcZhJvz3mSfXZEMeg6mwwa6f75rsqOzFd4b5crachNzdA5PM8MK6tiHTgy+ctoGxta/1ju/sxRv/7klGwm2V9jLINXPOsa3MgKctNcY16JbuuL74mkPTc+hL56ylRIUZHdug0+jhIQ1Dl7MS1YbnPOQlhQzqscvl2VGzIEY8ZUcmV9qq50dqclc28d/zkOdCnjh2cL2gvtYWxrOeBYZknrHN3k8DSu+J/UPUdtw0Y931xdp8TSSluTUjz/aDSCLcOTHQv/jiUNPiRQyOIcsks/HllnUGj6UhdGCnF+8bHodrLwMyoI4FWyJJZ53myBxRJhtoZxC9ccX+eDov0Svzhux078mWCQKEIspSgZz74OeMEJlXZOXXOOI7hydfRZx8rmTigl2xys0dERnUHh+1CUxdmeYbvnYKBDP9KuSanUAvsVTmaS0RlYF1xQlOh4PhvsL2xWenyFVFik8+gI8zMreZWyv6BEVF97MdyWHJF76jpGTfamc40mRuvzzHLQ1NhglVtnS44iLb8Z2TggOWUjxN4IuvOhgQb41EDrNCV9kENlNm0KsSefEzQ1Wcg3InhxnoesPxykbm0WWpOEaw1vIbW+ETzxzedxlEal/MLyU6xV5jMA85CN51bCK/Z4CY8k4Jh+Xi5bGU69Pdq/OUzLlGIdV15GSI2Yvv52hweCH6AMi34+P8sL7hElJFhGO0jAclSoH0KLdBhVv3fjSQKk/iOz6CLr9McPfAMP55kxUNSyNwE5JQ1VaqoBNPU44fCT3pLqNKlyfp5auKMSu+XVRfLRBbI4nJu/LF9w+vAL4gloGfBF7Az/lhOij9q9fL33oBO77zwInNHMkZ3OVi/aFkv4nSYsQ4Vs8VebICclGcmA3vl/bqBMLPfTWGgBwfnDFzZKbx7dGDTIeRD/4TmXbgw7N24j1gK3SMyV8nZGcpNmt1OpnFI/F1htNkrt28eH0+/bh4BdTXgogteja3zGYCkflqXcFW5pFV9gLI8LqPNrnT2eLS+zqX5Cl1yM73rJqcm/GLb//639s/ryyA+QzSII0AAAAASUVORK5CYII=) no-repeat;
    color: #fff;
    border: none;
    line-height: 42px;
    text-align: center;
    background-size: 100% 100%;
    opacity: 0.9;
    background-color: transparent;
    .tit-label {
      // width: 150px;
      float: left;
      margin: 0 0 0 10px;
      // line-height: 34px;
      font-size: 14px;
    }
    .tit-close {
      float: right;
      margin: 3px 5px;
      font-size: 24px;
      cursor: pointer;
    }
  }
  .radio-cen {
    width: 100%;
    height: calc(100% - 32px);
    position: inherit;
    .warningTxt{
      width: 100%;
      height: 42px;
      color: #fff;
      border: none;
      line-height: 42px;
      text-align: center;
    }
    .fireItem {
      background: none;
      color: #fff;
      border: 1px solid #e4eaec;
      float: left;
      cursor: pointer;
      padding: 5px;
      margin: 5px 34px;
      font-size: 14px;
      width: 70px;
      text-align: center;
      border-radius: 3px;
      background-color: rgba(192, 215, 233, 0.2);
    }
    .fireItemsel {
      color: #fff;
      background-color: #2383ac;
      border-color: #ffc107;
    }
  }
}
</style>
