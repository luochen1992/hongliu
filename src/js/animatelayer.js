/**
 * TileLayer瓦片图层
 */
import flowLine from './flowLine'
/**
 *TileLayer瓦片图层
 */
export default class AnimateLayer {
    constructor(item, viewer) {
        this.layer = null
        this.config = item
        this.viewer = viewer
        this.name = item.name

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
        this.layer = new flowLine(this.viewer, {})
        this.layer.config = this.config
    }

    // 移除
    remove() {
        if (this.layer == null) return
        this.layer.remove()
        this.layer = null
    }

    // 设置显示
    setVisible(val) {
        if (this._visible != null && this._visible !== val) {
            this._visible = val
            if (!this.layer) {
                this.add()
            }
            this._visible ? this.layer.show() : this.layer.hide()
        }
    }

    // 定位
    centerAt() {
        if (this.layer !== null) {
            if (this.config.center) {
                window.centerAt2(this.config.center)
            }
        }
    }
}
