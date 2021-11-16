// 信息框
var tooltip = {
  viewer: null,
  className: '',
  id: 0,
  ctnList: {},
  add(conf) {
    var _this = this
    var geometry = conf.geometry // 弹窗挂载的位置
    var id = 'popup_' + (((1 + Math.random()) * 0x10000) | 0).toString(16) + _this.id++
    var ctn = document.createElement('div')
    ctn.className = 'bx-popup-ctn' + (this.className ? ' ' + this.className : '')
    ctn.id = id
    document.getElementById(_this.viewer.container.id).appendChild(ctn)
    // 测试弹窗内容
    var testConfig = conf.content
    ctn.innerHTML = _this.createHtml(testConfig.header, testConfig.content, testConfig.isclose)
    _this.ctnList[id] = [geometry, ctn]
    _this.render()
    if (!_this.eventListener) {
      _this.eventListener = function (clock) {
        _this.render()
      }
      _this.viewer.clock.onTick.addEventListener(_this.eventListener)
    }

    if (conf.isclose === false) { } else {
      if (ctn.getElementsByClassName('bx-popup-close') && ctn.getElementsByClassName('bx-popup-close').length > 0) {
        ctn.getElementsByClassName('bx-popup-close')[0].onclick = function () {
          _this.close(ctn)
        }
      }
    }
  },
  render() {
    var _this = this
    for (var c in _this.ctnList) {
      var position = window.Cesium.SceneTransforms.wgs84ToWindowCoordinates(_this.viewer.scene, _this.ctnList[c][0])
      if (position && position.x && position.y) {
        if (Math.abs(position.x) > (window.innerWidth * 2) || Math.abs(position.y) > (window.innerHeight * 2)) {
          _this.ctnList[c][1].style.display = 'none'
        } else {
          _this.ctnList[c][1].style.display = ''
          _this.ctnList[c][1].style.left = position.x + 'px'
          _this.ctnList[c][1].style.top = position.y + 'px'
        }
      }
    }
  },
  createHtml(header, content, isclose) {
    if (this.html) {
      return this.html(header, content)
    } else {
      var html = `
      ${(isclose === false ? '' : '<div class="bx-popup-close"><i class="iconfont icon-guanbi"></i></div>')}
            <div class="divpoint-wrap">
            <div class="divpoint-border">
            <div class="divpoint-center">
            <div class="bx-popup-header-ctn">
            ${header}
            </div>
            <div class="bx-popup-content-ctn" >
            <div class="bx-popup-content" >
            ${content}
            </div>
            </div>
            </div>
            </div>
            </div>
            <div class="directional"></div>
            `
      return html
    }
  },
  close(e) {
    e.remove()
    delete this.ctnList[e.id]
    if (Object.keys(this.ctnList).length === 0) {
      this.viewer.clock.onTick.removeEventListener(this.eventListener)
      this.eventListener = null
    }
  },
  closeAll(e) {
    for (var o in this.ctnList) {
      this.ctnList[o][1].remove()
    }
    this.ctnList = {}
    if (this.eventListener) { this.viewer.clock.onTick.removeEventListener(this.eventListener) }
    this.eventListener = null
  }
}

export default tooltip
