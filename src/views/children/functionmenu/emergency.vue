<template>
  <div class="emergency">
    <div class="emergency_head" v-show="isshow">
      <div class="titlebg" @mouseenter="enter()" @mouseleave="leave()">
        <img src="../../../assets/images/cicular/1.png" class="emergencyimg" />
        <span class="emergencyfont">救援队伍</span>
        <ul :class="showitem ? 'oldul newul2' : 'oldul'">
          <li>
            <el-checkbox :indeterminate="isIndeterminate" v-model="rescueteamcheckAll" @change="handleCheckAllChange">全选</el-checkbox>
          </li>
          <el-checkbox-group v-model="rescueteamdata" @change="handleCheckedCitiesChange">
            <li v-for="item in rescueteamlist" :key="item">
              <el-checkbox :label="item">{{ item }}</el-checkbox>
            </li>
          </el-checkbox-group>
          <!-- <li>
            <el-checkbox>全部选择</el-checkbox>
          </li>
          <li>
            <el-checkbox>应急救援指挥部</el-checkbox>
          </li>
          <li>
            <el-checkbox>抢险救援组</el-checkbox>
          </li>
          <li>
            <el-checkbox>专家技术组</el-checkbox>
          </li>
          <li>
            <el-checkbox>医疗救护组</el-checkbox>
          </li>
          <li>
            <el-checkbox>物资供应组</el-checkbox>
          </li>
          <li>
            <el-checkbox>安全保卫组</el-checkbox>
          </li>
          <li>
            <el-checkbox>后勤保障组</el-checkbox>
          </li>
          <li>
            <el-checkbox>安全监察组</el-checkbox>
          </li>
          <li>
            <el-checkbox>善后处理组</el-checkbox>
          </li>
          <li>
            <el-checkbox>信息发布组</el-checkbox>
          </li> -->
        </ul>
      </div>
      <div class="titlebg" @mouseenter="enter2()" @mouseleave="leave2()">
        <img src="../../../assets/images/cicular/2.png" class="emergencyimg" />
        <span class="emergencyfont">救援物资</span>
        <ul :class="showitem2 ? 'oldul newul' : 'oldul'">
          <li @click="reliefgoodsClick('物资台账')">
            <label>物资台账</label>
          </li>
          <li @click="reliefgoodsClick('物资分布')">
            <label>物资分布</label>
          </li>
        </ul>
      </div>
      <div class="titlebg" @mouseenter="enter3()" @mouseleave="leave3()">
        <img src="../../../assets/images/cicular/3.png" class="emergencyimg" />
        <span class="emergencyfont">避灾路线</span>
        <ul :class="showitem3 ? 'oldul newul' : 'oldul'">
          <li @click="functionClick('fireroute')">
            <label>火灾避灾路线</label>
          </li>
          <li @click="functionClick('waterroute')">
            <label>水灾避灾路线</label>
          </li>
          <li @click="functionClick('gasroute')">
            <label>瓦斯避灾路线</label>
          </li>
        </ul>
      </div>
      <div class="titlebg" @mouseenter="enter4()" @mouseleave="leave4()">
        <img src="../../../assets/images/cicular/3.png" class="emergencyimg" />
        <span class="emergencyfont">应急路线</span>
        <ul :class="showitem4 ? 'oldul newul' : 'oldul'">
          <li @click="functionClick2('火灾应急路线')">
            <label>火灾应急路线</label>
          </li>
          <li @click="functionClick2('水灾应急路线')">
            <label>水灾应急路线</label>
          </li>
          <li @click="functionClick2('瓦斯应急路线')">
            <label>瓦斯应急路线</label>
          </li>
        </ul>
      </div>
    </div>
    <rescueteam v-if="selmenu === 1" :rescueteamdata="rescueteamdata"></rescueteam>
    <reliefgoods v-if="selmenu === 2" :reliefgoodsdata="reliefgoodsdata"></reliefgoods>
    <avoidingdisaster v-show="selmenu === 3" :avoidingdisasterdata="avoidingdisasterdata"></avoidingdisaster>
    <emergencydisaster v-show="selmenu === 4" :emergencydisasterdata="emergencydisasterdata"></emergencydisaster>
    <fireroute v-show="avoiditem === 1"></fireroute>
    <waterroute v-show="avoiditem === 2"></waterroute>
    <gasroute v-show="avoiditem === 3"></gasroute>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import rescueteam from '@/components/rescueteam'
