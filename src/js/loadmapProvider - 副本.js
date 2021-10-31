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
    var tiles = new window.Cesium.Cesium3DTileset({
        url: opts.url
    })

    var topts = {
        url: opts.url
    }
    topts = Object.assign(topts, this.opts)
    var tiles = new window.Cesium.Cesium3DTileset(topts)
        // 设置tiles风格
    tiles.style = new window.Cesium.Cesium3DTileStyle(opts.style)
        // 获取生成的3维对象
    var target = viewer.scene.primitives.add(tiles)

    target.readyPromise.then(function(target) {
        var heightOffset = opts.height // 3dtiles的高度设置
        var boundingSphere = target.boundingSphere
        var cartographic = window.Cesium.Cartographic.fromCartesian(boundingSphere.center)
        var surface = window.Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0)
        var offset = window.Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOffset)
        var translation = window.Cesium.Cartesian3.subtract(offset, surface, new window.Cesium.Cartesian3())
        target.modelMatrix = window.Cesium.Matrix4.fromTranslation(translation)
            // viewer.zoomTo(target, new Cesium.HeadingPitchRange(0.5, -0.2, target.boundingSphere.radius * 1.0));
    })

    // 是否缩放到加载的图层
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
    //var m = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(opts.longitude, opts.latitude, opts.height))
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
    g_hangdaoTileset.readyPromise.then(function(tileset) {
        var hangdaotarget = viewer.scene.primitives.add(tileset)

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

    // var cameraUrl = opts.url;
    // var p1 = Cesium.Cartesian3.fromDegrees(112.7299102746027, 35.673595355881675, 716.2);
    // var p2 = Cesium.Cartesian3.fromDegrees(112.7297, 35.6739, 715.52);
    // var p3 = Cesium.Cartesian3.fromDegrees(112.7293, 35.6747, 716.69);
    // var p4 = Cesium.Cartesian3.fromDegrees(112.7294, 35.6745, 716.95);
    // var p5 = Cesium.Cartesian3.fromDegrees(112.7292, 35.6748, 716.45);
    // var p6 = Cesium.Cartesian3.fromDegrees(112.7273, 35.6781, 712.88);
    // var = modlePositions[p1, p2, p3, p4, p5, p6];
    //     var instances = [];
    // for (var i = 0; i < modlePositions.length; i += 1) {
    //     var position = modlePositions[i];
    //     //批量加载
    //     var hpRoll = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(-120), 0, 0);
    //     // 生成一个函数，该函数从以提供的原点为中心的参考帧到提供的椭圆体的固定参考帧计算4x4变换矩阵。
    //     var fixedFrame = Cesium.Transforms.localFrameToFixedFrameGenerator('north', 'west');
    //     var modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(position, hpRoll, Cesium.Ellipsoid.WGS84, fixedFrame, position);
    //     instances.push({
    //         modelMatrix: modelMatrix
    //     });
    // }
    // let primitive = new Cesium.ModelInstanceCollection({
    //     url: cameraUrl,
    //     instances: instances
    // });
    // var g_gltfTileset = viewer.scene.primitives.add(primitive);

    var gtlfModle = [
        { carte: Cesium.Cartesian3.fromDegrees(112.7299102746027, 35.673595355881675, 716.2), hpRoll: new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(-120), 0, 0) },
        { carte: Cesium.Cartesian3.fromDegrees(112.7298, 35.6738, 716.98), hpRoll: new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(-120), 0, 0) },
        { carte: Cesium.Cartesian3.fromDegrees(112.7294, 35.6745, 717.99), hpRoll: new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(-120), 0, 0) },
        { carte: Cesium.Cartesian3.fromDegrees(112.7282, 35.6766, 713.57), hpRoll: new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(-120), 0, 0) },
        { carte: Cesium.Cartesian3.fromDegrees(112.7269, 35.6789, 714.39), hpRoll: new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(-120), 0, 0) },
        { carte: Cesium.Cartesian3.fromDegrees(112.7233, 35.6852, 713.93), hpRoll: new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(-120), 0, 0) },
        { carte: Cesium.Cartesian3.fromDegrees(112.7248, 35.6771, 710.09), hpRoll: new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(-120), 0, 0) },
        { carte: Cesium.Cartesian3.fromDegrees(112.7264, 35.6743, 714.15), hpRoll: new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(-120), 0, 0) },
        { carte: Cesium.Cartesian3.fromDegrees(112.7331, 35.6651, 705.85), hpRoll: new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(-120), 0, 0) },
        { carte: Cesium.Cartesian3.fromDegrees(112.7367, 35.66382, 710.79), hpRoll: new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(-120), 0, 0) },
        { carte: Cesium.Cartesian3.fromDegrees(112.7336, 35.6607, 706.96), hpRoll: new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(-120), 0, 0) },
        { carte: Cesium.Cartesian3.fromDegrees(112.7233, 35.6741, 710.45), hpRoll: new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(-120), 0, 0) },
        { carte: Cesium.Cartesian3.fromDegrees(112.7163, 35.6864, 707.49), hpRoll: new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(-120), 0, 0) },
        { carte: Cesium.Cartesian3.fromDegrees(112.7221, 35.6703, 703.23), hpRoll: new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(-120), 0, 0) }
    ]

    var scene = viewer.scene
    for (var i = 0; i < gtlfModle.length; i++) {
        var position = gtlfModle[i].carte
            // 设置模型方向
        var hpRoll = gtlfModle[i].hpRoll
            // 生成一个函数，该函数从以提供的原点为中心的参考帧到提供的椭圆体的固定参考帧计算4x4变换矩阵。
        var fixedFrame = Cesium.Transforms.localFrameToFixedFrameGenerator('north', 'west')
        var g_gltfTileset = scene.primitives.add(Cesium.Model.fromGltf({
            // 资源路径
            url: opts.url,
            // 模型矩阵
            modelMatrix: Cesium.Transforms.headingPitchRollToFixedFrame(position, hpRoll, Cesium.Ellipsoid.WGS84, fixedFrame, position),
            // 模型最小刻度
            minimumPixelSize: 180,
            // 模型标尺
            scale: 1.0,
            // 模型最大刻度
            maximumScale: 10,
            // 仅用于调试。显示模型绘制时的边界球。
            debugShowBoundingVolume: false,
            // 仅用于调试，显示魔仙绘制时的线框
            debugWireframe: false
        }))
    }

    // var position = Cesium.Cartesian3.fromDegrees(opts.longitude, opts.latitude, opts.height);
    // // 设置模型方向
    // var hpRoll = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(-120), 0, 0);
    // // 生成一个函数，该函数从以提供的原点为中心的参考帧到提供的椭圆体的固定参考帧计算4x4变换矩阵。
    // var fixedFrame = Cesium.Transforms.localFrameToFixedFrameGenerator('north', 'west');
    // var scene = viewer.scene;
    // var g_gltfTileset = scene.primitives.add(Cesium.Model.fromGltf({
    //     // 资源路径
    //     url: opts.url,
    //     // 模型矩阵
    //     modelMatrix: Cesium.Transforms.headingPitchRollToFixedFrame(position, hpRoll, Cesium.Ellipsoid.WGS84, fixedFrame, position),
    //     // 模型最小刻度
    //     minimumPixelSize: 180,
    //     // 模型标尺
    //     scale: 1.0,
    //     // 模型最大刻度
    //     maximumScale: 1,
    //     // 仅用于调试。显示模型绘制时的边界球。
    //     debugShowBoundingVolume: false,
    //     // 仅用于调试，显示魔仙绘制时的线框
    //     debugWireframe: false
    // }));
    if (opts.isZoomTo) {
        if (opts.center) {
            window.centerAt2(opts.center)
        } else {
            viewer.zoomTo(hangdaotarget)
        }
    }
    return g_gltfTileset
}

