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
      <audio controls>
        <source src="video/音频.mp3" type="audio/mpeg" autoplay="autoplay">
      您的浏览器不支持 audio 元素。
      </audio>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import videoPanel from './videoPanel'
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
        this.isshow = true
      } else {
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
          break
        case '广播联动':
          this.radioLinkage()
          break
        case '视频联动':
          this.videoLinkage()
          break
      }
    },
    videoLinkage() {
      this.videoShow = !this.videoShow
    },
    radioLinkage() {
      this.radiodialogshow = !this.radiodialogshow
      console.log('广播联动')
    },
    confirm() {
      // 播放声音文件
      debugger
        this.radioControl = true
      // 仅广播图标可见

      // 图标呈现报警状态

      //
      window.centerAt2({
            y: 38.79582208834937,
            x: 110.29611873903323,
            z: 12637.238380590987,
            heading: 357.4855148122285,
            pitch: -39.08015686798619,
            roll: 359.9894913368578
      })
      console.log('确认')
    },
    cancel() {
      this.radiodialogshow = false
      console.log('取消')
    },
    playSound(src){
        var _s = document.getElementById('snd');
          if(src!='' && typeof src!=undefined){
          _s.src = src;
        }
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
  background-color: #031521;
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
