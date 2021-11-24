<template>
  <div class="personsite">
    <table-page :pData="ppdata" v-if="showPopPoint"></table-page>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import TablePage from '../../tablePageControl/TablePage.vue'
export default {
  components: { TablePage },
  name: 'personsite',
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  data() {
    return {
      isshow: false,
      showPopPoint: false,
      eflag2: false,
      ppdata: []
    }
  },
  mounted() {},
  watch: {
    getNowMenuName(newV, oldV) {
      if (newV === 'personsite') {
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
      var _this = this
      if (!_this.eflag2) {
        _this.addPPEntities()
        _this.eflag2 = true
      }
      _this.showPopPoint = true
    },
    // 隐藏
    hide() {
      var _this = this
      _this.showPopPoint = false
    },
    // 加载模型
    addPPEntities() {
      var self = this

      var dataSources = new Cesium.CustomDataSource(Cesium.createGuid())
      viewer.dataSources.add(dataSources)
      var dataSources2 = new Cesium.CustomDataSource(Cesium.createGuid())
      viewer.dataSources.add(dataSources2)

      Cesium.Resource.fetchJson('SampleData/models/systemEquipment/systemJsonData/人员定位系统.json').then(function (jsonData) {
        var arr = []
        for (var i = 0; i < jsonData.Map.length; i++) {
          var obj = jsonData.Map[i]
          var Name = obj.Name
          var Position = obj.Position.split(',')
          if (obj.Matrix == undefined) {
            obj.Matrix = '1,0,0,0,1,0,0,0,1'
          }
          var matrix = obj.Matrix.split(',')
          var x = parseFloat(Position[0])
          var y = parseFloat(Position[1])
          var z = parseFloat(Position[2]) - 925.5

          var pos = window.fromLocal(x, y, z)
          var info = obj
          info.possion = pos
          var namelist = Name.split('/')

          info.name = namelist[2].split('.')[0] + i
          info.number = 'P_UI0004' + i * 7
          info.area = 'A区域'
          arr.push(info)
          
        }
        self.ppdata = arr
      })
    },
    showDialog() {}
  }
}
</script>

<style  lang="scss">
.personsite {
  width: 100%;
  height: 100%;
  color: #fff;
}
</style>
