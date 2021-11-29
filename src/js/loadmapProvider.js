/* eslint-disable no-redeclare */
/**
 *
 *创建Imagery地图底图
 */
function createImageryProvider(item) {
    var layer = null
    if (item.type) {
        if (item.type === 'group') { // 图层组
            if (item.layers && item.layers.length > 0) {
                var arrVec = []
                for (var index = 0; index < item.layers.length; index++) {
                    var temp = createImageryProvider(item.layers[index])
                    if (temp == null) continue
                    arrVec.push(temp)
                }
                layer = arrVec
            }
        } else {
            layer = new window.Cesium[item.type](item)
        }
    }

    return layer
}
// 创造地形
function createTerrainProvider(item) {
    var layer = null
    if (item.type) {
        layer = new window.Cesium[item.type](item)
    }
    return layer
}

// 加载模型
function load3DTiles(viewer, opts) {
    var opts = opts
    var viewer = viewer

    // 加载3DTiles数据
    // var tiles = new window.Cesium.Cesium3DTileset({
    //     url: opts.url
    // })

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

    target.readyPromise.then(function(target) {
        var heightOffset = opts.height // 3dtiles的高度设置
        var boundingSphere = target.boundingSphere
        var cartographic = window.Cesium.Cartographic.fromCartesian(boundingSphere.center)
        var surface = window.Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height)
        var offset = window.Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOffset)
        var translation = window.Cesium.Cartesian3.subtract(offset, surface, new window.Cesium.Cartesian3())
        target.modelMatrix = window.Cesium.Matrix4.fromTranslation(translation)
            // viewer.zoomTo(target, new Cesium.HeadingPitchRange(0.5, -0.2, target.boundingSphere.radius * 1.0));
    })

    // 是否缩放到加载的图层
    if (opts.isZoomTo) {
        if (opts.center) {
            window.centerAt2(opts.center)
        } else {
            viewer.zoomTo(target)
        }
    }
    return tiles
}

function hangdao(viewer, opts) {
    // var m = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(opts.longitude, opts.latitude, opts.height))
    var g_hangdaoTileset = new Cesium.Cesium3DTileset({
        url: opts.url,
        skipLevelOfDetail: true,
        baseScreenSpaceError: 1024,
        skipScreenSpaceErrorFactor: 16,
        skipLevels: 1,
        immediatelyLoadDesiredLevelOfDetail: false,
        loadSiblings: false,
        cullWithChildrenBounds: true
    })
    var hangdaotarget = viewer.scene.primitives.add(g_hangdaoTileset)
    hangdaotarget.readyPromise.then(function(hangdaotarget) {
        var heightOffset = opts.height // 3dtiles的高度设置
        var boundingSphere = hangdaotarget.boundingSphere
        var cartographic = window.Cesium.Cartographic.fromCartesian(boundingSphere.center)
        var surface = window.Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height)
        var offset = window.Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOffset)
        var translation = window.Cesium.Cartesian3.subtract(offset, surface, new window.Cesium.Cartesian3())
        hangdaotarget.modelMatrix = window.Cesium.Matrix4.fromTranslation(translation)
            // viewer.zoomTo(hangdaotarget, new Cesium.HeadingPitchRange(0.5, -0.2, hangdaotarget.boundingSphere.radius * 1.0));

        if (opts.isZoomTo) {
            if (opts.center) {
                window.centerAt2(opts.center)
            } else {
                viewer.zoomTo(hangdaotarget)
            }
        }
    })
    return g_hangdaoTileset
}

// 加载模型
function loadgltf(viewer, opts) {
    // debugger;
    var url1 = './SampleData/models/systemEquipment/矿工模型_data/矿工.gltf'// obj.URL;

    $.get(opts.url, function(res) {
    var json = (res)
        for (var j = 0; j < json.Map.length; j++) {
            var obj = json.Map[j]

            var x = obj.X
            var y = obj.Y
            var z = obj.Z
            var pos = window.LocalToDegree(x, y, z)

            var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
                Cesium.Cartesian3.fromDegrees(pos.x, pos.y, pos.z))

            var model = viewer.scene.primitives.add(Cesium.Model.fromGltf({
                url: url1,
                modelMatrix: modelMatrix,
                scale: 1
            }))
        }
    })
}

