<template>
  <div class="waterroute"></div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Flow from '../../../../js/Flow'
export default {
  name: 'waterroute',
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  data() {
    return {
      isshow: false,
      rescueType: 'WaterRescue',
      rescueDirect: 'WaterRescueDirect'
    }
  },
  mounted() {},
  watch: {
    getNowMenuName(newV, oldV) {
      if (newV === 'waterroute') {
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
      const waterflow = new Flow(window.viewer, this.rescueType, this.rescueDirect)
       // 生成避灾路线
      const width = 6 // 巷道宽度
      const height = 4 // 巷道高度
      const speed = 0.1 // 移动速度
      const imageFile = 'img/avoidingDisaster/18.png' // 箭头图片
      const arrowDis = 100.0 // 每多少米一个箭头
      waterflow.getNeededRoute(window.g_hangdao, width, height, speed, imageFile, arrowDis)
    },
    // 隐藏
    hide() {
       if (window.cesiumvariate[this.rescueType]) {
        for (let i = 0; i < window.cesiumvariate[this.rescueType].length; i++) {
          viewer.dataSources.remove(window.cesiumvariate[this.rescueType][i])
        }
        window.cesiumvariate[this.rescueType] = []
      }
    }

  }
}
</script>
<style>
</style>
