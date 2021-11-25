<template>
  <div class="cvContainer">
    <div class="header">
      <div class="header-left">
        <div class="logobox">
          <div class="logo"></div>
        </div>
        <div class="logotitle">红柳林灾害防治三维一张图平台</div>
      </div>
      <div class="header-right"></div>
      <div class="time">
        <img class="timeimg"
             src="../assets/images/时间.png" />
        <div style="color: #ffffff">{{ nowDate }}</div>
      </div>
    </div>
    <div id="cesiumContainer">
      <div id="slider"
           v-show="showslider"></div>
    </div>
    <toolBar id="showtoolbar"></toolBar>
    <bottomrightBar></bottomrightBar>
    <div class="sheng"
         @click="toolBarshow"><img src="../assets/images/sheng.png"
           class="shimg" /></div>
    <databig></databig>
    <windflow></windflow>
    <carflow></carflow>
    <layertree></layertree>
    <flyroute></flyroute>
    <measure></measure>
    <overlay></overlay>
    <tags></tags>
    <visibility></visibility>
    <sunlight></sunlight>
    <touchtool></touchtool>
    <legendTool></legendTool>
    <search-tool></search-tool>
    <locus></locus>
    <headmenu :menus="menus"></headmenu>
    <coal-animation></coal-animation>
    <electricityflow></electricityflow>
    <coalflow></coalflow>
    <materialsflow></materialsflow>
    <fusionlinkage></fusionlinkage>
    <personsite></personsite>
    <jiankongsite></jiankongsite>
    <zongcaiAnimation></zongcaiAnimation>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import toolBar from './toolBar'