// 加载模型图层
function gltflayer2(viewer, opts) {
    var Source = new Cesium.CustomDataSource(Cesium.createGuid())
    viewer.dataSources.add(Source)
    Cesium.Resource.fetchJson(opts.url).then(function(jsonData) {
        for (let i = 0; i < jsonData.Map.length; i += 1) {
            var obj = jsonData.Map[i]
            var pos = JSON.parse('[' + obj.Position + ']')
            var lon = 112.7293848
            var lat = 35.6739366
            var alt = 0

            const scale = obj.scale || 1.0
            var ellipsoid = viewer.scene.globe.ellipsoid
            var cart3 = ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(lon, lat, alt))
            var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(cart3)

            var mat3 = Cesium.Matrix3.fromRowMajorArray(JSON.parse('[' + obj.Matrix + ']'))
            var c3 = Cesium.Cartesian3.fromArray(pos)
            var mat4 = Cesium.Matrix4.fromRotationTranslation(mat3, c3)
            var m = Cesium.Matrix4.multiplyTransformation(modelMatrix, mat4, new Cesium.Matrix4())
            var model = Source._primitives.add(Cesium.Model.fromGltf({
                id: Cesium.createGuid(),
                // 资源路径
                url: './SampleData/gltf/jw.gltf', // obj.Name,
                distanceDisplayCondition: opts.distanceDisplayCondition ? new Cesium.DistanceDisplayCondition(opts.distanceDisplayCondition[0], opts.distanceDisplayCondition[1]) : null,
                // 模型矩阵
                modelMatrix: m,
                // 模型最小刻度
                minimumPixelSize: 128

                // 模型标尺
                // scale: scale,
                // 模型最大刻度
                // maximumScale: 20000
                // // 仅用于调试。显示模型绘制时的边界球。
                // debugShowBoundingVolume: false,
                // // 仅用于调试，显示魔仙绘制时的线框
                // debugWireframe: false
            }))
            model.property = obj
            model.config = opts
        }
        if (opts.isZoomTo) {
            if (opts.center) {
                window.centerAt2(opts.center)
            } else {
                viewer.zoomTo(Source)
            }
        }
    })

    return Source
}
// 加载模型图层
function gltflayer(viewer, opts) {
    var Source = new Cesium.CustomDataSource(Cesium.createGuid())
    viewer.dataSources.add(Source)
    Cesium.Resource.fetchJson(opts.url).then(function(jsonData) {
        for (let i = 0; i < jsonData.data.length; i += 1) {
            var heading = Cesium.Math.toRadians(jsonData.data[i].geometry.heading)
            var pitch = Cesium.Math.toRadians(jsonData.data[i].geometry.pitch)
            var roll = jsonData.data[i].geometry.roll
            const x = jsonData.data[i].geometry.x
            const y = jsonData.data[i].geometry.y
            const z = jsonData.data[i].geometry.z
            var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)

            const position = Cesium.Cartesian3.fromDegrees(x, y, z)
                // 生成一个函数，该函数从以提供的原点为中心的参考帧到提供的椭圆体的固定参考帧计算4x4变换矩阵。
            var fixedFrame = Cesium.Transforms.localFrameToFixedFrameGenerator('north', 'west')
            var model = Source._primitives.add(Cesium.Model.fromGltf({
                id: Cesium.createGuid(),
                // 资源路径
                url: jsonData.data[i].url,
                distanceDisplayCondition: opts.distanceDisplayCondition ? new Cesium.DistanceDisplayCondition(opts.distanceDisplayCondition[0], opts.distanceDisplayCondition[1]) : null,
                // 模型矩阵
                modelMatrix: Cesium.Transforms.headingPitchRollToFixedFrame(position, hpr, Cesium
                    .Ellipsoid.WGS84, fixedFrame, position),
                // 模型最小刻度
                minimumPixelSize: 128,
                // 模型标尺
                scale: jsonData.data[i].scale || 1.0,
                // 模型最大刻度
                maximumScale: 20000
                    // // 仅用于调试。显示模型绘制时的边界球。
                    // debugShowBoundingVolume: false,
                    // // 仅用于调试，显示魔仙绘制时的线框
                    // debugWireframe: false

            }))
            model.property = jsonData.data[i].property
            model.config = opts
        }
        if (opts.isZoomTo) {
            if (opts.center) {
                window.centerAt2(opts.center)
            } else {
                viewer.zoomTo(Source)
            }
        }
    })

    return Source
}
// 加载kml
function loadKML(viewer, opts) {
    var opts = opts
    var viewer = viewer
        // 加载kml文件

    var kmlOptions = {
        camera: viewer.scene.camera,
        canvas: viewer.scene.canvas,
        clampToGround: true
    }
    var kmlmx = window.Cesium.KmlDataSource.load(opts.url, kmlOptions)
    viewer.dataSources.add(kmlmx)
        // 是否缩放到加载的图层

    if (opts.isZoomTo) {
        viewer.zoomTo(kmlmx)
    }
    return kmlmx
}

