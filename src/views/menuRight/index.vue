<template>
  <div class="menuRight">
    <div class="time">
      <img class="timeimg" src="../../assets/images/时间.png" />
      <div style="color: #04cbde">{{ nowDate }}</div>
    </div>
    <div class="menu-right">
      <div class="menu_item">
        <li title="监测监视">
          <img src="../../assets/images/监视.png" />
          <div class="funmenutit1" @mouseenter="enter(0)">监测监视</div>
        </li>
        <ul>
          <li @click="functionClick('provideo')" title="工业视频监控系统">
            <i class="iconfont icon-dianchaxun"></i>
            <div class="funmenutit">工业视频监控系统</div>
          </li>
          <!-- <li @click="functionClick('cluster')" title="聚合展示">
            <i class="iconfont icon-dianchaxun"></i>
            <div class="funmenutit">聚合展示</div>
          </li> -->
          <li @click="functionClick('locus')" title="历史轨迹">
            <i class="iconfont icon-dianchaxun"></i>
            <div class="funmenutit">历史轨迹</div>
          </li>
          <li @click="functionClick('fire')" title="火灾">
            <i class="iconfont icon-dianchaxun"></i>
            <div class="funmenutit">火灾</div>
          </li>
        </ul>
      </div>
      <div class="menu_item">
        <li title="查询监测">
          <img src="../../assets/images/环能监测.png" />
          <div class="funmenutit1" @mouseenter="enter(1)">查询监测</div>
        </li>
        <ul>
          <li @click="functionClick('spacequery')" title="查询">
            <i class="iconfont icon-dianchaxun"></i>
            <div class="funmenutit">查询</div>
          </li>
          <li @click="functionClick('searchquery')" title="搜索">
            <i class="iconfont icon-dianchaxun"></i>
            <div class="funmenutit">搜索</div>
          </li>
          <li @click="functionClick('people')" title="工作人员">
            <i class="iconfont icon-dianchaxun"></i>
            <div class="funmenutit">工作人员</div>
          </li>
        </ul>
      </div>
      <div class="menu_item">
        <li title="通讯系统">
          <img src="../../assets/images/通讯系统.png" />
          <div class="funmenutit1" @mouseenter="enter(2)">通讯系统</div>
        </li>
        <ul>
          <li @click="functionClick('materialdistri')" title="物资分布">
            <i class="iconfont icon-dianchaxun"></i>
            <div class="funmenutit">物资分布</div>
          </li>
          <!-- <li @click="functionClick('customaterial')" title="纹理动画">
            <i class="iconfont icon-dianchaxun"></i>
            <div class="funmenutit">纹理动画</div>
          </li>
          <li @click="functionClick('popupinfo')" title="广告牌">
            <i class="iconfont icon-dianchaxun"></i>
            <div class="funmenutit">广告牌</div>
          </li>-->
        </ul>
      </div>
      <div class="menu_item">
        <li title="系统管理">
          <img src="../../assets/images/系统管理.png" />
          <div class="funmenutit1" @mouseenter="enter(2)">系统管理</div>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'menuRight',
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  data() {
    return {
      data: [],
      nowDate: ''
    }
  },
  mounted() {
    this.currentTime()
  },
  watch: {},
  beforeDestroy: function () {
    if (this.formatDate) {
      clearInterval(this.formatDate) //在Vue实例销毁前，清除我们的定时器
    }
  },
  methods: {
    ...mapMutations({
      setNowMenuName: 'setNowMenuName'
    }),
    // 点击事件
    functionClick(value) {
      this.setNowMenuName(value)
    },
    currentTime() {
      setInterval(this.formatDate, 1000)
    },
    formatDate() {
      var d = new Date()
      var monthname = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12')
      var minutes = d.getMinutes()
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      this.nowDate = d.getFullYear() + '年' + monthname[d.getMonth()] + '月' + d.getDate() + '日 ' + d.getHours() + ':' + minutes
    },
    enter(val) {
      $('.menuRight .menu-right .menu_item ul')[val].style.left = val * 140 + 'px'
    }
  }
}
</script>

<style  lang="scss">
.menuRight {
  position: absolute;
  right: 0px;
  top: 22px;
  z-index: 10;
  padding: 0% 2%;
  .time {
    height: inherit;
    z-index: 12;
    color: #ffff;
    position: absolute;
    right: 10px;
    width: 200px;
    padding: 2px 10px;
    top: 5px;
  }
  .timeimg {
    width: 15px;
    height: 15px;
    color: #fff;
    font-size: 28px;
    font-weight: 600;
    float: left;
    margin-top: 2px;
    margin-right: 5px;
  }
  .menu-right {
    height: inherit;
    z-index: 11;
    .menu_item {
      float: left;
      margin-top: 20px;
      ul {
        position: absolute;
        top: 55px;
        left: 0;
        width: 500px;
        margin: 0 5px 60px;
        height: 0;
        // transition: 1s;
        overflow: hidden;
      }
    }
  }
  li {
    cursor: pointer;
    width: 110px;
    margin: 0 5px;
    float: left;
    height: 46px;
    .funmenutit {
      width: 80px;
      height: 56px;
      color: #ffffff;
      font-size: 16px;
      line-height: 56px;
      float: left;
      text-align: center;
      padding-left: 10px;
    }
    .funmenutit1 {
      width: 80px;
      height: 56px;
      color: #ffffff;
      font-size: 16px;
      line-height: 56px;
      float: left;
      text-align: left;
      padding-left: 10px;
    }
  }
  li:hover {
    box-shadow: 2px 2px 8px #69bdf0;
    border: 8px;
  }
  img {
    width: 15px;
    height: 15px;
    color: #fff;
    font-size: 28px;
    font-weight: 600;
    float: left;
    margin-top: 19px;
  }
}
.menuRight .menu-right .menu_item:hover ul {
  height: auto;
  border: none;
  li {
    width: 140px;
    height: 28px;
    i {
      width: 12px;
      height: 12px;
      line-height: 12px;
      font-size: 24px;
      float: left;
      color: #99c7fe;
      padding-top: 12px;
    }
    .funmenutit {
      width: auto;
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      float: left;
      color: #99c7fe;
    }
  }
}
.menu_septalline {
  width: 2px;
  height: 36px;
  margin: 10px 12px;
  float: left;
  background-color: #b6b6b6;
}
#slider {
  position: absolute;
  left: 50%;
  top: 0px;
  background-color: #d3d3d3;
  width: 5px;
  height: 100%;
  z-index: 9999;
}
</style>
