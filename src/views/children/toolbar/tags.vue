<template>
  <div class="tags">
    <!--<div class="tags_add"><input class="tags_add_input" placeholder="输入名称" /><button class="tags_add_btn" @click="tagsaddClick($event)">添加</button></div>-->
    <div class="tags_container">
      <div class="tags_container_body">
        <table class="tags_container_body_table" id="tagstable">
          <thead style="display: none">
            <tr>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="1">没有找到匹配的记录</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'tags',
  computed: {
    ...mapGetters(['getToolBar'])
  },
  data() {
    return {
      dialogindex: null
    }
  },
  mounted() {},
  watch: {
    getToolBar(newV, oldV) {
      if (newV === 'tags') {
        this.show()
      } else {
        this.hide()
      }
    }
  },
  methods: {
    ...mapMutations({
      setToolBar: 'setToolBar'
    }),
    // 显示
    show() {
      var _this = this
      if (!_this.dialogindex) {
        _this.dialogindex = window.layui.layer.open({
          type: 1,
          title: '视角书签',
          shade: 0,
          skin: 'cv_dialog',
         area: ['250px', '700px'],
          offset: ['200px', 'calc(100% - 340px)'],
          zIndex: 2001,
          content: $('.tags'),
          success: function (layero, index) {
            _this.succCallback()
          },
          cancel: function (index, layero) {
            window.layui.layer.close(_this.dialogindex)
            _this.setToolBar(null)
            _this.dialogindex = null
          }
        })
      }
    },
    // 隐藏
    hide() {
      window.layui.layer.close(this.dialogindex)
      this.dialogindex = null
    },
    succCallback() {
      var t = this
      Cesium.Resource.fetchJson('data/bookmark.json').then(function(res) {
        t.bookmarkLis = res
        t._applyColours()
      })
      // this.bookmarkLis = localStorage.getItem('tagsitem') == null ? [] : JSON.parse(localStorage.getItem('tagsitem'))
    },
    // 视角书签添加
    tagsaddClick(e) {
      this.tagsadd(e.target.previousSibling.value)
    },
    // 添加
    tagsadd(name) {
      if (name === '') {
        window.layui.layer.msg('请输入名称')
        return
      }
      var ifName = false
      this.bookmarkLis.forEach((element) => {
        if (element.name === name) {
          ifName = true
        }
      })
      if (ifName) {
        window.layui.layer.msg('该名称已存在，请更改。')
        return
      }
      var cview = {}
      cview.y = Number(window.Cesium.Math.toDegrees(window.viewer.camera.positionCartographic.latitude).toFixed(6))
      cview.x = Number(window.Cesium.Math.toDegrees(window.viewer.camera.positionCartographic.longitude).toFixed(6))
      cview.z = Number(window.viewer.camera.positionCartographic.height.toFixed(1))
      cview.heading = Number(window.Cesium.Math.toDegrees(window.viewer.camera.heading || -90).toFixed(1))
      cview.pitch = Number(window.Cesium.Math.toDegrees(window.viewer.camera.pitch || 0).toFixed(1))
      cview.roll = Number(window.Cesium.Math.toDegrees(window.viewer.camera.roll || 0).toFixed(1))

      var w = window.viewer.scene.canvas.width
      var h = window.viewer.scene.canvas.height
      var image = new Image() // 创建img对象
      window.viewer.scene.canvas.width = 280
      window.viewer.scene.canvas.height = 140
      window.viewer.render() // 重新渲染界面
      image = window.viewer.scene.canvas.toDataURL('image/png')
      window.viewer.scene.canvas.width = w
      window.viewer.scene.canvas.height = h
      window.viewer.render() // 重新渲染界面
      var obj = {}
      obj.name = name
      obj.id = new Date().getTime()
      obj.icon = image
      obj.data = {
        heading: cview.heading,
        pitch: cview.pitch,
        roll: cview.roll,
        x: cview.x,
        y: cview.y,
        z: cview.z
      }
      this.bookmarkLis.push(obj)
      this._applyColours()
      localStorage.setItem('tagsitem', JSON.stringify(this.bookmarkLis))
    },
    //
    _applyColours() {
      var _this = this
      $('.tags_container_body_table')[0].innerHTML = ''

      if (this.bookmarkLis.length > 0) {
        this.bookmarkLis.forEach((element, index) => {
          var tr = document.createElement('tr')
          var td = document.createElement('td')
          td.style.textAlign = 'center'
          tr.appendChild(td)
          td.setAttribute('index', index)
          td.onclick = function () {
            window.viewer.camera.flyTo({
              destination: window.Cesium.Cartesian3.fromDegrees(element.data.x, element.data.y, element.data.z),
              orientation: {
                heading: window.Cesium.Math.toRadians(element.data.heading),
                pitch: window.Cesium.Math.toRadians(element.data.pitch),
                roll: window.Cesium.Math.toRadians(element.data.roll)
              }
            })
          }
          var div = document.createElement('div')
          div.setAttribute('class', 'tags_container_item')
          td.appendChild(div)
          var img = document.createElement('img')
          img.setAttribute('src', element.icon)

          var itemTitle = document.createElement('div')
          itemTitle.setAttribute('class', 'tags_container_item_title')
          itemTitle.innerText = element.name
          var a = document.createElement('a')
          a.setAttribute('class', 'remove')
          // a.innerText = '删除'
          a.onclick = function (event) {
            _this.bookmarkLis.splice(event.target.parentElement.parentElement.parentElement.getAttribute('index'), 1)
            localStorage.setItem('tagsitem', JSON.stringify(_this.bookmarkLis))
            _this._applyColours()
          }
          itemTitle.appendChild(a)
          div.appendChild(itemTitle)
          div.appendChild(img)
          tr.appendChild(td)
          $('.tags_container_body_table')[0].append(tr)
        })
      } else {
        var td = document.createElement('td')
        td.setAttribute('colspan', '1')
        td.innerText = '没有找到匹配的记录'
        tr.appendChild(td)
        $('.tags_container_body_table')[0].append(tr)
      }

      // document.getElementById('tagstable').getElementsByTagName('tbody')[0].appendChild(tr)
    }
  }
}
</script>

