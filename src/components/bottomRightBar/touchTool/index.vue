<template>
  <div class="touchTool">
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
export default {
  name: 'touchTool',
  computed: {
    ...mapGetters(['getBRToolBar'])
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
    getBRToolBar(newV, oldV) {
      if (newV === 'touchTool') {
        this.show()
      } else {
        this.hide()
      }
    }
  },
  methods: {
    ...mapMutations({
      setBRToolBar: 'setBRToolBar'
    }),
    // 显示
    show() {
      var _this = this
      if (!_this.dialogindex) {
        _this.dialogindex = window.layui.layer.open({
          type: 1,
          title: '通讯录',
          shade: 0,
          skin: 'cv_dialog',
          area: ['250px', '700px'],
          offset: ['200px', 'calc(100% - 340px)'],
          zIndex: 2001,
          content: $('.touchTool'),
          success: function (layero, index) {
            _this.succCallback()
          },
          cancel: function (index, layero) {
            _this.setBRToolBar(null)
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
      var html = 'fdfdf'

      
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
.touchTool {
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
.card li:hover{
  background-color: #6e84a5;
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
