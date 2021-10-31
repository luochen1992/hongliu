<template>
  <div class="legendTool">
    <div style="float:left">
      <div><img src="img/marker/AQJKXT.png"><span>安全监控系统</span></div>
      <div><img src="img/marker/RYDWXT.png"><span>人员定位系统</span></div>
      <div><img src="img/marker/WXTX5G.png"><span>矿用无线通信(5G)系统</span></div>
      <div><img src="img/marker/WXTXXT.png"><span>矿用无线通信系统</span></div>
      <div><img src="img/marker/WLKBXT.png"><span>矿用网络扩播系统</span></div>
      <div><img src="img/marker/DDTTXT.png"><span>数字程控调度通讯</span></div>
      <div><img src="img/marker/KXJJQR.png"><span>矿用巡检机器人系统</span></div>
      <div><img src="img/marker/DCBJKD.png"><span>报警信息矿灯系统</span></div>
      <div><img src="img/marker/DYGLXT.png"><span>锂离子蓄电池电源系统</span></div>
      <div><img src="img/marker/SPJKXT.png"><span>视频监控系统</span></div>
      <div><img src="img/marker/ZNTFXT.png"><span>智能通风系统</span></div>
    </div>
    <div style="float:right">
      <div><img src="img/marker/ZNPSXT.png"><span>智能排水系统</span></div>
      <div><img src="img/marker/PDYSXT.png"><span>皮带运输系统</span></div>
      <div><img src="img/marker/ZCJKXT.png"><span>综采监控系统</span></div>
      <div><img src="img/marker/ZJJKXT.png"><span>综掘监控系统</span></div>
      <div><img src="img/marker/TFSJKX.png"><span>探放水监控系统</span></div>
      <div><img src="img/marker/GDJKXT.png"><span>供电监控系统</span></div>
      <div><img src="img/marker/YFJKXT.png"><span>压风监控系统</span></div>
      <div><img src="img/marker/WLTXXT.png"><span>网络通讯监控系统</span></div>
      <div><img src="img/marker/KYJCXT.png"><span>矿压监测系统</span></div>
      <div><img src="img/marker/QTJKXT.png"><span>其它系统</span></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'legendTool',
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
      if (newV === 'legendTool') {
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
          title: '图例',
          shade: 0,
          skin: 'cv_dialog',
          area: ['360px', '460px'],
          offset: ['360px', 'calc(100% - 410px)'],
          zIndex: 2001,
          content: $('.legendTool'),
          success: function (layero, index) {
            _this.succCallback()
          },
          cancel: function (index, layero) {
            _this.setBRToolBar(null)  
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
      //this.getflyrouteline()
    }
  }
}
</script>

<style  lang="scss">
.legendTool {
    padding: 10px;
    padding-top: 30px;
    width: 94%;
    height: 90%;
    color:#fff;
}
.legendTool img{
  width:32px;
  height: 32px;
}
</style>
