<template>
  <div class="cvContainer">
    <div id="cesiumContainer"></div>
    <functionMenu></functionMenu>
    <databig></databig>
    <emergency></emergency>
    <windflow></windflow>
    <coalflow></coalflow>
    <CircleMenu :menus="menus"></CircleMenu>
  </div>
</template>

<script>
// import '../js/material'
import functionMenu from './functionMenu'
// import bottomMenu from './bottomMenu'
import windflow from './children/functionmenu/windflow.vue'
import coalflow from './children/functionmenu/coalflow.vue'
import CircleMenu from './children/functionmenu/circlemenu.vue'
import databig from './children/functionmenu/databig.vue'
import emergency from './children/functionmenu/emergency.vue'

export default {
  name: 'CesiumContainer',
  components: {
    functionMenu,
    windflow,
    coalflow,
    CircleMenu,
    emergency,
    databig
  },
  data() {
    return {
      menus: [
        {
          name: '统计看版',
          id:'databig',
          img: 'img/cicular/05.png',
          children: [{ name: '菜单1-1' }, { name: '菜单1-2' }]
        },
        {
          name: '应急演练',
          id:'emergency',
          img: 'img/cicular/04.png',
          children: [{ name: '菜单2-1' }, { name: '菜单2-2' }]
        },
        {
          name: '工艺动画',
          id:'yingji',
          img: 'img/cicular/03.png',
          children: [{ name: '菜单3-1' }, { name: '菜单3-2' }]
        },
        {
          name: '专题地图',
          id:'yingji',
          img: 'img/cicular/02.png',
          children: [{ name: '菜单4-1' }, { name: '菜单4-2' }]
        },
        {
          name: '融合联动',
          id:'yingji',
          img: 'img/cicular/01.png',
          children: [{ name: '菜单5-1' }, { name: '菜单5-2' }]
        }
      ]
    }
  },
  mounted() {
    window.cesiumvariate = {}
    Cesium.Ion.defaultAccessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4ZmJiMTQzMC0xYjFlLTRlZDktYjI5ZS1mOGIxMzY2ZDQ1NTciLCJpZCI6ODYwOCwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU1MjM3OTcyN30.MSLoEjzlm83XTm1qRlt521SlgoU2jsthi566S6-9m_w'

    //初始化地球
    var viewer = new CTMap.Viewer('cesiumContainer', {
      // globe: false,
      animation: false,
      baseLayerPicker: true,
      baselayervis: true,
      fullscreenButton: true,
      geocoder: true,
      homeButton: false,
      imageryProvider: undefined,
      imageryProviderViewModels: this.getImageryProviderArr(),
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
    window.viewer = viewer
    var longitude = 112.730667 //-0.0290214;//1.9675213071193185342443546843346
    var latitude = 35.66867 //-0.0171607;//0.62262500489856534546316705881548
    var height = 5000 //-800;//800;
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(longitude, latitude, height) // 经度、纬度、高度
    })
    this.load3DTiles(viewer, {
      url: './SampleData/GYGC-tileset/tileset.json',
      height: 0,
      skipLevelOfDetail: true,
      baseScreenSpaceError: 1024,
      skipLevels: 1,
      skipScreenSpaceErrorFactor: 16,
      immediatelyLoadDesiredLevelOfDetail: false,
      loadSiblings: false,
      cullWithChildrenBounds: true
    })
    this.load3DTiles(viewer, {
      url: './SampleData/HangDao-tileset2/tileset.json',
      height: 0,
      skipLevelOfDetail: true,
      baseScreenSpaceError: 1024,
      skipLevels: 1,
      skipScreenSpaceErrorFactor: 16,
      immediatelyLoadDesiredLevelOfDetail: false,
      loadSiblings: false,
      cullWithChildrenBounds: true
    })
    window.openUndergroundMode = this.openUndergroundMode

    window.cancelUndergroundMode = this.cancelUndergroundMode

    window.viewer.scene.globe.depthTestAgainstTerrain = true
  },
  methods: {
    getImageryProviderArr() {
      var providerViewModels = []

      var imgModel3

      imgModel3 = new Cesium.ProviderViewModel({
        name: '暗夜地图',
        tooltip: '暗夜地图图片',
        iconUrl: '../img/basemaps/BaiDuImagery.png',
        creationFunction: function () {
          return [
            new Cesium.SingleTileImageryProvider({
              name: '暗夜地图',
              url: '../img/globe.jpg'
            })
          ]
        }
      })
      providerViewModels.push(imgModel3)

      var imgModel

      imgModel = new Cesium.ProviderViewModel({
        name: '天地图影像',
        tooltip: '天地图全球影像地图服务（国家测绘局）',
        iconUrl: '../img/basemaps/tdt_img.png',
        creationFunction: function () {
          return [
            new Cesium.WebMapTileServiceImageryProvider({
              name: '天地图影像底图',
              url: 'http://t{s}.tianditu.gov.cn/img_w/wmts?service=WMTS&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=12ad60b973583344ff4f86237c0b6e8f',
              subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
              layer: 'img_w',
              style: 'default',
              format: 'tiles',
              tileMatrixSetID: 'GoogleMapsCompatible',
              maximumLevel: 18
            }),
            new Cesium.WebMapTileServiceImageryProvider({
              name: '天地图影像底图',
              url: 'http://t{s}.tianditu.gov.cn/cia_w/wmts?service=WMTS&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=12ad60b973583344ff4f86237c0b6e8f',
              subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
              layer: 'cia_w',
              style: 'default',
              format: 'tiles',
              tileMatrixSetID: 'GoogleMapsCompatible',
              maximumLevel: 18
            })
          ]
        }
      })
      providerViewModels.push(imgModel)

      return providerViewModels
    },

    // 加载模型
    load3DTiles(viewer, opts) {
      var topts = {
        url: opts.url,
        skipLevelOfDetail: true,
        baseScreenSpaceError: 1024,
        skipScreenSpaceErrorFactor: 16,
        skipLevels: 1,
        immediatelyLoadDesiredLevelOfDetail: false,
        loadSiblings: false,
        cullWithChildrenBounds: true
      }
      topts = Object.assign(topts, opts)
      var tiles = new window.Cesium.Cesium3DTileset(topts)
      // 设置tiles风格
      if (opts.style) {
        tiles.style = new window.Cesium.Cesium3DTileStyle(opts.style)
      }
      // 获取生成的3维对象
      var target = viewer.scene.primitives.add(tiles)

      target.readyPromise.then(function (target) {
        var heightOffset = opts.height // 3dtiles的高度设置
        var boundingSphere = target.boundingSphere
        var cartographic = window.Cesium.Cartographic.fromCartesian(boundingSphere.center)
        var surface = window.Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0)
        var offset = window.Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOffset)
        var translation = window.Cesium.Cartesian3.subtract(offset, surface, new window.Cesium.Cartesian3())
        target.modelMatrix = window.Cesium.Matrix4.fromTranslation(translation)
        //添加文字标注
        window.Cesium.when.all(
          [
            window.Cesium.Resource.fetchImage('img/bg.png')
            //  Cesium.Resource.fetchImage('Assets/Textures/maki/airport.png')
          ],
          function (images) {
            console.log('tetst')
            var pinBuilder = new window.Cesium.PinBuilder()
            var pin50 = pinBuilder.fromText('50+', window.Cesium.Color.RED, 48).toDataURL()
            var canvas = document.createElement('canvas')
            canvas.width = 128
            canvas.height = 128
            var ctx = canvas.getContext('2d')
            ctx.font = '20px Arial'
            ctx.fillStyle = 'rgb(255,1,1)'
            ctx.fillText('aaaa', 64, 64)

            ctx.drawImage(images[0], 0, 0, 96, 96)
            var pintest = canvas.toDataURL()

            var bluePin = viewer.entities.add({
              name: 'Blank blue pin',
              position: new window.Cesium.Cartesian3.fromDegrees(112.7319467, 35.6716627, 55.8744),
              billboard: {
                image: pintest,
                verticalOrigin: window.Cesium.VerticalOrigin.BOTTOM
              }
            })
          }
        )

        // viewer.zoomTo(target, new Cesium.HeadingPitchRange(0.5, -0.2, target.boundingSphere.radius * 1.0));
      })
    },
    // 开启地下模式
    openUndergroundMode() {
      window.viewer.scene.sun.show = false
      window.viewer.scene.moon.show = false
      window.viewer.scene.skyBox.show = false
      window.viewer.scene.skyAtmosphere.show = false
      // window.viewer.scene.fxaa = true;
      window.viewer.scene.undergroundMode = true // 重要，开启地下模式，设置基色透明，这样就看不见黑色地球了
      window.viewer.scene.globe.show = false // 不显示地球，这条和地球透明度选一个就可以
      window.viewer.scene.globe.baseColor = new Cesium.Color(0, 0, 0, 0)
      window.viewer.scene.backgroundcolor = new Cesium.Color(0, 0, 0, 0)
      // window.viewer.scene.globe.depthTestAgainstTerrain = false;
      // window.viewer.scene.highDynamicRange = false;
      window.viewer.scene.screenSpaceCameraController.minimumZoomDistance = -10 // 相机的高度的最小值
      // window.viewer.scene.pickPositionSupported=true;
      window.viewer.camera.near = 0.0001
      window.viewer.scene.screenSpaceCameraController._zoomFactor = 1 // 默认5，缩放速度
    },
    // 关闭地下模式
    cancelUndergroundMode() {
      window.viewer.scene.sun.show = true
      window.viewer.scene.moon.show = true
      window.viewer.scene.skyBox.show = true
      window.viewer.scene.skyAtmosphere.show = true
      // window.viewer.scene.fxaa = true;
      window.viewer.scene.undergroundMode = false // 重要，开启地下模式，设置基色透明，这样就看不见黑色地球了
      window.viewer.scene.globe.show = true // 不显示地球，这条和地球透明度选一个就可以
      window.viewer.scene.globe.baseColor = new Cesium.Color(0, 0, 0, 0)
      window.viewer.scene.backgroundcolor = new Cesium.Color(0, 0, 0, 0)
      // window.viewer.scene.globe.depthTestAgainstTerrain = false;
      // window.viewer.scene.highDynamicRange = false;
      window.viewer.scene.screenSpaceCameraController.minimumZoomDistance = -10 // 相机的高度的最小值
      // window.viewer.scene.pickPositionSupported=true;
      window.viewer.camera.near = 0.0001
      window.viewer.scene.screenSpaceCameraController._zoomFactor = 1 // 默认5，缩放速度
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
.cvContainer {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.cvContainer .head {
  width: 100%;
  background: url(../assets/images/head.png);
  background-size: 100% 100%;
  height: 80px;
  position: absolute;
  z-index: 10;
  .head_tit {
    text-align: center;
    font-size: 1.4vw;
    line-height: 80px;
    color: #fff;
    font-weight: 500;
    letter-spacing: 3px;
  }
}
#cesiumContainer {
  width: 100%;
  height: calc(100% - 30px);
  margin-top: 30px;
}
</style>
