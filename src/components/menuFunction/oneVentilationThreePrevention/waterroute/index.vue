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
      const imageFile = 'img/avoidingDisaster/15.png' // 箭头图片
      const arrowDis = 200.0 // 每多少米一个箭头
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

<style  lang="scss">

.coalflow {
  width: 100%;
  height: 100%;
  color: #fff;
}
#myChart,
#myChart2,
#myChart4 {
  margin: 0px 62px;
}
#myChart3 {
  margin: 25px 12px 0 60px;
}
.progress {
  padding: 2px;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  border: 1px solid #61aacd;
  /* -webkit-box-shadow: inset 0 1px 2px rgba(11, 18, 247, 0.3), 0 1px rgba(255, 255, 255, 0.08); */
  /* box-shadow: inset 0 1px 2px rgba(16, 65, 244, 0.53), 0 1px #3F51B5; */
}
.jdsty {
  width: 34%;
}

.lxSty {
  list-style: none;
  height: 100%;
  margin-top: 5px;
  margin-left: 0px;
}

.lxSty li {
  height: 10%;
  margin-top: 0px;
  margin-left: 9px;
}

.jq {
  float: left;
  color: #fff;
  padding-left: 12px;
  font-weight: 800;
  letter-spacing: 2px;
  font-size: 15px;
  width: 25%;
}

.float1 {
  float: left;
}

.pu {
  color: #14d0e8;
  float: right;
  position: absolute;
  right: 34px;
  font-size: 0.8vw;
}
.progress-bar {
  position: relative;
  height: 16px;
  border-radius: 16px;
  -webkit-transition: 0.4s linear;
  -moz-transition: 0.4s linear;
  -o-transition: 0.4s linear;
  transition: 0.4s linear;
  -webkit-transition-property: width, background-color;
  -moz-transition-property: width, background-color;
  -o-transition-property: width, background-color;
  transition-property: width, background-color;
  -webkit-box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.25), inset 0 1px rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.25), inset 0 1px rgba(255, 255, 255, 0.1);
}

.progress-bar:before,
.progress-bar:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.progress-bar:before {
  bottom: 0;
  border-radius: 4px 4px 0 0;
}

.progress-bar:after {
  z-index: 2;
  bottom: 45%;
  border-radius: 4px;
  background-image: -webkit-linear-gradient(top, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  background-image: -moz-linear-gradient(top, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  background-image: -o-linear-gradient(top, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
}
.imgcolor {
  background-image: linear-gradient(to bottom, #07ddf8 0, #75e0ee 100%) !important;
}
#five ~ .progress > .progress-bar {
  width: 15%;
  background-color: #fa2e00;
  background-image: linear-gradient(#fa2e00, #fa2e00) !important;
  height: 74%;
  top: 13%;
}

#twentyfive ~ .progress > .progress-bar {
  width: 20%;
  background-color: #21d3dd;
  background-image: linear-gradient(#f78a3d, #f78a3d) !important;
  height: 74%;
  top: 13%;
}

#fifty ~ .progress > .progress-bar {
  width: 25%;
  background-color: #21d3dd;
  background-image: linear-gradient(#daf73d, #daf73d) !important;
  height: 74%;
  top: 13%;
}

#seventyfive ~ .progress > .progress-bar {
  width: 70%;
  background-color: #21d3dd;
  background-image: linear-gradient(#6bf73d, #6bf73d) !important;
  height: 74%;
  top: 13%;
}

#onehundred ~ .progress > .progress-bar {
  width: 90%;
  background-color: #3df74b;
  background-image: linear-gradient(#3df74b, #3df74b) !important;
  height: 74%;
  top: 13%;
}
.radio {
  display: none;
}

.label {
  display: inline-block;
  margin: 0 5px 20px;
  padding: 3px 8px;
  color: #aaa;
  text-shadow: 0 1px black;
  border-radius: 3px;
  cursor: pointer;
}

.radio:checked + .label {
  color: white;
  background: rgba(0, 0, 0, 0.25);
}

.ulSty {
  list-style: none;
  height: 100%;
  margin-top: 35px;
  margin-left: 35px;
}
.ulSty li {
  height: 50px;
}
.badge {
  display: inline-block;
  min-width: 10px;
  padding: 3px 7px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  background-color: #777;
  border-radius: 10px;
}
// WebKit
@-webkit-keyframes progress-bar-stripes {
  from {
    background-position: 40px 0;
  }
  to {
    background-position: 0 0;
  }
}

// Spec and IE10+
@keyframes progress-bar-stripes {
  from {
    background-position: 40px 0;
  }
  to {
    background-position: 0 0;
  }
}

.progress {
  overflow: hidden;
  height: 20px;
  margin-bottom: 20px;
  float: left;
}

// Bar of progress
.progress-bar {
  float: left;
  width: 0%;
  height: 100%;
  text-align: center;
}

.progress-striped .progress-bar,
.progress-bar-striped {
  background-size: 40px 40px;
}
</style>