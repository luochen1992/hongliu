<template>
  <div class="headmenu">
    <div class="hmenu">
      <el-menu mode="horizontal" :show-timeout="30" :hide-timeout="30" background-color="transparent" text-color="#fff" active-text-color="#409eff" :default-active="activeIndex" style="overflow-x: auto" @select="handleSelect">
        <NavMenu :navMenus="menus" style="width: 1080px; overflow-x: auto"></NavMenu>
      </el-menu>
    </div>
    <rescueteam v-show="selmenu === 1" :rescueteamdata="rescueteamdata"></rescueteam>
    <reliefgoods v-if="reliefgoodsflag" v-show="selmenu === 2" :reliefgoodsdata="reliefgoodsdata"></reliefgoods>
    <avoidingdisaster v-show="selmenu === 3" :avoidingdisasterdata="avoidingdisasterdata"></avoidingdisaster>
    <emergencydisaster v-show="selmenu === 4" :emergencydisasterdata="emergencydisasterdata"></emergencydisaster>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import NavMenu from '../../../components/NavMenu.vue'
import Avoidingdisaster from '../../../components/avoidingdisaster.vue'
import Emergencydisaster from '../../../components/emergencydisaster.vue'
import Reliefgoods from '../../../components/reliefgoods.vue'
import rescueteam from '../../../components/rescueteam.vue'
export default {
  components: { NavMenu, rescueteam, Reliefgoods, Avoidingdisaster, Emergencydisaster },
  props: ['menus'], // 菜单数据
  computed: {},
  data() {
    return {
      activeIndex: null,
      showitem: false,
      rescueteamdata: [],
      reliefgoodsdata: [],
      selmenu: 0,
      isIndeterminate: false,
      avoidingdisasterdata: [],
      emergencydisasterdata: [],
      reliefgoodsflag: false,
      fullscreenLoading: null
    }
  },
  created() {},

  mounted() {
    this.reliefgoodsflag = true
  },
  methods: {
    ...mapMutations({
      setNowMenuName: 'setNowMenuName',
      setOneMenuName: 'setOneMenuName'
    }),
    // 事件
    handleSelect(key, keyPath) {
      var self = this
      if (key !== null) {
        self.fullscreenLoading = this.$loading({
          lock: true,
          text: '',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0)'
        })
        this.setNowMenuName('')
        this.setOneMenuName('')
        this.selmenu = 0
        var idxh = key.split('_')
          if (keyPath.length === 1) {
            this.setOneMenuName(this.menus[Number(idxh[1])].id)
          } else if (keyPath.length === 2) {
            switch (idxh[0]) {
              case 'coalAnimation':
                this.setNowMenuName('coalAnimation')
                break
              case 'rescueTeam':
                this.rescueteamdata = []
                this.rescueteamdata = ['应急救援指挥部', '抢险救援组', '专家技术组', '医疗救护组', '物资供应组', '安全保卫组', '后勤保障组', '安全监察组', '善后处理组', '信息发布组']
                this.selmenu = 1
                break
              default:
                this.setNowMenuName(idxh[0])
                break
            }
          } else if (keyPath.length === 3) {
            switch (idxh[0]) {
              case 'materialParameter':
              case 'reliefGoods2':
                this.selmenu = 2
                var rtype = '物资台账'
                if (idxh[0] === 'reliefGoods2') {
                  rtype = '物资分布'
                }
                var arr = []
                var strs = ['物资台账', '物资分布']
                for (var i = 0; i < strs.length; i++) {
                  if (this.reliefgoodsdata.indexOf(strs[i]) > -1) {
                    if (strs[i] !== rtype) {
                      arr.push(strs[i])
                    }
                  } else {
                    if (strs[i] === rtype) {
                      arr.push(strs[i])
                    }
                  }
                }
                this.reliefgoodsdata = arr
                break
              // case 'rescueTeam1':
              //   var ch = this.menus[keyPath[0].split('_')[1]].children[keyPath[1].split('_')[1]].children
              //   if (ch[keyPath[2].split('_')[1]].value) {
              //     for (var cc = 1; cc < ch.length; cc++) {
              //       ch[cc].value = false
              //     }
              //     this.rescueteamdata = []
              //   } else {
              //     for (var cc2 = 1; cc2 < ch.length; cc2++) {
              //       ch[cc2].value = true
              //     }
              //     this.rescueteamdata = ['应急救援指挥部', '抢险救援组', '专家技术组', '医疗救护组', '物资供应组', '安全保卫组', '后勤保障组', '安全监察组', '善后处理组', '信息发布组']
              //   }
              //   this.isIndeterminate = false
              //   this.selmenu = 1
              //   break
              // case 'emergencyRescueHeadquarters':
              // case 'rescueTeam2':
              // case 'rescueTeam3':
              // case 'rescueTeam4':
              // case 'rescueTeam5':
              // case 'rescueTeam6':
              // case 'rescueTeam7':
              // case 'rescueTeam8':
              // case 'rescueTeam9':
              // case 'rescueTeam10':
              //   var rlist = []
              //   var v = this.menus[keyPath[0].split('_')[1]].children[keyPath[1].split('_')[1]].children
              //   var arre = ['应急救援指挥部', '抢险救援组', '专家技术组', '医疗救护组', '物资供应组', '安全保卫组', '后勤保障组', '安全监察组', '善后处理组', '信息发布组']
              //   for (var ee1 = 1; ee1 < v.length; ee1++) {
              //     if (v[ee1].id === idxh[0]) {
              //       if (!v[ee1].value) {
              //         rlist.push(arre[ee1 - 1])
              //       } else {
              //       }
              //     } else {
              //       if (v[ee1].value) {
              //         rlist.push(arre[ee1 - 1])
              //       }
              //     }
              //   }
              //   this.isIndeterminate = rlist.length > 0 && rlist.length < arre.length
              //   this.rescueteamdata = rlist
              //   this.selmenu = 1
              //   break
              case 'fireroute':
                this.avoidingdisasterdata = ['火灾避灾路线']
                this.selmenu = 3
                break
              case 'waterroute':
                this.avoidingdisasterdata = ['水灾避灾路线']
                this.selmenu = 3
                break
              case 'gasroute':
                this.avoidingdisasterdata = ['瓦斯避灾路线']
                this.selmenu = 3
                break
              case 'fireroute2':
                this.emergencydisasterdata = ['火灾应急路线']
                this.selmenu = 4
                break
              case 'waterroute2':
                this.emergencydisasterdata = ['水灾应急路线']
                this.selmenu = 4
                break
              case 'gasroute2':
                this.emergencydisasterdata = ['瓦斯应急路线']
                this.selmenu = 4
                break
              default:
                break
            }
          }
          self.fullscreenLoading.close()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.headmenu {
  position: absolute;
  top: 0px;
  left: 400px;
  z-index: 111000;
  background: transparent;
  .hmenu {
    width: 100%;
    height: 100%;
    .el-menu {
      background: transparent;
      border: none;
      .el-submenu {
        color: #fff;
        font-size: 16px;
        .el-submenu:hover {
          color: #fff;
          background: url('../../../assets/images/header-button-on.png') no-repeat;
          background-position-y: 22px;
        }
        .el-submenu__title {
          color: #fff;
          padding: 0px;
        }
      }
      .el-menu-item {
        color: #fff;
        font-size: 16px;
        .el-submenu__title {
          color: #fff;
        }
      }
    }
  }
}
</style>
