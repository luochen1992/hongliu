/**
 * 创建基本函数
 * Date:2021.11.27
 */

export default class WaterPoint {
    constructor(viewer, start, end, polyline) {
        this.viewer = viewer;
        this.start = start;
        this.end = end;
        this.polyline = polyline;
    }

    waterEmeryPoint() {
        window.cesiumvariate._wwdataSource = []
        this.point = { longitude: 110.3209802, latitude: 38.9125713, height: 1577.877 }
        this.addWaterPolygon();
        window.viewer.camera.flyTo({
                destination: window.Cesium.Cartesian3.fromDegrees(this.point.longitude, this.point.latitude, this.point.height + 30), // 经度、纬度、高度
                orientation: {
                    heading: window.Cesium.Math.toRadians(0), // 绕垂直于地心的轴旋转
                    pitch: window.Cesium.Math.toRadians(-90), // 绕纬度线旋转
                    roll: 0 // 绕经度线旋转
                },
                duration: 1 // 飞行到目的地花费时间3秒
            })
            //添加时钟
        this.setClock()

    }
    setClock() {
        viewer.clock.startTime = this.start
        viewer.clock.stopTime = this.end
        viewer.clock.currentTime = this.start
        viewer.clock.clockRange = CTMap.ClockRange.UNBOUNDED // CLAMPED
        viewer.clock.multiplier = 0.5 // viewer.clock.multiplier / 2
        viewer.clock.shouldAnimate = true
    }

