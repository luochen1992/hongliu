<template>
  <div class="chamberroute"></div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'chamberroute',
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  data() {
    return {
      isshow: false,
      rescueType: 'ChamberRescue',
      rescueDirect: 'ChamberRescueDirect'
    }
  },
  mounted() {},
  watch: {
    getNowMenuName(newV, oldV) {
      if (newV === 'chamberroute') {
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
      window.chamberflow = new CTMap.Flow(window.viewer, this.rescueType, this.rescueDirect)
       // 生成避灾路线
      const width = 6 // 巷道宽度
      const height = 4 // 巷道高度
      const speed = 0.1 // 移动速度
      const imageFile = 'img/avoidingDisaster/6.png' // 箭头图片
      const arrowDis = 200.0 // 每多少米一个箭头
     if (window.g_hangdao && window.g_hangdao.Map.length>0){
        window.chamberflow.getNeededRoute(window.g_hangdao, width, height, speed, imageFile, arrowDis,2)
     }
    },
    // 隐藏
    hide() {
       if(window.chamberflow){
        window.chamberflow.remove();
        window.chamberflow = null
      }
    }

  }
}
</script>
<style>
</style>
