<template>
  <div class="zongcaiAnimation">
    <pesonel-positiond-dialog :pData="ppdata" :tablecolumn="tablecolumn" v-if="showPopPoint"></pesonel-positiond-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import pesonelPositiondDialog from '../../monitoring/pesonelPositiondDialog.vue'
export default {
  components: { pesonelPositiondDialog },
  name: 'zongcaiAnimation',
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
          { label: '名称', prop: 'name', width: '', align: 'center' },
          { label: '状态', prop: 'number', width: '', align: 'center' },
          //{ label: '区域', prop: 'area', width: '', align: 'center' }
      ]
    }
  },
  mounted() {},
  watch: {
    getNowMenuName(newV, oldV) {
      if (newV === 'zongcaiAnimation') {
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
        _this.addZCEntities()
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
    addZCEntities() {
      var self = this

      var dataSources = new Cesium.CustomDataSource(Cesium.createGuid())
      viewer.dataSources.add(dataSources)
      var dataSources2 = new Cesium.CustomDataSource(Cesium.createGuid())
      viewer.dataSources.add(dataSources2)

      Cesium.Resource.fetchJson('data/采空区.json').then(function (jsonData) {
        var arr = []
        var aveX = 0
        var aveY = 0
        var aveZ = 0

        for (var i = 0; i < jsonData.Map.length; i++) {
          var obj = jsonData.Map[i]
          var Name = obj.Name
          var Position = obj.coords.split(',')
          if (obj.Matrix == undefined) {
            obj.Matrix = '1,0,0,0,1,0,0,0,1'
          }
          var matrix = obj.Matrix.split(',')
          for(var j = 0; j < (Position.length); j=j+3)
          {
            aveX = parseFloat(Position[j]) + aveX
            aveY = parseFloat(Position[j+1]) + aveY
            aveZ = parseFloat(Position[j+2]) + aveZ
          }
          if (Position.length){
            var x = aveX / (Position.length / 3)
            var y = aveY / (Position.length / 3)
            var z = (aveZ / (Position.length/3)) - 450.5
          } else {
            continue
          }        

        
          var pos = window.fromLocal(x, y, z)
          var info = obj
          info.possion = pos
          info.position = Position
          var namelist = Name

          info.name = Name
          info.number = 'P_UI0004' + i * 7
          info.area = 'A区域'
          arr.push(info)
          Position=[]
          aveX = 0
          aveY = 0
         
        }
        self.ppdata = arr
      })
    },
    showDialog() {}
  }
}
</script>

<style  lang="scss">
.zongcaiAnimation {
  width: 100%;
  height: 100%;
  color: #fff;
}
</style>
