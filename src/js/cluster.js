import { areacluster } from '../js/loadmapProvider'
import store from '../store/index'
import { createWall } from './wallMaterial'
var echarts = require('echarts')
var pointstatis = {
    add(viewer) {
        var this_ = this
        var al = new areacluster(window.viewer, {
            maxheight: 22000,
            minheight: 4000
        })
        var walllist = [{
            positions: [
                110.39432407011887, 38.93620281567738, 0,
                110.37763772772838, 38.96505108614387, 0,
                110.32987974854838, 38.9639718583591, 0,
                110.32987225615734, 38.95707914987331, 0,
                110.29969827816443, 38.957087690862224, 0,
                110.29962435333893, 38.964596773625146, 0,
                110.27362043767782, 38.962667032093016, 0,
                110.17963761987095, 38.958480989838925, 0,
                110.17545409668689, 38.958585874049035, 0,
                110.17263366956232, 38.888135386117064, 0,
                110.24312627472162, 38.88896585522186, 0,
                110.28361736581901, 38.888890233745045, 0,
                110.28322506997387, 38.892250399325974, 0,
                110.2961150185205, 38.892328815331766, 0,
                110.29598119780233, 38.8963488324189, 0,
                110.32089725758905, 38.89627570298333, 0,
                110.32101291450617, 38.90486447998112, 0,
                110.35003065676605, 38.905149924205666, 0,
                110.36436846745784, 38.906136206305604, 0,
                110.3654348941967, 38.90261187994635, 0,
                110.38932969158851, 38.913065393957154, 0,
                110.39721680913344, 38.93118937486612, 0,
                110.39546081694071, 38.934246429948224, 0,
                110.39432407011887, 38.93620281567738, 0
            ],
            prop: {
                id: '001',
                name: '区域1'
            },
            maxheight: 1250,
            minheight: 1000,
            color: Cesium.Color.BLUE
        }]
        al.showwalllist(walllist)


        var clusterpoints = [{
                position: [112.7142848, 35.6764136, -50],
                style: { num: 34, size: this_.getCircleDiameter(34), color: '#ff0000' },
                prop: {
                    id: 'z0001',
                    center: {
                        x: 112.7142848,
                        y: 35.6764136,
                        z: 1200
                    }
                }
            },
            {
                position: [112.7006968, 35.6792512, -50],
                style: { num: 107, size: this_.getCircleDiameter(107), color: '#4CAF50' },
                prop: {
                    id: 'z0002',
                    center: {
                        x: 112.7006968,
                        y: 35.6792512,
                        z: 1200
                    }
                }
            },
            {
                position: [112.6896924, 35.6821420, -50],
                style: { num: 98, size: this_.getCircleDiameter(98), color: '#ff0000' },
                prop: {
                    id: 'z0003',
                    center: {
                        x: 112.6896924,
                        y: 35.6821420,
                        z: 1200
                    }
                }
            },
            {
                position: [112.6760452, 35.6828125, -50],
                style: { num: 112, size: this_.getCircleDiameter(112), color: '#4CAF50' },
                prop: {
                    id: 'z0004',
                    center: {
                        x: 112.6760452,
                        y: 35.6828125,
                        z: 1200
                    }
                }
            },
            {
                position: [112.6664878, 35.6862922, -50],
                style: { num: 68, size: this_.getCircleDiameter(68), color: '#ff0000' },
                prop: {
                    id: 'z0005',
                    center: {
                        x: 112.6664878,
                        y: 35.6862922,
                        z: 1200
                    }
                }
            }
        ]

        al.showclusterpointlist(clusterpoints)
        al.updateshow()

        var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)

        var tp1 = new CTMap.tooltip(viewer)
        var tp2 = new CTMap.tooltip(viewer, 'jiankongdialog')
        var tp3 = new CTMap.tooltip(viewer, 'shipindialog')
        var tp4 = new CTMap.tooltip(viewer, 'peopledialog')
        var clickpoint = null
            // 点击
        handler.setInputAction(function(movement) {
            var fea = viewer.scene.pick(movement.position)
            this_.clearPopup([tp1, tp2, tp3, tp4])
            clickpoint = null
            if (fea) {
                if (fea.id) {
                    if (fea.id.layertype && fea.id.layertype === 'statiscluster') {
                        // 聚合
                        if (fea.id.prop) {
                            viewer.camera.flyTo({
                                destination: Cesium.Cartesian3.fromDegrees(fea.id.prop.center.x, fea.id.prop.center.y, fea.id.prop.center.z), // 经度、纬度、高度
                                complete: function() {
                                    al.updateshow()
                                    var fle = null
                                    if (window.facilitypointList) {
                                        for (var f in window.facilitypointList) {
                                            if (window.facilitypointList[f] && window.facilitypointList[f].updateshow) {
                                                window.facilitypointList[f].updateshow()
                                                fle = window.facilitypointList[f]
                                            }
                                        }
                                    }
                                    var ents = fle.dataSources.entities._entities._array
                                    this_.showtimechange(ents[ents.length - 1])
                                }
                            })
                        }
                        // 图标点
                    } else if (fea.id.layertype && (fea.id.layertype === 'cgqpoint')) {
                        var posit = fea.id.position.getValue()
                        var ellipsoid = window.viewer.scene.globe.ellipsoid

                        var cartographic = ellipsoid.cartesianToCartographic(posit)
                        var lat = Cesium.Math.toDegrees(cartographic.latitude)
                        var lng = Cesium.Math.toDegrees(cartographic.longitude)
                        var alt = cartographic.height + 1

                        window.viewer.camera.flyTo({
                            destination: window.Cesium.Cartesian3.fromDegrees(lng, lat, alt), // 经度、纬度、高度
                            orientation: {
                                heading: window.Cesium.Math.toRadians(0), // 绕垂直于地心的轴旋转
                                pitch: window.Cesium.Math.toRadians(-90), // 绕纬度线旋转
                                roll: 0 // 绕经度线旋转
                            },
                            duration: 1 // 飞行到目的地花费时间3秒
                        })

                        // 模型
                    } else if (fea.id.layertype && (fea.id.layertype === 'cgqmodel')) {
                        clickpoint = fea.id
                        var tname = fea.id.property.Name
                            // 改变颜色
                        fea.id.model.color = Cesium.Color.fromAlpha(Cesium.Color.RED, 1)
                        var tp, content, head
                        switch (tname) {
                            // 安全监控系统
                            case '安全监控系统/二氧化碳.gltf':
                                content = `<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
                                    <div class="layui-tab-content"style="height:320px">
                                        <div class="layui-tab-item layui-show">
                                        <table class="layuitable">
                                            <tbody align="center" valign="middle">
                                                <tr>
                                                <td>测点：</td><td>0320105A二氧化碳</td>
                                                </tr>
                                                <tr>
                                                <td>实时状态：</td><td>故障</td>
                                                </tr>
                                                <tr>
                                                <td>预警级别：</td><td>--</td>
                                                </tr>
                                                <tr>
                                                <td>逻辑状态：</td><td>正常</td>
                                                </tr>
                                                <tr>
                                                <td>监测值：</td><td>故障</td>
                                                </tr>
                                                <tr>
                                                <td>安装位置：</td><td>12煤辅运大巷</td>
                                                </tr>
                                                <tr>
                                                <td>最近标校时间：</td><td>19日17:53:01</td>
                                                </tr>
                                                <tr>
                                                <td>更新时间：</td><td>17:52:59</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        </div>
                                            <button type="button" id="shebeiinfo"  class="layui-btn">设备信息</button>
                                    </div>
                                    </div> `
                                head = '<div>安全监控系统</div>'
                                tp = tp2
                                break
                            case '安全监控系统/粉尘.gltf':
                                content = `<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
                                    <div class="layui-tab-content"style="height:320px">
                                        <div class="layui-tab-item layui-show">
                                        <table class="layuitable">
                                            <tbody align="center" valign="middle">
                                                <tr>
                                                <td>测点：</td><td>0320105A粉尘传感器</td>
                                                </tr>
                                                <tr>
                                                <td>实时状态：</td><td>故障</td>
                                                </tr>
                                                <tr>
                                                <td>预警级别：</td><td>--</td>
                                                </tr>
                                                <tr>
                                                <td>逻辑状态：</td><td>正常</td>
                                                </tr>
                                                <tr>
                                                <td>监测值：</td><td>故障</td>
                                                </tr>
                                                <tr>
                                                <td>安装位置：</td><td>12煤辅运大巷</td>
                                                </tr>
                                                <tr>
                                                <td>最近标校时间：</td><td>19日17:53:01</td>
                                                </tr>
                                                <tr>
                                                <td>更新时间：</td><td>17:52:59</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        </div>
                                            <button type="button" id="shebeiinfo"  class="layui-btn">设备信息</button>
                                    </div>
                                    </div> `
                                head = '<div>安全监控系统</div> '
                                tp = tp2
                                break
                            case '安全监控系统/甲烷.gltf':
                                content = `<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
                                    <div class="layui-tab-content"style="height:320px">
                                        <div class="layui-tab-item layui-show">
                                        <table class="layuitable">
                                            <tbody align="center" valign="middle">
                                                <tr>
                                                <td>测点：</td><td>0320105A粉尘传感器</td>
                                                </tr>
                                                <tr>
                                                <td>实时状态：</td><td>故障</td>
                                                </tr>
                                                <tr>
                                                <td>预警级别：</td><td>--</td>
                                                </tr>
                                                <tr>
                                                <td>逻辑状态：</td><td>正常</td>
                                                </tr>
                                                <tr>
                                                <td>监测值：</td><td>故障</td>
                                                </tr>
                                                <tr>
                                                <td>安装位置：</td><td>12煤辅运大巷</td>
                                                </tr>
                                                <tr>
                                                <td>最近标校时间：</td><td>19日17:53:01</td>
                                                </tr>
                                                <tr>
                                                <td>更新时间：</td><td>17:52:59</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        </div>
                                            <button type="button" id="shebeiinfo"  class="layui-btn">设备信息</button>
                                    </div>
                                    </div> `
                                head = '<div>安全监控系统</div> '
                                tp = tp2
                                break

                            case '安全监控系统/一氧化碳.gltf':
                                content = `<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
                                    <div class="layui-tab-content">
                                        <div class="layui-tab-item layui-show">
                                        <table class="layuitable">
                                            <tbody align="center" valign="middle">
                                                <tr>
                                                <td>测点：</td><td>0320105A一氧化碳</td>
                                                </tr>
                                                <tr>
                                                <td>实时状态：</td><td>故障</td>
                                                </tr>
                                                <tr>
                                                <td>预警级别：</td><td>--</td>
                                                </tr>
                                                <tr>
                                                <td>逻辑状态：</td><td>正常</td>
                                                </tr>
                                                <tr>
                                                <td>监测值：</td><td>故障</td>
                                                </tr>
                                                <tr>
                                                <td>安装位置：</td><td>12煤辅运大巷</td>
                                                </tr>
                                                <tr>
                                                <td>最近标校时间：</td><td>19日17:53:01</td>
                                                </tr>
                                                <tr>
                                                <td>更新时间：</td><td>17:52:59</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        </div>
                                            <button type="button" id="shebeiinfo" class="layui-btn">设备信息</button>
                                    </div>
                                    </div> `
                                head = '<div>安全监控系统</div>'
                                tp = tp2
                                break

                            case '安全监控系统/温度.gltf':
                                content = `<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
                                    <div class="layui-tab-content">
                                        <div class="layui-tab-item layui-show">
                                        <table class="layuitable">
                                            <tbody align="center" valign="middle">
                                                <tr>
                                                <td>测点：</td><td>0320105A温度传感器</td>
                                                </tr>
                                                <tr>
                                                <td>实时状态：</td><td>故障</td>
                                                </tr>
                                                <tr>
                                                <td>预警级别：</td><td>--</td>
                                                </tr>
                                                <tr>
                                                <td>逻辑状态：</td><td>正常</td>
                                                </tr>
                                                <tr>
                                                <td>监测值：</td><td>故障</td>
                                                </tr>
                                                <tr>
                                                <td>安装位置：</td><td>12煤辅运大巷</td>
                                                </tr>
                                                <tr>
                                                <td>最近标校时间：</td><td>19日17:53:01</td>
                                                </tr>
                                                <tr>
                                                <td>更新时间：</td><td>17:52:59</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        </div>
                                            <button type="button" id="shebeiinfo" class="layui-btn">设备信息</button>
                                    </div>
                                    </div> `
                                head = '<div>安全监控系统</div>'
                                tp = tp2
                                break
                            case '安全监控系统/烟雾.gltf':
                                content = `<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
                                    <div class="layui-tab-content">
                                        <div class="layui-tab-item layui-show">
                                        <table class="layuitable">
                                            <tbody align="center" valign="middle">
                                                <tr>
                                                <td>测点：</td><td>0320105A烟雾传感器</td>
                                                </tr>
                                                <tr>
                                                <td>实时状态：</td><td>故障</td>
                                                </tr>
                                                <tr>
                                                <td>预警级别：</td><td>--</td>
                                                </tr>
                                                <tr>
                                                <td>逻辑状态：</td><td>正常</td>
                                                </tr>
                                                <tr>
                                                <td>监测值：</td><td>故障</td>
                                                </tr>
                                                <tr>
                                                <td>安装位置：</td><td>12煤辅运大巷</td>
                                                </tr>
                                                <tr>
                                                <td>最近标校时间：</td><td>19日17:53:01</td>
                                                </tr>
                                                <tr>
                                                <td>更新时间：</td><td>17:52:59</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        </div>
                                            <button type="button" id="shebeiinfo" class="layui-btn">设备信息</button>
                                    </div>
                                    </div> `
                                head = '<div>安全监控系统</div>'
                                tp = tp2
                                break
                            case '安全监控系统/氧气.gltf':
                                content = `<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
                                    <div class="layui-tab-content">
                                        <div class="layui-tab-item layui-show">
                                        <table class="layuitable">
                                            <tbody align="center" valign="middle">
                                                <tr>
                                                <td>测点：</td><td>0320105A氧气传感器</td>
                                                </tr>
                                                <tr>
                                                <td>实时状态：</td><td>故障</td>
                                                </tr>
                                                <tr>
                                                <td>预警级别：</td><td>--</td>
                                                </tr>
                                                <tr>
                                                <td>逻辑状态：</td><td>正常</td>
                                                </tr>
                                                <tr>
                                                <td>监测值：</td><td>故障</td>
                                                </tr>
                                                <tr>
                                                <td>安装位置：</td><td>12煤辅运大巷</td>
                                                </tr>
                                                <tr>
                                                <td>最近标校时间：</td><td>19日17:53:01</td>
                                                </tr>
                                                <tr>
                                                <td>更新时间：</td><td>17:52:59</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        </div>
                                            <button type="button" id="shebeiinfo" class="layui-btn">设备信息</button>
                                    </div>
                                    </div> `
                                head = '<div>安全监控系统</div>'
                                tp = tp2
                                break

                            case '安全监控系统/一氧化碳.gltf':
                                content = `<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
                          <div class="layui-tab-content">
                            <div class="layui-tab-item layui-show">
                            <table class="layuitable">
                                <tbody align="center" valign="middle">
                                    <tr>
                                    <td>测点：</td><td>0320105A一氧化碳</td>
                                    </tr>
                                    <tr>
                                    <td>实时状态：</td><td>故障</td>
                                    </tr>
                                    <tr>
                                    <td>预警级别：</td><td>--</td>
                                    </tr>
                                    <tr>
                                    <td>逻辑状态：</td><td>正常</td>
                                    </tr>
                                    <tr>
                                    <td>监测值：</td><td>故障</td>
                                    </tr>
                                    <tr>
                                    <td>安装位置：</td><td>12煤辅运大巷</td>
                                    </tr>
                                    <tr>
                                    <td>最近标校时间：</td><td>19日17:53:01</td>
                                    </tr>
                                    <tr>
                                    <td>更新时间：</td><td>17:52:59</td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                                <button type="button" id="shebeiinfo" class="layui-btn">设备信息</button>
                          </div>
                        </div> `
                                head = '<div>安全监控系统</div> '
                                tp = tp2
                                break

                            case '工业视频系统/摄像头.gltf':
                                // 摄像头
                                content = `<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
                      <div class="layui-tab-content">
                      <div class="layui-tab-item layui-show">
                      
                              
                                  <img src="img/dialog/video.png" width="280">
                              
                                  <div class="attribute"> 所属系统：排水系统  区域：中央水泵房1</div> 
                             
                     
                      </div>  
                    </div>
                  </div> `
                                head = '<div>视频监控系统</div>'
                                tp = tp3
                                break

                        }


                        this_.showpopup(tp, fea, head, content)
                    }

                    $('#shebeiinfo').click(function() {
                        this_.clearPopup([tp1, tp2, tp3, tp4])
                        tp = tp2
                        content = `<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
                  <ul class="layui-tab-title">
                    <li class="layui-this">设备参数</li>
                    <li>数据查询</li>
                  </ul>
                  <div class="layui-tab-content" style="height: 300px;">
                    <div class="layui-tab-item layui-show">
                    <table class="layuitable"align="center" valign="middle">
                        <tr>
                        <td rowspan="2"><img src="img/dialog/jw.jpg" width="100"></td><td style="width:180px" ><div>1.48%</div> 时间：19日 17:57:36 状态：报警</td>
                        </tr>
                        <tr>
                        <td class="jw">测点编号：0320611A 安装位置：12煤辅运大巷 生产厂家： 生产编号 出厂日期: 安装日期: 报警上下限：<0或>=1% 高断电设置：无 低断电设置：无</td>
                        </tr>
                    </table>
                    </div>
                    <div class="layui-tab-item">
                      <div class="layui-form">
                        <div class="layui-form-item">
                          <div class="layui-inline">
                            <label class="layui-form-label">开始：</label>
                            <div class="layui-input-inline">
                              <input type="text" class="layui-input" id="test1" placeholder="yyyy-MM-dd" style="color:#000000">
                            </div>
                          </div>
                          <div class="layui-inline">
                            <label class="layui-form-label">结束：</label>
                            <div class="layui-input-inline">
                              <input type="text" class="layui-input" id="test2" placeholder="yyyy-MM-dd" style="color:#000000">
                            </div>
                          </div>
                        </div>
                        <div id="echartEle" style="width:570px;height:230px"></div>
                    
                    
                    </div>   
                  </div>
                </div> `
                        head = '<div>安全监控系统</div>'

                        this_.showpopup(tp, fea, head, content)
                    })
                    $('#routePath').click(function() {
                        store.state.functionMenu.nowMenuName = 'locus'
                    })
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK)


        handler.setInputAction(function(movement) {
            var fea = viewer.scene.pick(movement.endPosition)
            this_.clearPopup([tp1])
            if (fea) {
                if (fea.id) {
                    if (clickpoint === fea.id) {
                        return
                    }
                    if (fea.id.layertype && fea.id.layertype === 'cgqpoint') {
                        // 图标点
                        var property = fea.id.property
                        var propertyName = property.URL.split('/')[1].split('.')[0]
                        var titleName = property.URL.split('/')[0]
                        tp1.add({
                            geometry: fea.id.position.getValue(),
                            content: {
                                header: titleName,
                                isclose: false,
                                content: `
                                    <div><span>名称：</span><span>${propertyName}</span></div>
                                    <div><span>监测值：</span><span>454</span></div>
                                    `
                            }
                        })
                    } else if (fea.id.layertype && fea.id.layertype === 'cgqmodel') {
                        // 模型
                        var property = fea.id.property
                        let propertyName = ''
                        let titleName = ''
                        if (property.Name.indexOf('/' > 0)) {
                            propertyName = property.Name.split('/')[1].split('.')[0];
                            titleName = property.Name.split('/')[1]
                        } else {
                            propertyName = property.Name
                            titleName = propertyName
                        }

                        tp1.add({
                            geometry: fea.id.position.getValue(),
                            content: {
                                header: titleName,
                                isclose: false,
                                content: `
                                    <div><span>名称：</span><span>${propertyName}</span></div>
                                    <div><span>监测值：</span><span>454</span></div>
                                    `
                            }
                        })
                    }
                }
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
    },
    //
    addBoundary() {
        $.get('data/Boundary/mineBoundary.json', {}, function(res) {
            var json = res
            var positionsArr = []
            var coordList = []
            var positionsArr = json.geometries[0].coordinates
            for (var k = 0; k < positionsArr.length; k++) {
                var xyzPositions = positionsArr[k]
                var pos = window.convert2000ToWGS84(xyzPositions[0], xyzPositions[1], 0)
                coordList.push(pos.x)
                coordList.push(pos.y)
                coordList.push(pos.z)
            }
        })
        return coordList
    },

    // 获取圆的直径
    getCircleDiameter(d) {
        var size = (d > 40) ? d : 40
        return size
    },
    // 清除弹框
    clearPopup(list) {
        if (list.length > 0) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].className === 'popupdialog' && document.querySelector('#routePath') === null && store.state.functionMenu.nowMenuName === 'locus') {
                    store.state.functionMenu.nowMenuName = ''
                }
                list[i].closeAll()
            }
        }
    },

    // 显示弹框
    showpopup(tp, fea, head, content) {
        var laydate = window.layui.laydate
            // 常规用法

        var _t = this
        var property = fea.id.property
        if (content == undefined || content === '') {
            content = `<div><span>名称：</span><span>aaa</span></div>
                  <div><span>分数</span><span>454</span></div>`
        }
        tp.add({
            geometry: fea.id.position.getValue(),
            content: {
                header: head,
                isclose: true,
                content: content
            }
        })
        if (head == '<div>安全监控系统</div>') {
            _t.addEchart(laydate)
        }
    },
    addEchart(laydate) {
        const thisDate = new Date()
        var hisPandding = 7 * 24
        var historyEnd = this.getAnyFormatDate1(thisDate)
        const nowFotmate = this.getAnyFormatDate2(thisDate)
        const mydate = new Date(thisDate.getTime() - hisPandding * 60 * 60 * 1000)
        var historyStart = this.getAnyFormatDate1(mydate)
        const paddingFotmate = this.getAnyFormatDate2(mydate)
        layui.use('laydate', function() {
            var laydate = layui.laydate
            laydate.render({
                elem: '#test1',
                type: 'datetime',
                calendar: true,
                max: 0,
                format: 'y年MM月dd日HH点mm分', // 可任意组合
                value: paddingFotmate,
                isInitValue: true,
                done: function(value, date) {
                    $('#test1').html(date)
                }
            })
            laydate.render({
                elem: '#test2',
                type: 'datetime',
                calendar: true,
                max: 0,
                value: nowFotmate,
                isInitValue: true,
                format: 'y年MM月dd日HH点mm分',
                done: function(value, date) {}
            })
        })
        const myChart = echarts.init(document.getElementById('echartEle'))

        const label = [233, 233, 200, 180, 199, 233, 210, 180]
        const value = [233, 233, 200, 180, 199, 233, 210, 180]

        myChart.setOption({
            grid: {
                top: 10,
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: 'rgba(255,255,255,0)' // 0% 处的颜色
                            }, {
                                offset: 0.5,
                                color: 'rgba(255,255,255,1)' // 100% 处的颜色
                            }, {
                                offset: 1,
                                color: 'rgba(255,255,255,0)' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
                    }
                }
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLabel: {
                    formatter: '{value}',
                    fontSize: 14,
                    margin: 20,
                    textStyle: {
                        color: '#7ec7ff'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#243753'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#243753'
                    }
                },
                axisTick: {
                    show: false
                },
                data: label
            }],
            yAxis: [{
                boundaryGap: false,
                type: 'value',
                axisLabel: {
                    textStyle: {
                        color: '#7ec7ff'
                    }
                },
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 12,
                    lineHeight: 40
                },
                splitLine: {
                    lineStyle: {
                        color: '#243753'
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#283352'
                    }
                },
                axisTick: {
                    show: false
                }
            }],
            series: [{
                name: '参数',
                type: 'line',
                smooth: true,
                showSymbol: true,
                symbolSize: 8,
                zlevel: 3,
                itemStyle: {
                    color: '#19a3df',
                    borderColor: '#a3c8d8'
                },
                lineStyle: {
                    normal: {
                        width: 6,
                        color: '#19a3df'
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1, [{
                                    offset: 0,
                                    color: 'rgba(88,255,255,0.2)'
                                },
                                {
                                    offset: 0.8,
                                    color: 'rgba(88,255,255,0)'
                                }
                            ],
                            false
                        )
                    }
                },
                data: value
            }]
        })
    },
    loadTaskRout() {
        alert('a3a')
        var _this = this
        var start = CTMap.JulianDate.fromDate(new Date())
        var keyPos = new CTMap.SampledPositionProperty()
        keyPos.backwardExtrapolationDuration = 2
        keyPos.backwardExtrapolationType = CTMap.ExtrapolationType.HOLD
        keyPos.forwardExtrapolationType = CTMap.ExtrapolationType.HOLD
        var orientation = new CTMap.VelocityOrientationProperty(keyPos)
        var points = []
        for (var j = 0; j < _this.pointList.length; j++) {
            var ctime = CTMap.JulianDate.addSeconds(start, 8 + j * 6, new CTMap.JulianDate())

            var position = Cesium.Cartesian3.fromDegrees(_this.pointList[j].longitude, _this.pointList[j].latitude, _this.pointList[j].height)
            points.push(position)
            keyPos.addSample(ctime, position)
        }
    },
    setClock() {
        var _this = this
        var times = window.cesiumvariate.modelEntity.position._property._times
        var start = times[0]
        var end = times[times.length - 1]
        viewer.clock.startTime = start
        viewer.clock.stopTime = end
        viewer.clock.currentTime = start
        viewer.clock.clockRange = CTMap.ClockRange.LOOP_STOP
        viewer.clock.multiplier = viewer.clock.multiplier * 1.5 // viewer.clock.multiplier / 2
        viewer.flyTo(window.cesiumvariate.animation)
        viewer.clock.shouldAnimate = true
    },
    getAnyFormatDate1(date) {
        var seperator1 = '-'
        var seperator2 = ':'
        var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
        var strDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
            ' ' + date.getHours() + seperator2 + date.getMinutes() +
            seperator2 + date.getSeconds()
        return currentdate
    },
    getAnyFormatDate2(date) {
        var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
        var strDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        var currentdate = date.getFullYear() + '年' + month + '月' + strDate + '日' + date.getHours() + '点' + date.getMinutes() + '分'
        return currentdate
    },
    // 点动画
    showtimechange(ents) {
        var _num = 0
        var w = typeof ents.billboard.width === 'number' ? ents.billboard.width : 48
        var h = typeof ents.billboard.height === 'number' ? ents.billboard.height : 48
        var width = 48
        var size = 48
        ents.billboard.width = new Cesium.CallbackProperty(function() {
            if (_num % 2 === 0) {
                width -= 0.4
            } else {
                width += 0.4
            }
            if (width <= 0.6 * size) {
                _num++
            } else if (width >= size) {
                _num++
            }
            return width
        })
        ents.billboard.height = new Cesium.CallbackProperty(function() {
            return width
        })

        setTimeout(() => {
            ents.billboard.width = w
            ents.billboard.height = h
        }, 5000)
    }

}
export default pointstatis