/* eslint-disable no-redeclare */
/**
 *
 *坐标体系转换
 */

/**
 * 本地坐标西安80坐标系至球面坐标WGS84
 * @param {Number} x 本地坐标x值
 * @param {Number} y 本地坐标y值
 * @param {Number} y 本地坐标y值
 * @return  {Cartesian3} Cartesian3对象
 */

function fromLocal(x, y, z) {
    var lon = 112.6910153
    var lat = 35.6808275
    var alt = 0
    x -= 381500
    y -= 3950920
    var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(lon, lat, alt))
        // x=y=z=0;
    const mat4 = Cesium.Matrix4.fromArray([
        1, 0, 0, 0.0,
        0, 1, 0, 0.0,
        0, 0, 1, 0.0,
        x, y, z, 1.0
    ])
    Cesium.Matrix4.multiply(modelMatrix, mat4, modelMatrix)
    var p = new Cesium.Cartesian3(0.0, 0.0, 0.0)
    var pos2 = Cesium.Matrix4.multiplyByPoint(modelMatrix, p, new Cesium.Cartesian3())
    return pos2
}
/**
 * 本地坐标西安80坐标系至经纬度
 * @param {Number} x 本地坐标x值
 * @param {Number} y 本地坐标y值
 * @param {Number} y 本地坐标y值
 * @return  {Cartesian3} Cartesian3对象里面存的经纬度
 */
function LocalToDegree(x, y, z) {
    var lon = 112.6910153
    var lat = 35.6808275
    var alt = 0
    x -= 381500
    y -= 3950920
    var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(lon, lat, alt))
        // x=y=z=0;
    const mat4 = Cesium.Matrix4.fromArray([
        1, 0, 0, 0.0,
        0, 1, 0, 0.0,
        0, 0, 1, 0.0,
        x, y, z, 1.0
    ])
    Cesium.Matrix4.multiply(modelMatrix, mat4, modelMatrix)
    var p = new Cesium.Cartesian3(0.0, 0.0, 0.0)
    var pos2 = Cesium.Matrix4.multiplyByPoint(modelMatrix, p, new Cesium.Cartesian3())

    var ellipsoid = viewer.scene.globe.ellipsoid
    var cartesian3 = new Cesium.Cartesian3(pos2.x, pos2.y, pos2.z)
    var cartographic = ellipsoid.cartesianToCartographic(cartesian3)
    var lat2 = Cesium.Math.toDegrees(cartographic.latitude)
    var lng2 = Cesium.Math.toDegrees(cartographic.longitude)
    var alt2 = cartographic.height
    var pos3 = new Cesium.Cartesian3(lng2, lat2, alt2)
    return pos3
}

/* 本地坐标2000坐标系至球面坐标WGS84
 * @param {Number} x 本地坐标x值
 * @param {Number} y 本地坐标y值
 * @param {Number} y 本地坐标y值
 * @return {Array} posArr WGS84坐标
 */

function convert2000ToWGS84(x, y, z) {
    let tarobj = {
        x: 0,
        y: 0,
        z: 0
    }
    let projection4525 =
        '+proj=tmerc +lat_0=0 +lon_0=111 +k=1 +x_0=37500000 +y_0=0 +ellps=GRS80 +units=m +no_defs'
    let projection4326 = '+proj=longlat +datum=WGS84 +no_defs'
    let posArr = [x, y, z];
    let transformPoint = proj4(projection4525, projection4326, posArr)
    tarobj.x = transformPoint[0];
    tarobj.y = transformPoint[1];
    tarobj.z = transformPoint[2];
    return tarobj;
}
/* 球面坐标WGS84至本地坐标2000坐标系
 * @param {Number} lon 经度
 * @param {Number} lat 纬度
 * @param {Number} height 高程值
 * @return {Array} posArr WGS84坐标
 */

function convertWGS84To2000(lon, lat, height) {
    let tarobj = {
        x: 0,
        y: 0,
        z: 0
    }
    let projection4525 =
        '+proj=tmerc +lat_0=0 +lon_0=111 +k=1 +x_0=37500000 +y_0=0 +ellps=GRS80 +units=m +no_defs'
    let projection4326 = '+proj=longlat +datum=WGS84 +no_defs'
    let posArr = [lon, lat, height]
    let transformPoint = proj4(projection4326, projection4525, posArr)
    tarobj.x = transformPoint[0];
    tarobj.y = transformPoint[1];
    tarobj.z = transformPoint[2];
    return tarobj;
}
/**
 * WGS84坐标系转笛卡尔坐标系
 * @param point
 * @return {{x: *, y: *, z: *}}
 * @constructor
 */
var WGS84_to_Cartesian3 = function (point) {
    var car33 = Cesium.Cartesian3.fromDegrees(point.lng, point.lat, point.alt);
    // var x = car33.x;
    // var y = car33.y;
    // var z = car33.z;
    // return {x: x, y: y, z: z};
    return car33
}

export {
    fromLocal,
    LocalToDegree,
    convert2000ToWGS84,
    convertWGS84To2000,
    WGS84_to_Cartesian3
}