function loadGeojson(viewer, opts) {
    var opts = opts
    var filename = opts.name
    var viewer = viewer
    if (opts.upAxis != undefined) {
        var upAxis = opts.upAxis
    } else {
        var upAxis = 1
    }
    var movez = opts.movez ? opts.movez : 0
    var Source = new Cesium.CustomDataSource(Cesium.createGuid())
    viewer.dataSources.add(Source)
    $.get(opts.url, {}, function(res) {
        var json = (res)
        for (var j = 0; j < json.Map.length; j++) {
            var obj = json.Map[j]
            var Name = obj.Name
            var Position = (obj.Position).split(',')
            if (obj.Matrix == undefined) { obj.Matrix = '1,0,0,0,1,0,0,0,1' }
            var matrix = (obj.Matrix).split(',')
            var x = parseFloat(Position[0])
            var y = parseFloat(Position[1])
            var z = parseFloat(Position[2]) + parseFloat(movez)
            const pos = Cesium.Cartesian3.fromDegrees(x, y, z)
            var hpr = new Cesium.HeadingPitchRoll(-90, 0, 0)
                // addModel33("models/mo/jw2.gltf",Matrix,(x),(y),(z));

            // var lon = 112.6910153
            // var lat = 35.6808275
            // var alt = 0
            // x -= 381500;
            // y -= 3950920;
            // matrix = matrix.map(Number)
            // var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(lon, lat, alt))
            // var mat4 = Cesium.Matrix4.fromArray([
            //         matrix[0], matrix[1], matrix[2], 0.0,
            //         matrix[3], matrix[4], matrix[5], 0.0,
            //         matrix[6], matrix[7], matrix[8], 0.0,
            //         x, y, z, 1.0
            //     ])
            //     // mat4 = mat4.map(Number);

            // Cesium.Matrix4.multiply(modelMatrix, mat4, modelMatrix)
            // var p = new Cesium.Cartesian3(0.0, 0.0, 0.0);
            // var pos2 = Cesium.Matrix4.multiplyByPoint(modelMatrix, p, new Cesium.Cartesian3());
            // var pos = Cesium.Cartesian3.fromDegrees(lon, lat, alt);
            /* var model = Source._primitives.add(Cesium.Model.fromGltf({
                 url: './SampleData/models/' + filename + '/' + Name,
                 modelMatrix: modelMatrix,
                 scale: 1,
                 upAxis: upAxis
             })) */
            var fixedFrame = Cesium.Transforms.localFrameToFixedFrameGenerator('north', 'west')
            var model = Source._primitives.add(Cesium.Model.fromGltf({
                    id: Cesium.createGuid(),
                    // 资源路径
                    url: './SampleData/models/' + filename + '/' + Name,
                    distanceDisplayCondition: opts.distanceDisplayCondition ? new Cesium.DistanceDisplayCondition(opts.distanceDisplayCondition[0], opts.distanceDisplayCondition[1]) : null,
                    // 模型矩阵
                    modelMatrix: Cesium.Transforms.headingPitchRollToFixedFrame(pos, hpr, Cesium
                        .Ellipsoid.WGS84, fixedFrame, pos),
                    // 模型最小刻度
                    // minimumPixelSize: 128,
                    // 模型标尺
                    scale: 1.0
                        // 模型最大刻度
                        // maximumScale: 20000
                        // // 仅用于调试。显示模型绘制时的边界球。
                        // debugShowBoundingVolume: false,
                        // // 仅用于调试，显示魔仙绘制时的线框
                        // debugWireframe: false

                }))
                // var enetity = viewer.entities.add({
                //     position: new Cesium.Cartesian3.fromDegrees(x, y, z),
                //     // 姿态
                //     // orientation: new Cesium.CallbackProperty(getOrientation, false),
                //     model: {
                //         uri: "./SampleData/models/' + filename + '/' + Name",
                //     }
                // })
        }
        if (opts.isZoomTo) {
            if (opts.center) {
                window.centerAt2(opts.center)
            } else {
                viewer.zoomTo(Source)
            }
        }
    })
    return Source
}
// 加载工作面、采空区
function loadGobArea(viewer, opts) {
    var opts = opts
    var viewer = viewer
    var imageLibPath = './img/采空区'
    var enableTexture = true
    var Source = new Cesium.CustomDataSource(Cesium.createGuid())
    viewer.dataSources.add(Source)
    $.get(opts.url, {}, function(res) {
        var json = (res)
            // var json = JSON.parse(res)
        var id = 0
        for (var j = 0; j < json.Map.length; j++) {
            var obj = json.Map[j]
            var name = obj.Name
            var colorstr = (obj.Color).split(',')
            var color = new Cesium.Color(parseFloat(colorstr[0]) / 255, parseFloat(colorstr[1]) / 255, parseFloat(colorstr[2]) / 255)
                // var color = new Cesium.Color(1, 0, 0);
            var coords = obj.coords
            var xyzArr = coords.split(',')
            var pnts = []
                // var pntsText=[];
            var x1 = 10000000000
            var y1 = 10000000000
            var z1 = 10000000000
            var x2 = -x1
            var y2 = -y1
            var z2 = -z1
            var centerx = 0.0
            var centery = 0.0

            var polygonXYZ = []
            var index = 0
            var count = 0
            for (var k = 0; k < xyzArr.length - 3; k += 3) {
                var x = parseFloat(xyzArr[k])
                var y = parseFloat(xyzArr[k + 1])
                var z = parseFloat(xyzArr[k + 2])
                if (x1 > x) x1 = x
                if (y1 > y) y1 = y
                if (z1 > z) z1 = z
                if (x2 < x) x2 = x
                if (y2 < y) y2 = y
                if (z2 < z) z2 = z

                centerx += x
                centery += y
                count++
                polygonXYZ.push(x)
                polygonXYZ.push(y)
                polygonXYZ.push(z)
            }
            centerx /= count
            centery /= count

            for (var k = 0; k < polygonXYZ.length - 3; k += 3) {
                var x = polygonXYZ[k]
                var y = polygonXYZ[k + 1]
                var z = polygonXYZ[k + 2]

                pnts.push(window.fromLocal(x, y, z - 938))
            }

            if (enableTexture) {
                var count1 = 0
                var count2 = 0
                var az1Total = 0
                var az2Total = 0
                var totalLength = 0
                for (var k = 0; k < polygonXYZ.length - 3; k += 3) {
                    var x1 = polygonXYZ[k]
                    var y1 = polygonXYZ[k + 1]
                    var z1 = polygonXYZ[k + 2]
                    var k2 = k + 3
                    if (k2 >= polygonXYZ.length) {
                        k2 = 0
                    }
                    var len = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
                    totalLength += len
                }
                for (var k = 0; k < polygonXYZ.length - 3; k += 3) {
                    var x1 = polygonXYZ[k]
                    var y1 = polygonXYZ[k + 1]
                    var z1 = polygonXYZ[k + 2]
                    var k2 = k + 3
                    if (k2 >= polygonXYZ.length) {
                        k2 = 0
                    }
                    var x1 = polygonXYZ[k2]
                    var y1 = polygonXYZ[k2 + 1]
                    var z1 = polygonXYZ[k2 + 2]
                    var len = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
                    var a = GetAzimuth(x1, y1, x2, y2)
                    az1Total += (a * len / totalLength)
                    count1++
                }

                var s = (x2 - x1) / 300.0
                var t = (y2 - y1) / 300.0
                var baseMaterial = new Cesium.ImageMaterialProperty({
                    image: imageLibPath + '/' + j + '-' + name + '.png',
                    transparent: false,
                    repeat: new Cesium.Cartesian2(1, 1)
                })

                Source.entities.add({
                    polygon: {
                        hierarchy: {
                            positions: pnts
                        },
                        perPositionHeight: true,
                        outline: true,
                        material: baseMaterial,
                        outlineColor: Cesium.Color.BLACK.withAlpha(1)
                    }
                })
            } else {
                Source.entities.add({
                    polygon: {
                        hierarchy: {
                            positions: pnts
                        },
                        perPositionHeight: true,
                        outline: true,
                        material: color,
                        outlineColor: Cesium.Color.BLACK.withAlpha(1)
                    }
                })
            }
        }
        if (opts.isZoomTo) {
            if (opts.center) {
                window.centerAt2(opts.center)
            } else {
                viewer.zoomTo(Source)
            }
        }
    })
    return Source
}

