/**
 * TileLayer瓦片图层
 */
import {
    loadGeojson
} from './loadmapProvider'
/**
 *TileLayer瓦片图层
 */
export default class GeojsonLayer {
    constructor(item, viewer) {
        this.layer = null
        this._opacity = 1
        this.hasOpacity = false
        this.hasZIndex = false
        this.config = item
        this.viewer = viewer
        this.name = item.name
        this.tp = null;
        this.handler = null;
        if (this.config.alpha) {
            this._opacity = this.config.alpha
        }
        // eslint-disable-next-line no-prototype-builtins
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

    // 获取图层
    getLayer() {
        return this.layer
    }

    // 添加
    add() {
        if (this.layer !== null) {
            this.remove()
        }
        if (this.config.styleOptions) {
            this.config.style = this.config.styleOptions
        }
        // eslint-disable-next-line new-cap
        var tiles3d = new loadGeojson(this.viewer, this.config)
        if (tiles3d === null) return
        this.layer = tiles3d
        this.layer.config = this.config
        if (this._opacity !== 1) {
            this.setOpacity(this._opacity)
        }
        //this.tp = new CTMap.tooltip(this.viewer)
        //this.searchPoint()
    }

    // 移除
    remove() {
        if (this.layer == null) return;
        if (this.handler) {
            this.handler.removeInputAction(window.Cesium.ScreenSpaceEventType.LEFT_CLICK)
            if (this.handler && !this.handler.isDestroyed()) this.handler = this.handler && this.handler.destroy()
            this.handler = null
        }
        //this.tp.closeAll();
        this.layer._primitives.destroy();
        this.layer = null;
    }

    // 设置显示
    setVisible(val) {
        if (this._visible != null && this._visible !== val) {
            this._visible = val
            this._visible ? this.add() : this.remove()
        }
    }
    searchPoint() {
        var this_ = this
        this_.tp.closeAll();
        console.log('fdf');
        this_.handler = new window.Cesium.ScreenSpaceEventHandler(this_.viewer.scene.canvas)

        this_.handler.setInputAction(function(movement) {
            var fea = this_.viewer.scene.pick(movement.position)
            var cartesian = this_.getCurrentMousePosition(this_.viewer.scene, movement.position)

            this_.tp.closeAll()
            if (fea instanceof window.Cesium.Cesium3DTileFeature) {
                return;
            } else {
                var cont = ''

                cont += '<div><span>设备数量：5</span><br>'
                cont += '<div><span>人员数量：5人</span>'
                fea.primitive.color = window.Cesium.Color.RED // AQUA;

                if (cont !== '') {
                    // 添加弹窗
                    this_.tp.add({
                        geometry: cartesian,
                        content: {
                            header: '',
                            isclose: false,
                            content: cont
                        }
                    })
                }
            }
        }, window.Cesium.ScreenSpaceEventType.LEFT_CLICK)
    }

    getCurrentMousePosition(scene, position) {
        var cartesian
            // 在模型上提取坐标
        var pickobject = scene.pick(position) // 取模型
        if (scene.pickPositionSupported && Cesium.defined(pickobject)) {
            //! scene.pickPositionSupported : 不支持深度拾取,无法进行鼠标交互绘制
            cartesian = scene.pickPosition(position)
            if (cartesian) {
                var pgeo = scene.globe.ellipsoid.cartesianToCartographic(cartesian)
                    //if (pgeo.height > 0) 
                return cartesian
            }
        }

        // 提取鼠标点的地理坐标
        var pickRay = scene.camera.getPickRay(position)
        cartesian = scene.globe.pick(pickRay, scene)
        return cartesian
    }


    // 定位
    centerAt(duration) {
        if (this.layer !== null) {
            if (this.config.center) {
                window.centerAt2(this.config.center)
            } else {
                if (duration && duration !== '') {
                    this.viewer.flyTo(this.layer, {
                        duration: duration
                    })
                } else {
                    this.viewer.zoomTo(this.layer)
                }
            }
        }
    }

    setOpacity(value) {
        this._opacity = value
        if (this.layer == null) return
        this.layer.style = new window.Cesium.Cesium3DTileStyle({
            color: 'color() *vec4(1,1,1,' + value + ')'
        })
    }

    // 设置叠加顺序
    setZIndex(order) {
        if (this.layer == null || order == null) {}
    }
}