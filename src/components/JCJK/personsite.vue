<template>
  <div class="personsite">
    <pesonel-positiond-dialog :pData="ppdata" v-if="showPopPoint"></pesonel-positiond-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import pesonelPositiondDialog from './pesonelPositiondDialog.vue'
export default {
  components: { pesonelPositiondDialog },
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
      // if (window.MCgCD) {
      //   if (window.MCgCD.d1) {
      //     viewer.dataSources.remove(window.MCgCD.d1)
      //     window.MCgCD.d1 = null
      //   }
      //   if (window.MCgCD.d2) {
      //     viewer.dataSources.remove(window.MCgCD.d2)
      //     window.MCgCD.d2 = null
      //   }
      //   window.MCgCD = null
      // }
    },
    // 加载模型
    addPPEntities() {
      var self = this

      var dataSources = new Cesium.CustomDataSource(Cesium.createGuid())
      viewer.dataSources.add(dataSources)
      var dataSources2 = new Cesium.CustomDataSource(Cesium.createGuid())
      viewer.dataSources.add(dataSources2)
      // window.MCgCD = { d1: dataSources, d2: dataSources2 }

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
          // addModel33("models/mo/jw2.gltf",Matrix,(x),(y),(z));

          var pos = window.fromLocal(x, y, z)
          var info = obj
          info.possion = pos
          var namelist = Name.split('/')

          info.name = namelist[2].split('.')[0] + i
          info.number = 'P_UI0004' + i * 7
          info.area = 'A区域'
          arr.push(info)
          // var imgname = '人员定位'
          // var e1 = dataSources.entities.add({
          //   name: obj.name,
          //   position: pos,
          //   billboard: {
          //     image: '/img/marker/' + imgname + '.png',
          //     scale: 0.5,
          //     distanceDisplayCondition: new Cesium.DistanceDisplayCondition(40, 20000),
          //     width: 42,
          //     height: 42,
          //     disableDepthTestDistance: 10000
          //   }
          // })
          // e1.info = info
          // //点击事件
          // var e2 = dataSources2.entities.add({
          //   name: obj.name + '-label',
          //   position: pos,
          //   label: {
          //     text: obj.name + '\r \n' + obj.number,
          //     font: '32px 微软雅黑',
          //     distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 30),

          //     fillColor: new Cesium.Color(0.894, 1, 0, 1),
          //     outlineColor: new Cesium.Color(1, 0.9, 0.13, 0),
          //     outlineWidth: 1.0,
          //     pixelOffset: new CTMap.Cartesian2(-50, -20),
          //     showBackground: true
          //     // backgroundColor: CTMap.Color.DARKCYAN.withAlpha(0.7),
          //     // backgroundPadding: new CTMap.Cartesian2(2, 2),
          //     // disableDepthTestDistance: Number.POSITIVE_INFINITY
          //   }
          // })
        }
        self.ppdata = arr
      })
      // uia.earth.getObject('ff1109ec-e271-4295-92ef-65437bfa2b22').onclick = (e) => {
      //   console.log('1')
      // }
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
