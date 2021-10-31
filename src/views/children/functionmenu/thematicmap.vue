<template>
  <div v-show="showdialog" class="thematicmap">
    <div class="thematicmap_left">
      <div class="titbg" @click="functionClick('coalflow')"><img src="../../../assets/images/cicular/1.png" class="emergencyimg" /><span class="emergencyfont">煤流</span></div>
      <div class="titbg" @click="functionClick('windflow')"><img src="../../../assets/images/cicular/1.png" class="emergencyimg" /><span class="emergencyfont">风流</span></div>
      <div class="titbg" @click="functionClick('materialsflow')"><img src="../../../assets/images/cicular/1.png" class="emergencyimg" /><span class="emergencyfont">运料</span></div>
      <div class="titbg" @click="functionClick('carflow')"><img src="../../../assets/images/cicular/1.png" class="emergencyimg" /><span class="emergencyfont">车流</span></div>
      <!-- <div class="titbg" @click="functionClick('personflow')"><img src="../../../assets/images/cicular/1.png" class="emergencyimg" /><span class="emergencyfont">人流</span></div> -->
    </div>
    <div class="thematicmap_right">
      <div class="titbg" @click="functionClick('fanhouse')"><img src="../../../assets/images/cicular/1.png" class="emergencyimg" /><span class="emergencyfont">电耗</span></div>
      <div class="titbg" @click="functionClick('fanhouse')"><img src="../../../assets/images/cicular/1.png" class="emergencyimg" /><span class="emergencyfont">水文</span></div>
      <div class="titbg" @click="functionClick('fanhouse')"><img src="../../../assets/images/cicular/1.png" class="emergencyimg" /><span class="emergencyfont">矿压</span></div>
      <div class="titbg" @click="functionClick('fanhouse')"><img src="../../../assets/images/cicular/1.png" class="emergencyimg" /><span class="emergencyfont">瓦斯</span></div>
    </div>
    <coalflow v-show="showitem === 1"></coalflow>
    <windflow v-show="showitem === 2"></windflow>
    <materialsflow v-show="showitem === 3"></materialsflow>
    <carflow v-show="showitem === 4"></carflow>
    <!-- <personflow v-show="showitem === 5"></personflow> -->
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import coalflow from './coalflow.vue'
import windflow from './windflow.vue'
// import personflow from './personflow.vue'
import materialsflow from './materialsflow.vue'
import carflow from './carflow.vue'
// import personflow from './personflow.vue'
export default {
  name: 'thematicmap',
  components: {
    coalflow,
    windflow,
    // personflow,
    materialsflow,
    carflow
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
      if (newV === 'thematicmap') {
        this.setNowMenuName('')
        this.show()
        this.isshow_ = false
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
        case 'coalflow':
          _this.showitem = 1
          break
        case 'windflow':
          _this.showitem = 2
          break
        case 'materialsflow':
          _this.showitem = 3
          break
        case 'carflow':
          _this.showitem = 4
          break
        // case 'personflow':
        //   _this.showitem = 5
        //   break
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
.thematicmap {
  width: 100%;
  height: 100%;
  color: #fff;
}
.thematicmap .titbg {
  background: url(/img/cicular/emagency.png) no-repeat center top;
  width: 90px;
  height: 40px;
  float: left;
  cursor: pointer;
}
.thematicmap .thematicmap_left {
  position: absolute;
  top: 80px;
  left: 50%;
  margin-left: -360px;
  height: 40px;
  width: 40%;
  cursor: pointer;
  z-index: 1211;
}
.thematicmap .thematicmap_right {
  position: absolute;
  top: 80px;
  left: 50%;
  height: 40px;
  width: 34%;
  cursor: pointer;
  z-index: 1211;
}
.titbg .emergencyimg {
  width: 30px;
  height: 30px;
  margin: 4px 7px;
}
.titbg .emergencyfont {
  font-size: 13pt;
  color: #ffffff;
}
.titbg :hover {
  color: #838ae9;
}
</style>
