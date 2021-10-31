<template>
  <div class="provideo">
    <div class="bodyContent" v-show="isshow">
      <div class="divcenter col-xs-4 paddingRight">
        <div class="col-xs-12 divPart3 div_border" id="vlcDiv">
          <video-player class="video-player vjs-custom-skin" :options="playerOptions" ref="videoPlayer" :playsinline="true" @ready="playerReadied"></video-player>
        </div>
      </div>
      <div class="divcenter col-xs-4 nopadding">
        <div class="col-xs-12 divPart3 div_border">
          <video-player class="video-player vjs-custom-skin" :options="playerOptions2" ref="videoPlayer" :playsinline="true" @ready="playerReadied"></video-player>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'

export default {
  name: 'provideo',
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  data() {
    return {
      isshow: false,
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: true, // 如果为true,浏览器准备好时开始回放。
        muted: true, // 默认情况下将会消除任何音频。
        loop: true, // 是否视频一结束就重新开始。
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: 'video/mp4', // 类型
            src: 'video/1.mp4' // url地址
          }
        ],
        poster: '', // 封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试' // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
      },
      playerOptions2: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: true, // 如果为true,浏览器准备好时开始回放。
        muted: true, // 默认情况下将会消除任何音频。
        loop: true, // 是否视频一结束就重新开始。
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: 'video/mp4', // 类型
            src: 'video/2.mp4' // url地址
          }
        ],
        poster: '', // 封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试' // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
      }
    }
  },
  mounted() {},
  // computed: {
  //   player() {
  //     return this.$refs.videoPlayer.player
  //   }
  // },
  watch: {
    getNowMenuName(newV, oldV) {
      if (newV === 'provideo') {
        this.show()
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
      this.isshow = true
    },
    // 隐藏
    hide() {
      this.isshow = false
    },
    playerReadied(player) {
      player.currentTime(1)
      // console.log('example 01: the player is readied', player)
    }
  }
}
</script>

<style  scoped lang="scss">
@import '../libs/bootstrap-3.3.7-dist/css/bootstrap.min.css';
.provideo {
  width: 100%;
  height: 100%;
  color: #fff;
  .bodyContent {
    position: absolute;
    top: 90px;
    left: 0px;
    background: #333;
    width: 100%;
    height: 100%;
  }
}

.vjs-custom-skin > .video-js .vjs-big-play-button {
  background-color: rgba(0, 0, 0, 0.45);
  font-size: 3em;
  /* border-radius: 50%; */
  height: 1.5em !important;
  line-height: 1.5em !important;
  margin-top: -1em !important;
}
/*这里用了第三方vue-video-player插件，但这个插件有bug，设置globalSetting:{controls:true}隐藏进度条不生效，故可设置插件样式进行隐藏vjs-progress-contro*/
.vjs-progress-control {
  visibility: hidden; // 隐藏进度条
}
.div_border {
  height: 100%;
  background-color: rgba(2, 255, 255, 0);
  border: 9px solid rgba(2, 255, 255, 0.5);
  border-image: url('img/corner.png') 19 round;
}

.centeredVideo {
  /* 	 object-fit:cover; */
  /* 	 display: none */
  height: 100% !important;
  width: 100% !important;
}
video {
  object-fit: fill;
}
.bt {
  width: 100%;
  height: 15%;
}

.nr {
  width: 100%;
  height: 85%;
}

.btP {
  padding-top: 15px;
  padding-left: 10px;
  color: #21d3dd !important;
  font-size: 1.3vw !important;
  letter-spacing: 0.2vw;
  margin-bottom: 0px !important;
}

.fbt {
  padding-left: 10px;
  padding-top: 10px;
  color: #21d3dd !important;
  letter-spacing: 0.1vw;
}

.m2_knowledge {
  position: absolute;
  width: 3840px;
  height: 2160px;
  z-index: 999;
  border-radius: 5px;
  display: none;
  overflow: hidden;
}

.m2_iframe {
  width: 100%;
  height: 100%;
  border: 0px;
  overflow: hidden;
}

.divcenter {
  height: 100%;
}

.paddingRight {
  padding-left: 0% !important;
  padding-right: 0% !important;
}

.paddingLeft {
  padding-left: 0% !important;
  padding-right: 0% !important;
}

.buspaddingRight {
  padding-left: 0% !important;
  padding-right: 0% !important;
}

.buspaddingLeft {
  padding-left: 0.5% !important;
  padding-right: 1% !important;
}

.divPart3 {
  height: 33.3333333333333%;
  padding: 0 !important;
}

.divMargin {
  height: 0.1%;
}

.nopadding {
  padding-left: 0% !important;
  padding-right: 0% !important;
}

.phis {
  text-align: left;
  color: #fff;
  font-size: 1vw;
  letter-spacing: 0.2vw;
  font-family: '微软雅黑';
  position: absolute;
}
</style>
