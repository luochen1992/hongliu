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
      videoHeight: undefined
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
  },
  methods: {
    ...mapMutations({
      setNowMenuName: 'setNowMenuName'
    }),
    itemHandler_Click(item) {
      const title = item.title
      this.videoShow = false
      switch (title) {
        case '仿真模拟':
          break
        case '广播联动':
          break
        case '视频联动':
          this.videoLinkage()
          break
      }
    },
    videoLinkage() {
      this.videoShow = !this.videoShow
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
</style>