function loadGobArea2(viewer, opts) {
    var opts = opts
    var viewer = viewer
    var imageLibPath = './img/采空区'
    var enableTexture = true
    var Source = new Cesium.CustomDataSource(Cesium.createGuid())
    viewer.dataSources.add(Source)
    $.get(opts.url, {}, function(res) {
        var json = (res)
        var id = 0
        for (var j = 0; j < json.Map.length; j++) {
            var obj = json.Map[j]
            var name = obj.Name
            var colorstr = (obj.Color).split(',')
            var color = new Cesium.Color(parseFloat(colorstr[0]) / 255, parseFloat(colorstr[1]) / 255, parseFloat(colorstr[2]) / 255)
                // var color = new Cesium.Color(1, 0, 0);
            var coords = obj.coords
            var xyzArr = coords.split(',')
            var pnts = []

            var polygonXYZ = []
            for (var k = 0; k < xyzArr.length - 3; k += 3) {
                var x = parseFloat(xyzArr[k])
                var y = parseFloat(xyzArr[k + 1])
                var z = parseFloat(xyzArr[k + 2])

                polygonXYZ.push(x)
                polygonXYZ.push(y)
                polygonXYZ.push(z)
            }

            for (var k = 0; k < polygonXYZ.length - 3; k += 3) {
                var x = polygonXYZ[k]
                var y = polygonXYZ[k + 1]
                var z = polygonXYZ[k + 2]

                // eslint-disable-next-line no-undef
                // 说明：因在后台编辑器是沿着顶端进行绘制的，所以需要减去巷道高度
                pnts.push(window.fromLocal(x, y, z - 4))
                    // const tar = window.convert2000ToWGS84(x, y, z - 4)
                    // pnts.push(tar.x, tar.y, tar.z)
            }
            if (enableTexture) {
                var baseMaterial = new Cesium.ImageMaterialProperty({
                    image: imageLibPath + '/' + name + '.png',
                    transparent: false,
                    repeat: new Cesium.Cartesian2(1, 1)
                })
                Source.entities.add({
                    polygon: {
                        // hierarchy: new Cesium.Cartesian3.fromDegreesArrayHeights(pnts),
                        hierarchy: pnts,
                        perPositionHeight: true,
                        outline: true,
                        material: baseMaterial,
                        outlineColor: Cesium.Color.BLACK.withAlpha(1)
                    }
                })
            } else {
                Source.entities.add({
                    polygon: {
                        // hierarchy: new Cesium.Cartesian3.fromDegreesArrayHeights(pnts),
                        hierarchy: pnts,
                        perPositionHeight: true,
                        outline: true,
                        material: color,
                        outlineColor: Cesium.Color.BLACK.withAlpha(1)
                    }
                })
            }
        }
        if (opts.isZoomTo) {
            if (opts.center) {
                window.centerAt2(opts.center)
            } else {
                viewer.zoomTo(Source)
            }
        }
    })
    return Source
}

