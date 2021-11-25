<template>
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
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
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
      ]
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
  mounted() {},
  methods: {
    ...mapMutations({
      setNowMenuName: 'setNowMenuName'
    }),
    itemHandler_Click(item) {
      const title = item.title
      switch (title) {
        case '仿真模拟':
          break
        case '广播联动':
          this.videoLinkage()
          break
      }
    },
    videoLinkage() {
      console.log('广播联动')
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
  z-index: 1001;
  .simulationItem {
    width: 110px;
    height: 30px;
    border: 1px solid #11858d;
    line-height: 30px;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    margin: 15px 5px;
    .img {
      width: 20px;
      height: 20px;
      line-height: 30px;
      vertical-align: middle;
      margin: -3px 5px 0 0;
    }
  }
}
</style>
