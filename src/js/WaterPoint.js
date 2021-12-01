/**
 * 创建一通三防路线的基本函数
 * Date:2021.11.27
 */

export default class WaterPoint {
    constructor(viewer, start, end) {
        this.viewer = viewer;
        this.start = start;
        this.end = end;
    }

    waterEmeryPoint() {
        window.cesiumvariate._wwdataSource = []
        this.point = { longitude: 110.3207504, latitude: 38.9228622, height: 1577.877 }
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
            // this.setClock()

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
                                // let commFunc = new CTMap.commonFunction();
                                // var a = commFunc.GetAzimuth(x1, -y1, x2, -y2);
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
}