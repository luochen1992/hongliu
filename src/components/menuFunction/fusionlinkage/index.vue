<template>
  <div v-show="showdialog" class="fusionlinkage">融合联动</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'fusionlinkage',
  computed: {
    ...mapGetters(['getOneMenuName'])
  },
  data() {
    return {
      showdialog: false,
      isshow_: false
    }
  },
  mounted() {},
  watch: {
    getOneMenuName(newV, oldV) {
      if (newV === 'fusionlinkage') {
        this.setNowMenuName('')
        this.show()
        this.isshow_ = true
      } else {
        if (this.isshow_) {
          this.hide()
          this.isshow_ = false
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
      var _this = this
      _this.showdialog = true
    },
    // 隐藏
    hide() {
      var _this = this
      _this.showdialog = false
    }
  }
}
</script>

<style  lang="scss">
.fusionlinkage {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgb(34, 88, 124);
}
</style>
