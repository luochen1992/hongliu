<template>
  <div class="windroute"></div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'windroute',
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  data() {
    return {
      isshow: false,
      rescueType: 'Wind',
      rescueDirect: 'WindDirect'
    }
  },
  mounted() {},
  watch: {
    getNowMenuName(newV, oldV) {
      if (newV === 'windroute') {
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
      // eslint-disable-next-line no-debugger
      debugger
      window.windflow = new CTMap.Flow(window.viewer, this.rescueType, this.rescueDirect)
       // 生成避灾路线
      const width = 6 // 巷道宽度
      const height = 4 // 巷道高度
      const speed = 0.1 // 移动速度
      const imageFile = 'img/avoidingDisaster/清风.png' // 箭头图片
      const imageFile1 = 'img/avoidingDisaster/浊风.png' // 箭头图片
      const arrowDis = 100.0 // 每多少米一个箭头
      const boxDropHeight = 2 // 包围盒下降高度
      if (window.g_hangdao && window.g_hangdao.Map.length > 0) {
        window.windflow.getNeededRoute(window.g_hangdao, width, height, speed, imageFile, arrowDis, boxDropHeight, imageFile1)
      }
    },
    // 隐藏
    hide() {
       if (window.windflow) {
        window.windflow.remove()
        window.windflow = null
      }
    }

  }
}
</script>
<style>
</style>
