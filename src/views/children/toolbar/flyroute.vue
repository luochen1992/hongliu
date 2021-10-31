<template>
  <div class="flyroute">
    <div class="flyrouteTool">
      <ul id="card-12"  style="max-height:700px;">
          <a class="card-content2">
              <ul id="poi-li2" class="card animated-card"></ul>
              <div id="showpage-poi2" style="width:100%;height:50px;text-align: center;"></div>
          </a>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { getflyline } from '@/api/permission'
export default {
  name: 'flyroute',
  computed: {
    ...mapGetters(['getToolBar'])
  },
  data() {
    return {
      dialogindex: null,
      currentItem: null,
      currentGroup: null,
      itemindex: 0,
      flyroutedata: []
    }
  },
  mounted() {},
  watch: {
    getToolBar(newV, oldV) {
      if (newV === 'flyroute') {
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
          title: '飞行漫游',
          shade: 0,
          skin: 'cv_dialog',
          area: ['250px', '700px'],
          offset: ['200px', 'calc(100% - 340px)'],
          zIndex: 2001,
          content: $('.flyroute'),
          success: function (layero, index) {
            _this.succCallback()
          },
          cancel: function (index, layero) {
            _this.setToolBar(null)
             if (window.cesiumvariate.bookMarkMgr) {
                window.cesiumvariate.bookMarkMgr.stopPlay()
                window.cesiumvariate.bookMarkMgr.removeAll()
                window.cesiumvariate.bookMarkMgr = null
              }
            window.layui.layer.close(_this.dialogindex)
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
      this.getflyrouteline()
    },
    // 添加绘制事件
    addFlyroute(e) {

    },
    // 获取飞行漫游路线
    getflyrouteline() {
      var _this = this
      var html = ''

      getflyline().then((res) => {
           _this.flyroutedata = res
           if (this.flyroutedata) {
              this.flyroutedata.map((item, index) => {
                const i = index + 1
                    html += `<li data-index="res-${i}" class="res-${i}">
                                <div class="col-l"><a href="javascript:void(0)" class="no-${i}"></a></div>
                                <div class="ml_30 mr_10"><div class="row n-blue"><span>${item.name}</span></div>
                            </li>`
              })
            }
            html = html || "<a style='color:#e3dede;width:100%;text-align:center;height:30px'>无信息<a>"
            $('#poi-li2').html(html)
            if (this.flyroutedata != undefined) {
              const length = this.flyroutedata.length
              // this.poiPopup.remove();
              if (length > 10) {
                  const t = this
                  $('#showpage-poi2').show()
                  layui.laypage.render({
                      elem: 'showpage-poi2',
                      count: length, // 数据总数，从服务端得到
                      limit: 10,
                      groups: 3,
                      // curr: 1,
                      theme: '#1e9fff',
                      first: false,
                      last: false,
                      jump: function(obj, first) {
                          if (!first) {
                              if (obj.curr * 10 > length) {
                                  // t.formatGeojson(features, (obj.curr - 1) * 10, length);
                              } else {
                                // t.formatGeojson(features, (obj.curr - 1) * 10, obj.curr * 10);
                              }
                          }
                      }
                  })
              } else {
                  // 不渲染分页
                  $('#showpage-poi2').hide()
              }
            }
            $('ul#poi-li2').on('click', 'li', function() { // 只需要找到你点击的是哪个ul里面的就行
              if (window.cesiumvariate.bookMarkMgr) {
                window.cesiumvariate.bookMarkMgr.stopPlay()
                window.cesiumvariate.bookMarkMgr.removeAll()
              } else {
                window.cesiumvariate.bookMarkMgr = window.viewer.project.bookmarkManager
                window.cesiumvariate.bookMarkMgr.relayTime = 0
                this.currentGroup = window.cesiumvariate.bookMarkMgr.addGroup('默认书签组')
                // res-1;
                const index = $(this).attr('data-index').split('-')
                var routedata = _this.flyroutedata[index[1] - 1]

              // 添加书签addPoint
                window.cesiumvariate.bookMarkMgr._itemList = _this.flyroutedata

                // 飞行playGroup
                window.cesiumvariate.bookMarkMgr.playGroup(routedata.id)
              }
            })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    addPoint() {
        this.currentItem = window.cesiumvariate.bookMarkMgr.addItem(this.currentGroup.id, `书签${this.itemindex}`)
        this.itemindex++
        const dom = document.getElementById('routinfo')
        dom.innerHTML = `已添加${this.itemindex}个位置`
    },
    playGroup() {
        window.cesiumvariate.bookMarkMgr.playGroup(this.currentGroup.id)
    },
    stopPlay() {
        window.cesiumvariate.bookMarkMgr.stopPlay()
    }

  }
}
</script>

<style  lang="scss">
.flyroute {
  width: 98%;
  height: 100%;
  color: #fff;
  .flyrouteTool {
    padding: 10px 0;
    .flyrouteItem {
      background: none;
      color: #fff;
      border: 1px solid #e4eaec;
      float: left;
      cursor: pointer;
      padding: 5px;
      margin: 5px 10px;
      font-size: 14px;
      width: 70px;
      text-align: center;
      border-radius: 3px;
      background-color: rgba(32, 160, 255, 0.2);
    }
    #routinfo{
      text-align: center;
    }
  }
}
  .card-content2 {
    display: inline-block;
    display: block;
    /* width: 100%; */
    padding: 10px;
}

  .card-active::before {
    opacity: 1;
}

  .card .col-l {
    float: left;
}

  .card .no-1 {
    background-image: url( ../../../assets/images/markers_new.png);
    width: 18px;
    height: 27px;
    display: inline-block;
    margin-left: 6px;
    margin-top: 4px;
    background-position: 0 -139px;
}

  .card .no-2 {
    background-image: url( ../../../assets/images/markers_new.png);
    width: 18px;
    height: 27px;
    display: inline-block;
    margin-left: 6px;
    margin-top: 4px;
    background-position: -18px -139px;
}

  .card .no-3 {
    background-image: url( ../../../assets/images/markers_new.png);
    width: 18px;
    height: 27px;
    display: inline-block;
    margin-left: 6px;
    margin-top: 4px;
    background-position: -36px -139px;
}

  .card .no-4 {
    background-image: url( ../../../assets/images/markers_new.png);
    width: 18px;
    height: 27px;
    display: inline-block;
    margin-left: 6px;
    margin-top: 4px;
    background-position: -54px -139px;
}

  .card .no-5 {
    background-image: url( ../../../assets/images/markers_new.png);
    width: 18px;
    height: 27px;
    display: inline-block;
    margin-left: 6px;
    margin-top: 4px;
    background-position: -72px -139px;
}

  .card .no-6 {
    background-image: url( ../../../assets/images/markers_new.png);
    width: 18px;
    height: 27px;
    display: inline-block;
    margin-left: 6px;
    margin-top: 4px;
    background-position: -90px -139px;
}

  .card .no-7 {
    background-image: url( ../../../assets/images/markers_new.png);
    width: 18px;
    height: 27px;
    display: inline-block;
    margin-left: 6px;
    margin-top: 4px;
    background-position: -108px -139px;
}

  .card .no-8 {
    background-image: url( ../../../assets/images/markers_new.png);
    width: 18px;
    height: 27px;
    display: inline-block;
    margin-left: 6px;
    margin-top: 4px;
    background-position: -126px -139px;
}

  .card .no-9 {
    background-image: url( ../../../assets/images/markers_new.png);
    width: 18px;
    height: 27px;
    display: inline-block;
    margin-left: 6px;
    margin-top: 4px;
    background-position: -144px -139px;
}

  .card .no-10 {
    background-image: url( ../../../assets/images/markers_new.png);
    width: 18px;
    height: 27px;
    display: inline-block;
    margin-left: 6px;
    margin-top: 4px;
    background-position: -162px -139px;
}

  .card .col-r {
    float: right;
    width: 75px;
    margin-right: 10px;
    margin-top: 10px;
    text-align: right;
}

  .card .mr_90 {
    margin-right: 90px;
}

  .card .ml_30 {
    margin-left: 30px!important;
}

  .card .row {
    padding: 5px 0;
    line-height: 1.2;
    font-size: 12px;
    color: #666;
}

  .card .addr {
    overflow: hidden;
}

  .card .n-blue {
    color: #3385ff!important;
    font-size: 14px;
}

  .card li {
    margin: 0px 0px 15px 0px;
    cursor: pointer;
}

  .card li:hover {
    background-color: #6e84a5;
    color:#fff;
}

  .card .active {
    background-color: #6e84a5;
}

  .card .mr_10 {
    margin-right: 10px;
}

  .card li:hover .no-1 {
    background-position: 0 -166px;
}

  .card li:hover .no-2 {
    background-position: -18px -166px;
}

  .card li:hover .no-3 {
    background-position: -36px -166px;
}

  .card li:hover .no-4 {
    background-position: -54px -166px;
}

  .card li:hover .no-5 {
    background-position: -72px -166px;
}

  .card li:hover .no-6 {
    background-position: -90px -166px;
}

  .card li:hover .no-7 {
    background-position: -108px -166px;
}

  .card li:hover .no-8 {
    background-position: -126 -166px;
}

  .card li:hover .no-9 {
    background-position: -144px -166px;
}

  .card li:hover .no-10 {
    background-position: -162px -166px;
}

  .card .active .no-1 {
    background-position: 0 -166px;
}

  .card .active .no-2 {
    background-position: -18px -166px;
}

  .card .active .no-3 {
    background-position: -36px -166px;
}

  .card .active .no-4 {
    background-position: -54px -166px;
}

  .card .active .no-5 {
    background-position: -72px -166px;
}

  .card .active .no-6 {
    background-position: -90px -166px;
}

  .card .active .no-7 {
    background-position: -108px -166px;
}

  .card .active .no-8 {
    background-position: -126 -166px;
}

  .card .active .no-9 {
    background-position: -144px -166px;
}

  .card .active .no-10 {
    background-position: -162px -166px;
}

</style>
