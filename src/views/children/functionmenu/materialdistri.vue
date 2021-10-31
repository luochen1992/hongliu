<template>
  <div class="materialdistri"></div>
</template>
 <script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'materialdistri',
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  data() {
    return {
      isshow: false,
      handler: null
    }
  },
  mounted() {},
  watch: {
    getNowMenuName(newV, oldV) {
      if (newV === 'materialdistri') {
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
      console.log('fdfdf')
      var _this = this
      // _this.addMaterialStorage()
    },
    // 隐藏
    hide() {
      // if (viewer.dataSources._dataSource) {
      //   viewer.dataSources.remove(_dataSource)
      // }
      if (this.handler) {
        this.handler.destroy()
        this.handler.removeInputAction(window.Cesium.ScreenSpaceEventType.WHEEL)
        window.viewer.screenSpaceEventHandler.removeInputAction(window.Cesium.ScreenSpaceEventType.WHEEL)
        if (this.handler && !this.handler.isDestroyed()) this.handler = this.handler && this.handler.destroy()
        this.handler = null
      }
    },
    // 添加井下储备仓库label标签
    addMaterialStorage() {
      var _dataSource = new Cesium.CustomDataSource(Cesium.createGuid())
      viewer.dataSources.add(_dataSource)
      window.Cesium.when.all([window.Cesium.Resource.fetchImage('./img/labelBg.png')], function (images) {
        var canvas = document.createElement('canvas')
        canvas.width = 138
        canvas.height = 150

        var ctx = canvas.getContext('2d')
        ctx.font = '18px Arial'
        ctx.fillStyle = 'rgb(255,255,255)'
        ctx.drawImage(images[0], 0, 0, 96, 96)
        ctx.fillText('井下消防器材库', 17, 40)
        var pintest = canvas.toDataURL()

        var officePin = _dataSource.entities.add({
          name: '井下消防器材库',
          position: new window.Cesium.Cartesian3.fromDegrees(112.725751, 35.6666295, -41.9433),
          billboard: {
            image: pintest,
            verticalOrigin: window.Cesium.VerticalOrigin.BOTTOM,
            scaleByDistance: new Cesium.NearFarScalar(2000, 1.0, 5000, 0)
          }
        })
        ctx.clearRect(0, 0, 100, 100)
        ctx.drawImage(images[0], 0, 0, 96, 96)
        ctx.fillText('应急物资储备库', 30, 40)
        var pintest = canvas.toDataURL()
        var rujinkouPin = _dataSource.entities.add({
          name: '应急物资储备库',
          position: new window.Cesium.Cartesian3.fromDegrees(112.7229144, 35.6634401, -44.7817),
          billboard: {
            image: pintest,
            verticalOrigin: window.Cesium.VerticalOrigin.BOTTOM,
            scaleByDistance: new Cesium.NearFarScalar(2000, 1.0, 5000, 0)
          }
        })
        ctx.clearRect(0, 0, 100, 100)
        ctx.drawImage(images[0], 0, 0, 96, 96)
        ctx.fillText('设备库', 17, 40)
        var pintest = canvas.toDataURL()
        var dormitoryPin = _dataSource.entities.add({
          name: '设备库',
          position: new window.Cesium.Cartesian3.fromDegrees(112.7238377, 35.6648601, -44.9223),
          billboard: {
            image: pintest,
            verticalOrigin: window.Cesium.VerticalOrigin.BOTTOM,
            scaleByDistance: new Cesium.NearFarScalar(2000, 1.0, 5000, 0)
          }
        })
        ctx.clearRect(0, 0, 100, 100)
        ctx.drawImage(images[0], 0, 0, 96, 96)
        ctx.fillText('保卫科', 17, 40)
        var pintest = canvas.toDataURL()
        var canteenPin = _dataSource.entities.add({
          name: '保卫科',
          position: new window.Cesium.Cartesian3.fromDegrees(112.726476, 35.6667926, -39.9535),
          billboard: {
            image: pintest,
            verticalOrigin: window.Cesium.VerticalOrigin.BOTTOM,
            scaleByDistance: new Cesium.NearFarScalar(2000, 1.0, 5000, 0)
          }
        })
        // ctx.clearRect(0, 0, 100, 100)
        // ctx.fillText('立井', 34, 40)
        // ctx.drawImage(images[0], 0, 0, 96, 96)
        // var pintest = canvas.toDataURL()
        // var lijingPin = _dataSource.entities.add({
        //     name: '立井',
        //     position: new window.Cesium.Cartesian3.fromDegrees(112.7296003, 35.6720077, 86.7698),
        //     billboard: {
        //         image: pintest,
        //         verticalOrigin: window.Cesium.VerticalOrigin.BOTTOM,
        //         scaleByDistance: new Cesium.NearFarScalar(2000, 1.0, 5000, 0)
        //     }
        // })
        // ctx.clearRect(0, 0, 100, 100)
        // ctx.fillText('选煤厂', 30, 40)
        // ctx.drawImage(images[0], 0, 0, 96, 96)
        // var pintest = canvas.toDataURL()
        // var xuanmeichangPin = _dataSource.entities.add({
        //     name: '选煤厂',
        //     position: new window.Cesium.Cartesian3.fromDegrees(112.7287473, 35.6737088, 80.49),
        //     billboard: {
        //         image: pintest,
        //         verticalOrigin: window.Cesium.VerticalOrigin.BOTTOM,
        //         scaleByDistance: new Cesium.NearFarScalar(2000, 1.0, 5000, 0)
        //     }
        // })
      })
    }
  }
}
</script>