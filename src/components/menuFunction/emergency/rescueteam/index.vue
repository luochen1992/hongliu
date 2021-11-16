<template>
  <div class="rescueteam"
       v-show="showrescue">
    <div class="left">
      <el-card v-show="showitem1"
               class="box-card">
        <div slot="header"
             class="clearfix">
          <span>应急救援指挥部</span>
        </div>
        <div class="item">
          <div class="itemli">
            <div class="tiemli_tit">总指挥：</div>
            <div class="tiemli_cen">矿长</div>
          </div>
          <div class="itemli">
            <div class="tiemli_tit">副总指挥：</div>
            <div class="tiemli_cen">总工程师</div>
          </div>
          <div class="itemli">
            <div class="tiemli_tit">指挥部成员：</div>
            <div class="tiemli_cen">生产副矿长，安全副矿长，机电副矿长，调度室主任，地测科科长，生产科科长等</div>
          </div>
          <div class="itemli">
            <div class="tiemli_tit">通讯录：</div>
            <div class="tiemli_cen"><i class="el-icon-phone itemphone"></i></div>
          </div>
          <div class="itemli">
            <div class="tiemli_tit">职责：</div>
            <div class="tiemli_cen">
              应急救援指挥部负责指挥应急救援工作。发生事故后，负责制定抢险救灾方案和安全技术措施，指挥现场抢险救灾。负责组织全矿生产安全事故应急救援演练，监督检查各系统应急演练。
            </div>
          </div>
        </div>
      </el-card>
      <el-card v-show="showitem2"
               class="box-card">
        <div slot="header"
             class="clearfix">
          <span>抢险救援组</span>
        </div>
        <div class="item">
          <div class="itemli">
            <div class="tiemli_tit">组长：</div>
            <div class="tiemli_cen">XXX</div>
          </div>
          <div class="itemli">
            <div class="tiemli_tit">成员：</div>
            <div class="tiemli_cen">救护队、矿有关科室、单位人员</div>
          </div>
          <div class="itemli">
            <div class="tiemli_tit">通讯录：</div>
            <div class="tiemli_cen"><i class="el-icon-phone itemphone"></i></div>
          </div>
          <div class="itemli">
            <div class="tiemli_tit">职责：</div>
            <div class="tiemli_cen">
              主要负责指挥现场抢险工作，实施应急救援指挥部制定的抢险救灾方案和安全技术措施，组织现场抢救，根据井下的实际情况，在保证安全的情况下，组织撤离被困人员、搬运受伤人员到安全地点或升井，处理突发灾变，及时向抢险指挥部汇报救援进展情况。
            </div>
          </div>
        </div>
      </el-card>
      <el-card v-show="showitem3"
               class="box-card">
        <div slot="header"
             class="clearfix">
          <span>专家技术组</span>
        </div>
        <div class="item">
          <div class="itemli">
            <div class="tiemli_tit">组长：</div>
            <div class="tiemli_cen">XXX</div>
          </div>
          <div class="itemli">
            <div class="tiemli_tit">成员：</div>
            <div class="tiemli_cen">救援专家和测量、生产、基建、安全有关科室人员</div>
          </div>
          <div class="itemli">
            <div class="tiemli_tit">通讯录：</div>
            <div class="tiemli_cen"><i class="el-icon-phone itemphone"></i></div>
          </div>
          <div class="itemli">
            <div class="tiemli_tit">职责：</div>
            <div class="tiemli_cen">
              主要研究制定抢救技术方案和措施，解决抢险过程中遇到的技术难题，协助现场抢险救灾组抢险救灾。生产部门负责提供与抢险救灾相关的图纸、资料，参与救灾抢险及恢复生产的准备工作。机电部门负责救灾过程中机电设备的供应、抢修和正常运转，掌握矿井停送电工作，抢险救灾物资及人员的运输。
            </div>
          </div>
        </div>
      </el-card>
      <el-card v-show="showitem4"
               class="box-card">
        <div slot="header"
             class="clearfix">
          <span>医疗救护组</span>
        </div>
        <div class="item">
          <div class="itemli">
            <div class="tiemli_tit">组长：</div>
            <div class="tiemli_cen">XXX</div>
          </div>
          <div class="itemli">
            <div class="tiemli_tit">成员：</div>
            <div class="tiemli_cen">医护人员</div>
          </div>
          <div class="itemli">
            <div class="tiemli_tit">通讯录：</div>
            <div class="tiemli_cen"><i class="el-icon-phone itemphone"></i></div>
          </div>
          <div class="itemli">
            <div class="tiemli_tit">职责：</div>
            <div class="tiemli_cen">负责对受伤人员的医疗救护。</div>
          </div>
        </div>
      </el-card>
      <el-card v-show="showitem5"
               class="box-card">
        <div slot="header"
             class="clearfix">
          <span>物资供应组</span>
        </div>
        <div class="item">
          <div class="itemli">
            <div class="tiemli_tit">组长：</div>
            <div class="tiemli_cen">XXX</div>
          </div>
          <div class="itemli">
            <div class="tiemli_tit">成员：</div>
            <div class="tiemli_cen">供应科、机电科</div>
          </div>
          <div class="itemli">
            <div class="tiemli_tit">通讯录：</div>
            <div class="tiemli_cen"><i class="el-icon-phone itemphone"></i></div>
          </div>
          <div class="itemli">
            <div class="tiemli_tit">职责：</div>
            <div class="tiemli_cen">负责应急救援物资调集，保证抢险救灾中物资和设备的及时供应，并及时迅速运送到指定地点。</div>
          </div>
        </div>
      </el-card>
    </div>
    <div class="right">
      <el-card v-show="showitem6"
               class="box-card">
        <div slot="header"
             class="clearfix">
          <span>安全保卫组</span>
        </div>
        <div class="item">
          <div class="itemli">
            <div class="tiemli_tit">组长：</div>
            <div class="tiemli_cen">XXX</div>
          </div>
          <div class="itemli">
            <div class="tiemli_tit">成员：</div>
            <div class="tiemli_cen">派出所</div>
          </div>
          <div class="itemli">
            <div class="tiemli_tit">通讯录：</div>
            <div class="tiemli_cen"><i class="el-icon-phone itemphone"></i></div>
          </div>
          <div class="itemli">
            <div class="tiemli_tit">职责：</div>
            <div class="tiemli_cen">主要负责在各大门口设置警戒，疏散、戒严和维持秩序、交通等工作，防治事故现场人为破坏和其他突发事件。</div>
          </div>
        </div>
      </el-card>
      <el-card v-show="showitem7"
               class="box-card">
        <div slot="header"
             class="clearfix">
          <span>后勤保障组</span>
        </div>
        <div class="item">
          <div class="itemli">
            <div class="tiemli_tit">组长：</div>
            <div class="tiemli_cen">XXX</div>
          </div>
          <div class="itemli">
            <div class="tiemli_tit">成员：</div>
            <div class="tiemli_cen">综合办</div>
          </div>
          <div class="itemli">
            <div class="tiemli_tit">通讯录：</div>
            <div class="tiemli_cen"><i class="el-icon-phone itemphone"></i></div>
          </div>
          <div class="itemli">
            <div class="tiemli_tit">职责：</div>
            <div class="tiemli_cen">负责接待有关人员，安排吃、住、行等工作，保障事故现场指挥系统及外部通讯畅通。</div>
          </div>
        </div>
      </el-card>
      <el-card v-show="showitem8"
               class="box-card">
        <div slot="header"
             class="clearfix">
          <span>安全监察组</span>
        </div>
        <div class="item">
          <div class="itemli">
            <div class="tiemli_tit">组长：</div>
            <div class="tiemli_cen">XXX</div>
          </div>
          <div class="itemli">
            <div class="tiemli_tit">成员：</div>
            <div class="tiemli_cen">安监处</div>
          </div>
          <div class="itemli">
            <div class="tiemli_tit">通讯录：</div>
            <div class="tiemli_cen"><i class="el-icon-phone itemphone"></i></div>
          </div>
          <div class="itemli">
            <div class="tiemli_tit">职责：</div>
            <div class="tiemli_cen">负责统计人数、被困人数，迅速汇报应急救援指挥部。按应急救援指挥部制定的救灾方案，配合救护队的救援工作及撤离事故现场人员，监督检查救灾方案的实施情况。</div>
          </div>
        </div>
      </el-card>
      <el-card v-show="showitem9"
               class="box-card">
        <div slot="header"
             class="clearfix">
          <span>善后处理组</span>
        </div>
        <div class="item">
          <div class="itemli">
            <div class="tiemli_tit">组长：</div>
            <div class="tiemli_cen">XXX</div>
          </div>
          <div class="itemli">
            <div class="tiemli_tit">成员：</div>
            <div class="tiemli_cen">工会等有关科室人员</div>
          </div>
          <div class="itemli">
            <div class="tiemli_tit">通讯录：</div>
            <div class="tiemli_cen"><i class="el-icon-phone itemphone"></i></div>
          </div>
          <div class="itemli">
            <div class="tiemli_tit">职责：</div>
            <div class="tiemli_cen">负责核实遇难者身份并通知遇难者家属，安排遇难者丧葬事宜，负责洽谈抚恤条件和家属的安抚工作。</div>
          </div>
        </div>
      </el-card>
      <el-card v-show="showitem10"
               class="box-card">
        <div slot="header"
             class="clearfix">
          <span>信息发布组</span>
        </div>
        <div class="item">
          <div class="itemli">
            <div class="tiemli_tit">组长：</div>
            <div class="tiemli_cen">XXX</div>
          </div>
          <div class="itemli">
            <div class="tiemli_tit">成员：</div>
            <div class="tiemli_cen">综合办、安监处等</div>
          </div>
          <div class="itemli">
            <div class="tiemli_tit">通讯录：</div>
            <div class="tiemli_cen"><i class="el-icon-phone itemphone"></i></div>
          </div>
          <div class="itemli">
            <div class="tiemli_tit">职责：</div>
            <div class="tiemli_cen">应急救援指挥部向公众及媒体发布事故信息。</div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
