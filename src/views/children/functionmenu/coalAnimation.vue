<template>
  <div class="coalAnimation"></div>
</template>
 <script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'coalAnimation',
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  data() {
    return {
      isshow: false,
      showitem: false,
      handler: null
    }
  },
  mounted() {},
  watch: {
    getNowMenuName(newV, oldV) {
      if (newV === 'coalAnimation') {
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
      // console.log('fdfdf')
      var _this = this
      _this.DynamicWatch()
    },
    // 隐藏
    hide() {
      viewer.entities.removeAll()

      if (this.handler) {
        this.handler.destroy()
        this.handler.removeInputAction(window.Cesium.ScreenSpaceEventType.WHEEL)
        window.viewer.screenSpaceEventHandler.removeInputAction(window.Cesium.ScreenSpaceEventType.WHEEL)
        if (this.handler && !this.handler.isDestroyed()) this.handler = this.handler && this.handler.destroy()
        this.handler = null
      }
    },
    //
    DynamicWatch() {
      var lineArray = [] //中心线坐标
      var lineArrayW = [] //宽度
      lineArray.push([112.72705031835125, 35.67396511170529, 91.47360619060794, 112.72757863236079, 35.67382432830029, 103.97803868949202])
      lineArrayW.push(20)

      lineArray.push([112.7278144176809, 35.673811173054524, 83.800290315277834, 112.72898334809504, 35.673499798614706, 97.11865777577627])
      lineArrayW.push(20)

      lineArray.push([112.72923088895712, 35.67347436860271, 79.493282803639495, 112.72950286613026, 35.673329729166795, 82.650563158109726])
      lineArrayW.push(40)

      lineArray.push([112.72957384777744, 35.67329114315905, 84.34623151989403, 112.72969606639627, 35.673228796384635, 85.89242825377763])
      lineArrayW.push(40)

      lineArray.push([112.72977366338685, 35.67316020249733, 85.73210468380413, 112.73048172648305, 35.67278346103405, 96.17550506057196])
      lineArrayW.push(20)

      lineArray.push([112.73058012584394, 35.67272856356548, 100.42910792129783, 112.73073215342714, 35.67264981563726, 104.69359077179426])
      lineArrayW.push(20)

      lineArray.push([112.73087554560276, 35.67257899034669, 57.274694440966847, 112.73117239181434, 35.67242237176423, 61.205632919932754])
      lineArrayW.push(20)

      lineArray.push([112.73117537422642, 35.67241706528523, 61.662009087946565, 112.73162408537102, 35.67217836628906, 74.575557512130175])
      lineArrayW.push(20)

      for (var i = 0; i < lineArray.length; i++) {
        var length = 0.0
        var line = lineArray[i]
        for (var j = 0; j < line.length - 3; j += 3) {
          var x1 = line[j]
          var y1 = line[j + 1]
          var z1 = line[j + 2]
          var x2 = line[j + 3]
          var y2 = line[j + 4]
          var z2 = line[j + 5]
          var position1 = Cesium.Cartesian3.fromDegrees(x1, y1, z1)
          var position2 = Cesium.Cartesian3.fromDegrees(x2, y2, z2)
          length += Cesium.Cartesian3.distance(position1, position2)
        }

        var material = new Cesium.PolylineTrailLinkMaterialProperty(i + 'PolylineTrailLink1', Cesium.Color.RED, 'img/green128.png', 1000)
        Cesium.Material._materialCache.addMaterial(material.name, {
          fabric: {
            type: material.name,
            uniforms: {
              color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
              image: material.image,
              repeat: new Cesium.Cartesian2(length / 10, 1),
              time: 0
            },
            source: Cesium.Material.PolylineTrailLinkSource
          },
          translucent: function (material) {
            return true
          }
        })

        viewer.entities.add({
          name: 'PolylineTrail',
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArrayHeights(lineArray[i]),
            width: lineArrayW[i],
            material: material
          }
        })
      }

      viewer.camera.setView({
        destination: new Cesium.Cartesian3.fromDegrees(112.72790423106657, 35.669246406761346, 512.59),
        orientation: {
          heading: 0.27445089249165733,
          pitch: -0.7384197981491574,
          roll: 0.0011680906278730419
        }
      })
    }
  }
}
</script>