<style  lang="scss">
.tags {
  width: 98%;
  height: 100%;
  color: #fff;
  .tags_add {
    padding: 10px;
  }
  .tags_add .tags_add_input {
    width: calc(100% - 90px);
    color: #fff;
    background-color: rgba(63, 72, 84, 0.6);
    height: 32px;
    padding: 0px 12px;
    font-size: 14px;
    line-height: 1.6;
    border-radius: 3px;
    border: 1px solid #e4eaec;
    margin-right: 8px;
    outline: 0;
  }
  .tags_add .tags_add_input:focus {
    border-color: #62a8ea;
    outline-offset: 1px;
  }
  .tags_add .tags_add_btn {
    cursor: pointer;
    background-color: rgba(32, 160, 255, 0.2);
    padding: 4px 12px;
    font-size: 14px;
    line-height: 1.6;
    border-radius: 3px;
    border-color: #20a0ff;
    color: #fff;
    display: inline-block;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    outline: 0;
  }
  .tags_container_body {
    overflow-x: auto;
    overflow-y: auto;
    height: 100%;
  }
  tbody,
  #tagstable,
  tbody > tr,
  tbody > tr > td {
    padding: 8px;
    word-break: break-word;
  }
  #tagstable {
    width: 100%;
    margin-bottom: 0 !important;
    padding: 8px;
    word-break: break-word;
  }
  tbody > tr > td {
    box-sizing: border-box;
    line-height: 1.6;
    vertical-align: top;
    border-left: none;
    border-top: none;
    text-align: center;
    display: inline-block;
    font-size: 14px;
  }
  .tags_container {
    padding-bottom: 0px;
    position: relative;
    clear: both;
    border-radius: 4px;
  }
  .tags_container_item {
    width: 100%;
    text-align: center;
    display: inline-block;
    margin: 3px auto;
    border-bottom: #dedede 1px solid;
    cursor: pointer;
    padding: 0;
  }
  .tags_container_item > img {
    margin: 0;
    width: 140px;
    height: 100%;
  }
  .tags_container_item_title {
    font-size: 12px;
    text-align: center;
  }
  .remove {
    float: right;
    margin: 0 5px;
  }
  .remove:hover {
    color: #c30;
    text-decoration: none;
  }
  .tags_container_body::-webkit-scrollbar-thumb {
    padding-top: 100px;
    -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1), inset -1px -1px 0 rgba(0, 0, 0, 0.07);
    background-color: #797979;
    min-height: 28px;
    border-radius: 4px;
    background-clip: padding-box;
  }

  .tags_container_body::-webkit-scrollbar-thumb,
  .tags_container_body::-webkit-scrollbar-track {
    border: 0;
  }
  .tags_container_body::-webkit-scrollbar-track {
    background: 0 0;
  }
  .tags_container_body::-webkit-scrollbar-button {
    height: 0;
    width: 0;
    display: none;
  }
  .tags_container_body::-webkit-scrollbar {
    height: 10px;
    width: 10px;
    background: 0 0;
    border-radius: 5px;
    background: 0 0;
  }
}
</style>