// 救援队伍
export default {
  name: 'rescueteam',
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  data() {
    return {
      showrescue: false,
      isshow_: false,
      showitem1: false,
      showitem2: false,
      showitem3: false,
      showitem4: false,
      showitem5: false,
      showitem6: false,
      showitem7: false,
      showitem8: false,
      showitem9: false,
      showitem10: false,
      itemlist: ['应急救援指挥部', '抢险救援组', '专家技术组', '医疗救护组', '物资供应组', '安全保卫组', '后勤保障组', '安全监察组', '善后处理组', '信息发布组']
    }
  },
  props: {
    rescueteamdata: {
      type: Array
    }
  },
  watch: {
    rescueteamdata: {
      handler(newval, oldval) {
        for (var n = 0; n < this.itemlist.length; n++) {
          if (newval.indexOf(this.itemlist[n]) > -1) {
            this['showitem' + (n + 1)] = true
          } else {
            this['showitem' + (n + 1)] = false
          }
        }
      },
      immediate: true
    },
    getNowMenuName(newV, oldV) {
      if (newV === 'rescueteam') {
        this.showrescue = true
      } else {
        this.showrescue = false
      }
    }
  },
  methods: {
    ...mapMutations({
      setNowMenuName: 'setNowMenuName'
    })
  }
}
</script>