function GetAzimuth(X1, Y1, X2, Y2) {
    var tmpValue = 0

    if (X1 == X2 || Y1 == Y2) {
        if (X1 == X2) {
            /// 经度相同
            if (Y2 >= Y1) {
                return 90
            } else {
                return 270
            }
        } else {
            /// 纬度相同
            if (X2 >= X1) {
                return 0
            } else {
                return 180
            }
        }
    }

    tmpValue = Math.atan((Y2 - Y1) / (X2 - X1))
    var resultAngle = Math.abs(tmpValue * 180 / Math.PI)

    if (X2 > X1) {
        if (Y2 >= Y1) {
            /// 第一象限
            return resultAngle
        } else {
            /// 第四象限
            return 360 - resultAngle
        }
    } else {
        /// 第二象限
        if (Y2 >= Y1) {
            return 180 - resultAngle
        } else {
            /// 第三象限
            return 180 + resultAngle
        }
    }
}

function addlabel(viewer, opts) {
    var Source = new Cesium.CustomDataSource(Cesium.createGuid())
    viewer.dataSources.add(Source)
    window.Cesium.when.all([window.Cesium.Resource.fetchImage('./img/labelBg.png')], function(images) {
        var canvas = document.createElement('canvas')
        canvas.width = 138
        canvas.height = 150

        var ctx = canvas.getContext('2d')
        ctx.font = '18px Arial'
        ctx.fillStyle = 'rgb(255,255,255)'
        ctx.drawImage(images[0], 0, 0, 96, 96)
        ctx.fillText('办公大楼', 16, 20)
        var pintest = canvas.toDataURL()
        var officePin = Source.entities.add({
            name: '办公大楼',
            position: new window.Cesium.Cartesian3.fromDegrees(112.7289062, 35.6746298, 98.4412),
            billboard: {
                image: pintest,
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                // verticalOrigin: window.Cesium.VerticalOrigin.TOP,
                scaleByDistance: new Cesium.NearFarScalar(800, 1.0, 4000, 0)
            }
        })
        ctx.clearRect(0, 0, 100, 100)
        ctx.drawImage(images[0], 0, 0, 96, 96)
        ctx.fillText('副斜井', 24, 20)
        var pintest = canvas.toDataURL()
        var rujinkouPin = Source.entities.add({
            name: '副斜井',
            position: new window.Cesium.Cartesian3.fromDegrees(112.7280412, 35.6743790, 88.8168),
            billboard: {
                image: pintest,
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                // verticalOrigin: window.Cesium.VerticalOrigin.TOP,
                scaleByDistance: new Cesium.NearFarScalar(800, 1.0, 4000, 0)
            }
        })
        ctx.clearRect(0, 0, 100, 100)
        ctx.drawImage(images[0], 0, 0, 96, 96)
        ctx.fillText('员工宿舍', 16, 20)
        var pintest = canvas.toDataURL()
        var dormitoryPin = Source.entities.add({
            name: '员工宿舍',
            position: new window.Cesium.Cartesian3.fromDegrees(112.7283154, 35.6752356, 104.2138),
            billboard: {
                image: pintest,
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                // verticalOrigin: window.Cesium.VerticalOrigin.TOP,
                scaleByDistance: new Cesium.NearFarScalar(800, 1.0, 4000, 0)
            }
        })
        ctx.clearRect(0, 0, 100, 100)
        ctx.drawImage(images[0], 0, 0, 96, 96)
        ctx.fillText('职工餐厅', 16, 20)
        var pintest = canvas.toDataURL()
        var canteenPin = Source.entities.add({
            name: '职工餐厅',
            position: new window.Cesium.Cartesian3.fromDegrees(112.7278276, 35.6752195, 94.3812),
            billboard: {
                image: pintest,
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                // verticalOrigin: window.Cesium.VerticalOrigin.TOP,
                scaleByDistance: new Cesium.NearFarScalar(800, 1.0, 4000, 0)
            }
        })
        ctx.clearRect(0, 0, 100, 100)
        ctx.drawImage(images[0], 0, 0, 96, 96)
        ctx.fillText('煤仓', 33, 20)
        var pintest = canvas.toDataURL()
        var lijingPin = Source.entities.add({
            name: '煤仓',
            position: new window.Cesium.Cartesian3.fromDegrees(112.7296934, 35.6720215, 84.1019),
            billboard: {
                image: pintest,
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                // verticalOrigin: window.Cesium.VerticalOrigin.TOP,
                scaleByDistance: new Cesium.NearFarScalar(800, 1.0, 4000, 0)
            }
        })
        ctx.clearRect(0, 0, 100, 100)
        ctx.drawImage(images[0], 0, 0, 96, 96)
        ctx.fillText('洗选厂', 24, 20)
        var pintest = canvas.toDataURL()
        var xuanmeichangPin = Source.entities.add({
            name: '洗选厂',
            position: new window.Cesium.Cartesian3.fromDegrees(112.7281118, 35.6735463, 90.8430),
            billboard: {
                image: pintest,
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                // verticalOrigin: window.Cesium.VerticalOrigin.TOP,
                scaleByDistance: new Cesium.NearFarScalar(800, 1.0, 4000, 0)
            }
        })
    })
    window.Cesium.when.all([window.Cesium.Resource.fetchImage('./img/labelBg3.png')], function(images) {
        var canvas = document.createElement('canvas')
        canvas.width = 1000
        canvas.height = 600

        var ctx = canvas.getContext('2d')
        ctx.font = '13px Arial'
        ctx.fillStyle = 'rgb(255,255,255)'
        ctx.drawImage(images[0], 0, 0, 1000, 600)
        ctx.fillText('2754.63', 248, 110)
        ctx.fillText('-4173.63', 246, 130)
        ctx.fillText('0.99', 255, 146)
        ctx.fillText('0.64', 255, 166)
        ctx.fillText('43.58', 252, 186)

        ctx.fillText('44.16', 405, 110)
        ctx.fillText('51.49', 405, 130)
        ctx.fillText('44.36', 405, 146)
        ctx.fillText('51.89', 405, 166)
        ctx.fillText('52.58', 405, 186)

        ctx.fillText('2754.63', 600, 110)
        ctx.fillText('-4173.63', 600, 130)
        ctx.fillText('0.99', 610, 146)
        ctx.fillText('0.64', 610, 166)
        ctx.fillText('43.56', 610, 186)

        ctx.fillText('44.16', 760, 110)
        ctx.fillText('51.49', 760, 130)
        ctx.fillText('44.36', 760, 146)
        ctx.fillText('51.89', 760, 166)
        ctx.fillText('52.58', 760, 186)
        var pintest = canvas.toDataURL()
        var officePin = Source.entities.add({
            name: '办公大楼',
            position: new window.Cesium.Cartesian3.fromDegrees(112.6695911, 35.6870407, 20),
            billboard: {
                image: pintest,
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                // verticalOrigin: window.Cesium.VerticalOrigin.TOP,
                scaleByDistance: new Cesium.NearFarScalar(800, 1.0, 4000, 0)
            }
        })
    })
    return Source
}
class areacluster {
    constructor(viewer, opts) {
        this.viewer = viewer
        this.opts = opts
        this.arealist = []
        this.clusterpointlist = []
        this.clustericonlist = {}
        this.dataSources = new Cesium.CustomDataSource(Cesium.createGuid())
        viewer.dataSources.add(this.dataSources)
        this.dataSources2 = new Cesium.CustomDataSource(Cesium.createGuid())
        viewer.dataSources.add(this.dataSources2)
        this.dataSources.show = false
        this.dataSources2.show = false
        this.addcallback()
    }

