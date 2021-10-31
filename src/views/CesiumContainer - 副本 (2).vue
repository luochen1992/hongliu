<template>
  <div class="cvContainer">
    <div class="head"></div>
    <div id="cesiumContainer">
      <div id="slider" v-show="showslider"></div>
    </div>

    <toolBar></toolBar>
    <functionMenu></functionMenu>
    <menuRight></menuRight>
    <databig></databig>
    <coalflow></coalflow>
    <windflow></windflow>
    <personflow></personflow>
    <carflow></carflow>
    <fanhouse></fanhouse>
    <provideo></provideo>
    <cscs></cscs>
    <slope></slope>
    <elevation></elevation>
    <layertree></layertree>
    <flyroute></flyroute>
    <measure></measure>
    <overlay></overlay>
    <tags></tags>
    <visibility></visibility>
    <sunlight></sunlight>
    <popupinfo></popupinfo>
    <customaterial></customaterial>
    <cluster></cluster>
    <locus></locus>
    <spacequery></spacequery>
    <searchquery></searchquery>
    <people></people>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import toolBar from './toolBar'
import functionMenu from './functionMenu'
import menuRight from './menuRight'
import Cscs from './children/functionmenu/cscs.vue'
import databig from './children/functionmenu/databig.vue'
import coalflow from './children/functionmenu/coalflow.vue'
import windflow from './children/functionmenu/windflow.vue'
import carflow from './children/functionmenu/carflow.vue'
import personflow from './children/functionmenu/personflow.vue'
import fanhouse from './children/functionmenu/fanhouse.vue'
import provideo from './children/functionmenu/provideo.vue'
import elevation from './children/functionmenu/elevation.vue'
import slope from './children/functionmenu/slope.vue'
import Measure from './children/toolbar/measure.vue'
import Layertree from './children/toolbar/layertree.vue'
import Tags from './children/toolbar/tags.vue'
import visibility from './children/toolbar/visibility.vue'
import sunlight from './children/toolbar/sunlight.vue'
import { createImageryProvider, createTerrainProvider } from '../js/loadmapProvider'
import createLayer from '../js/createLayer'
import Overlay from './children/toolbar/overlay.vue'
import flyroute from './children/toolbar/flyroute.vue'
import popupinfo from './children/functionmenu/popupinfo'
import customaterial from './children/functionmenu/customaterial'
import cluster from './children/functionmenu/cluster.vue'
import locus from './children/functionmenu/locus.vue'
import spacequery from './children/functionmenu/spacequery.vue'
import searchquery from './children/functionmenu/searchquery.vue'
import people from './children/functionmenu/people.vue'
//import '../js/material'
export default {
  name: 'CesiumContainer',
  components: {
    toolBar,
    functionMenu,
    menuRight,
    Cscs,
    databig,
    coalflow,
    windflow,
    personflow,
    carflow,
    fanhouse,
    provideo,
    slope,
    elevation,
    Measure,
    Layertree,
    Tags,
    visibility,
    sunlight,
    Overlay,
    flyroute,
    popupinfo,
    customaterial,
    cluster,
    locus,
    spacequery,
    searchquery,
    people
  },
  data() {
    this.showslider = false
    return {
      logoLocation: null,
      url: 'config/config.json',
      loadend: false
    }
  },
  mounted() {
    var _this = this
    window.cesiumvariate = {}
    _this.fullscreenLoading = this.$loading({
      lock: true,
      text: '初始化地球',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.2)'
    })
    window.clustercallback = []
    window.createImageryProvider = createImageryProvider
    window.createTerrainProvider = createTerrainProvider
    window.centerAt = _this.centerAt
    window.centerAt2 = _this.centerAt2
    window.flyTo = _this.flyTo
    _this.createMap({
      id: 'cesiumContainer',
      url: _this.url,
      success: function (_map, gisdata, jsondata) {
        window.viewer = _map.viewer
        window.gisdata = gisdata
        _this.callback(gisdata)
      }
    })
  },
  methods: {
    ...mapMutations({
      setLayerListData: 'setLayerListData'
    }),
    changeStatus() {
      this.showslider = true
    },
    callback(gisdata) {
      var _this = this
      var hi = 0
      var helper = new Cesium.EventHelper()
      helper.add(viewer.scene.globe.tileLoadProgressEvent, function (e) {
        if (e === 0) {
          if (_this.loadend) {
            _this.fullscreenLoading.text = '定位完成'
            var st = setTimeout(() => {
              _this.fullscreenLoading.close()
              window.clearTimeout(st)
            }, 200)
            _this.setLayerListData(true)
            helper.removeAll()
          }
          if (hi === 0) {
            _this.fullscreenLoading.text = '场景定位中'
            _this.openFlyAnimation()
          }
          hi++
        }
      })
      window.viewer.scene.globe.depthTestAgainstTerrain = true
      // viewer._cesiumWidget._creditContainer.style.display = 'none'
      // viewer.scene.globe.enableLighting = true // 启用以太阳为光源的地球
    },
    createMap(opt) {
      var _this = this
      var url = opt.url
      if (opt.url) {
        fetch(url)
          .then(function (response) {
            return response.json()
          })
          .then(function (config) {
            // map初始化
            var configdata = config.map

            _this.createMapByData(opt, configdata, config)
          })
          .catch(function (ex) {
            _this.fullscreenLoading.close()
            window.layui.layer.msg(opt.url + '加载失败！')
          })
        return null
      } else {
        _this.createMapByData(opt, opt.data)
      }
    },

    createMapByData(opt, configdata, jsondata) {
      var _this = this
      if (configdata == null) {
        console.log('配置信息不能为空！')
        return
      }

      var map = _this._map(opt.id, configdata, opt)

      // 记录到全局变量，其他地方使用
      var gisdata = {}
      gisdata.config = configdata

      map.gisdata = gisdata

      if (opt.success) opt.success(map, gisdata, jsondata)
    },

    _map(id, config, options) {
      // 类内部使用
      var Globe = {}
      var viewer
      var configdata
      configdata = config
      // 如果options未设置时的默认参数
      var defoptions = {
        geocoder: false, // 是否显示地名查找控件
        homeButton: false, // 回到默认视域按钮
        sceneModePicker: false, // 是否显示投影方式控件
        // navigationHelpButton: false, // 导航帮助控件
        animation: false, // 是否创建动画小部件，左下角仪表
        infoBox: false, // 是否显示点击要素之后显示的信息
        timeline: false, // 是否显示时间线控件
        fullscreenButton: false, // 是否显示全屏控件
        BaseLayerPicker: true,
        baselayervis: true, // 底图切换显示
        vrButton: false, // 右下角vr虚拟现实按钮
        // navigationInstructionsInitiallyVisible: false, // 在用户明确单击按钮之前是否自动显示
        selectionIndicator: false, // 选择模型是是否显示绿色框,
        shouldAnimate: true
      }

      // config中可以配置map所有options
      for (var key in configdata) {
        if (
          key === 'controls' ||
          key === 'minzoom' ||
          key === 'maxzoom' ||
          key === 'center' ||
          key === 'style' ||
          key === 'terrain' ||
          key === 'basemaps' ||
          key === 'operationallayers' ||
          key === 'isanimationFly'
        ) {
          continue
        }
        defoptions[key] = configdata[key]
      }

      // 赋默认值（如果已存在设置值跳过）
      if (options === null) options = {}
      for (var i in defoptions) {
        // eslint-disable-next-line no-prototype-builtins
        if (!options.hasOwnProperty(i)) {
          options[i] = defoptions[i]
        }
      }
      // 默认 key
      window.Cesium.Ion.defaultAccessToken =
        configdata.ionToken ||
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4ZmJiMTQzMC0xYjFlLTRlZDktYjI5ZS1mOGIxMzY2ZDQ1NTciLCJpZCI6ODYwOCwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU1MjM3OTcyN30.MSLoEjzlm83XTm1qRlt521SlgoU2jsthi566S6-9m_w'

      // 底图
      if (configdata.basemaps && configdata.basemaps.length > 0) {
        options.imageryProviderViewModels = getBasemap(configdata.basemaps)
      }
      // 地形
      if (configdata.terrain && configdata.terrain.length > 0) {
        options.terrainProviderViewModels = getTerrainmap(configdata.terrain)
      }

      // 地球初始化
      viewer = new CTMap.Viewer(id, options)
      window.viewer = viewer
      if (!viewer.layerList) {
        viewer.layerList = []
      }
      // 叠加图层
      addOperationallayers(configdata.operationallayers)

      // 限制缩放级别
      viewer.scene.screenSpaceCameraController.maximumZoomDistance = configdata.maxzoom || 20000000 // 变焦时相机位置的最大值（以米为单位）
      viewer.scene.screenSpaceCameraController.minimumZoomDistance = configdata.minzoom || 1 // 变焦时相机位置的最小量级（以米为单位）。默认为1.0。
      // 定位
      if (configdata.center) {
        // window.centerAt(configdata.center.x, configdata.center.y, configdata.center.z, configdata.center.heading, configdata.center.pitch, configdata.center.roll)
      }

      // 底图
      function getBasemap(basemaps) {
        var basemapsProvider = []
        window.DDDD = {}
        for (var i = 0; i < basemaps.length; i++) {
          var cfg = basemaps[i]
          for (const key in cfg) {
            if (key === 'name' || key === 'tooltip' || key === 'icon' || key === 'creationFunction') {
              try {
                // eslint-disable-next-line no-eval
                eval(cfg[key])
                // eslint-disable-next-line no-eval
                cfg[key] = eval(cfg[key])
              } catch (exception) {}
            }
          }
          if (cfg.proxy && cfg.proxy === 'default') {
            cfg.proxy = new window.Cesium.DefaultProxy('/proxy/')
          }

          var cfgstr = ''
          cfgstr += `window.DDDD._addmap${i}=function () {
                       return window.createImageryProvider({`
          for (const key in cfg) {
            if (key !== 'name' && key !== 'tooltip' && key !== 'icon' && key !== 'category') {
              if (Object.prototype.toString(cfg[key]) === '[object Object]' || Object.prototype.toString.call(cfg[key]) === '[object Array]') {
                cfg[key] = JSON.stringify(cfg[key])
              }
              try {
                // eslint-disable-next-line no-eval
                eval(cfg[key])
              } catch (exception) {
                cfg[key] = '"' + cfg[key] + '"'
              }
              cfgstr += key + ':' + cfg[key] + ','
            }
          }
          cfgstr += '});}'
          // eslint-disable-next-line no-eval
          eval(cfgstr)
          // eslint-disable-next-line no-eval
          var creationFunction = eval('window.DDDD._addmap' + i)

          basemapsProvider.push(
            new window.Cesium.ProviderViewModel({
              name: cfg.name || '未命名',
              tooltip: cfg.tooltip || '未命名',
              category: cfg.category || '',
              iconUrl:
                cfg.icon ||
                '<svg xmlns="http://www.w3.org/2000/svg"><path d="M512 64C265 64 64 265.1 64 512.2 64 759.1 265 960 512 960s448-200.9 448-447.8C960 265.1 759 64 512 64z m-68.9 66.2c-38.2 35-86.2 89.7-121.1 165.9-42.1-20.5-70.4-43.4-85.4-57.3 56.2-56.5 128.8-94.5 206.5-108.6zM208.7 269.9c17.1 16.1 49.6 42.6 97.4 65.5-17.6 49.1-27.4 101.5-29.4 155.9H124.4c4.3-81.3 33.3-157.7 84.3-221.4z m-84.3 262.9h152.3c2 54.3 11.9 106.8 29.4 155.9-47.8 22.9-80.4 49.5-97.4 65.3-51-63.5-80-139.9-84.3-221.2z m112.2 252.5c14.9-13.9 43.1-36.7 85.4-57.3 34.9 76.3 82.8 130.9 121.1 165.8-77.7-14.1-150.3-52-206.5-108.5z m254.6 94.4c-34.8-28.6-90.8-84.2-130-168.3 40.7-14.8 84.4-23.5 130-25.5v193.8z m0-235.5c-51.5 2-100.5 11.5-146 28.2-15.9-44.2-24.9-91.1-26.9-139.6h172.9v111.4z m0-152.9H318.3c2-48.6 11-95.5 26.9-139.5 45.5 16.6 94.6 26 146 27.9v111.6z m0-153.2c-45.8-2.1-89.4-10.6-130-25.4 39.1-83.9 95.2-139.7 130-168.4v193.8z m408.4 153.2H747.4c-2.1-54.6-11.9-106.9-29.5-155.9 47.8-22.9 80.3-49.4 97.5-65.5 50.8 63.7 79.8 140 84.2 221.4zM787.4 238.7c-14.9 13.9-43.3 36.8-85.5 57.3-34.9-76.2-82.8-130.9-121-165.9 77.8 14.2 150.4 52.2 206.5 108.6z m-254.6-94.4c34.7 28.8 90.9 84.5 130 168.4-40.7 14.8-84.3 23.3-130 25.4V144.3z m0 235.4c51.4-1.9 100.4-11.3 146-27.9 15.9 44.3 24.9 91.1 26.9 139.5H532.8V379.7z m0 153.1h172.9c-2 48.3-11 95.3-26.9 139.6-45.5-16.7-94.5-26.2-146-28.2V532.8z m0 346.9V685.9c45.6 2 89.2 10.6 130 25.5-39.2 84.1-95.3 139.7-130 168.3z m48.1 14c38.2-34.9 86.1-89.5 121-165.8 42.3 20.7 70.6 43.6 85.5 57.3-56.2 56.6-128.8 94.5-206.5 108.5zM815.3 754c-17.1-15.8-49.6-42.3-97.5-65.3 17.6-49.1 27.4-101.4 29.5-155.9h152.2c-4.3 81.3-33.3 157.7-84.2 221.2z" fill="#000000" p-id="3871"></path></svg>',
              creationFunction: creationFunction
            })
          )
        }
        window.DDDD = {}
        return basemapsProvider
      }
      // 地形
      function getTerrainmap(terrain) {
        var terrainProvider = []
        window.DDDD = {}
        for (var i = 0; i < terrain.length; i++) {
          var cfg = terrain[i]
          for (const key in cfg) {
            if (key === 'name' || key === 'tooltip' || key === 'icon' || key === 'creationFunction') {
              try {
                // eslint-disable-next-line no-eval
                eval(cfg[key])
                // eslint-disable-next-line no-eval
                cfg[key] = eval(cfg[key])
              } catch (exception) {}
            }
          }
          if (!cfg.type_new && !cfg.type) {
            cfg.type = 'layerTerrain'
          }
          if (cfg.proxy && cfg.proxy === 'default') {
            cfg.proxy = new window.Cesium.DefaultProxy('/terrain/')
          }

          var cfgstr = ''
          cfgstr += `window.DDDD._addmap${i}=function () {
                       return window.createTerrainProvider({`
          for (const key in cfg) {
            if (key !== 'name' && key !== 'tooltip' && key !== 'icon') {
              try {
                // eslint-disable-next-line no-eval
                eval(cfg[key])
              } catch (exception) {
                cfg[key] = '"' + cfg[key] + '"'
              }
              cfgstr += key + ':' + cfg[key] + ','
            }
          }
          cfgstr += '});}'
          // eslint-disable-next-line no-eval
          eval(cfgstr)
          // eslint-disable-next-line no-eval
          var creationFunction = eval('window.DDDD._addmap' + i)

          terrainProvider.push(
            new window.Cesium.ProviderViewModel({
              name: cfg.name || '未命名',
              tooltip: cfg.tooltip || '未命名',
              iconUrl:
                cfg.icon ||
                '<svg xmlns="http://www.w3.org/2000/svg"><path d="M512 64C265 64 64 265.1 64 512.2 64 759.1 265 960 512 960s448-200.9 448-447.8C960 265.1 759 64 512 64z m-68.9 66.2c-38.2 35-86.2 89.7-121.1 165.9-42.1-20.5-70.4-43.4-85.4-57.3 56.2-56.5 128.8-94.5 206.5-108.6zM208.7 269.9c17.1 16.1 49.6 42.6 97.4 65.5-17.6 49.1-27.4 101.5-29.4 155.9H124.4c4.3-81.3 33.3-157.7 84.3-221.4z m-84.3 262.9h152.3c2 54.3 11.9 106.8 29.4 155.9-47.8 22.9-80.4 49.5-97.4 65.3-51-63.5-80-139.9-84.3-221.2z m112.2 252.5c14.9-13.9 43.1-36.7 85.4-57.3 34.9 76.3 82.8 130.9 121.1 165.8-77.7-14.1-150.3-52-206.5-108.5z m254.6 94.4c-34.8-28.6-90.8-84.2-130-168.3 40.7-14.8 84.4-23.5 130-25.5v193.8z m0-235.5c-51.5 2-100.5 11.5-146 28.2-15.9-44.2-24.9-91.1-26.9-139.6h172.9v111.4z m0-152.9H318.3c2-48.6 11-95.5 26.9-139.5 45.5 16.6 94.6 26 146 27.9v111.6z m0-153.2c-45.8-2.1-89.4-10.6-130-25.4 39.1-83.9 95.2-139.7 130-168.4v193.8z m408.4 153.2H747.4c-2.1-54.6-11.9-106.9-29.5-155.9 47.8-22.9 80.3-49.4 97.5-65.5 50.8 63.7 79.8 140 84.2 221.4zM787.4 238.7c-14.9 13.9-43.3 36.8-85.5 57.3-34.9-76.2-82.8-130.9-121-165.9 77.8 14.2 150.4 52.2 206.5 108.6z m-254.6-94.4c34.7 28.8 90.9 84.5 130 168.4-40.7 14.8-84.3 23.3-130 25.4V144.3z m0 235.4c51.4-1.9 100.4-11.3 146-27.9 15.9 44.3 24.9 91.1 26.9 139.5H532.8V379.7z m0 153.1h172.9c-2 48.3-11 95.3-26.9 139.6-45.5-16.7-94.5-26.2-146-28.2V532.8z m0 346.9V685.9c45.6 2 89.2 10.6 130 25.5-39.2 84.1-95.3 139.7-130 168.3z m48.1 14c38.2-34.9 86.1-89.5 121-165.8 42.3 20.7 70.6 43.6 85.5 57.3-56.2 56.6-128.8 94.5-206.5 108.5zM815.3 754c-17.1-15.8-49.6-42.3-97.5-65.3 17.6-49.1 27.4-101.4 29.5-155.9h152.2c-4.3 81.3-33.3 157.7-84.2 221.2z" fill="#000000" p-id="3871"></path></svg>',
              creationFunction: creationFunction
            })
          )
        }
        window.DDDD = {}
        return terrainProvider
      }

      // 叠加图层
      function addOperationallayers(layers) {
        if (layers && layers.length > 0) {
          for (var i = 0; i < layers.length; i++) {
            var item = layers[i]
            createLayer(item, viewer, item.callback)
          }
        }
      }
      Globe.viewer = viewer
      return Globe
    },

    // 定位centerAt
    centerAt(x, y, z, heading, pitch, roll) {
      window.viewer.camera.setView({
        destination: window.Cesium.Cartesian3.fromDegrees(x, y, z),
        orientation: {
          pitch: window.Cesium.Math.toRadians(pitch || -90),
          roll: window.Cesium.Math.toRadians(roll || 0),
          heading: window.Cesium.Math.toRadians(heading || 0)
        }
      })
    },
    // 定位centerAt
    centerAt2(ceninfo) {
      var x = ceninfo.x
      var y = ceninfo.y
      var z = ceninfo.z
      var heading = ceninfo.heading
      var pitch = ceninfo.pitch
      var roll = ceninfo.roll
      window.viewer.camera.setView({
        destination: window.Cesium.Cartesian3.fromDegrees(x, y, z),
        orientation: {
          pitch: window.Cesium.Math.toRadians(pitch || -90),
          roll: window.Cesium.Math.toRadians(roll || 0),
          heading: window.Cesium.Math.toRadians(heading || 0)
        }
      })
    },
    // 飞行
    flyTo(x, y, z, heading, pitch, roll, duration) {
      window.viewer.camera.flyTo({
        destination: window.Cesium.Cartesian3.fromDegrees(x, y, z || 0), // 经度、纬度、高度
        orientation: {
          heading: window.Cesium.Math.toRadians(heading || 0), // 绕垂直于地心的轴旋转
          pitch: window.Cesium.Math.toRadians(pitch || -window.Cesium.Math.PI_OVER_FOUR), // 绕纬度线旋转
          roll: window.Cesium.Math.toRadians(roll || 0) // 绕经度线旋转
        },
        duration: duration || 2 // 飞行到目的地花费时间3秒
      })
    },

    openFlyAnimation() {
      var _this = this
      var camera = viewer.scene.camera
      // 煤矿处相机位置和飞行时间
      var mineBoundaryLocation = {
        destination: new Cesium.Cartesian3(-2015494.2822991586, 4810882.234282048, 3717287.799078831),
        duration: 3
      }
      var wangpoLocation = {
        destination: new Cesium.Cartesian3.fromDegrees(112.730667, 35.64267, 5000.0),
        orientation: {
          heading: 0,
          pitch: Cesium.Math.toRadians(-60.0),
          roll: 0.0
        },
        duration: 3
      }
      // 山西省处相机位置和飞行时间
      var shanxiLocation = {
        destination: new Cesium.Cartesian3(-2511763.268368041, 5975905.814027544, 4902661.932720381),
        duration: 2
      }
      // 添加中国边界
      var chinaBoundaryJsonData = Cesium.GeoJsonDataSource.load('./SampleData/Boundary/chinaBoundary.json', {
        // stroke: Cesium.Color.HOTPINK,
        fill: Cesium.Color.YELLOW.withAlpha(0.0),
        strokeWidth: 2,
        clampToGround: true
      })
      viewer.dataSources.add(chinaBoundaryJsonData)
      // 将地球由美国板块初始化为中国板块
      camera.setView({
        destination: new Cesium.Cartesian3(-10306324.92182894, 22340465.908738352, 17031494.912212398),
        orientation: {
          heading: 6.283185307179586,
          pitch: -1.5707963267948966,
          roll: 0.0
        }
      })
      // 飞行至山西省
      var animate1 = setTimeout(function () {
        camera.flyTo(shanxiLocation)
        clearTimeout(animate1) // 停止动画
      }, 2000)
      // 飞行至山西省处显示、 移除边界和山西字样，再飞行至煤矿
      shanxiLocation.complete = function () {
        // 添加山西省省界
        var shanxiBoundaryJsonData = Cesium.GeoJsonDataSource.load('./SampleData/Boundary/shanxiBoundary.json', {
          stroke: Cesium.Color.MIDNIGHTBLUE,
          fill: Cesium.Color.NAVY.withAlpha(0.5),
          strokeWidth: 5,
          clampToGround: true
        })
        viewer.dataSources.add(shanxiBoundaryJsonData)
        // 添加山西字样
        viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(112.3, 38.05, 5000),
          label: {
            text: '山西',
            font: '24px Helvetica',
            fillColor: Cesium.Color.WHITE,
            outlineColor: Cesium.Color.WHITE,
            // outlineWidth: 2,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE
          }
        })
        var shanxiBoundaryJsonDataSource
        var chinaBoundaryJsonDataSource
        var animate2 = setTimeout(function () {
          viewer.entities.removeAll()
          // 移除中国边界geojson数据
          chinaBoundaryJsonData.then((res) => {
            chinaBoundaryJsonDataSource = res
          })
          viewer.dataSources.remove(chinaBoundaryJsonDataSource)
          // 移除山西边界geojson数据
          shanxiBoundaryJsonData.then((res) => {
            shanxiBoundaryJsonDataSource = res
          })
          viewer.dataSources.remove(shanxiBoundaryJsonDataSource)
          // 飞行至煤矿
          camera.flyTo(mineBoundaryLocation)
          clearTimeout(animate2) // 停止动画
        }, 2000)
      }
      mineBoundaryLocation.complete = function () {
        // 添加矿区边界
        var mineBoundaryJsonData = Cesium.GeoJsonDataSource.load('./SampleData/Boundary/mineBoundary.json', {
          stroke: Cesium.Color.STEELBLUE,
          fill: Cesium.Color.STEELBLUE.withAlpha(0.7),
          strokeWidth: 3,
          clampToGround: true
        })
        viewer.dataSources.add(mineBoundaryJsonData)
        // 添加地名字样
        viewer.entities.add({
          position: new Cesium.Cartesian3.fromDegrees(112.730667, 35.66867, 5000),
          label: {
            text: '智能矿山王坡煤矿',
            font: '35px Helvetica',
            scale: 1.5,
            fillColor: Cesium.Color.WHITE,
            outlineColor: Cesium.Color.WHITE,
            // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND ,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e5, 0.5)
          }
        })
        var mineBoundaryJsonDataSource
        var animate3 = setTimeout(function () {
          viewer.entities.removeAll()
          // 移除矿区边界geojson数据
          mineBoundaryJsonData.then((res) => {
            mineBoundaryJsonDataSource = res
          })
          viewer.dataSources.remove(mineBoundaryJsonDataSource)
          // 飞行至王坡煤矿
          camera.flyTo(wangpoLocation)
          clearTimeout(animate3) // 停止动画
          _this.loadend = true
        }, 2000)
        var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
        handler.setInputAction((click) => {
          var ellipsoid = viewer.scene.globe.ellipsoid
          var height = ellipsoid.cartesianToCartographic(viewer.camera.position).height
          if (height < 3500) {
            _this.openUndergroundMode()
            _this.addpin()
          } else {
            _this.cancelUndergroundMode()
            // viewer.entities.remove(bangongPin)
          }
          if (window.clustercallback && window.clustercallback.length > 0) {
            for (var ci = 0; ci < window.clustercallback.length; ci++) {
              if (typeof window.clustercallback[ci] === 'function') {
                window.clustercallback[ci]()
              }
            }
          }
        }, Cesium.ScreenSpaceEventType.WHEEL)
      }
    },
    // 添加地物文字标签
    addpin() {
      window.Cesium.when.all([window.Cesium.Resource.fetchImage('./img/bg.png')], function (images) {
        var pinBuilder = new window.Cesium.PinBuilder()
        var pin50 = pinBuilder.fromText('50+', window.Cesium.Color.RED, 48).toDataURL()
        var canvas = document.createElement('canvas')
        canvas.width = 128
        canvas.height = 60

        var ctx = canvas.getContext('2d')
        ctx.font = '20px Arial'
        ctx.fillStyle = 'rgb(255,255,255)'
        ctx.fillText('办公大楼', 10, 40)
        ctx.drawImage(images[0], 0, 0, 96, 96)
        var pintest = canvas.toDataURL()

        var officePin = viewer.entities.add({
          id:'Box1',
          name: '办公大楼',
          position: new window.Cesium.Cartesian3.fromDegrees(112.7287864, 35.6746203, 90.4412),
          billboard: {
            image: pintest,
            verticalOrigin: window.Cesium.VerticalOrigin.BOTTOM,
            scaleByDistance: new Cesium.NearFarScalar(2000, 1.0, 5000, 0)
          }
        })
        ctx.clearRect(0, 0, 100, 100)
        ctx.fillText('入井口', 20, 40)
        ctx.drawImage(images[0], 0, 0, 96, 96)
        var pintest = canvas.toDataURL()
        var rujinkouPin = viewer.entities.add({
          id:'Box2',
          name: '入井口',
          position: new window.Cesium.Cartesian3.fromDegrees(112.7279304, 35.6743831, 82.3645),
          billboard: {
            image: pintest,
            verticalOrigin: window.Cesium.VerticalOrigin.BOTTOM,
            scaleByDistance: new Cesium.NearFarScalar(2000, 1.0, 5000, 0)
          }
        })
        ctx.clearRect(0, 0, 100, 100)
        ctx.fillText('员工宿舍', 10, 40)
        ctx.drawImage(images[0], 0, 0, 96, 96)
        var pintest = canvas.toDataURL()
        var dormitoryPin = viewer.entities.add({
          id:'Box3',
          name: '员工宿舍',
          position: new window.Cesium.Cartesian3.fromDegrees(112.7281682, 35.6752552, 95.758),
          billboard: {
            image: pintest,
            verticalOrigin: window.Cesium.VerticalOrigin.BOTTOM,
            scaleByDistance: new Cesium.NearFarScalar(2000, 1.0, 5000, 0)
          }
        })
        ctx.clearRect(0, 0, 100, 100)
        ctx.fillText('职工餐厅', 10, 40)
        ctx.drawImage(images[0], 0, 0, 96, 96)
        var pintest = canvas.toDataURL()
        var canteenPin = viewer.entities.add({
          id:'Box4',
          name: '职工餐厅',
          position: new window.Cesium.Cartesian3.fromDegrees(112.7276017, 35.6751787, 85.1741),
          billboard: {
            image: pintest,
            verticalOrigin: window.Cesium.VerticalOrigin.BOTTOM,
            scaleByDistance: new Cesium.NearFarScalar(2000, 1.0, 5000, 0)
          }
        })
        ctx.clearRect(0, 0, 100, 100)
        ctx.fillText('立井', 30, 40)
        ctx.drawImage(images[0], 0, 0, 96, 96)
        var pintest = canvas.toDataURL()
        var lijingPin = viewer.entities.add({
          id:'Box5',
          name: '立井',
          position: new window.Cesium.Cartesian3.fromDegrees(112.7296003, 35.6720077, 81.7698),
          billboard: {
            image: pintest,
            verticalOrigin: window.Cesium.VerticalOrigin.BOTTOM,
            scaleByDistance: new Cesium.NearFarScalar(2000, 1.0, 5000, 0)
          }
        })
        ctx.clearRect(0, 0, 100, 100)
        ctx.fillText('选煤厂', 20, 40)
        ctx.drawImage(images[0], 0, 0, 96, 96)
        var pintest = canvas.toDataURL()
        var xuanmeichangPin = viewer.entities.add({
          id:'Box6',
          name: '选煤厂',
          position: new window.Cesium.Cartesian3.fromDegrees(112.7287473, 35.6737088, 80.49),
          billboard: {
            image: pintest,
            verticalOrigin: window.Cesium.VerticalOrigin.BOTTOM,
            scaleByDistance: new Cesium.NearFarScalar(2000, 1.0, 5000, 0)
          }
        })
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
  height: 120px;
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
#slider {
  position: absolute;
  left: 50%;
  top: 55px;
  background-color: #d3d3d3;
  width: 5px;
  height: 100%;
  z-index: 9999;
}

#slider:hover {
  cursor: ew-resize;
}
.toolBar {
}
.cesium-viewer-toolbar {
  bottom: 72px;
  top: auto;
  width: 36px;
}
.cesium-viewer-fullscreenContainer {
  bottom: 36px;
  right: 5px;
}
.cesium-viewer-geocoderContainer {
  display: inline-block;
  margin: 0 3px;
  position: absolute;
  right: 0px;
  bottom: 40px;
}
.cesium-baseLayerPicker-dropDown-visible {
  bottom: 0px;
  right: 50px;
}
body .cv_dialog {
  background-color: rgb(3 21 33);
  border: 9px solid rgb(30 175 251);
  border-image: url('../assets/images/dialog.png') 10 stretch;
}
body .cv_dialog .layui-layer-title {
  background: url(../assets/images/dialog_title.png);
  color: #fff;
  border: none;
  width: 247px;
  height: 40px;
}
body .cv_dialog .layui-layer-close {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAB8ElEQVRIS8WVP4xMURjFf180GoWCQiQKCiIKCgqNRkGB3U12JRqFRqPQ0IhCo1FoNAqNAgliC4otaLagoNgVEishQUFCoVGQI+c5M9nhzezMkLjde/fe3z3n3u9PSXoIrAPOV9Vt/mJImgHOAZ9K0iKwHfgOTFXV7DhsSceA69n73OAp4CawCvgW+P1R4JKOA9ey5wcwU/6QdBi4AawGvgY+Nwxc0gngatZa2NGquteAAz8Y+Brgc+CPBsElnQSuZI0FGdq47YID359rWQt8BCarar4NLukUcDlzXxr7VV2XPeDA9wW+Hngf+JPlcEmngUv5ZwGG9rj7Axz4XuAWsAF4E/izzJ0BLgb6AZhuc9UKDmBPlG8CloAJ4AhwIdC3Ufq47ar6ggPfFeWbgRfAtkBeR+nTfo87EBz4jsC3BvIy0IVBEfN/wJJ2Ru0WwEo9rNx37kdrHnSkO5a0O9DO400GcAfwQX48w3tCsXPIMOFmwERHXVzcBXzg8OEmaXmCeKOhvyeI3RjuOF85QSSNktJOIl+LM7R/Sks6kIRwEfJC14mVipDdGe7a4iLk1H7QLUKSDgU6Ttm0S3ceC3LZNHy2rdBbaXPqsCNurdzCfhV6Sa8SPv5h6Litya4NdydaMtjNdCNw9h80U7c5V753PwE8/uHYVEpFcwAAAABJRU5ErkJggg==);
  background-size: 100%;
}
</style>