<style scoped>
.rescueteam {
  height: auto;
}

.left {
  position: fixed;
  top: 80px;
  left: 10px;
  width: 23%;
  max-height: calc(100% - 100px);
  z-index: 0;
  background: rgba(28, 35, 59, 0.8);
  overflow-y: auto;
  overflow-x: hidden;
  /* overflow-y: auto;
  overflow-x: hidden;
  top: 80px;
  left: 10px;
  position: absolute;
  width: 380px;
  border-bottom: 1px solid #009bff;
  box-shadow: 0 0 5px 0 rgb(0 255 255 / 60%);
  z-index: 0;
  background: rgba(7, 28, 90, 0.5);
  border: 2px solid #105162;
  height: 810px; */
  border: 1px solid #000723;
}
.right {
  position: fixed;
  top: 80px;
  right: 40px;
  width: 23%;
  max-height: calc(100% - 100px);
  z-index: 0;
  overflow-y: auto;
  overflow-x: hidden;
  background: rgba(28, 35, 59, 0.8);
}

.box-card {
  width: 100%;
  background: transparent;
  border-radius: 5px;
  margin: 0;
  color: #fff;
  border: 1px solid #000723;
}

.el-card /deep/ .el-card__header {
  border-bottom: 1px solid #3f4042;
  background: rgba(36, 43, 66, 0.8);
}

.clearfix {
  font-size: 18px;
  font-weight: 600;
}

.item {
}
.itemli {
  height: 28px;
  line-height: 26px;
  font-size: 15px;
}
.tiemli_tit {
  float: left;
  width: 90px;
  min-height: 26px;
  text-align: right;
  color: #00e1ff;
}
.tiemli_cen {
  float: left;
  width: calc(100% - 100px);
  min-height: 26px;
}
.itemphone {
  background-color: #2ed5ea;
  font-size: 16px;
  padding: 2px;
  color: #3c39dc;
}
::-webkit-scrollbar-track-piece {
  background-color: #2b61a888;
}
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: #022847;
  background-clip: padding-box;
  min-height: 28px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #2196f3;
}
</style>