    addcallback() {
        var this_ = this
        var ccb = function() {
            this_.updateshow()
        }
        this_.cbnum = window.clustercallback.length
        window.clustercallback.push(ccb)
    }

    updateshow() {
        var this_ = this
        var h = this_.viewer.camera.positionCartographic.height
        if (h < this_.opts.maxheight && h > this_.opts.minheight) {
            this_.dataSources.show = true
            this_.dataSources2.show = true
        } else {
            this_.dataSources.show = false
            this_.dataSources2.show = false
        }
    }

    showwalllist(walllist) {
        if (walllist.length > 0) {
            this.dataSources2.entities.removeAll()
            this.arealist = walllist
            for (var i = 0; i < walllist.length; i++) {
                this.showwall(walllist[i])
            }
        }
    }

    showclusterpointlist(pointlist) {
        if (pointlist.length > 0) {
            this.dataSources.entities.removeAll()
            this.clusterpointlist = pointlist
            for (var i = 0; i < pointlist.length; i++) {
                this.addstatispoint(pointlist[i])
            }
        }
    }

    showwall(opt) {
        var alp = 0.8
        var num = 0
        var maximumHeights = []
        var minimumHeights = []
        for (var i = 0; i < opt.positions.length / 3; i++) {
            maximumHeights.push(opt.maxheight)
            minimumHeights.push(opt.minheight)
        }
        // 边界墙纹理特效（new)
        const materialWall = window.d3kit.getCustomMaterialWall({
            image: require('@/assets/images/b3.png'),
            freely: 'vertical',
            direction: '+',
            count: 2,
            color: new Cesium.Color(10 / 155, 38 / 255, 75 / 255, 1),
            duration: 1000
        })
        var a1 = this.dataSources2.entities.add({
                wall: {
                    positions: Cesium.Cartesian3.fromDegreesArrayHeights(opt.positions),
                    maximumHeights: maximumHeights,
                    minimumHeights: minimumHeights,
                    outline: false,
                    // outlineColor: Cesium.Color.BLUE,
                    // outlineWidth: 50,
                    material: materialWall
                }
            })
            // 旧的实现
            // var a1 = this.dataSources2.entities.add({
            //     wall: {
            //         positions: Cesium.Cartesian3.fromDegreesArrayHeights(opt.positions),
            //         maximumHeights: maximumHeights,
            //         minimumHeights: minimumHeights,
            //         outline: false,
            //         outlineColor: Cesium.Color.BLUE,
            //         // outlineWidth: 50,
            //         material: new Cesium.ImageMaterialProperty({
            //             image: 'img/fence.png',
            //             transparent: true,
            //             color: new Cesium.CallbackProperty(function() {
            //                 if ((num % 2) === 0) {
            //                     alp -= 0.005
            //                 } else {
            //                     alp += 0.005
            //                 }

        //                 if (alp <= 0.3) {
        //                     num++
        //                 } else if (alp >= 0.8) {
        //                     num++
        //                 }
        //                 return opt.color.withAlpha(alp)
        //                     // entity的颜色透明 并不影响材质，并且 entity也会透明
        //             }, false)
        //         })
        //     }
        // })
        a1.prop = opt.prop
    }

