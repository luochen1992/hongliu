<template>
  <div :class="showitem ? 'circlemenu' : 'circlemenu cw'" @mouseenter="enter()" @mouseleave="leave()">
    <div :class="showitem ? 'nav-bak-inner showinner' : 'nav-bak-inner'">
      <li class="nav-item" v-for="(item, key) in menus" :key="key" :style="'transform: rotate(' + key * (180 / menus.length) + 'deg) skew(' + (90 - 180 / menus.length) + 'deg);'">
        <a class="nav-text" :style="'transform: skew(-' + (90 - 180 / menus.length) + 'deg) rotate(-72deg) scale(1);'" @click="functionClick(item.id)" :title="item.name">
          <el-image style="width: 30px; height: 30px; margin-top: 10px" :src="item.img" fit="fill"></el-image>
          <div class="fontitem">{{ item.name }}</div>
        </a>
        <!-- <div class="nav-link" v-if="item.children">
          <div class="nav-item-link" v-for="(item2, key2) in item.children" :key="key2">
            <div class="nav-bg-link">
              <span class="nav-text-link">{{ item2.name }}</span>
            </div>
          </div>
        </div> -->
      </li>
    </div>
    <div class="nav-center" @click="changeshowitem">
      <span class="centersize">工作台</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  props: ['menus'], // 菜单数据
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  data() {
    return {
      showitem: false
    }
  },
  created() {},

  mounted() {},
  methods: {
    ...mapMutations({
      // setNowMenuName: 'setNowMenuName',
      setOneMenuName: 'setOneMenuName'
    }),
    // 点击事件
    functionClick(value) {
      // this.setNowMenuName(value)
      this.setOneMenuName(value)
    },
    enter() {
      this.showitem = true
    },
    leave() {
      this.showitem = false
    },
    changeshowitem() {
      // this.showitem = !this.showitem
    }
  }
}
</script>

<style lang="scss" scoped>
.circlemenu {
  position: absolute;
  bottom: -178px;
  left: calc(50% - 180px);
  width: 360px;
  height: 360px;
  border-radius: 50%;
  transition: all 0.1s ease-out 0.4s;
  // align-items: center;
  // justify-content: center;
  // overflow: hidden;
  // background: #5c6070;
}
.cw {
  width: 0;
  height: 0;
}
.nav-bak-inner {
  font-family: 'Helvetica Neue', Helvetica, 'Hiragino Sans GB', 'STHeitiSC-Light', 'Microsoft YaHei', Arial, sans-serif;
  z-index: 1040;
  background: transparent;
  cursor: default;
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 1;
  transform: scale(0.1);
  pointer-events: auto;
  transition: all 0.3s ease 0.1s;
}
.showinner {
  transform: scale(1);
  border-radius: 50%;
  box-shadow: 0px -8px 20px #3f51b5;
}
.nav-item {
  width: 180px;
  height: 180px;
  box-sizing: border-box;
  margin-left: 0px;
  padding: 0;
  position: absolute;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid transparent;
  transform-origin: 100% 100%;
  transition: all 0.3s ease 0.1s;
  // border-radius: 0 0 160px 0;
  // background-image: url(/img/04.png);
  // position: absolute;
  // transform-origin: 0 0;
  // background-position: 3px -8px;
  // background-size: cover;
}
.nav-link {
  transform-origin: 0 0;
  transition: all 0.6s 0.5s linear;
  position: absolute;
  left: 0px;
  top: 0px;
  cursor: pointer;
}
.nav-item-link {
  width: 0px;
  height: 0px;
  position: absolute;
  border-radius: 0 0 210px 0;
  transform-origin: 0 0;
  transition: all 0.5s 0.1s linear;
}
.nav-item:hover .nav-item-link {
  width: 210px;
  height: 210px;
}
.nav-item:hover .nav-text-link {
  padding-left: 150px;
  padding-top: 30px;
}
.nav-item:hover .nav-link {
  transform: rotateZ(-50deg);
}
.nav-bg-link {
  background-image: url(/img/01.png);
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  transform: rotateZ(77deg);
  background-position: 63% 18%;
}
.nav-item-link:nth-child(1) {
  transform: rotateZ(45deg);
}
.nav-item-link:nth-child(2) {
  transform: rotateZ(90deg);
}
.nav-item-link:nth-child(3) {
  transform: rotateZ(135deg);
}
.nav-item-link:nth-child(4) {
  transform: rotateZ(180deg);
}
.nav-item-link:nth-child(5) {
  transform: rotateZ(225deg);
}
.nav-item-link:nth-child(6) {
  transform: rotateZ(270deg);
}
.nav-item:hover {
  // background-color: red;
}
// .nav-item:nth-child(1) {
//   transform: rotateZ(0deg);
//   background: transparent;
//   z-index: 1;
//   border-left: 0;
// }
// .nav-item:nth-child(2) {
//   transform: rotateZ(72deg);
// }
// .nav-item:nth-child(3) {
//   transform: rotateZ(144deg);
// }
// .nav-item:nth-child(4) {
//   transform: rotateZ(216deg);
// }
// .nav-item:nth-child(5) {
//   transform: rotateZ(288deg);
//   border-left: none;
// }
// .nav-item:nth-child(6) {
//   transform: rotateZ(306deg);
// }
.triangle:hover {
  border-top: 116.27px solid red;
}
.nav-center {
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  left: 105px;
  bottom: 105px;
  background: #00264d url(../../../assets/images/center.png) no-repeat center;
  z-index: 1042;
  border: 1px solid #00ebfa;
  background-size: 100%;
  cursor: pointer;
}
.centersize {
  color: #ffffff;
  z-index: 22;
  padding-bottom: -87px;
  position: absolute;
  bottom: 80px;
  font-size: 22pt;
  left: 33px;
}
.nav-text {
  background: radial-gradient(transparent 36%, #1d2b52 32%);
  box-sizing: border-box;
  position: absolute;
  display: block;
  border-radius: 50%;
  cursor: pointer;
  // padding-top: 10px;
  text-align: center;
  text-decoration: none;
  backface-visibility: hidden;
  color: #001e41;
  width: 358px;
  height: 358px;
  right: -180px;
  bottom: -180px;
  transform: skew(-36deg) rotate(-72deg) scale(1);
}
.nav-text:hover {
  background: radial-gradient(transparent 36%, #25396d 32%, #5a6bc7 95%);
}
.nav-text-link {
  transition: all 0.5s 0.1s linear;
  color: #001e41;
  padding-left: 0px;
  display: inline-block;
  transform: rotateZ(53deg);
  padding-top: 0px;
}
.fontitem {
  color: #ffffff;
  font-family: 微软雅黑;
  font-size: 12pt;
}

// .nav-item:nth-child(3) > .nav-text {
//   transform: rotateZ(122deg);
// }
// .nav-item:nth-child(4) > .nav-text {
//   transform: rotateZ(122deg);
// }
// .nav-item:nth-child(5) > .nav-text {
//   transform: rotateZ(122deg);
// }
</style>
