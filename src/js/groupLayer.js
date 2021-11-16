import createLayer from './createLayer'
/**
 * GroupLayer  图层组
 * @class {GroupLayer} 图层组
 */
export default class GroupLayer {
  constructor(item, viewer) {
    this.layer = null
    this._opacity = 1
    this.hasOpacity = false
    this.hasZIndex = false
    this.config = item
    this.viewer = viewer
    this.name = item.name
    if (this.config.alpha) { this._opacity = this.config.alpha }
    // eslint-disable-next-line no-prototype-builtins
    if (this.config.hasOwnProperty('hasOpacity')) { this.hasOpacity = this.config.hasOpacity }

    this.create()

    this._visible = false
    if (this.config.visible) { this.setVisible(true) }

    if (this.config.visible && this.config.flyTo) {
      this.centerAt(this.config.flyToDuration || 0)
    }
  }

  create() {
    this._layers = this.config._layers
    if (this._layers && this._layers.length > 0) {
      for (var i = 0; i < this._layers.length; i++) {
        this.hasOpacity = this._layers[i].hasOpacity
        this.hasZIndex = this._layers[i].hasZIndex
      }
    }
  }

  setVisible(val) {
    this._visible = val
    for (var i = 0; i < this._layers.length; i++) {
      this._layers[i].setVisible(val)
    }
  }

  // 添加
  add() {
    this._visible = true
    for (var i = 0; i < this._layers.length; i++) {
      this._layers[i].setVisible(true)
    }
  }

  //
  addLayer(item) {
    var temp = createLayer(item, this.viewer)
    if (temp == null) return
    if (this.viewer && this.viewer.layerList && this.viewer.layerList.length > 0) {
      for (var it = 0; it < this.viewer.layerList.length; it++) {
        if (this.viewer.layerList[it] === temp) {
          this.viewer.layerList.splice(it, 1)
        }
      }
    }
    if (this._layers && this._layers.length >= 0) { this._layers.push(temp) }
  }

  // 移除
  remove() {
    this._visible = false
    for (var i = 0; i < this._layers.length; i++) {
      this._layers[i].setVisible(false)
    }
  }

  // 定位至数据区域
  centerAt(duration) {
    for (var i = 0; i < this._layers.length; i++) {
      this._layers[i].centerAt(duration)
    }
  }

  // 设置透明度
  setOpacity(value) {
    var arr = this._layers
    for (var i = 0; i < arr.length; i++) {
      arr[i].setOpacity(value)
    }
  }
}