    //
    addstatispoint(opt) {
        var style = opt.style
        var position = new CTMap.Cartesian3.fromDegrees(opt.position[0], opt.position[1], opt.position[2])
        var heading = Cesium.Math.toRadians(180)
        var pitch = Cesium.Math.toRadians(0)
        var roll = Cesium.Math.toRadians(0)
        var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
        var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr)

        var _num = 0
        var _size = style.size
        var e1 = this.dataSources.entities.add({
            position: position,
            // 模型方向
            orientation: orientation,
            billboard: {
                image: this.drawImage(style.num, style.size * 1.2, style.color, style.textcolor),
                width: new Cesium.CallbackProperty(function() {
                    if ((_num % 2) === 0) {
                        _size -= 0.5
                    } else {
                        _size += 0.5
                    }
                    if (_size <= 0.8 * style.size) {
                        _num++
                    } else if (_size >= 1.2 * style.size) {
                        _num++
                    }
                    return _size
                }),
                height: new Cesium.CallbackProperty(function() {
                    return _size
                })
            }
        })
        e1.prop = opt.prop
        e1.layertype = 'statiscluster'
    }

    drawImage(text, size, color, textcolor) {
        if (this.clustericonlist[text + '_' + size + '_' + color + '_' + textcolor]) {
            return this.clustericonlist[text + '_' + size + '_' + color + '_' + textcolor]
        }
        var canvas = document.createElement('canvas')
        canvas.height = size
        canvas.width = size
        var ctx = canvas.getContext('2d')
            // 画圈
        ctx.beginPath()
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, true)
        ctx.fillStyle = color + '55'
        ctx.closePath()
        ctx.fill()

        // 画圈
        ctx.beginPath()
        ctx.arc(size / 2, size / 2, size / 3, 0, Math.PI * 2, true)
        ctx.fillStyle = color
        ctx.closePath()
        ctx.fill()

        ctx.font = '24px bold 楷体'
        ctx.fillStyle = textcolor || '#ffffff'
        var tx = (size - (text + '').length * 14) / 2
        ctx.fillText(text, tx, (size / 2 + 6))
            // var canvasdataurl = canvas.toDataURL()
        this.clustericonlist[text + '_' + size + '_' + color + '_' + textcolor] = canvas // canvasdataurl
        return canvas
    }

    //
    remove() {
        if (this.cbnum != null) {
            window.clustercallback[this.cbnum] = null
            this.cbnum = null
        }
        this.viewer.dataSources.remove(this.dataSources)
        this.dataSources = null
        this.viewer.dataSources.remove(this.dataSources2)
        this.dataSources2 = null
    }
}

class showfacilitypoint {
    constructor(opt) {
        this.options = {
            url: '',
            minheight: -2000,
            divideheight: 1050,
            maxheight: 18000
        }
        this.options = Object.assign(this.options, opt)
        this.viewer = opt.viewer
        this.dataSources = null
        this.dataSources2 = null
        if (this.options.url && this.options.url !== '') {
            this.loadjson()
        }
    }

