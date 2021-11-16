<template>
  <div class="functionMenu">
    <div class="function-menu">
      <div class="funMenu_item">
        <li title="透明矿山">
          <img src="../../assets/images/透明矿山.png">
          <div class="funmenutit1" @mouseenter="enter(0)">透明矿山</div>
        </li>
        <ul>
          <li @click="functionClick('databig')" title="数据大屏">
            <i class="iconfont icon-biaozhu1"></i>
            <div class="funmenutit">数据大屏</div>
          </li>
          <li @click="functionClick('fun1')" title="系统总览">
            <i class="iconfont icon-liangce"></i>
            <div class="funmenutit">系统总览</div>
          </li>
          <li @click="functionClick('fanhouse')" title="二维一张图">
            <i class="iconfont icon-shipin"></i>
            <div class="funmenutit">二维一张图</div>
          </li>
        </ul>
      </div>
      <div class="funMenu_item">
        <li title="机电系统">
          <img src="../../assets/images/机电系统.png">
          <div class="funmenutit1" @mouseenter="enter(1)">机电系统</div>
        </li>
        <ul>
          <li @click="functionClick('fanhouse')" title="主通风机监控系统">
            <i class="iconfont icon-dianchaxun"></i>
            <div class="funmenutit">主通风机监控系统</div>
          </li>
          <li @click="functionClick('fanhouse')" title="压风机监控系统">
            <i class="iconfont icon-dianchaxun"></i>
            <div class="funmenutit">压风机监控系统</div>
          </li>
          <li @click="functionClick('fanhouse')" title="水泵房监控系统">
            <i class="iconfont icon-dianchaxun"></i>
            <div class="funmenutit">水泵房监控系统</div>
          </li>
        </ul>
      </div>
      <div class="funMenu_item">
        <li title="运输系统">
          <img src="../../assets/images/运输.png">
          <div class="funmenutit1" @mouseenter="enter(2)">运输系统</div>
        </li>
        <ul>
          <li @click="functionClick('fanhouse')" title="皮带监控系统">
            <i class="iconfont icon-dianchaxun"></i>
            <div class="funmenutit">皮带监控系统</div>
          </li>
          <li @click="functionClick('fanhouse')" title="装车系统">
            <i class="iconfont icon-dianchaxun"></i>
            <div class="funmenutit">装车系统</div>
          </li>
        </ul>
      </div>
      <div class="funMenu_item">
        <li title="实时专题图">
          <img src="../../assets/images/集控.png">
          <div class="funmenutit1" @mouseenter="enter(2)">实时专题图</div>
        </li>
        <ul>
          <li @click="functionClick('coalflow')" title="井下煤流专题图">
            <i class="iconfont icon-dianchaxun"></i>
            <div class="funmenutit">井下煤流专题图</div>
          </li>
          <li @click="functionClick('windflow')" title="井下风流专题图">
            <i class="iconfont icon-dianchaxun"></i>
            <div class="funmenutit">井下风流专题图</div>
          </li>
          <li @click="functionClick('personflow')" title="井下人流专题图">
            <i class="iconfont icon-dianchaxun"></i>
            <div class="funmenutit">井下人流专题图</div>
          </li>
          <li @click="functionClick('carflow')" title="井下车流专题图">
            <i class="iconfont icon-dianchaxun"></i>
            <div class="funmenutit">井下车流专题图</div>
          </li>
          <li @click="functionClick('fanhouse')" title="井下三维专题图">
            <i class="iconfont icon-dianchaxun"></i>
            <div class="funmenutit">井下耗电专题图</div>
          </li>
          <li @click="functionClick('fanhouse')" title="井下水文专题图">
            <i class="iconfont icon-dianchaxun"></i>
            <div class="funmenutit">井下水文专题图</div>
          </li>
        </ul>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'functionMenu',
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  data() {
    return {
      data: []
    }
  },
  mounted() {},
  watch: {
  },
  methods: {
    ...mapMutations({
      setNowMenuName: 'setNowMenuName'
    }),
    // 点击事件
    functionClick(value) {
      this.setNowMenuName(value)
    },  
    
    enter(val){
      $('.functionMenu .function-menu .funMenu_item ul')[val].style.left = (val*140)+'px';
    }
  }
}
</script>

<style  lang="scss">
.functionMenu {
  position: absolute;
  top: 22px;
  z-index: 10;
  padding: 1% 2%;
  .function-menu {
    height: inherit;
    z-index: 11;
    .funMenu_item {
      float: left;
      ul {
        position: absolute;
        top:55px;
        left: 0;
        width:980px;
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
    float:left;
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
      width: 90px;
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
    border-radius: 8px;
  }
  img{
    width: 15px;
    height: 15px;
    color: #fff;
    font-size: 28px;
    font-weight: 600;
    float: left;
    margin-top: 19px;
  }
}
.functionMenu .function-menu .funMenu_item:hover ul {
  padding: 5px 0 0 50px;
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
            background-color: #D3D3D3;
            width: 5px;
            height: 100%;
            z-index: 9999;
    }
</style>