// 加载模型图层
function gltflayer(viewer, opts) {
    var _dataSource = new Cesium.CustomDataSource(Cesium.createGuid())
    viewer.dataSources.add(_dataSource)
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
            var model = _dataSource._primitives.add(Cesium.Model.fromGltf({
                id: Cesium.createGuid(),
                // 资源路径
                url: jsonData.data[i].url,
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
                viewer.zoomTo(_dataSource)
            }
        }
    })

    return _dataSource
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
    var viewer = viewer
    var model
    Cesium.Resource.fetchJson(opts.url).then(function(res) {
        //var json = JSON.parse(res);
        for (var j = 0; j < res.Map.length; j++) {
            var obj = res.Map[j];
            var Name = obj.Name;
            var Position = obj.Position.split(',');
            var matrix = obj.Matrix.split(',');
            var x = Position[0];
            var y = Position[1];
            var z = Position[2];
            //addModel33("minedata/jw.gltf",Matrix,x,y,z);

            var lon = 112.7293848,
                lat = 35.6739366,
                alt = 0;

            var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(lon, lat, alt));
            var mat4 = Cesium.Matrix4.fromArray([
                matrix[0], matrix[1], matrix[2], 0.0,
                matrix[3], matrix[4], matrix[5], 0.0,
                matrix[6], matrix[7], matrix[8], 0.0,
                x, y, z, 1.0
            ]);

            Cesium.Matrix4.multiply(modelMatrix, mat4, modelMatrix);
            model = viewer.scene.primitives.add(Cesium.Model.fromGltf({
                url: "minedata/jw.gltf",
                modelMatrix: modelMatrix,
                scale: 1
            }));
        }
    })
    return model;
}

export {
    createImageryProvider,
    createTerrainProvider,
    load3DTiles,
    loadKML,
    loadGeojson,
    hangdao,
    loadgltf,
    gltflayer
}