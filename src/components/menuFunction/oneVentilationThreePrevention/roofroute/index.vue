<template>
  <div class="roofroute"></div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'roofroute',
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  data() {
    return {
      isshow: false,
      rescueType: 'CoverboardRescue', // 巷道文件无顶板字段，暂时先用水灾路线替代（在图纸中是相同的路线）
      rescueDirect: 'CoverboardRescueDirect' // 巷道文件无顶板字段，暂时先用水灾路线替代（在图纸中是相同的路线）
    }
  },
  mounted() {},
  watch: {
    getNowMenuName(newV, oldV) {
      if (newV === 'roofroute') {
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
      window.roofflow = new CTMap.Flow(window.viewer, this.rescueType, this.rescueDirect)
       // 生成避灾路线
      const width = 6 // 巷道宽度
      const height = 4 // 巷道高度
      const speed = 0.1 // 移动速度
      const imageFile = 'img/avoidingDisaster/24.png' // 箭头图片
      const arrowDis = 200.0 // 每多少米一个箭头
      if (window.g_hangdao && window.g_hangdao.Map.length>0){
        window.roofflow.getNeededRoute(window.g_hangdao, width, height, speed, imageFile, arrowDis,2)
      }
    },
    // 隐藏
    hide() {
      debugger;
      if(window.roofflow){
        window.roofflow.remove();
        window.roofflow = null
      }
    }

  }
}
</script>
<style>
</style>
