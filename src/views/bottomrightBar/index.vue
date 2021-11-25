<template>
  <div class="bottomrightBar">
    <li @click="guanbiTool" title="关闭功能">
      <i class="icon iconfont icon-huanyuan"></i>
    </li>
    <li @click="yingyanTool" title="鹰眼图">
      <i class="icon iconfont icon-yingyantu"></i>
    </li>
    <li @click="searchTool" title="搜索">
      <i class="icon iconfont icon-tubiao_wangdianchaxun"></i>
    </li>
    <!--<li @click="touchTool" title="通讯录">
      <i class="icon iconfont icon-tongxunlu"></i>
    </li>
    <li @click="informationTool" title="消息">
      <i class="icon iconfont icon-xiaoxi"></i>
    </li>-->
    <li id="_compassN" @click="navagateTool" title="指北针">
      <i class="icon iconfont icon-zhibeizhen"></i>
      <navagate-tool></navagate-tool>
    </li>
    <li @click="legendTool" title="图例">
      <i class="icon iconfont icon-tuli"></i>
    </li>
    <yingyan-tool :showsee="showsee"></yingyan-tool>
    <view-positioning :showsee="showsee1"></view-positioning>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import NavagateTool from '../../components/bottomRightBar/navagateTool/index.vue'
import YingyanTool from '../../components/bottomRightBar/yingyanTool/index.vue'
import ViewPositioning from '../../components/bottomRightBar/viewPositioning/index.vue'
export default {
  name: 'bottomrightBar',
  computed: {
    ...mapGetters(['getBRToolBar'])
  },
  components: { NavagateTool, YingyanTool, ViewPositioning},
  data() {
    return {
      data: [],
      showsee: false,
      showsee1: false,
    }
  },
  mounted() {},
  watch: {},
  methods: {
    ...mapMutations({
      setBRToolBar: 'setBRToolBar',
      setNowMenuName: 'setNowMenuName',
      setOneMenuName: 'setOneMenuName'
    }),
    guanbiTool() {
      this.setBRToolBar('')
      this.setNowMenuName('')
      this.setOneMenuName('')
    },
    // 显示图层列表
    yingyanTool() {
      this.showsee = !this.showsee
    },
    // 搜索
    searchTool() {
      this.setBRToolBar('searchTool')
    },
    touchTool() {
      this.setBRToolBar('touchTool')
    },
    // 量测按钮点击
    informationTool() {
      this.setBRToolBar('informationTool')
    },
    // 标注
    navagateTool() {
      window.centerAt2({
            y: 38.79582208834937,
            x: 110.29611873903323,
            z: 12637.238380590987,
            heading: 357.4855148122285,
            pitch: -39.08015686798619,
            roll: 359.9894913368578
})
    },
    // 书签
    legendTool() {
      this.setBRToolBar('legendTool')
    }

  }
}
</script>

<style  lang="scss">
.bottomrightBar {
    position: absolute;
   bottom: 193px;
    right: 2px;
    width: 40px;
    height: 200px;
    color: #ffffff;
    z-index: 1001;
  li {
    width: 32px;
    height: 32px;
    border: none;
    line-height: 32px;
    font-size: 18px;
    color: #080808;
    text-align: center;
    /* margin-bottom: 10px; */
    cursor: pointer;
    /* margin-left: 10px; */
    margin: 5px 5px;
  }
  #bottomrightBar>li:hover {
    cursor: pointer;
    background-color: aliceblue;
}
  .bottomrightBar img {
    width: 36px;
    height: 36px;
    color: #fff;
    font-size: 28px;
    font-weight: 600;
    float: left;
    margin-top: 19px;
  }
}

</style>
