<template>
  <div v-show="showdialog" class="technology">
    <div class="technology_left">
      <div class="titBg" @click="functionClick('coalAnimation')"><img src="../../../assets/images/cicular/1.png" class="animationImg" /><span class="animationFont">煤流动画</span></div>
      <coalAnimation v-show="showitem === 1"></coalAnimation>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import coalAnimation from './coalAnimation.vue'
export default {
  name: 'technology',
  components: {
    coalAnimation
  },
  computed: {
    ...mapGetters(['getOneMenuName'])
  },
  data() {
    return {
      showdialog: false,
      showitem: 0,
      isshow_: false
    }
  },
  mounted() {},
  watch: {
    getOneMenuName(newV, oldV) {
      if (newV === 'technology') {
        this.setNowMenuName('')
        this.show()
        this.isshow_()
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
    // 点击事件
    functionClick(value) {
      var _this = this
      switch (value) {
        case 'coalAnimation':
          _this.showitem = 1
          break
      }
      this.setNowMenuName(value)
    },
    // 显示
    show() {
      var _this = this
      _this.showdialog = true
    },
    // 隐藏
    hide() {
      var _this = this
      _this.showdialog = false
      _this.showitem = 0
    }
  }
}
</script>

<style  lang="scss">
.technology {
  width: 100%;
  height: 100%;
  color: #fff;
}
.technology .titBg {
  background: url(/img/cicular/emagency.png) no-repeat center top;
  width: 160px;
  height: 40px;
  float: left;
  cursor: pointer;
}
.technology .technology_left {
  position: absolute;
  top: 80px;
  left: 65%;
  margin-left: -360px;
  height: 40px;
  width: 40%;
  cursor: pointer;
  z-index: 1211;
}
.titBg .animationImg {
  width: 30px;
  height: 30px;
  margin: 4px 7px;
}
.titBg .animationFont {
  font-size: 13pt;
  color: #ffffff;
}
.titBg :hover {
  color: #838ae9;
}
</style>
