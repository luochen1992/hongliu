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
 * @return  {Cartesian3} Cartesian3对象
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
export {
    fromLocal,
    LocalToDegree
}