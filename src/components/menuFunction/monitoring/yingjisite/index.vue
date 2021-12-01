<template>
  <div class="yingjisite">
    <table-page :pData="ppdata" :tablecolumn="tablecolumn" v-if="showPopPoint"></table-page>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import TablePage from '../../tablePageControl/TablePage.vue'
export default {
  components: { TablePage },
  name: 'yingjisite',
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  data() {
    return {
      isshow: false,
      showPopPoint: false,
      eflag2: false,
      ppdata: [],
      tablecolumn: [
          { label: '名称', prop: 'name', width: '150', align: 'center' },
          { label: '状态', prop: 'state', width: '', align: 'center' },
          { label: '位置', prop: 'area', width: '', align: 'center' }
      ]
    }
  },
  mounted() {},
  watch: {
    getNowMenuName(newV, oldV) {
      if (newV === 'yingjisite') {
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
        _this.addJKEntities()
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
    addJKEntities() {
      var self = this

      var dataSources = new Cesium.CustomDataSource(Cesium.createGuid())
      viewer.dataSources.add(dataSources)
      var dataSources2 = new Cesium.CustomDataSource(Cesium.createGuid())
      viewer.dataSources.add(dataSources2)

      Cesium.Resource.fetchJson('SampleData/models/systemEquipment/应急广播系统.json').then(function (jsonData) {
        var arr = []
        for (var i = 0; i < jsonData.Map.length; i++) {
          var obj = jsonData.Map[i]
          var Name = obj.Name

          if (obj.Matrix == undefined) {
            obj.Matrix = '1,0,0,0,1,0,0,0,1'
          }
          var matrix = obj.Matrix.split(',')
          var x = obj.X
          var y = obj.Y
          var z = obj.Z + 50

          var pos = window.fromLocal(x, y, z)
          var info = obj
          info.possion = pos
          // var namelist = Name.split('/')

          info.name = Name + i
          info.state = '在线' 
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
.yingjisite {
  width: 100%;
  height: 100%;
  color: #fff;
}
</style>
