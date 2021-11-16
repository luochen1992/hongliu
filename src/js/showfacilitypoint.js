/**
 * TileLayer瓦片图层
 */
import {
    showfacilitypoint
} from './loadmapProvider'
/**
 *TileLayer瓦片图层
 */
export default class ShowFacilityPoint {
    constructor(item, viewer) {
        this.layer = null
        this.clusterp = null
        this._opacity = 1
        this.hasOpacity = false
        this.hasZIndex = false
        this.config = item
        this.viewer = viewer
        this.name = item.name
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
        var copts = {
            viewer: this.viewer,
            minheight: -1000,
            divideheight: -180,
            maxheight: 2500
        }
        var opt = Object.assign(copts, this.config)
        // eslint-disable-next-line new-cap
        this.clusterp = new showfacilitypoint(opt)
        if (this.clusterp === null) return

        window.facilitypointList[this.config.id] = this.clusterp
        this.layer = this.clusterp.dataSources
        this.layer.config = this.config
        if (this._opacity !== 1) {
            this.setOpacity(this._opacity)
        }
    }

    // 移除
    remove() {
        if (this.layer == null) return
        window.facilitypointList[this.config.id] = null
        this.clusterp.remove()
        this.layer = null
        this.clusterp = null
    }

    // 设置显示
    setVisible(val) {
        this.clusterp
        if (this._visible != null && this._visible !== val) {
            this._visible = val
            this._visible ? this.add() : this.remove()
        }
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
    }

    // 设置叠加顺序
    setZIndex(order) {
        if (this.layer == null || order == null) { }
    }
}