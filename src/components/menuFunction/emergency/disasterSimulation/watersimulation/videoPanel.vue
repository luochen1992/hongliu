<template>
  <video-player class="video-player-box"
                ref="videoPlayer"
                :playsinline="true"
                :options="playerOptions"></video-player>
</template>
<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import 'videojs-contrib-hls'

export default {
  name: 'videoPanel',
  components: {
    videoPlayer
  },
  props: {
    url: String
  },
  data() {
    return {
      panelshow: true,
      left: 100,
      top: 100,
      playerOptions: {
        // videojs options
        muted: true,
        autoplay: true,
        language: 'zh-CN',
        preload: 'auto',
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: 'video/mp4',
            // type: 'application/x-mpegURL',
            src: this.url
          }
        ],
        poster: '',
        notSupportedMessage: '此视频暂无法播放，请稍后再试'
      }
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  created() {},
  watch: {
    url(newv, oldv) {
      this.playerOptions.sources[0].src = newv
      console.log(this.playerOptions.sources[0].src)
    }
  },
  methods: {}
}
</script>
<style  lang="scss"  scoped>
.videowindow .xbsj-model-content {
  height: 100% !important;
}
</style>