    loadjson() {
        var this_ = this

        this_.dataSources = new Cesium.CustomDataSource(Cesium.createGuid())
        this_.viewer.dataSources.add(this_.dataSources)
        this_.dataSources2 = new Cesium.CustomDataSource(Cesium.createGuid())
        this_.viewer.dataSources.add(this_.dataSources2)
        this_.dataSources.show = false
        this_.dataSources2.show = false
        this_.addcallback()
        Cesium.Resource.fetchJson(this_.options.url).then(function(jsonData) {
            // debugger;
            for (var j = 0; j < jsonData.Map.length; j++) {
                var obj = jsonData.Map[j]
                var Name = obj.URL
                    // var Position = (obj.Position).split(',')

                if (obj.Matrix == undefined) { obj.Matrix = '1,0,0,0,1,0,0,0,1' }
                var matrix = (obj.Matrix).split(',')
                var x = parseFloat(obj.X)
                var y = parseFloat(obj.Y)
                var z = parseFloat(obj.Z) // - 925.5
                    // var x = parseFloat(Position[0])
                    // var y = parseFloat(Position[1])
                    // var z = parseFloat(Position[2]) //- 925.5

                // addModel33("models/mo/jw2.gltf",Matrix,(x),(y),(z));

                var pos2 = window.fromLocal(x, y, z)

                var model = this_.options.model || {}
                model.uri = './SampleData/models/systemEquipment/' + Name
                model.distanceDisplayCondition = this_.options.distanceDisplayCondition ? new Cesium.DistanceDisplayCondition(this_.options.distanceDisplayCondition[0], this_.options.distanceDisplayCondition[1]) : null
                model.property = obj
                model.scale = 1
                model.config = this_.options
                var namelist = Name.split('/')
                var labelcont = namelist[1].split('.')[0] + j
                    // debugger;
                switch (namelist[0]) {
                    case '安全监控系统':
                        break

                    case '人员定位系统':
                        break
                    case '工业视频系统':
                        break
                    default:
                        break
                }
                var icourl = 'AQJKXT.png'
                switch (namelist[1]) {
                    // 安全监控系统
                    case '二氧化碳.gltf':
                        icourl = 'AQJKXT.png'
                        labelcont += '\r \n浓度：0.1%'
                        break
                    case '粉尘.gltf':
                        icourl = 'AQJKXT.png'
                        labelcont += '\r \n浓度：1mg/m³'
                        break
                    case '甲烷.gltf':
                        icourl = 'AQJKXT.png'
                        break
                    case '一氧化碳.gltf':
                        icourl = 'AQJKXT.png'
                        break
                    case '温度.gltf':
                        icourl = 'AQJKXT.png'
                        labelcont += '\r \n温度：27°\r \n湿度：65%'
                        break
                    case '烟雾.gltf':
                        icourl = 'AQJKXT.png'
                        break
                    case '氧气.gltf':
                        icourl = 'AQJKXT.png'
                        break

                    case '矿用本安型音响8.gltf':
                        icourl = 'WLKBXT.png'
                        break

                    case '摄像头.gltf':
                        icourl = 'SPJKXT.png'
                        break

                    default:
                        break
                }

                var img = './img/marker/' + icourl
                var eb = this_.dataSources.entities.add({
                    position: pos2,
                    // 模型对应图标
                    billboard: {
                        image: img,
                        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(this_.options.distanceDisplayCondition[1], 15500),
                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                        width: 32,
                        height: 32
                    }
                })
                eb.property = obj
                eb.config = this_.options
                eb.layertype = 'cgqpoint'

                var em = this_.dataSources2.entities.add({
                    position: pos2,
                    model: model,
                    label: {
                        text: labelcont,
                        font: '24px 微软雅黑',
                        distanceDisplayCondition: model.distanceDisplayCondition, // new Cesium.DistanceDisplayCondition(0, 50),
                        fillColor: new Cesium.Color(0.894, 1, 0, 1),
                        outlineColor: new Cesium.Color(1, 0.9, 0.13, 0),
                        outlineWidth: 1.0,
                        pixelOffset: new CTMap.Cartesian2(-30, -100),
                        showBackground: true
                            // backgroundColor: CTMap.Color.DARKCYAN.withAlpha(0.7),
                            // backgroundPadding: new CTMap.Cartesian2(2, 2),
                            // disableDepthTestDistance: Number.POSITIVE_INFINITY
                    }
                })
                em.property = obj
                em.config = this_.options
                em.layertype = 'cgqmodel'
            }
        })
    }

    addcallback() {
        var this_ = this

        var ccb = function() {
            this_.updateshow()
        }
        this_.cbnum = window.clustercallback.length
        window.clustercallback.push(ccb)
    }

    updateshow() {
        var this_ = this
        var h = this_.viewer.camera.positionCartographic.height
        if (h < this_.options.maxheight && h > this_.options.divideheight) {
            this_.dataSources.show = true
            this_.dataSources2.show = false
        } else if (h < this_.options.divideheight && h > this_.options.minheight) {
            this_.dataSources.show = false
            this_.dataSources2.show = true
        } else {
            this_.dataSources.show = false
            this_.dataSources2.show = false
        }
    }

    remove() {
        if (this.cbnum != null) {
            window.clustercallback[this.cbnum] = null
            this.cbnum = null
        }
        this.viewer.dataSources.remove(this.dataSources)
        this.dataSources = null
        this.viewer.dataSources.remove(this.dataSources2)
        this.dataSources2 = null
    }
}

export {
    createImageryProvider,
    createTerrainProvider,
    load3DTiles,
    loadKML,
    loadGeojson,
    hangdao,
    loadgltf,
    gltflayer,
    gltflayer2,
    addlabel,
    areacluster,
    showfacilitypoint,
    loadGobArea,
    loadGobArea2
}

