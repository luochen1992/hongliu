import {
    createImageryProvider
} from './loadmapProvider'
/**
 *TileLayer瓦片图层
 */
export default class TileLayer {
    constructor(item, viewer) {
        this.layer = null
        this._opacity = 1
        this.hasOpacity = false
        this.hasZIndex = false
        this.config = item
        this.viewer = viewer
        this.name = item.name
        if (this.config.alpha) {
            this._opacity = this.config.alpha
        }
        //是否透明
        if (this.config.hasOwnProperty('hasOpacity')) {
            this.hasOpacity = this.config.hasOpacity
        }

        this._visible = false
        if (this.config.visible) {
            this.setVisible(true)
        }

        if (this.config.visible && this.config.flyTo) {
            this.centerAt(this.config.flyToDuration || 0)
        }
    }

    // 添加
    add() {
        if (this.layer != null) {
            this.remove()
        }
        var imageryProvider = createImageryProvider(this.config)
        if (imageryProvider == null) return

        var options = this.config

        var imageryOpt = {
            show: true,
            alpha: this._opacity
        }
        if (options.rectangle && options.rectangle.xmin && options.rectangle.xmax && options.rectangle.ymin && options.rectangle.ymax) {
            var xmin = options.rectangle.xmin
            var xmax = options.rectangle.xmax
            var ymin = options.rectangle.ymin
            var ymax = options.rectangle.ymax
            imageryOpt.rectangle = window.Cesium.Rectangle.fromDegrees(xmin, ymin, xmax, ymax)
            this.rectangle = imageryOpt.rectangle
        }
        if (options.brightness) imageryOpt.brightness = options.brightness
        if (options.contrast) imageryOpt.contrast = options.contrast
        if (options.hue) imageryOpt.hue = options.hue
        if (options.saturation) imageryOpt.saturation = options.saturation
        if (options.gamma) imageryOpt.gamma = options.gamma
        if (options.maximumAnisotropy) imageryOpt.maximumAnisotropy = options.maximumAnisotropy
        if (options.minimumTerrainLevel) imageryOpt.minimumTerrainLevel = options.minimumTerrainLevel
        if (options.maximumTerrainLevel) imageryOpt.maximumTerrainLevel = options.maximumTerrainLevel
        this.layer = new window.Cesium.ImageryLayer(imageryProvider, imageryOpt)
        this.layer.config = this.config
        this.viewer.imageryLayers.add(this.layer)
        this.setZIndex(this.config.order)
        this.config.calback && this.config.calback(this.layer)
    }

    // 获取图层
    getLayer() {
        return this.layer
    }

    setVisible(val) {
        if (this._visible != null && this._visible !== val) {
            this._visible = val
            this._visible ? this.add() : this.remove()
        }
    }

    // 移除
    remove() {
        if (this.layer == null) return

        this.viewer.imageryLayers.remove(this.layer, true)
        this.layer = null
    }

    // 定位
    centerAt(duration) {
        if (this.layer !== null) {
            if (this.config.center) {
                this.viewer.camera.flyTo({
                    destination: window.Cesium.Cartesian3.fromDegrees(this.config.center.x, this.config.center.y, this.config.center.z), // 经度、纬度、高度
                    orientation: {
                        heading: window.Cesium.Math.toRadians(this.config.center.heading || 0), // 绕垂直于地心的轴旋转
                        pitch: window.Cesium.Math.toRadians(this.config.center.pitch || -90), // 绕纬度线旋转
                        roll: window.Cesium.Math.toRadians(this.config.center.roll || 0) // 绕经度线旋转
                    },
                    duration: duration
                })
            } else if (window.Cesium.defined(this.rectangle)) {
                this.viewer.camera.flyTo({
                    destination: this.rectangle,
                    duration: duration
                })
            } else {
                var rectangle = this.layer.imageryProvider.rectangle
                if (window.Cesium.defined(rectangle) && rectangle !== window.Cesium.Rectangle.MAX_VALUE && rectangle.west > 0 && rectangle.south > 0 && rectangle.east > 0 && rectangle.north > 0) {
                    this.viewer.camera.flyTo({
                        destination: rectangle,
                        duration: duration
                    })
                }
            }
        }
    }

    // 设置透明度
    setOpacity(value) {
        this._opacity = value
        if (this.layer == null) return

        this.layer.alpha = value
    }

    setZIndex(order) {
        if (this.layer == null || order == null) return
            // 先移动到最顶层
        this.viewer.imageryLayers.raiseToTop(this.layer)

        var layers = this.viewer.imageryLayers._layers
        for (var i = layers.length - 1; i >= 0; i--) {
            if (layers[i] === this.layer) continue
            var _temp = layers[i].config
            if (_temp && _temp.order) {
                if (order < _temp.order) {
                    this.viewer.imageryLayers.lower(this.layer)
                }
            }
        }
    }
}