import bottomrightBar from './bottomrightBar'
import { createImageryProvider, createTerrainProvider } from '../js/loadmapProvider'
import rotateCamera from '../js/rotateCamera'
import createLayer from '../js/createLayer'
import pointstatis from '../js/cluster'
import { fromLocal, LocalToDegree,convert2000ToWGS84,convertWGS84To2000,WGS84_to_Cartesian3 } from '../js/changeCoordinatesystem'
import touchtool from '../components/bottomRightBar/touchTool/index.vue'
import legendTool from '../components/bottomRightBar/legendTool/index.vue'
import searchTool from '../components/bottomRightBar/searchTool/index.vue'
import Measure from '../components/toolBar/measure/index.vue'
import Layertree from '../components/toolBar/layertree/index.vue'
import Tags from '../components/toolBar/tags/index.vue'
import visibility from '../components/toolBar/visibility/index.vue'
import sunlight from '../components/toolBar/sunlight/index.vue'
import Overlay from '../components/toolBar/overlay/index.vue'
import flyroute from '../components/toolBar/flyroute/index.vue'
import databig from '../components/menuFunction/databig/index.vue'
import windflow from '../components/menuFunction/oneVentilationThreePrevention/windflow/index.vue'
import carflow from '../components/menuFunction/carflow.vue'
import locus from '../components/menuFunction/locus.vue'
import fusionlinkage from '../components/menuFunction/fusionlinkage/index.vue'
import CoalAnimation from '../components/menuFunction/coalAnimation.vue'
import Coalflow from '../components/menuFunction/coalflow.vue'
import Electricityflow from '../components/menuFunction/electricityflow.vue'
import Materialsflow from '../components/menuFunction/materialsflow.vue'
import Headmenu from './headmenu/index.vue'
import personsite from '../components/menuFunction/monitoring/personsite/index.vue'
import jiankongsite from '../components/menuFunction/monitoring/jiankongsite/index.vue'
import zongcaiAnimation from '../components/menuFunction/mining/zongcaiAnimation/index.vue'
export default {
  name: 'CesiumContainer',
  components: {
    toolBar,
    bottomrightBar,
    databig,
    windflow,
    carflow,
    Measure,
    Layertree,
    Tags,
    visibility,
    sunlight,
    Overlay,
    flyroute,
    searchTool,
    locus,
    fusionlinkage,
    touchtool,
    legendTool,
    Headmenu,
    CoalAnimation,
    Coalflow,
    Electricityflow,
    Materialsflow,
    personsite,
    jiankongsite,
    zongcaiAnimation
  },
  data() {
    this.showslider = false
    this.showtoolbar = false
    this.addCircleEffect = false
    this.addCircleArr = []
    return {
      menus: [
        {
          name: '系统首页',
          id: 'databig',
          img: 'img/cicular/首页.png'
        },
        {
          name: '采掘工程',
          id: 'mining',
          img: 'img/cicular/采掘工程.png',
          children: [
            {
              name: '综采工作面',
              id: 'zongcaiAnimation',
              img: 'img/cicular/综采工作面.png'
            },
            {
              name: '掘进工作面',
              id: 'juejinAnimation',
              img: 'img/cicular/掘进工作面.png'
            }
          ]
        },
        {
          name: '机电运输',
          id: 'electricalTransportation',
          img: 'img/cicular/机电运输.png',
           children: [
            {
              name: '电力系统',
              id: 'electricalSystem',
              img: 'img/cicular/电耗.png'
            },
            {
              name: '排水系统',
              id: 'drainageSystem',
              img: 'img/cicular/排水系统.png'
            },
            {
              name: '运输系统',
              id: 'transportationSystem',
              img: 'img/cicular/运输系统.png'
            },
            {
              name: '通风系统',
              id: 'ventilationSystem',
              img: 'img/cicular/通风系统.png'
            }
          ]
        },
        {
          name: '一通三防',
          id: 'oneVentilationThreePrevention',
          img: 'img/cicular/一通三防.png',
          children: [
            {
              name: '井下通风路线',
              id: 'windflow',
              img: 'img/cicular/通风.png'
            },
            {
              name: '水灾避灾路线',
              id: 'waterroute',
              img: 'img/cicular/水灾.png'
            },
            {
              name: '火灾避灾路线',
              id: 'fireroute',
              img: 'img/cicular/火灾.png'
            },
            {
              name: '瓦斯避灾路线',
              id: 'gasroute',
              img: 'img/cicular/瓦斯.png'
            },
            {
              name: '硐室避灾路线',
              id: 'chamberroute',
              img: 'img/cicular/硐室.png'
            },
            {
              name: '顶板避灾路线',
              id: 'roofroute',
              img: 'img/cicular/顶板.png'
            },
            {
              name: '煤尘避灾路线',
              id: 'coaldustroute',
              img: 'img/cicular/煤尘.png'
            }
          ]
        },
        {
          name: '监测监控',
          id: 'monitoring',
          img: 'img/cicular/监测监控.png',
          children: [
            {
              name: '人员定位一张图',
              id: 'personsite',
              img: 'img/cicular/人员定位.png'
            },
            {
              name: '安全监控一张图',
              id: 'jiankongsite',
              img: 'img/cicular/安全监控.png'
            },
            {
              name: '工业视频一张图',
              id: 'shipinsite',
              img: 'img/cicular/工业视频.png'
            },
            {
              name: '水文监测一张图',
              id: 'shuiwensite',
              img: 'img/cicular/水文监测.png'
            },
            {
              name: '瓦斯巡检一张图',
              id: 'wasisite',
              img: 'img/cicular/瓦斯巡检.png'
            },
            {
              name: '智能通风一张图',
              id: 'tongfengsite',
              img: 'img/cicular/智能通风.png'
            },
            {
              name: '束管监测一张图',
              id: 'shuguansite',
              img: 'img/cicular/束管监测.png'
            },
            {
              name: '光纤测温一张图',
              id: 'guangxiansite',
              img: 'img/cicular/光纤测温.png'
            },
            {
              name: '顶板监测一张图',
              id: 'dingbansite',
              img: 'img/cicular/顶板监测.png'
            },
            {
              name: '粉尘监测一张图',
              id: 'fenchensite',
              img: 'img/cicular/粉尘监测.png'
            },
            {
              name: '应急广播一张图',
              id: 'yingjisite',
              img: 'img/cicular/应急广播.png'
            },
            {
              name: '调度通讯一张图',
              id: 'diaodusite',
              img: 'img/cicular/调度通讯.png'
            }
          ]
        }, {
          name: '灾害专题',
          id: 'disaster',
          img: 'img/cicular/灾害专题.png',
          children: [
            {
              name: '水灾专题图',
              id: 'watertheme',
              img: 'img/cicular/水灾.png'
            },
            {
              name: '火灾专题图',
              id: 'firetheme',
              img: 'img/cicular/火灾.png'
            },
            {
              name: '瓦斯专题图',
              id: 'gastheme',
              img: 'img/cicular/瓦斯.png'
            },
            {
              name: '顶板专题图',
              id: 'rooftheme',
              img: 'img/cicular/顶板.png'
            },
            {
              name: '煤尘专题图',
              id: 'coaldusttheme',
              img: 'img/cicular/煤尘.png'
            }
          ]
        },
        {
          name: '应急演练',
          id: 'emergency',
          img: 'img/cicular/应急演练.png',
          children: [
            {
              name: '救援队伍',
              id: 'rescueteam',
              img: 'img/cicular/救援队伍.png' //,
            },
            {
              name: '救援物资',
              id: 'reliefGoods',
              img: 'img/cicular/救援物资.png'
            },
            {
              name: '预案演练',
              id: 'disasterSimulation',
              img: 'img/cicular/预案演练.png',
              children: [
                {
                  name: '火灾模拟演练',
                  id: 'firesimulation',
                  type: 't1',
                  img: 'img/cicular/火灾模拟.png'
                },
                {
                  name: '水灾模拟演练',
                  id: 'watersimulation',
                  type: 't1',
                  img: 'img/cicular/水灾模拟.png'
                },
                {
                  name: '瓦斯模拟演练',
                  id: 'gassimulation',
                  type: 't1',
                  img: 'img/cicular/瓦斯模拟.png'
                },
                {
                  name: '顶板模拟演练',
                  id: 'roofsimulation',
                  type: 't1',
                  img: 'img/cicular/顶板模拟.png'
                },
                {
                  name: '煤尘模拟演练',
                  id: 'coaldustsimulation',
                  type: 't1',
                  img: 'img/cicular/煤尘模拟.png'
                }
              ]
            }
          ]
        },
        {
          name: '单兵互联',
          id: 'individualInterconnection',
          img: 'img/cicular/单兵互联.png',
          children: [
            {
              name: '智能矿灯',
              id: 'minelamp',
              img: 'img/cicular/智能矿灯.png'
            },
            {
              name: '井下手机',
              id: 'mobilephone',
              img: 'img/cicular/井下手机.png'
            },
            {
              name: '人员定位卡',
              id: 'personcard',
              img: 'img/cicular/人员定位卡.png'
            }
          ]
        }
      ],
      nowDate: '',
      logoLocation: null,
      url: 'config/config.json',
      loadend: false,
      backgroundImg: require('@/assets/images/background.png')
    }
  },
  mounted() {
    this.currentTime()
    var _this = this
    window.cesiumvariate = {}
    _this.fullscreenLoading = this.$loading({
      lock: true,
      text: '初始化地球',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.2)'
    })
    window.vertexShader1 = ''
    window.clustercallback = []
    window.g_HangDaoDataList = []
    window.facilitypointList = {}
    window.createImageryProvider = createImageryProvider
    window.createTerrainProvider = createTerrainProvider
    window.fromLocal = fromLocal
    window.LocalToDegree = LocalToDegree
    window.convert2000ToWGS84 = convert2000ToWGS84
    window.convertWGS84To2000 = convertWGS84To2000
    window.WGS84_to_Cartesian3 = WGS84_to_Cartesian3

    window.centerAt = _this.centerAt
    window.centerAt2 = _this.centerAt2
    window.flyTo = _this.flyTo
    _this.createMap({
      id: 'cesiumContainer',
      url: _this.url,
      success: function(_map, gisdata, jsondata) {
        window.viewer = _map.viewer
        window.gisdata = gisdata
        window.d3kit = new Cesium.D3Kit(window.viewer, { loadGuiPlugin: true })
        _this.callback(gisdata)
      }
    })
  },
  methods: {
    ...mapMutations({
      setLayerListData: 'setLayerListData'
    }),
    toolBarshow() {
      if ($('#showtoolbar').is(':hidden')) {
        $('#showtoolbar').show(1000) // 如果元素为隐藏,则将它显现
      } else {
        $('#showtoolbar').hide(1000) // 如果元素为显现,则将其隐藏
      }
    },
    changeStatus() {
      this.showslider = true
    },
    callback(gisdata) {
      var _this = this
      var hi = 0
      var helper = new Cesium.EventHelper()
      helper.add(viewer.scene.globe.tileLoadProgressEvent, function(e) {
        if (e === 0) {
          if (_this.loadend) {
            // debugger
            _this.fullscreenLoading.text = '定位完成'
            // 添加发光线
            var GrowLineMoudle = new CTMap.workPolygonEffects(viewer)
            _this.addGrowLine(GrowLineMoudle)
            // 添加采空区
            var caikongMoudle = new CTMap.workPolygonEffects(viewer)
            var url1 = 'data/采空区.json'
            var url2 = 'data/新巷道图层.json'
            caikongMoudle.addCaiKong(url1, url2)
            // 添加工业广场
            // eslint-disable-next-line no-undef
            _this.add_HLL_GYGC()
            _this.loadHangDao('data/巷道.json')
            var st = setTimeout(() => {
              _this.fullscreenLoading.close()
              window.clearTimeout(st)
              _this.addEventFun(GrowLineMoudle, caikongMoudle)
            }, 200)
            _this.setLayerListData(true)
            helper.removeAll()
            pointstatis.add(window.viewer)

           // _this.pointstatis()
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
      // viewer.scene.backgroundColor = Cesium.Color.fromCssColorString('#263652')
    },
    // 工业广场
    add_HLL_GYGC() {
        // 中心偏移点
        var longitude = 110.40177239999998
	      var latitude = 38.933657900000004
        var height = 1263
        var tileseturl = './SampleData/HLL-gygc'
        // eslint-disable-next-line no-undef
        var HLLgygc = new CTMap.HLLgygc(viewer)
        // 广场是否显示
        HLLgygc.isshow()
        $.get('./SampleData/HLL-gygc/gygc.json', {}, function(res) {
            HLLgygc.add(tileseturl, res, longitude, latitude, height)
        })
    },
    addGrowLine(GrowLineMoudle) {
      var position = [
        112.666679,
        35.699997,
        1.5,
        112.715782,
        35.699989,
        1.47,
        112.705994,
        35.679314,
        1.49,
        112.729988,
        35.676205,
        1.49,
        112.729973,
        35.674404,
        1.5,
        112.734169,
        35.674397,
        1.52,
        112.734154,
        35.6698,
        1.5,
        112.725014,
        35.669807,
        1.51,
        112.725136,
        35.673183,
        1.52,
        112.714981,
        35.675266,
        1.5,
        112.71286,
        35.672646,
        1.5,
        112.703995,
        35.674438,
        1.51,
        112.703201,
        35.671791,
        1.5,
        112.692116,
        35.671661,
        1.5,
        112.692169,
        35.660225,
        1.53,
        112.656815,
        35.666321,
        1.5,
        112.643036,
        35.66634,
        1.52,
        112.658394,
        35.704113,
        1.54,
        112.666656,
        35.704159,
        1.53,
        112.666679,
        35.699997,
        1.5
      ]
      GrowLineMoudle.addGrowLine(position)
    },

    loadHangDao(url) {
      if (window.g_HangDaoDataList.length > 0) return
      $.get(url, {}, function(res) {
        var json = res
        var id = 0
        for (let j = 0; j < json.Map.length; j++) {
          var obj = json.Map[j]
          if (obj.ModelType == 'MModel_Passage') {
            var W = obj.W
            var H = obj.H
            var Name = obj.Name
            var xyz = obj.XYZ
            var coordList = []
            var xyzArr = obj.XYZ.split(';')

            for (var k = 0; k < xyzArr.length; k++) {
              var xyzArr2 = xyzArr[k].split(',')
              var x1 = parseFloat(xyzArr2[0])
              var y1 = parseFloat(xyzArr2[1])
              var z1 = parseFloat(xyzArr2[2])

              // var pos = LocalToDegree(x1,y1,z1);
              coordList.push(x1)
              coordList.push(y1)
              coordList.push(z1)
            }
            var psData = {}
            psData.coordList = coordList
            psData.name = Name
            psData.width = W
            window.g_HangDaoDataList[id] = psData

            id++
          }
        }
        return window.g_HangDaoDataList
      })
    },
    createMap(opt) {
      var _this = this
      var url = opt.url
      if (opt.url) {
        fetch(url)
          .then(function(response) {
            return response.json()
          })
          .then(function(config) {
            // map初始化
            var configdata = config.map

            _this.createMapByData(opt, configdata, config)
          })
          .catch(function(ex) {
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
                '<svg xmlns="http://www.w3.org/2000/svg"><path d="M512 64C265 64 64 265.1 64 512.2 64 759.1 265 960 512 960s448-250.9 448-447.8C960 265.1 759 64 512 64z m-68.9 66.2c-38.2 35-86.2 89.7-121.1 165.9-42.1-20.5-70.4-43.4-85.4-57.3 56.2-56.5 128.8-94.5 206.5-108.6zM208.7 269.9c17.1 16.1 49.6 42.6 97.4 65.5-17.6 49.1-27.4 101.5-29.4 155.9H124.4c4.3-81.3 33.3-157.7 84.3-221.4z m-84.3 262.9h152.3c2 54.3 11.9 106.8 29.4 155.9-47.8 22.9-80.4 49.5-97.4 65.3-51-63.5-80-139.9-84.3-221.2z m112.2 252.5c14.9-13.9 43.1-36.7 85.4-57.3 34.9 76.3 82.8 130.9 121.1 165.8-77.7-14.1-150.3-52-206.5-108.5z m254.6 94.4c-34.8-28.6-90.8-84.2-130-168.3 40.7-14.8 84.4-23.5 130-25.5v193.8z m0-235.5c-51.5 2-100.5 11.5-146 28.2-15.9-44.2-24.9-91.1-26.9-139.6h172.9v111.4z m0-152.9H318.3c2-48.6 11-95.5 26.9-139.5 45.5 16.6 94.6 26 146 27.9v111.6z m0-153.2c-45.8-2.1-89.4-10.6-130-25.4 39.1-83.9 95.2-139.7 130-168.4v193.8z m408.4 153.2H747.4c-2.1-54.6-11.9-106.9-29.5-155.9 47.8-22.9 80.3-49.4 97.5-65.5 50.8 63.7 79.8 140 84.2 221.4zM787.4 238.7c-14.9 13.9-43.3 36.8-85.5 57.3-34.9-76.2-82.8-130.9-121-165.9 77.8 14.2 150.4 52.2 206.5 108.6z m-254.6-94.4c34.7 28.8 90.9 84.5 130 168.4-40.7 14.8-84.3 23.3-130 25.4V144.3z m0 235.4c51.4-1.9 100.4-11.3 146-27.9 15.9 44.3 24.9 91.1 26.9 139.5H532.8V379.7z m0 153.1h172.9c-2 48.3-11 95.3-26.9 139.6-45.5-16.7-94.5-26.2-146-28.2V532.8z m0 346.9V685.9c45.6 2 89.2 10.6 130 25.5-39.2 84.1-95.3 139.7-130 168.3z m48.1 14c38.2-34.9 86.1-89.5 121-165.8 42.3 20.7 70.6 43.6 85.5 57.3-56.2 56.6-128.8 94.5-206.5 108.5zM815.3 754c-17.1-15.8-49.6-42.3-97.5-65.3 17.6-49.1 27.4-101.4 29.5-155.9h152.2c-4.3 81.3-33.3 157.7-84.2 221.2z" fill="#000000" p-id="3871"></path></svg>',
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
                '<svg xmlns="http://www.w3.org/2000/svg"><path d="M512 64C265 64 64 265.1 64 512.2 64 759.1 265 960 512 960s448-250.9 448-447.8C960 265.1 759 64 512 64z m-68.9 66.2c-38.2 35-86.2 89.7-121.1 165.9-42.1-20.5-70.4-43.4-85.4-57.3 56.2-56.5 128.8-94.5 206.5-108.6zM208.7 269.9c17.1 16.1 49.6 42.6 97.4 65.5-17.6 49.1-27.4 101.5-29.4 155.9H124.4c4.3-81.3 33.3-157.7 84.3-221.4z m-84.3 262.9h152.3c2 54.3 11.9 106.8 29.4 155.9-47.8 22.9-80.4 49.5-97.4 65.3-51-63.5-80-139.9-84.3-221.2z m112.2 252.5c14.9-13.9 43.1-36.7 85.4-57.3 34.9 76.3 82.8 130.9 121.1 165.8-77.7-14.1-150.3-52-206.5-108.5z m254.6 94.4c-34.8-28.6-90.8-84.2-130-168.3 40.7-14.8 84.4-23.5 130-25.5v193.8z m0-235.5c-51.5 2-100.5 11.5-146 28.2-15.9-44.2-24.9-91.1-26.9-139.6h172.9v111.4z m0-152.9H318.3c2-48.6 11-95.5 26.9-139.5 45.5 16.6 94.6 26 146 27.9v111.6z m0-153.2c-45.8-2.1-89.4-10.6-130-25.4 39.1-83.9 95.2-139.7 130-168.4v193.8z m408.4 153.2H747.4c-2.1-54.6-11.9-106.9-29.5-155.9 47.8-22.9 80.3-49.4 97.5-65.5 50.8 63.7 79.8 140 84.2 221.4zM787.4 238.7c-14.9 13.9-43.3 36.8-85.5 57.3-34.9-76.2-82.8-130.9-121-165.9 77.8 14.2 150.4 52.2 206.5 108.6z m-254.6-94.4c34.7 28.8 90.9 84.5 130 168.4-40.7 14.8-84.3 23.3-130 25.4V144.3z m0 235.4c51.4-1.9 100.4-11.3 146-27.9 15.9 44.3 24.9 91.1 26.9 139.5H532.8V379.7z m0 153.1h172.9c-2 48.3-11 95.3-26.9 139.6-45.5-16.7-94.5-26.2-146-28.2V532.8z m0 346.9V685.9c45.6 2 89.2 10.6 130 25.5-39.2 84.1-95.3 139.7-130 168.3z m48.1 14c38.2-34.9 86.1-89.5 121-165.8 42.3 20.7 70.6 43.6 85.5 57.3-56.2 56.6-128.8 94.5-206.5 108.5zM815.3 754c-17.1-15.8-49.6-42.3-97.5-65.3 17.6-49.1 27.4-101.4 29.5-155.9h152.2c-4.3 81.3-33.3 157.7-84.2 221.2z" fill="#000000" p-id="3871"></path></svg>',
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
    // 开场飞行定位动画  author：mxw
    openFlyAnimation() {
      var _this = this
      var camera = viewer.scene.camera
      // 煤矿处相机位置和飞行时间
      var mineBoundaryLocation = {
        destination: new Cesium.Cartesian3.fromDegrees(110.2883829, 38.9336651, 36073.2938),
        duration: 3
      }
      var wangpoLocation = {
        destination: new Cesium.Cartesian3.fromDegrees(110.30228998, 38.7039448, 21557.6067),
        orientation: {
          heading: 6.223585370236905,
          pitch: -0.6518620997804505,
          roll: 6.28294670516717
        },
        duration: 3
      }
      // 陕西省处相机位置和飞行时间
      var shanxiLocation = {
        destination: new Cesium.Cartesian3.fromDegrees(108.8230868, 35.5948415, 1934213.0584),
        duration: 2
      }
      // 添加中国边界
      var chinaBoundaryJsonData = Cesium.GeoJsonDataSource.load('data/Boundary/chinaBoundary.json', {
        // stroke: Cesium.Color.HOTPINK,
        fill: Cesium.Color.YELLOW.withAlpha(0.0),
        strokeWidth: 2,
        clampToGround: true
      })
      viewer.dataSources.add(chinaBoundaryJsonData)
      // 将地球由美国板块初始化为中国板块
      camera.setView({
        destination: new Cesium.Cartesian3.fromDegrees(104, 33.00471913654238, 29087490.862)
        // orientation: {
        //   heading: 6.283185307179586,
        //   pitch: -1.5707963267948966,
        //   roll: 0.0
        // }
      })
      // 飞行至陕西省
      var animate1 = setTimeout(function() {
        camera.flyTo(shanxiLocation)
        clearTimeout(animate1) // 停止动画
      }, 5000)
      // 飞行至陕西省处显示、 移除边界和陕西字样，再飞行至煤矿
      shanxiLocation.complete = function() {
        // 添加陕西省省界
        var shanxiBoundaryJsonData = Cesium.GeoJsonDataSource.load('data/Boundary/shanxiBoundary.json', {
          stroke: Cesium.Color.MIDNIGHTBLUE,
          fill: Cesium.Color.NAVY.withAlpha(0.5),
          strokeWidth: 5,
          clampToGround: true
        })
        viewer.dataSources.add(shanxiBoundaryJsonData)
        // 添加陕西字样
        viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(108.948024, 35.113161, 50000),
          label: {
            text: '陕西',
            font: '24px Helvetica',
            fillColor: Cesium.Color.WHITE,
            outlineColor: Cesium.Color.WHITE,
            // outlineWidth: 2,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE
          }
        })
        var shanxiBoundaryJsonDataSource
        var chinaBoundaryJsonDataSource
        var animate2 = setTimeout(function() {
          viewer.entities.removeAll()
          // 移除中国边界geojson数据
          chinaBoundaryJsonData.then(res => {
            chinaBoundaryJsonDataSource = res
          })
          viewer.dataSources.remove(chinaBoundaryJsonDataSource)
          // 移除陕西边界geojson数据
          shanxiBoundaryJsonData.then(res => {
            shanxiBoundaryJsonDataSource = res
          })
          viewer.dataSources.remove(shanxiBoundaryJsonDataSource)
          // 飞行至煤矿
          camera.flyTo(mineBoundaryLocation)
          clearTimeout(animate2) // 停止动画
        }, 2000)
      }
      mineBoundaryLocation.complete = function() {
        if (!window.cesiumvariate.mousePosition) {
          window.cesiumvariate.mousePosition = window.viewer.navigation.mousePosition
          window.cesiumvariate.mousePosition.show = true
        }
        // 添加矿区边界
        var mineBoundaryJsonData = Cesium.GeoJsonDataSource.load('data/Boundary/mineBoundary.json', {
          stroke: Cesium.Color.STEELBLUE,
          fill: Cesium.Color.STEELBLUE.withAlpha(0.7),
          strokeWidth: 3,
          clampToGround: true
        })
        viewer.dataSources.add(mineBoundaryJsonData)
        // 添加地名字样
        viewer.entities.add({
          position: new Cesium.Cartesian3.fromDegrees(110.2783829, 38.9336651, 10240.07),
          billboard: {
            show: true, // default
            image: 'img/logo.png',
            pixelOffset: new Cesium.Cartesian2(-90, 5),
            scale: 1.5,
            width: 32.6,
            height: 32.6
          }
        })
        viewer.entities.add({
          position: new Cesium.Cartesian3.fromDegrees(110.2883829, 38.9336651, 10240.07),
          label: {
            text: '陕煤红柳林',
            font: '50px Helvetica',
            scale: 1,
            fillColor: Cesium.Color.WHITE,
            outlineColor: Cesium.Color.WHITE,
            // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND ,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e5, 0.5)
          }
        })
        var mineBoundaryJsonDataSource
        var animate3 = setTimeout(function() {
          viewer.entities.removeAll()
          // 移除矿区边界geojson数据
          mineBoundaryJsonData.then(res => {
            mineBoundaryJsonDataSource = res
          })
          viewer.dataSources.remove(mineBoundaryJsonDataSource)
          // 飞行至王坡煤矿
          camera.flyTo(wangpoLocation)
          clearTimeout(animate3) // 停止动画
          _this.loadend = true
          if (
            viewer.layerList &&
            viewer.layerList.length > 3 &&
            viewer.layerList[3]._layers &&
            viewer.layerList[3]._layers.length > 0 &&
            viewer.layerList[3]._layers[0].config.type === 'animatelayer'
          ) {
            viewer.layerList[3]._layers[0].setVisible(true)
          }
          // _this.addFlowLinePoint()
        }, 2000)

        // var animate4 = setTimeout(function () {
        //   windows.viewer.entities.removeAll()
        //   // _this.closeFlowLine()
        //   clearTimeout(animate4) // 停止动画
        // }, 2000)

        // var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
        // handler.setInputAction((click) => {
        //   var ellipsoid = viewer.scene.globe.ellipsoid
        //   var height = ellipsoid.cartesianToCartographic(viewer.camera.position).height
        //   if (height < 9200) {
        //     _this.openUndergroundMode()
        //     _this.doulbClickHD(true)
        //   } else {
        //     _this.cancelUndergroundMode()
        //     _this.doulbClickHD(false)
        //     // _this.closeFlowLine()
        //   }
        //   if (window.clustercallback && window.clustercallback.length > 0) {
        //     for (var ci = 0; ci < window.clustercallback.length; ci++) {
        //       if (typeof window.clustercallback[ci] === 'function') {
        //         window.clustercallback[ci]()
        //       }
        //     }
        //   }
        // }, Cesium.ScreenSpaceEventType.WHEEL)
      }
    },
    addEventFun(GrowLineMoudle, caikongMoudle) {
      var _this = this
      viewer.camera.changed.addEventListener(function(percentage) {
        var height = viewer.camera.positionCartographic.height
        // 注册左键单击事件
        // _this.clickEventer()
        if (height < 22000 && height > 1000) {
          caikongMoudle.removeResource()
          GrowLineMoudle.removeResource()

          _this.openUndergroundMode()
          // _this.doulbClickHD(true)
          // 添加动态圆
          if (!_this.addCircleEffect) {
            _this.showCircleRipple()
          }
        } else if (height < 22000) {
          caikongMoudle.removeResource()
          GrowLineMoudle.removeResource()

          _this.openUndergroundMode()
         // _this.doulbClickHD(true)
          if (_this.addCircleArr.length > 0) {
            for (let ll = 0; ll < _this.addCircleArr.length; ll++) {
              _this.addCircleArr[ll].remove()
            }
            _this.addCircleArr = []
            _this.addCircleEffect = false
          }
        } else {
          if (GrowLineMoudle.dataSources.entities._entities._array.length == 0) {
            _this.addGrowLine(GrowLineMoudle)
          }
          // 添加采空区
          if (caikongMoudle.dataSources.entities._entities._array.length == 0) {
            var url1 = 'data/采空区.json'
            var url2 = 'data/新巷道图层.json'
            caikongMoudle.addCaiKong(url1, url2)
          }
          _this.cancelUndergroundMode()
          // _this.doulbClickHD(false)
        }
        if (window.clustercallback && window.clustercallback.length > 0) {
          for (var ci = 0; ci < window.clustercallback.length; ci++) {
            if (typeof window.clustercallback[ci] === 'function') {
              window.clustercallback[ci]()
            }
          }
        }
      })
    },

    showCircleRipple() {
      var tt = this
      tt.addCircleEffect = true
      var positions = [
        112.7145642,
        35.6762447,
        -275.34,
        112.7025492,
        35.6797271,
        -346.6,
        112.662633,
        35.6871531,
        -490.95,
        112.6696057,
        35.6800442,
        -451.29,
        112.6960627,
        35.6943101,
        -390.61,
        112.6764629,
        35.6840686,
        -428.83
      ]
      var j = 0
      for (let i = 0; i < positions.length; i += 3) {
        j++
        if (j === 5) j = 1
        const lon = positions[i]
        const lat = positions[i + 1]
        var height = positions[i + 2]
        var url = 'img/effects/dcircle' + j + '.png'

        // 添加动态扩展圆
        var appcicleMoudle = new CTMap.waterEffects(viewer)
        var data = {
          id: 'hd_' + i,
          lon: lon,
          lat: lat,
          height: height,
          maxR: 200,
          minR: 5, // 最好为0
          deviationR: 1, // 差值 差值也大 速度越快
          eachInterval: 2000, // 两个圈的时间间隔
          imageUrl: url
        }
        appcicleMoudle.addCircleRipple(viewer, data)
        tt.addCircleArr.push(appcicleMoudle)

        // 添加墙体
        var positions3 = []
        var num = 20
        for (let k = 0; k <= num; k++) {
          var x = lon + Math.cos((Math.PI / num) * 2 * k) * 0.00024
          var y = lat + Math.sin((Math.PI / num) * 2 * k) * 0.0002
          positions3.push(x)
          positions3.push(y)
          positions3.push(height)
        }
        var options = { showTop: true }
        appcicleMoudle.addDynamicWall('sdf', 'img/effects/fence4-1.png', positions3, 20, 2000, options)
        appcicleMoudle.addDynamicWall('sdf2', 'img/effects/fence5.png', positions3, 20)
      }
      var appcicleMoudle_qiang = new CTMap.waterEffects(viewer)
      // 中心花坛
      var lon = 112.728917627673
      var lat = 35.674632281348295
      lon = 112.7294023473967
      lat = 35.67394276958887
      var alt = 73
      var positions = []
      var num = 15
      for (var i = 0; i <= num; i++) {
        var x = lon + Math.cos((Math.PI / num) * 2 * i) * 0.00015
        var y = lat + Math.sin((Math.PI / num) * 2 * i) * 0.00012
        positions.push(x)
        positions.push(y)
        positions.push(alt)
      }
      appcicleMoudle_qiang.addDynamicWall('sdf', 'img/effects/fence3.png', positions, 5)

      // 两个柱状体-生命至上 安全第一
      lon = 112.73078061305752
      lat = 35.6726242527782
      alt = 37
      var positions2 = []

      for (var i = 0; i <= num; i++) {
        var x = lon + Math.cos((Math.PI / num) * 2 * i) * 0.00012
        var y = lat + Math.sin((Math.PI / num) * 2 * i) * 0.0001
        positions2.push(x)
        positions2.push(y)
        positions2.push(alt)
      }

      appcicleMoudle_qiang.addDynamicWall('sdf', 'img/effects/fence2.png', positions2, 50)

      lon = 112.73052971597569
      lat = 35.6727554990104
      alt = 37
      var positions3 = []

      for (var i = 0; i <= num; i++) {
        var x = lon + Math.cos((Math.PI / num) * 2 * i) * 0.00012
        var y = lat + Math.sin((Math.PI / num) * 2 * i) * 0.0001
        positions3.push(x)
        positions3.push(y)
        positions3.push(alt)
      }
      appcicleMoudle_qiang.addDynamicWall('sdf', 'img/effects/fence2.png', positions3, 50)
      // 办公大楼
      lon = 112.7289147
      lat = 35.6746335
      alt = 87
      var positions4 = []

      num = 20
      for (var i = 0; i <= num; i++) {
        var x = lon + Math.cos((Math.PI / num) * 2 * i) * 0.0004
        var y = lat + Math.sin((Math.PI / num) * 2 * i) * 0.00035
        positions4.push(x)
        positions4.push(y)
        positions4.push(alt)
      }
      var options = { repeatX: 1.0, repeatY: 1.0, color: new Cesium.Color(1.0, 1.0, 1.0, 0.8) }
      appcicleMoudle_qiang.addDynamicWall('sdf', 'img/effects/fence4-1.png', positions4, 26, 4000, options)

      var options = { repeatX: 5.0, repeatY: 1.0, color: new Cesium.Color(1.0, 1.0, 1.0, 1.0) }
      appcicleMoudle_qiang.addDynamicWall('sdf2', 'img/effects/fence5.png', positions4, 26, 5000, options)

      var positions5 = [112.7303534, 35.6715092, 57, 112.7305963, 35.6720656, 57, 112.7291217, 35.672465, 57, 112.7288894, 35.6718903, 57, 112.7303534, 35.6715092, 57]
      var options = { repeatX: 1.0, repeatY: 1.0, color: new Cesium.Color(1.0, 1.0, 1.0, 0.8) }
      appcicleMoudle_qiang.addDynamicWall('sdf', 'img/effects/fence4.png', positions5, 25, 4000, options)
      var options = { repeatX: 5.0, repeatY: 1.0, color: new Cesium.Color(1.0, 1.0, 1.0, 1.0) }
      appcicleMoudle_qiang.addDynamicWall('sdf2', 'img/effects/fence5-1.png', positions5, 25, 5000, options)

      var positions6 = [112.7317426, 35.672078, 45, 112.7317956, 35.6722028, 45, 112.7316237, 35.6722481, 45, 112.731575, 35.6721219, 45, 112.7317426, 35.672078, 45]
      var options = { repeatX: 1.0, repeatY: -1.0, horizontal: 0, color: new Cesium.Color(1.0, 1.0, 1.0, 0.8) }
      appcicleMoudle_qiang.addDynamicWall('sdf', 'img/effects/fence6.png', positions6, 25, 4000, options)
    },

    // 添加工业广场、风井间连接特效线
    addFlowLinePoint() {
      var _this = this
      var centerX = 112.72894228423641
      var centerY = 35.67461553849026
      var centerZ = 109.3036256993088

      var entity1 = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(centerX, centerY, centerZ),
        // point: {
        //   color: Cesium.Color.RED, //点位颜色
        //   pixelSize: 10 //像素点大小
        // },
        label: {
          text: ' 工业广场',
          font: '14pt Source Han Sans CN', // 字体样式
          fillColor: Cesium.Color.BLACK, // 字体颜色
          backgroundColor: Cesium.Color.AQUA, // 背景颜色
          showBackground: true, // 是否显示背景颜色
          style: Cesium.LabelStyle.FILL, // label样式
          outlineWidth: 2,
          verticalOrigin: Cesium.VerticalOrigin.CENTER, // 垂直位置
          horizontalOrigin: Cesium.HorizontalOrigin.LEFT, // 水平位置
          pixelOffset: new Cesium.Cartesian2(10, -20) // 偏移
        }
      })
      _this.CreateFlasPoint(centerX, centerY, centerZ, 2, new Cesium.Color(0.003, 0.247, 0.686, 1), new Cesium.Color(0.023, 0.431, 0.961, 1))

      var pnts = [112.6702528, 35.6867359, 32.38, 112.7011155, 35.6755327, 30.6]

      for (var i = 0; i < pnts.length; i += 3) {
        var placeName = ''
        if (i == 0) {
          placeName = '风井'
        } else if (i == 3) {
          placeName = '风井'
        }
        var entity2 = viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(pnts[i], pnts[i + 1], pnts[i + 2]),
          // point: {
          //   color: Cesium.Color.RED, //点位颜色
          //   pixelSize: 8 //像素点大小
          // },
          label: {
            text: placeName,
            font: '12pt Source Han Sans CN', // 字体样式
            fillColor: Cesium.Color.BLACK, // 字体颜色
            backgroundColor: Cesium.Color.AQUA, // 背景颜色
            showBackground: true, // 是否显示背景颜色
            style: Cesium.LabelStyle.FILL, // label样式
            outlineWidth: 2,
            verticalOrigin: Cesium.VerticalOrigin.CENTER, // 垂直位置
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT, // 水平位置
            pixelOffset: new Cesium.Cartesian2(10, -20) // 偏移
          }
        })
        _this.CreateFlasPoint(pnts[i], pnts[i + 1], pnts[i + 2], 2, new Cesium.Color(0.003, 0.247, 0.686, 1), new Cesium.Color(0.023, 0.431, 0.961, 1))

        const mm = _this.parabola([centerX, centerY, centerZ, pnts[i], pnts[i + 1], pnts[i + 2]])
        var polyline = new Cesium.PolylineGeometry({
          positions: mm,
          width: 4
        })
        const instance = new Cesium.GeometryInstance({
          geometry: polyline,
          id: 'flyline'
        })

        // 添加至场景
        var entity3 = viewer.scene.primitives.add(
          new Cesium.Primitive({
            geometryInstances: [instance],
            appearance: _this.getFlylineMaterial(),
            releaseGeometryInstances: false,
            compressVertices: false
          })
        )
      }
      // 添加面
      // var polygon = viewer.entities.add({
      //   id: 'emmm',
      //   polygon: {
      //     hierarchy: {
      //       positions: [
      //         Cesium.Cartesian3.fromDegrees(112.5, 35.5, -500),
      //         Cesium.Cartesian3.fromDegrees(112.9, 35.5, -500),
      //         Cesium.Cartesian3.fromDegrees(112.9, 35.8, -500),
      //         Cesium.Cartesian3.fromDegrees(112.5, 35.8, -500)
      //       ]
      //     },
      //     perPositionHeight: true,
      //     outline: false,
      //     material: new Cesium.Color(38 / 255.0, 54 / 255.0, 82 / 255.0)
      //     // outlineColor: Cesium.Color.BLACK.withAlpha(0.05)
      //   }
      // })
    },

    // 添加闪烁点
    CreateFlasPoint(lon, lat, alt, pixelSize, color, outlinecolor) {
      var entity = new Cesium.Entity({
        name: 'test',
        show: true,
        position: Cesium.Cartesian3.fromDegrees(lon, lat, alt),
        point: null,
        description: ''
      })

      const pointOpacity = 1.0
      let markerOpacity = 0.0
      let outLineOpacity = 0.0
      const outWidth = 20.0
      const maxSize = 50
      let a = false
      let n = false
      let o = false
      entity.point = {
        color: new Cesium.CallbackProperty(() => {
          return a ? ((markerOpacity += 0.03), markerOpacity > 0.7 && (a = false)) : ((markerOpacity = 0.0), (a = true)), color.withAlpha(markerOpacity)
        }, false),
        pixelSize: new Cesium.CallbackProperty((time, result) => {
          return n ? ((pixelSize += 2), pixelSize >= maxSize && (n = false)) : ((pixelSize = 1), (n = true)), pixelSize
        }, false),
        outlineColor: new Cesium.CallbackProperty(() => {
          return o ? ((outLineOpacity += 0.03), outLineOpacity >= 0.7 && (o = false)) : ((outLineOpacity = 0.0), (o = true)), outlinecolor.withAlpha(outLineOpacity)
        }, false),
        outlineWidth: outWidth,
        scaleByDistance: new Cesium.NearFarScalar(1200, 1, 5200, 0.4)
      }
      viewer.entities.add(entity)
    },

    parabola(twoPoints) {
      // 抛物线绘制
      let s = []
      const startPoint = [twoPoints[0], twoPoints[1], twoPoints[2]] // 起点的经度、纬度
      s = s.concat(startPoint)
      const step = 80 // 线的多少，越多则越平滑(但过多浏览器缓存也会占用越多)
      const heightProportion = 0.25 // 最高点和总距离的比值
      const dLon = (twoPoints[3] - startPoint[0]) / step // 经度差值
      const dLat = (twoPoints[4] - startPoint[1]) / step // 纬度差值
      const deltaLon = dLon * Math.abs(111000 * Math.cos(twoPoints[1])) // 经度差(米级)
      const deltaLat = dLat * 111000 // 纬度差(米),1纬度相差约111000米
      const endPoint = [0, 0, 0] // 定义一个端点（后面将进行startPoint和endPoint两点画线）
      const heigh = (step * Math.sqrt(deltaLon * deltaLon + deltaLat * deltaLat) * heightProportion).toFixed(0) * 2 + twoPoints[2]
      const x2 = 10000 * Math.sqrt(dLon * dLon + dLat * dLat) // 小数点扩大10000倍，提高精确度
      const a = heigh / (x2 * x2)
      function y(x, height) {
        return height - a * x * x + twoPoints[2]
      }
      for (var i = 1; i <= step; i++) {
        // 逐“帧”画线
        endPoint[0] = startPoint[0] + dLon // 更新end点经度
        endPoint[1] = startPoint[1] + dLat // 更新end点纬度
        const x = x2 * ((2 * i) / step - 1) // 求抛物线函数x
        endPoint[2] = y(x, heigh).toFixed(0) * 1 // 求end点高度
        s = s.concat(endPoint)

        // end点变为start点
        startPoint[0] = endPoint[0]
        startPoint[1] = endPoint[1]
        startPoint[2] = endPoint[2]
      }
      s[s.length - 1] = twoPoints[5]
      return Cesium.Cartesian3.fromDegreesArrayHeights(s)
    },

    getFlylineMaterial() {
      // 创建材质，在MaterialAppearance中若不添加基础材质，模型将会透明
      var material = new Cesium.Material.fromType('Color')
      material.uniforms.color = Cesium.Color.ORANGE
      // 飞线效果-飞线间隔，宽度2
      const fragmentShaderSource = `         
                        varying vec2 v_st;    
                        varying float v_width;    
                        varying float v_polylineAngle;
                        varying vec4 v_positionEC;
                        varying vec3 v_normalEC;
                        void main()
                        {
                            vec2 st = v_st;
                            // 箭头飞线，宽度 8
                            float xx = fract(st.s*20.0 + st.t  - czm_frameNumber/15.0);
                            if (st.t<0.5) {
                                xx = fract(st.s*20.0 - st.t - czm_frameNumber/15.0);
                            }
                            float r = 1.0;
                            float g = xx;
                            float b = xx;
                            float a = xx;

                            // 飞线边框
                            if (st.t>0.8||st.t<0.2) {
                                g = 1.0;
                                b = 1.0;
                                a = 0.4;
                            }

                            gl_FragColor = vec4(r,g,b,a);
                        }

                `
      // 自定义材质
      const aper = new Cesium.PolylineMaterialAppearance({
        material: material,
        translucent: true,
        vertexShaderSource: `
                        #define CLIP_POLYLINE 
                        void clipLineSegmentToNearPlane(
                            vec3 p0,
                            vec3 p1,
                            out vec4 positionWC,
                            out bool clipped,
                            out bool culledByNearPlane,
                            out vec4 clippedPositionEC)
                        {
                            culledByNearPlane = false;
                            clipped = false;
                            vec3 p0ToP1 = p1 - p0;
                            float magnitude = length(p0ToP1);
                            vec3 direction = normalize(p0ToP1);
                            float endPoint0Distance =  czm_currentFrustum.x + p0.z;
                            float denominator = -direction.z;
                            if (endPoint0Distance > 0.0 && abs(denominator) < czm_epsilon7)
                            {
                                culledByNearPlane = true;
                            }
                            else if (endPoint0Distance > 0.0)
                            {
                                float t = endPoint0Distance / denominator;
                                if (t < 0.0 || t > magnitude)
                                {
                                    culledByNearPlane = true;
                                }
                                else
                                {
                                    p0 = p0 + t * direction;
                                    p0.z = min(p0.z, -czm_currentFrustum.x);
                                    clipped = true;
                                }
                            }
                            clippedPositionEC = vec4(p0, 1.0);
                            positionWC = czm_eyeToWindowCoordinates(clippedPositionEC);
                        }
                        vec4 getPolylineWindowCoordinatesEC(vec4 positionEC, vec4 prevEC, vec4 nextEC, float expandDirection, float width, bool usePrevious, out float angle)
                        {
                            #ifdef POLYLINE_DASH
                            vec4 positionWindow = czm_eyeToWindowCoordinates(positionEC);
                            vec4 previousWindow = czm_eyeToWindowCoordinates(prevEC);
                            vec4 nextWindow = czm_eyeToWindowCoordinates(nextEC);
                            vec2 lineDir;
                            if (usePrevious) {
                                lineDir = normalize(positionWindow.xy - previousWindow.xy);
                            }
                            else {
                                lineDir = normalize(nextWindow.xy - positionWindow.xy);
                            }
                            angle = atan(lineDir.x, lineDir.y) - 1.570796327;
                            angle = floor(angle / czm_piOverFour + 0.5) * czm_piOverFour;
                            #endif
                            vec4 clippedPrevWC, clippedPrevEC;
                            bool prevSegmentClipped, prevSegmentCulled;
                            clipLineSegmentToNearPlane(prevEC.xyz, positionEC.xyz, clippedPrevWC, prevSegmentClipped, prevSegmentCulled, clippedPrevEC);
                            vec4 clippedNextWC, clippedNextEC;
                            bool nextSegmentClipped, nextSegmentCulled;
                            clipLineSegmentToNearPlane(nextEC.xyz, positionEC.xyz, clippedNextWC, nextSegmentClipped, nextSegmentCulled, clippedNextEC);
                            bool segmentClipped, segmentCulled;
                            vec4 clippedPositionWC, clippedPositionEC;
                            clipLineSegmentToNearPlane(positionEC.xyz, usePrevious ? prevEC.xyz : nextEC.xyz, clippedPositionWC, segmentClipped, segmentCulled, clippedPositionEC);
                            if (segmentCulled)
                            {
                                return vec4(0.0, 0.0, 0.0, 1.0);
                            }
                            vec2 directionToPrevWC = normalize(clippedPrevWC.xy - clippedPositionWC.xy);
                            vec2 directionToNextWC = normalize(clippedNextWC.xy - clippedPositionWC.xy);
                            if (prevSegmentCulled)
                            {
                                directionToPrevWC = -directionToNextWC;
                            }
                            else if (nextSegmentCulled)
                            {
                                directionToNextWC = -directionToPrevWC;
                            }
                            vec2 thisSegmentForwardWC, otherSegmentForwardWC;
                            if (usePrevious)
                            {
                                thisSegmentForwardWC = -directionToPrevWC;
                                otherSegmentForwardWC = directionToNextWC;
                            }
                            else
                            {
                                thisSegmentForwardWC = directionToNextWC;
                                otherSegmentForwardWC =  -directionToPrevWC;
                            }
                            vec2 thisSegmentLeftWC = vec2(-thisSegmentForwardWC.y, thisSegmentForwardWC.x);
                            vec2 leftWC = thisSegmentLeftWC;
                            float expandWidth = width * 0.5;
                            if (!czm_equalsEpsilon(prevEC.xyz - positionEC.xyz, vec3(0.0), czm_epsilon1) && !czm_equalsEpsilon(nextEC.xyz - positionEC.xyz, vec3(0.0), czm_epsilon1))
                            {
                                vec2 otherSegmentLeftWC = vec2(-otherSegmentForwardWC.y, otherSegmentForwardWC.x);
                                vec2 leftSumWC = thisSegmentLeftWC + otherSegmentLeftWC;
                                float leftSumLength = length(leftSumWC);
                                leftWC = leftSumLength < czm_epsilon6 ? thisSegmentLeftWC : (leftSumWC / leftSumLength);
                                vec2 u = -thisSegmentForwardWC;
                                vec2 v = leftWC;
                                float sinAngle = abs(u.x * v.y - u.y * v.x);
                                expandWidth = clamp(expandWidth / sinAngle, 0.0, width * 2.0);
                            }
                            vec2 offset = leftWC * expandDirection * expandWidth * czm_pixelRatio;
                            return vec4(clippedPositionWC.xy + offset, -clippedPositionWC.z, 1.0) * (czm_projection * clippedPositionEC).w;
                        }
                        vec4 getPolylineWindowCoordinates(vec4 position, vec4 previous, vec4 next, float expandDirection, float width, bool usePrevious, out float angle)
                        {
                            vec4 positionEC = czm_modelViewRelativeToEye * position;
                            vec4 prevEC = czm_modelViewRelativeToEye * previous;
                            vec4 nextEC = czm_modelViewRelativeToEye * next;
                            return getPolylineWindowCoordinatesEC(positionEC, prevEC, nextEC, expandDirection, width, usePrevious, angle);
                        }

                        attribute vec3 position3DHigh;
                        attribute vec3 position3DLow;
                        attribute vec3 prevPosition3DHigh;
                        attribute vec3 prevPosition3DLow;
                        attribute vec3 nextPosition3DHigh;
                        attribute vec3 nextPosition3DLow;
                        attribute vec2 expandAndWidth;
                        attribute vec2 st;
                        attribute float batchId;

                        varying float v_width;
                        varying vec2 v_st;
                        varying float v_polylineAngle;
                        
                        varying vec4 v_positionEC;
                        varying vec3 v_normalEC;
                        void main()
                        {
                        float expandDir = expandAndWidth.x;
                        float width = abs(expandAndWidth.y) + 0.5;
                        bool usePrev = expandAndWidth.y < 0.0;

                        vec4 p = czm_computePosition();
                        vec4 prev = czm_computePrevPosition();
                        vec4 next = czm_computeNextPosition();
                        
                        float angle;
                        vec4 positionWC = getPolylineWindowCoordinates(p, prev, next, expandDir, width, usePrev, angle);
                        gl_Position = czm_viewportOrthographic * positionWC;
                        
                        v_width = width;
                        v_st.s = st.s;
                        v_st.t = st.t;
                        // v_st.t = czm_writeNonPerspective(st.t, gl_Position.w);
                        v_polylineAngle = angle;


                        
                        vec4 eyePosition = czm_modelViewRelativeToEye * p;
                        v_positionEC =  czm_inverseModelView * eyePosition;      // position in eye coordinates
                        //v_normalEC = czm_normal * normal;                         // normal in eye coordinates
                        }

                    `,
        fragmentShaderSource: fragmentShaderSource
      })
      return aper
    },
    closeFlowLine() {
      // viewer.entities.remove(entity1)
      // viewer.entities.remove(entity2)
      window.viewer.entities.removeAll()

      // viewer.scene.primitives.remove(entity3)
      window.viewer.scene.primitives.removeAll()
    },

    // 开启地下模式
    openUndergroundMode() {
      window.isunderground = true
      // var backgroundEntity = viewer.entities.add({
      //   id: 'emmm',
      //   polygon: {
      //     hierarchy: {
      //       positions: [
      //         Cesium.Cartesian3.fromDegrees(110.1713354, 38.9764920, 1000),
      //         Cesium.Cartesian3.fromDegrees(110.1812292, 38.8517081, 1000),
      //         Cesium.Cartesian3.fromDegrees(110.4199807, 38.9766524, 1000),
      //         Cesium.Cartesian3.fromDegrees(110.4325386, 38.8738148, 1000)
      //       ]
      //     },
      //     perPositionHeight: true,
      //     outline: false,
      //     material: new Cesium.Color.fromCssColorString('#000723')
      //     // outlineColor: Cesium.Color.BLACK.withAlpha(0.05)
      //   }
      // })
      // var backgroundEntity = viewer.entities.add({
      //   show: false,
      //   polygon: {
      //     hierarchy: {
      //       positions: [
      //         Cesium.Cartesian3.fromDegrees(110.1713354, 38.9764920, 1000),
      //         Cesium.Cartesian3.fromDegrees(110.1812292, 38.8517081, 1000),
      //         Cesium.Cartesian3.fromDegrees(110.4199807, 38.9766524, 1000),
      //         Cesium.Cartesian3.fromDegrees(110.4325386, 38.8738148, 1000)
      //       ]
      //     },
      //     perPositionHeight: true,
      //     outline: true,
      //     material: new Cesium.ImageMaterialProperty({
      //       image: this.backgroundImg,
      //       repeat: new Cesium.Cartesian2(1, 2)
      //       // color: Cesium.Color.BLACK
      //     }),
      //     outlineColor: Cesium.Color.BLACK.withAlpha(0.5)
      //   }
      // })
      // setTimeout(() => {
      //   backgroundEntity.show = true
      // }, 2000)
      //注释掉添加模型代码
      /*
      debugger
      const scene = window.viewer.scene
      const position = Cesium.Cartesian3.fromDegrees(112.6903858, 35.681577, -1200.0)
      const hpr = new Cesium.HeadingPitchRoll(140, 0, 0)
      const modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(position, hpr)
      const model = scene.primitives.add(
        Cesium.Model.fromGltf({
          url: './SampleData/gltf/jw.gltf',
          modelMatrix: modelMatrix,
          scale: 2000.0
        })
      )
      */

      window.viewer.scene.sun.show = false
      window.viewer.scene.moon.show = false
      window.viewer.scene.skyBox.show = false
      window.viewer.scene.skyAtmosphere.show = false
      // window.viewer.scene.fxaa = true;
      window.viewer.scene.undergroundMode = true // 重要，开启地下模式，设置基色透明，这样就看不见黑色地球了
      window.viewer.scene.globe.show = false // 不显示地球，这条和地球透明度选一个就可以
      // window.viewer.scene.globe.baseColor = new Cesium.Color(0, 0, 0, 0)
      window.viewer.scene.backgroundColor = new Cesium.Color.fromCssColorString('#000723')
      // window.viewer.scene.globe.depthTestAgainstTerrain = false;
      // window.viewer.scene.highDynamicRange = false;
      window.viewer.scene.screenSpaceCameraController.minimumZoomDistance = -600 // 相机的高度的最小值
      // window.viewer.scene.pickPositionSupported=true;
      window.viewer.camera.near = 300
      window.viewer.scene.screenSpaceCameraController._zoomFactor = 2 // 默认5，缩放速度

      // window.viewer.scene.screenSpaceCameraController._minimumZoomRate = 3000 // 设置相机缩小时的速率
      // window.viewer.scene.screenSpaceCameraController._maximumZoomRate = 3000 //设置相机放大时的速率
    },
    // 关闭地下模式
    cancelUndergroundMode() {
      window.isunderground = false
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
    },
    currentTime() {
      setInterval(this.formatDate, 1000)
    },
    formatDate() {
      var d = new Date()
      // eslint-disable-next-line no-array-constructor
      var monthname = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12')
      var minutes = d.getMinutes()
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      this.nowDate = d.getFullYear() + '年' + monthname[d.getMonth()] + '月' + d.getDate() + '日 ' + d.getHours() + ':' + minutes
    },
    // 监听左键单击事件
    clickEventer() {
      var isClickHander = typeof window.isClickHander === 'undefined'
      if (!window.isClickHander && isClickHander) {
        window.isClickHander = new window.Cesium.ScreenSpaceEventHandler(window.viewer.scene.canvas)
      }
      window.isClickHander.setInputAction(function(movement) {
        if (window.rcamera) {
          window.rcamera.endRotate()
        }
      }, window.Cesium.ScreenSpaceEventType.LEFT_CLICK)
    },
    // 监听左键双击事件
    doulbClickHD(flag) {
      var _this = this
      var isdcHDHandler = typeof window.dcHDHandler === 'undefined'
      if (!window.dcHDHandler && isdcHDHandler) {
        window.dcHDHandler = new window.Cesium.ScreenSpaceEventHandler(window.viewer.scene.canvas)
      }
      if (flag && this.dbcHDflag !== true) {
        window.dcHDHandler.setInputAction(function(movement) {
          var fea = window.viewer.scene.pick(movement.position)
          var cartesian = _this.getCurrentMousePosition(window.viewer.scene, movement.position)
          // 开启绕中心旋转
          // eslint-disable-next-line new-cap
          window.rcamera = new rotateCamera(window.viewer)
          window.rcamera.startRotate(cartesian)
          if (fea) {
            if (fea.tileset && fea.tileset.config && fea.tileset.config.type === 'hangdao') {
              var vb = new Cesium.BoundingSphere(cartesian, fea.tileset.boundingSphere.radius)
              window.viewer.camera.flyToBoundingSphere(vb, { duration: 3, offset: new Cesium.HeadingPitchRange(fea.tileset.config.center.heading, fea.tileset.config.center.pitch, 10) })
              window.rcamera.endRotate()
            }
          }
        }, window.Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
        this.dbcHDflag = true
      } else {
        if (this.handler) {
          this.handler.removeInputAction(window.Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
          if (this.handler && !this.handler.isDestroyed()) this.handler = this.handler && this.handler.destroy()
        }
        this.dbcHDflag = false
      }
    },
    getCurrentMousePosition(scene, position) {
      var cartesian

      // 在模型上提取坐标
      var pickobject = scene.pick(position) // 取模型
      if (scene.pickPositionSupported && Cesium.defined(pickobject)) {
        //! scene.pickPositionSupported : 不支持深度拾取,无法进行鼠标交互绘制
        cartesian = scene.pickPosition(position)
        // if (cartesian) {
        if (Cesium.defined(cartesian)) {
          // var pgeo = scene.globe.ellipsoid.cartesianToCartographic(cartesian);
          var cartographic = Cesium.Cartographic.fromCartesian(cartesian)
          var height = cartographic.height // 模型高度
          if (height >= 0) return cartesian

          // 不是entity时，支持3dtiles地下
          if (!Cesium.defined(pickobject.id) && height >= -2500) return cartesian
        }
      }

      // 提取鼠标点的地理坐标
      if (scene.mode === Cesium.SceneMode.SCENE3D) {
        var pickRay = scene.camera.getPickRay(position)
        cartesian = scene.globe.pick(pickRay, scene)
      } else {
        cartesian = scene.camera.pickEllipsoid(position, scene.globe.ellipsoid)
      }
      return cartesian
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.cvContainer {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.header {
  position: absolute;
  display: flex;
  left: 0;
  top: 0;
  width: 100%;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
}
.header-left {
  width: 395px;
  height: 100%;
  background: url('../assets/images/header-left.png') no-repeat;
  background-size: 100% 100%;
  display: flex;
}
.logobox {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 62px;
  height: 100%;
  align-items: center;
  justify-content: center;
}
.logo {
  width: 39px;
  height: 39px;
  background: url('../assets/images/logo.png') no-repeat;
  background-size: 100% 100%;
}

.logobox span {
  font-size: 12px;
  color: #1f9cff;
  letter-spacing: 2px;
}
.logotitle {
  display: flex;
  flex: 5;
  height: 100%;
  align-items: center;
  justify-content: left;
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
}
.header-right {
  display: flex;
  justify-content: flex-end;
  width: calc(100% - 390px);
  height: 100%;
  background: url('../assets/images/header-right.png') no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}
#cesiumContainer {
  width: 100%;
  height: 100%;
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
.sheng {
  position: absolute;
  right: 0px;
  top: 70px;
  width: 30px;
  height: 46px;
  background-color: #242e35;
  text-align: center;
  cursor: pointer;
  z-index: 1002;
  border: 10px;
}
.sheng .shimg {
  margin: 5px 0px;
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
  display: none;
}
.cesium-baseLayerPicker-dropDown-visible {
  bottom: 0px;
  right: 50px;
}
body .cv_dialog {
  position: absolute;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #009bff;
  box-shadow: 0 0 20px 0 rgb(0 255 255 / 60%);
  background-color: transparent;
}
body .cv_dialog .layui-layer-title {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAwCAYAAAARtFotAAAAAXNSR0IArs4c6QAABS9JREFUSA2tl9th3DoMREUt+28gBaWM28e1ROWcAbli/iPbKwrA4DEAqXU7fj3P8Q+v3v/7/b8eGz8PP96P5+HWiMRzRHyy1mq7C1CUjBa+83jrgt9W5njTYcAvpDzq3d/nW5YBFSx8f55xESdwXOLMpALHq4+lWxloO60LU4Iv3gwvo5YL4THXadIp30pLtz6TVj3o7IvvGF5gI5sfSVCrZ2xyHX4rMFq8UBKKDd+PMW5LPY7BB786wZnVzpIhTBm6B5t4Kr1L7Xf8ylAVV0ymb8HGGLpHhS7PyclnKXl1ZXR0yrraKYD0yCEWPg+d86dg8Beb+VyuqCYWx47vlHXjtByB83p0wIWvxrp0Czx1Jqw+3d/wHcRP47IEObcsczuVkYJlqwejGA+vrfSdlrbJOpCLxlgYVbW4OLEZpkmEE4+u1XkZguqRHaUjhR2fnSI9XmPoxFULZXGqYNanxnVVXQGkecf3Nu7rmSLJTWuJLtZn+KV8aiM185OKcJMRkiMV5VJ7xuZgsO/WzrQHCmveLNehwQu7c/ZMnT1ahOJUux1fc2gn7hnIhifDOejbiJBhdUwabJ8FhY8XD4fjtrzKJSuS8Jk/uXMeyT7PUw3ZkWkWW+9J3pIZbEmWhXUHXNTEUEWgM4hCLivJvcZ24ZOh9KFrjAtFOQ7YCqjio1WulSOlfMXwecfn+Brkm3mD4JMGBEyEWpcuQVZ9Ok569bHj0xSclcZhJvz3mSfXZEMeg6mwwa6f75rsqOzFd4b5crachNzdA5PM8MK6tiHTgy+ctoGxta/1ju/sxRv/7klGwm2V9jLINXPOsa3MgKctNcY16JbuuL74mkPTc+hL56ylRIUZHdug0+jhIQ1Dl7MS1YbnPOQlhQzqscvl2VGzIEY8ZUcmV9qq50dqclc28d/zkOdCnjh2cL2gvtYWxrOeBYZknrHN3k8DSu+J/UPUdtw0Y931xdp8TSSluTUjz/aDSCLcOTHQv/jiUNPiRQyOIcsks/HllnUGj6UhdGCnF+8bHodrLwMyoI4FWyJJZ53myBxRJhtoZxC9ccX+eDov0Svzhux078mWCQKEIspSgZz74OeMEJlXZOXXOOI7hydfRZx8rmTigl2xys0dERnUHh+1CUxdmeYbvnYKBDP9KuSanUAvsVTmaS0RlYF1xQlOh4PhvsL2xWenyFVFik8+gI8zMreZWyv6BEVF97MdyWHJF76jpGTfamc40mRuvzzHLQ1NhglVtnS44iLb8Z2TggOWUjxN4IuvOhgQb41EDrNCV9kENlNm0KsSefEzQ1Wcg3InhxnoesPxykbm0WWpOEaw1vIbW+ETzxzedxlEal/MLyU6xV5jMA85CN51bCK/Z4CY8k4Jh+Xi5bGU69Pdq/OUzLlGIdV15GSI2Yvv52hweCH6AMi34+P8sL7hElJFhGO0jAclSoH0KLdBhVv3fjSQKk/iOz6CLr9McPfAMP55kxUNSyNwE5JQ1VaqoBNPU44fCT3pLqNKlyfp5auKMSu+XVRfLRBbI4nJu/LF9w+vAL4gloGfBF7Az/lhOij9q9fL33oBO77zwInNHMkZ3OVi/aFkv4nSYsQ4Vs8VebICclGcmA3vl/bqBMLPfTWGgBwfnDFzZKbx7dGDTIeRD/4TmXbgw7N24j1gK3SMyV8nZGcpNmt1OpnFI/F1htNkrt28eH0+/bh4BdTXgogteja3zGYCkflqXcFW5pFV9gLI8LqPNrnT2eLS+zqX5Cl1yM73rJqcm/GLb//639s/ryyA+QzSII0AAAAASUVORK5CYII=)
    no-repeat;
  text-align: center;
  color: #fff;
  // color: #ddd;
  border: none;
  //width: 247px;
  height: 42px;
  line-height: 42px;
  text-align: center;
  background-size: 100% 100%;
  opacity: 0.9;
  background-color: transparent;
}
body .cv_dialog .layui-layer-close {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAB8ElEQVRIS8WVP4xMURjFf180GoWCQiQKCiIKCgqNRkGB3U12JRqFRqPQ0IhCo1FoNAqNAgliC4otaLagoNgVEishQUFCoVGQI+c5M9nhzezMkLjde/fe3z3n3u9PSXoIrAPOV9Vt/mJImgHOAZ9K0iKwHfgOTFXV7DhsSceA69n73OAp4CawCvgW+P1R4JKOA9ey5wcwU/6QdBi4AawGvgY+Nwxc0gngatZa2NGquteAAz8Y+Brgc+CPBsElnQSuZI0FGdq47YID359rWQt8BCarar4NLukUcDlzXxr7VV2XPeDA9wW+Hngf+JPlcEmngUv5ZwGG9rj7Axz4XuAWsAF4E/izzJ0BLgb6AZhuc9UKDmBPlG8CloAJ4AhwIdC3Ufq47ar6ggPfFeWbgRfAtkBeR+nTfo87EBz4jsC3BvIy0IVBEfN/wJJ2Ru0WwEo9rNx37kdrHnSkO5a0O9DO400GcAfwQX48w3tCsXPIMOFmwERHXVzcBXzg8OEmaXmCeKOhvyeI3RjuOF85QSSNktJOIl+LM7R/Sks6kIRwEfJC14mVipDdGe7a4iLk1H7QLUKSDgU6Ttm0S3ceC3LZNHy2rdBbaXPqsCNurdzCfhV6Sa8SPv5h6Litya4NdydaMtjNdCNw9h80U7c5V753PwE8/uHYVEpFcwAAAABJRU5ErkJggg==);
  background-size: 100%;
}
body .cv_dialog .layui-layer-content {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAGJJREFUWAnt0rENwCAQBEFMQgluxf03ZiRamIRgyVd6Dfes9/vHxW9efNs5rQP1hxJMUAW0b4MJqoD2bTBBFdC+DSaoAtq3wQRVQPs2mKAKaN8GE1QB7dtggiqgfRtMUAW034cCAaVgY0h9AAAAAElFTkSuQmCC);
  background-size: 100%;
}
.time {
  z-index: 12;
  color: #ffff;
  position: absolute;
  right: 10px;
  width: 200px;
  height: 20px;
  top: 25px;
}
.timeimg {
  width: 15px;
  height: 15px;
  color: #fff;
  font-size: 28px;
  font-weight: 600;
  float: left;
  margin-top: 2px;
  margin-right: 5px;
}
</style>
