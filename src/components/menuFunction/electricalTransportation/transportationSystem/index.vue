<template>
  <div class="transportationSystem">
    <table-page :pData="ppdata" :tablecolumn="tablecolumn" v-if="showPopPoint"></table-page>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import TablePage from '../../tablePageControl/TablePage.vue'
export default {
  components: { TablePage },
  name: 'transportationSystem',
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
          { label: '名称', prop: 'name', width: '180', align: 'center' }
      ]
    }
  },
  mounted() {},
  watch: {
    getNowMenuName(newV, oldV) {
      if (newV === 'transportationSystem') {
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
        _this.getJsonData()
        _this.eflag2 = true
      }
      _this.showPopPoint = true
    },
    // 隐藏
    hide() {
      var _this = this
      _this.showPopPoint = false
      
    },
    // 读取json文件并填充到面板中
    getJsonData() {
      var self = this
      Cesium.Resource.fetchJson('data/electricalTransportation/transportationSystem.json').then(function (jsonData) {
        var arr = []
        for (var i = 0; i < jsonData.Map.length; i++) {
          var obj = jsonData.Map[i]

          if (obj.Matrix == undefined) {
            obj.Matrix = '1,0,0,0,1,0,0,0,1'
          }
          var matrix = obj.Matrix.split(',')
          let x = 0, y = 0, z = 0,heading = 0, pitch = 0, roll =0
          if(obj.position.length>0){
               x = obj.position[0]
               y = obj.position[1]
               z = obj.position[2]
          }
           if(obj.orientation.length>0){
               heading = obj.orientation[0]
               pitch = obj.orientation[1]
               roll = obj.orientation[2]
          }
          var info = obj
          info.flag = 1; //用于判断json文件中的坐标是否为WGS经纬度；flag=1为经纬度坐标；flag = 0 为其他坐标系（例如2000坐标系等）
          info.possion = {x:x,y:y,z:z}
          info.flymode = 1 // 用于判断飞过去的方式，flymode= 1为setView的方式，flymode =0 默认为直接飞往相应位置flyTo
          info.orientation = {heading:heading,pitch:pitch,roll:roll}

          info.name = obj.name
          arr.push(info)
        }
        self.ppdata = arr
      })
    }
  }
}
</script>

<style  lang="scss">
.transportationSystem {
  width: 100%;
  height: 100%;
  color: #fff;
}
</style>
