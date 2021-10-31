<template>
  <div class="yingyanTool" v-show="isshow">
    <div id="map_see"></div>
  </div>
</template>

<script>
export default {
  name: 'yingyanTool',
  computed: {},
  data() {
    return {
      isshow: false,
      startflag: false,
      oldp: { x: 0, y: 0, z: 0 },
      xy: [112.69518510616861, 35.66226239428186]
    }
  },
  props: {
    showsee: {
      type: Boolean
    }
  },
  mounted() {},
  watch: {
    showsee: {
      handler(newval, oldval) {
        if (newval) {
          this.isshow = true
          if (!this.startflag) {
            this.addmap()
            this.startflag = true
          }
          // this.show()
        } else {
          this.isshow = false
          // this.hide()
        }
      },
      immediate: true
    }
  },
  methods: {
    addmap() {
      var _this = this
      Cesium.Ion.defaultAccessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4ZmJiMTQzMC0xYjFlLTRlZDktYjI5ZS1mOGIxMzY2ZDQ1NTciLCJpZCI6ODYwOCwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU1MjM3OTcyN30.MSLoEjzlm83XTm1qRlt521SlgoU2jsthi566S6-9m_w'

      // 初始化地球
      var viewersee = new CTMap.Viewer('map_see', {
        // globe: false,
        animation: false,
        baseLayerPicker: false,
        baselayervis: false,
        fullscreenButton: false,
        geocoder: false,
        homeButton: false,
        imageryProvider: undefined,
        infoBox: false,
        // navigation:false,
        navigationHelpButton: false,
        navigationInstructionsInitiallyVisible: false,
        sceneModePicker: false,
        selectionIndicator: false,
        shouldAnimate: false,
        timeline: false,
        vrButton: false
      })
      const control = viewersee.scene.screenSpaceCameraController
      control.enableRotate = false
      control.enableTranslate = false
      control.enableZoom = false
      control.enableTilt = false
      control.enableLook = false
      viewersee.scene.mode = Cesium.SceneMode.SCENE2D

      viewersee._cesiumWidget._creditContainer.style.display = 'none'
      viewersee.dataSources.add(
        Cesium.GeoJsonDataSource.load('./SampleData/kkhd2.topojson', {
        // Cesium.GeoJsonDataSource.load('./data/m.topojson', {
          stroke: Cesium.Color.HOTPINK,
          fill: Cesium.Color.BEIGE,
          strokeWidth: 5,

           width: 5,
           material: Cesium.Color.RED
        })
      )
      viewersee.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(this.xy[0], this.xy[1], 8000)
      })

      this.openUndergroundMode(viewersee)
      window.viewer.entities.add({
        position: window.Cesium.Cartesian3.fromDegrees(0, 0),
        label: {
          text: new Cesium.CallbackProperty(function () {
            _this.syncViewer(viewersee)
            return ''
          }, true)
        }
      })
    },
    syncViewer(viewersee) {
      if (this.isshow) {
        if (window.viewer.camera.position.x === this.oldp.x && window.viewer.camera.position.y === this.oldp.y && window.viewer.camera.position.z === this.oldp.z) {
          return
        }
        this.oldp = { x: window.viewer.camera.position.x, y: window.viewer.camera.position.y, z: window.viewer.camera.position.z }
         var ellipsoid = window.viewer.scene.globe.ellipsoid
      var cartographic = ellipsoid.cartesianToCartographic(window.viewer.camera.position)
      var lat = Cesium.Math.toDegrees(cartographic.latitude)
      var lon = Cesium.Math.toDegrees(cartographic.longitude)
      var h = cartographic.height
if (h < 3000) {
  h = 3000
} else if (h < 8000) {
  h = 8000
} else if (h < 15000) {
  h = 15000
} else {
  h = h + 5000
}
var extent = this.getExtent(viewersee)
if (lon < extent.xmin || lon > extent.xmax || lat < extent.ymin || lat > extent.ymax) {
      viewersee.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(lon, lat, h)
      })
      this.xy = [lon, lat]
} else {
  // var ellipsoid2 = viewersee.scene.globe.ellipsoid
  //     var cartographic2 = ellipsoid2.cartesianToCartographic(viewersee.camera.position)
  //     var lat2 = Cesium.Math.toDegrees(cartographic2.latitude)
  //     var lon2 = Cesium.Math.toDegrees(cartographic2.longitude)
// var rest = this.getCenter(viewersee)
      viewersee.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(this.xy[0], this.xy[1], h)
      })
}
        // viewersee.camera.flyTo({
        //   destination: window.viewer.camera.position,
        //   orientation: {
        //     heading: window.viewer.camera.heading,
        //     pitch: window.viewer.camera.pitch,
        //     roll: window.viewer.camera.roll
        //   },
        //   duration: 0.0
        // })

         viewersee.entities.removeAll()
      //     var p = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(viewer.canvas.clientWidth / 2, viewer.canvas.clientHeight / 2))
      //   // var p = this.pickCenterPoint(viewer.scene)
      // // var cartographic3 = ellipsoid.cartesianToCartographic(p)
      // //  p = Cesium.Cartesian3.fromDegrees(cartographic3.longitude, cartographic3.latitude, 1)
      // if (cartographic.height < 0) {
      //   p = viewer.camera.position
      // }
          var p = window.viewer.camera.position
        this.addCircleRipple({
          json: { position: p },
          deviationR: 2, // 差值 差值也大 速度越快
          maxR: 160
        }, viewersee)
      }
    },
    getCenter (viewer, isToWgs) {
    var scene = viewer.scene
    var target = this.pickCenterPoint(scene)
    var bestTarget = target
    if (!bestTarget) {
        var globe = scene.globe
        var carto = scene.camera.positionCartographic.clone()
        var height = globe.getHeight(carto)
        carto.height = height || 0
        bestTarget = Cesium.Ellipsoid.WGS84.cartographicToCartesian(carto)
    }
    var result = this.formatPositon(bestTarget)
    if (isToWgs) { result = viewer.mars.point2wgs(result) } // 坐标转换为wgs

    return result
},
pickCenterPoint (scene) {
    var canvas = scene.canvas
    var center = new Cesium.Cartesian2(
        canvas.clientWidth / 2,
        canvas.clientHeight / 2)

    var ray = scene.camera.getPickRay(center)
    var target = scene.globe.pick(ray, scene)
    return target || scene.camera.pickEllipsoid(center)
},
formatPositon (position) {
    var carto = Cesium.Cartographic.fromCartesian(position)
    var result = {}
    result.y = Number(Cesium.Math.toDegrees(carto.latitude).toFixed(6))
    result.x = Number(Cesium.Math.toDegrees(carto.longitude).toFixed(6))
    result.z = Number(carto.height.toFixed(1))
    return result
},
    getExtent(viewer, isToWgs) {
    // 范围对象
    var extent = { xmin: 70, xmax: 140, ymin: 0, ymax: 55 } // 默认值：中国区域

    // 得到当前三维场景
    var scene = viewer.scene

    // 得到当前三维场景的椭球体
    var ellipsoid = scene.globe.ellipsoid
    var canvas = scene.canvas

    // canvas左上角
    var car3_lt = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(0, 0), ellipsoid)
    if (car3_lt) { // 在椭球体上
        var carto_lt = ellipsoid.cartesianToCartographic(car3_lt)
        extent.xmin = Cesium.Math.toDegrees(carto_lt.longitude)
        extent.ymax = Cesium.Math.toDegrees(carto_lt.latitude)
    } else { // 不在椭球体上
        var xMax = canvas.width / 2
        var yMax = canvas.height / 2

        var car3_lt2
        // 这里每次10像素递加，一是10像素相差不大，二是为了提高程序运行效率
        for (var yIdx = 0; yIdx <= yMax; yIdx += 10) {
            var xIdx = yIdx <= xMax ? yIdx : xMax
            car3_lt2 = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(xIdx, yIdx), ellipsoid)
            if (car3_lt2) break
        }
        if (car3_lt2) {
            var carto_lt = ellipsoid.cartesianToCartographic(car3_lt2)
            extent.xmin = Cesium.Math.toDegrees(carto_lt.longitude)
            extent.ymax = Cesium.Math.toDegrees(carto_lt.latitude)
        }
    }

    // canvas右下角
    var car3_rb = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(canvas.width, canvas.height), ellipsoid)
    if (car3_rb) { // 在椭球体上
        var carto_rb = ellipsoid.cartesianToCartographic(car3_rb)
        extent.xmax = Cesium.Math.toDegrees(carto_rb.longitude)
        extent.ymin = Cesium.Math.toDegrees(carto_rb.latitude)
    } else { // 不在椭球体上
        var xMax = canvas.width / 2
        var yMax = canvas.height / 2

        var car3_rb2
        // 这里每次10像素递减，一是10像素相差不大，二是为了提高程序运行效率
        for (var yIdx = canvas.height; yIdx >= yMax; yIdx -= 10) {
            var xIdx = yIdx >= xMax ? yIdx : xMax
            car3_rb2 = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(xIdx, yIdx), ellipsoid)
            if (car3_rb2) break
        }
        if (car3_rb2) {
            var carto_rb = ellipsoid.cartesianToCartographic(car3_rb2)
            extent.xmax = Cesium.Math.toDegrees(carto_rb.longitude)
            extent.ymin = Cesium.Math.toDegrees(carto_rb.latitude)
        }
    }

    if (isToWgs) { // 坐标转换为wgs
        var pt1 = viewer.mars.point2wgs({ x: extent.xmin, y: extent.ymin })
        extent.xmin = pt1.x
        extent.ymin = pt1.y

        var pt2 = viewer.mars.point2wgs({ x: extent.xmax, y: extent.ymax })
        extent.xmax = pt2.x
        extent.ymax = pt2.y
    }

    return extent
},
    // 开启地下模式
    openUndergroundMode(_viewer) {
      _viewer.scene.sun.show = false
      _viewer.scene.moon.show = false
      _viewer.scene.skyBox.show = false
      _viewer.scene.skyAtmosphere.show = false
      // window.viewer.scene.fxaa = true;
      _viewer.scene.undergroundMode = true // 重要，开启地下模式，设置基色透明，这样就看不见黑色地球了
      _viewer.scene.globe.show = false // 不显示地球，这条和地球透明度选一个就可以
      _viewer.scene.globe.baseColor = new Cesium.Color(0, 0, 0, 0)
      _viewer.scene.backgroundcolor = new Cesium.Color(0, 0, 0, 0)
      // window.viewer.scene.globe.depthTestAgainstTerrain = false;
      // window.viewer.scene.highDynamicRange = false;
      _viewer.scene.screenSpaceCameraController.minimumZoomDistance = -10 // 相机的高度的最小值
      // window.viewer.scene.pickPositionSupported=true;
      _viewer.camera.near = 0.0001
      _viewer.scene.screenSpaceCameraController._zoomFactor = 1 // 默认5，缩放速度
    },
    addCircleRipple(data, _viewer) {
      var r1 = 0
      var r2 = 0
      function changeR1() {
        // 这是callback，参数不能内传
        r1 = r1 + data.deviationR
        if (r1 >= data.maxR) {
          r1 = 0
        }
        return r1
      }
      function changeR2() {
        r2 = r2 + data.deviationR
        if (r2 >= data.maxR) {
          r2 = 0
        }
        return r2 * 0.8
      }
      // 第一个圆先跑
      _viewer.entities.add({
        description: 'LIGHT_POINTS',
        position: data.json.position,
        show: true,
        ellipse: {
          semiMinorAxis: new Cesium.CallbackProperty(changeR1, false),
          semiMajorAxis: new Cesium.CallbackProperty(changeR1, false),
          height: 10,
          material: Cesium.Color.YELLOW.withAlpha(0.1),
          outline: true,
          outlineColor: Cesium.Color.RED.withAlpha(0.4),
          outlineWidth: 2
        }
      })
      // 第二个圆开始跑
      _viewer.entities.add({
        description: 'LIGHT_POINTS',
        position: data.json.position,
        show: true,
        ellipse: {
          semiMinorAxis: new Cesium.CallbackProperty(changeR2, false),
          semiMajorAxis: new Cesium.CallbackProperty(changeR2, false),
          height: 10,
          material: Cesium.Color.YELLOW.withAlpha(0),
          outline: true,
          outlineColor: Cesium.Color.RED.withAlpha(0.3),
          outlineWidth: 2
        }
      })

      _viewer.entities.add({
        description: 'LIGHT_POINTS',
        position: data.json.position,
        show: true,
        ellipse: {
          semiMinorAxis: data.maxR * 0.3,
          semiMajorAxis: data.maxR * 0.3,
          // semiMinorAxis: new Cesium.CallbackProperty(changeR11, false),
          // semiMajorAxis: new Cesium.CallbackProperty(changeR12, false),
          height: 10,
          material: Cesium.Color.AQUA.withAlpha(1),
          outline: true,
          outlineColor: Cesium.Color.AQUA.withAlpha(0.6),
          outlineWidth: 2
        }
      })
    },
    show() {},
    hide() {}
  }
}
</script>

<style  lang="scss">
.yingyanTool {
  width: 25%;
  height: 25%;
  color: #fff;
  position: fixed;
  left: 0;
  bottom: 10px;
  border: 1px solid #858585;
}
#map_see {
  width: 100%;
  height: 100%;
}
</style>