import reliefgoods from '@/components/reliefgoods'
import avoidingdisaster from '@/components/avoidingdisaster'
import emergencydisaster from '@/components/emergencydisaster'
import fireroute from '@/components/avoidingdisaster/fireRoute.vue'
import waterroute from '@/components/avoidingdisaster/waterRoute.vue'
// import personflow from './personflow.vue'
import gasroute from '@/components/avoidingdisaster/gasRoute.vue'
export default {
  name: 'emergency',
  computed: {
    ...mapGetters(['getOneMenuName'])
  },
  components: {
    rescueteam,
    reliefgoods,
    avoidingdisaster,
    emergencydisaster,
    fireroute,
    waterroute,
    gasroute
  },
  data() {
    return {
      isshow_: false,
      isshow: false,
      showitem: false,
      showitem3: false,
      showitem4: false,
      showitem2: false,
      selmenu: 0,
      avoiditem: 0,
      rescueteamdata: [],
      reliefgoodsdata: [],
      avoidingdisasterdata: [],
      emergencydisasterdata:[],
      rescueteamcheckAll: false,
      rescueteamlist: ['应急救援指挥部', '抢险救援组', '专家技术组', '医疗救护组', '物资供应组', '安全保卫组', '后勤保障组', '安全监察组', '善后处理组', '信息发布组'],
      rescueteamcheckeditem: [],
      isIndeterminate: false
    }
  },
  mounted() {},
  watch: {
    getOneMenuName(newV, oldV) {
      if (newV === 'emergency') {
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
    // // 点击事件
    // functionClick(value) {
    //   this.setNowMenuName(value)
    // },
    // 显示
    show() {
      var _this = this
      _this.isshow = true
      this.selmenu = 1
    },
    // 隐藏
    hide() {
      this.isshow = false
      this.rescueteamdata = []
      this.reliefgoodsdata = []
      this.avoidingdisasterdata = []
      this.emergencydisasterdata = []
      this.selmenu = 0
    },
    enter() {
      this.showitem = true
    },
    leave() {
      this.showitem = false
    },
    enter2() {
      this.showitem2 = true
    },
    leave2() {
      this.showitem2 = false
    },
    enter3() {
      this.showitem3 = true
    },
    leave3() {
      this.showitem3 = false
    },
    enter4() {
      this.showitem4 = true
    },
    leave4() {
      this.showitem4 = false
    },
    //
    reliefgoodsClick(type) {
      this.rescueteamdata = []
      var arr = []
      var strs = ['物资台账', '物资分布']
      for (var i = 0; i < strs.length; i++) {
        if (this.reliefgoodsdata.indexOf(strs[i]) > -1) {
          if (type !== strs[i]) {
            arr.push(strs[i])
          }
        } else {
          if (type === strs[i]) {
            arr.push(strs[i])
          }
        }
      }
      this.reliefgoodsdata = arr
      this.avoidingdisasterdata = []
      this.emergencydisasterdata = []
      this.selmenu = 2
    },
    functionClick(type) {
      this.rescueteamdata = []
      this.reliefgoodsdata = []
      this.selmenu = 3
      this.avoidingdisasterdata = [type]
      this.emergencydisasterdata = []
      var _this = this
      switch (type) {
        case 'fireroute':
          _this.avoiditem = 1
          break
        case 'waterroute':
          _this.avoiditem = 2
          break
        case 'gasroute':
          _this.avoiditem = 3
          break
      }
      this.setNowMenuName(type)
    },
    functionClick2(type) {
      this.rescueteamdata = []
      this.reliefgoodsdata = []
      this.selmenu = 4
      this.avoidingdisasterdata = []
      this.emergencydisasterdata = [type]
    },
    handleCheckAllChange(val) {
      this.rescueteamdata = val ? this.rescueteamlist : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.rescueteamcheckAll = checkedCount === this.rescueteamlist.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.rescueteamlist.length
    }
  }
}
</script>

<style  lang="scss">
.emergency {
  width: 100%;
  height: 100%;
  color: #fff;
  .emergency_head {
    position: absolute;
    top: 81px;
    left: calc(50% - 304px);
    height: 40px;
    width: 640px;
    z-index: 11;
  }
  .emergencyimg {
    width: 30px;
    height: 30px;
    margin: 4px 15px;
  }
  .emergencyfont {
    font-size: 14pt;
  }
  .elcheckbox {
    float: left;
  }
}

.titlebg {
  background: url('/img/cicular/emagency2.png') no-repeat center top;
  width: 160px;
  height: 40px;
  float: left;
  cursor: pointer;
}

.titlebg ul li {
  cursor: pointer;
  background-color: #0a2665;
  border: 1px solid #396b76;
}
.titlebg ul li:hover {
  background-color: #02a7f0;
}
.el-checkbox {
  color: #ffffff !important;
}
.oldul {
  left: 0;
  width: 160px;
  height: 0;
  -webkit-transition: 1s;
  transition: 1s;
  overflow: hidden;
}
.newul {
  height: auto;
  text-align: center;
}

.newul2 {
  height: auto;
  text-align: left;
}
</style>