    addWaterPolygon() {
            var tt = this;
            $.get("data/水灾点.json", {}, function(res) {
                var json = res;
                debugger
                for (var j = 0; j < json.Map.length; j++) {

                    var obj = json.Map[j];
                    if (obj.ModelType == "MModel_Passage") {
                        if (obj.Name.indexOf("主排水泵房") != -1) {
                            var W = obj.W;
                            var H = obj.H;
                            // var xyz = obj.XYZ;

                            var xyzArr = obj.XYZ.split(';');
                            for (var k = 0; k < xyzArr.length - 1; k++) {
                                var xyzArr2 = xyzArr[k].split(',');
                                var x1 = parseFloat(xyzArr2[0]);
                                var y1 = parseFloat(xyzArr2[1]);
                                var z1 = parseFloat(xyzArr2[2]);
                                xyzArr2 = xyzArr[k + 1].split(',');
                                var x2 = parseFloat(xyzArr2[0]);
                                var y2 = parseFloat(xyzArr2[1]);
                                var z2 = parseFloat(xyzArr2[2]);

                                var coordList = []; {
                                    var lineV3D = new Cesium.Cartesian3(x2 - x1, y2 - y1, z2 - z1);
                                    lineV3D = Cesium.Cartesian3.normalize(lineV3D, lineV3D);
                                    var lineV2D = new Cesium.Cartesian3(x2 - x1, y2 - y1, 0);
                                    lineV2D = Cesium.Cartesian3.normalize(lineV2D, lineV2D);

                                    var vLeft = new Cesium.Cartesian3(0, 0, 0);
                                    var vRight = new Cesium.Cartesian3(0, 0, 0);
                                    if (z2 > z1) {
                                        //cross(left, right, result)
                                        vLeft = Cesium.Cartesian3.cross(lineV3D, lineV2D, vLeft);
                                        vRight = Cesium.Cartesian3.cross(lineV2D, lineV3D, vRight);
                                    } else {
                                        vRight = Cesium.Cartesian3.cross(lineV3D, lineV2D, vRight);
                                        vLeft = Cesium.Cartesian3.cross(lineV2D, lineV3D, vLeft);
                                    }
                                    vRight = Cesium.Cartesian3.normalize(vRight, vRight);
                                    vLeft = Cesium.Cartesian3.normalize(vLeft, vLeft);

                                    var vLeft1 = vLeft.clone();
                                    var vLeft2 = vLeft.clone();
                                    var vRight1 = vRight.clone();
                                    var vRight2 = vRight.clone(); { //left
                                        var v = new Cesium.Cartesian3(x1, y1, z1);
                                        var upPoint = new Cesium.Cartesian3(0, 0, 0);
                                        upPoint = Cesium.Cartesian3.add(v, Cesium.Cartesian3.multiplyByScalar(vLeft1, W / 2 - 0.05, vLeft1), upPoint);

                                        var pos = window.LocalToDegree(upPoint.x, upPoint.y, upPoint.z);
                                        coordList.push(pos.x);
                                        coordList.push(pos.y);
                                        coordList.push(pos.z - H / 2);


                                    } { //right
                                        var v = new Cesium.Cartesian3(x1, y1, z1);
                                        var upPoint = new Cesium.Cartesian3(0, 0, 0);
                                        upPoint = Cesium.Cartesian3.add(v, Cesium.Cartesian3.multiplyByScalar(vRight1, W / 2 - 0.05, vRight1), upPoint);

                                        var pos = window.LocalToDegree(upPoint.x, upPoint.y, upPoint.z);
                                        coordList.push(pos.x);
                                        coordList.push(pos.y);
                                        coordList.push(pos.z - H / 2);


                                    } { //right
                                        var v = new Cesium.Cartesian3(x2, y2, z2);
                                        var upPoint = new Cesium.Cartesian3(0, 0, 0);
                                        upPoint = Cesium.Cartesian3.add(v, Cesium.Cartesian3.multiplyByScalar(vRight2, W / 2 - 0.05, vRight2), upPoint);

                                        var pos = window.LocalToDegree(upPoint.x, upPoint.y, upPoint.z);
                                        coordList.push(pos.x);
                                        coordList.push(pos.y);
                                        coordList.push(pos.z - H / 2);


                                    }

                                    { //left
                                        var v = new Cesium.Cartesian3(x2, y2, z2);
                                        var upPoint = new Cesium.Cartesian3(0, 0, 0);
                                        var upPoint = Cesium.Cartesian3.add(v, Cesium.Cartesian3.multiplyByScalar(vLeft2, W / 2 - 0.05, vLeft2), upPoint);
                                        var pos = window.LocalToDegree(upPoint.x, upPoint.y, upPoint.z);
                                        coordList.push(pos.x);
                                        coordList.push(pos.y);
                                        coordList.push(pos.z - H / 2);
                                    }
                                }
                                var a = tt.GetAzimuth(x1, -y1, x2, -y2);
                                var length = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1) + (z2 - z1) * (z2 - z1));
                                var WW = Math.abs(x2 - x1);
                                var HH = Math.abs(y2 - y1);
                                a = a / 180 * 3.1415926535897932384626433832795; //+3.1415926535897932384626433832795/4;//-3.1415926535897932384626433832795/4;
                                tt.addSurfaceWater22(coordList, WW / 20, HH / 20, a);
                            }
                        }
                    }

                }
            });

        }
        //----------水体-----------------
    GetAzimuth(X1, Y1, X2, Y2) {
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
        var resultAngle = Math.abs((tmpValue * 180) / Math.PI)

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
    addSurfaceWater22(waterFace, repeateX = 1, repeateY = 1, angle = 0.0) {
            if (!isNaN(waterFace[0])) {
                var instanceMesh = new Cesium.GeometryInstance({
                    geometry: new Cesium.PolygonGeometry({
                        polygonHierarchy: new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArrayHeights(waterFace)),
                        perPositionHeight: true, //注释掉此属性水面就贴地了
                        stRotation: 25
                    })
                })
                var appcMoudle = new CTMap.waterEffects(viewer);
                var appc = appcMoudle.app(repeateX, repeateY, angle);
                window.cesiumvariate._wwdataSource.push(new Cesium.CustomDataSource(Cesium.createGuid()))
                viewer.dataSources.add(window.cesiumvariate._wwdataSource[window.cesiumvariate._wwdataSource.length - 1])
                var custom_flowMesh = window.cesiumvariate._wwdataSource[window.cesiumvariate._wwdataSource.length - 1]._primitives.add(
                    new Cesium.Primitive({
                        geometryInstances: instanceMesh,
                        appearance: appc,
                        asynchronous: false,
                        show: true, // 默认隐藏
                    })
                )
            }
        }
        // 逃灾路线
    waterRoute() {
            if (this.isshow2) {
                if (window.e_route.waterroute) {
                    viewer.entities.remove(window.e_route.waterroute)
                    window.e_route.waterroute = null
                }
                if (window.e_route.watermodelEntity) {
                    viewer.entities.remove(window.e_route.watermodelEntity)
                    window.e_route.watermodelEntity = null
                }
                if (window.e_route.watermodelEntity2) {
                    viewer.entities.remove(window.e_route.watermodelEntity2)
                    window.e_route.watermodelEntity2 = null
                }
                this.isshow2 = false
                return
            }
            this.isshow2 = true
            var _this = this
            var polyline = this.polyline
            const ptList = []

            var keyPos = new CTMap.SampledPositionProperty()
            keyPos.backwardExtrapolationDuration = 2
            keyPos.backwardExtrapolationType = CTMap.ExtrapolationType.HOLD
            keyPos.forwardExtrapolationType = CTMap.ExtrapolationType.HOLD
            const orientation = new CTMap.VelocityOrientationProperty(keyPos)


            var keyPos2 = new CTMap.SampledPositionProperty()
            keyPos2.backwardExtrapolationDuration = 2
            keyPos2.backwardExtrapolationType = CTMap.ExtrapolationType.HOLD
            keyPos2.forwardExtrapolationType = CTMap.ExtrapolationType.HOLD
            const orientation2 = new CTMap.VelocityOrientationProperty(keyPos)

            for (var j = 0; j < polyline.length; j++) {
                var position = Cesium.Cartesian3.fromDegrees(polyline[j].longitude, polyline[j].latitude, polyline[j].height)
                const ctime = CTMap.JulianDate.addSeconds(_this.start, 1 + j * 3, new CTMap.JulianDate())
                keyPos.addSample(ctime, position)
                ptList.push(position)


                var cartesian1 = position
                var cartesian2 = position
                var coffset = 0
                if (j + 1 == polyline.length) {
                    cartesian1 = Cesium.Cartesian3.fromDegrees(polyline[j - 1].longitude, polyline[j - 1].latitude, polyline[j - 1].height)
                    let lineDistance = Cesium.Cartesian3.distance(cartesian1, cartesian2)
                    coffset = (lineDistance + 2) / lineDistance
                } else {
                    cartesian2 = Cesium.Cartesian3.fromDegrees(polyline[j + 1].longitude, polyline[j + 1].latitude, polyline[j + 1].height)
                    let lineDistance = Cesium.Cartesian3.distance(cartesian1, cartesian2)
                    coffset = 2 / lineDistance
                }

                var c = Cesium.Cartesian3.lerp(cartesian1, cartesian2, coffset, new Cesium.Cartesian3())
                keyPos2.addSample(ctime, c)
            }
            let offset = 0
            window.e_route.waterroute = viewer.entities.add({
                availability: new Cesium.TimeIntervalCollection([
                    new Cesium.TimeInterval({
                        start: _this.start,
                        stop: _this.end,
                        isStartIncluded: true,
                        isStopIncluded: false
                    })
                ]),
                position: keyPos,
                // show: false,
                orientation: orientation,
                path: {
                    // positions: ptList,
                    show: true,
                    // positions: points,
                    leadTime: 2 + polyline.length * 3,
                    trailTime: 2 + polyline.length * 3,
                    width: 6.0,
                    material: new CTMap.StripeMaterialProperty({
                        evenColor: CTMap.Color.fromCssColorString('#FF0000').withAlpha(0.8),
                        oddColor: CTMap.Color.fromCssColorString('#9FEE00').withAlpha(0.8),
                        repeat: 40,
                        orientation: CTMap.StripeOrientation.VERTICAL,
                        offset: new CTMap.CallbackProperty((time) => {
                            return (offset += 0.0008)
                        }, false)
                    })
                }
            })
            _this.peopleAnimation(keyPos, orientation, keyPos2, orientation2)
                // _this.Popup()
        }
        // 避险动画
    peopleAnimation(keyPos, orientation, keyPos2, orientation2) {
        window.e_route.watermodelEntity = viewer.entities.add({
            position: keyPos,
            // show: false,
            orientation: orientation,
            model: {
                uri: 'data/矿工2/duizhang01.gltf',
                minimumPixelSize: 64
            }
        })
        window.e_route.watermodelEntity2 = viewer.entities.add({
            position: keyPos2,
            // show: false,
            orientation: orientation2,
            model: {
                uri: 'data/矿工2/duizhang01.gltf',
                minimumPixelSize: 64
            }
        })
        viewer.clock.onTick.addEventListener(this.clockonTick)
        viewer.clock.currentTime = this.start
    }
    clockonTick(clock) {
        var _this = this
        if (window.e_route.watermodelEntity && window.e_route.watermodelEntity.orientation) {
            if (window.e_route.watermodelEntity.position.getValue(clock.currentTime) && clock._currentTime <= clock.stopTime) {
                let center = window.e_route.watermodelEntity.position.getValue(clock.currentTime)
                let orientation = window.e_route.watermodelEntity.orientation.getValue(clock.currentTime)
                let transform = Cesium.Transforms.eastNorthUpToFixedFrame(center)
                if (orientation != null) {
                    transform = Cesium.Matrix4.fromRotationTranslation(Cesium.Matrix3.fromQuaternion(orientation), center)
                        //if (this.viewtype === '3') {
                    viewer.camera.lookAtTransform(transform, new Cesium.Cartesian3(-25, -1, 3))
                    window.e_route.watermodelEntity.show = true;
                    window.e_route.watermodelEntity2.show = true;
                    // } else {
                    //viewer.trackedEntity =window.e_route.watermodelEntity;

                    //  viewer.camera.lookAtTransform(transform, new Cesium.Cartesian3(-40, 0, 2.5))
                    //  window.e_route.watermodelEntity.show = false;
                    //  window.e_route.watermodelEntity2.show = false;
                    //}
                }

            }

            if (clock._currentTime >= clock.stopTime) {
                viewer.clock.onTick.removeEventListener(_this.clockonTick)
                viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
                viewer.camera.setView({
                    destination: Cesium.Cartesian3.fromDegrees(
                        this.polyline[this.polyline.length - 1].longitude,
                        this.polyline[this.polyline.length - 1].latitude,
                        this.polyline[this.polyline.length - 1].height + 10
                    )
                })
            }
        }
    }
}