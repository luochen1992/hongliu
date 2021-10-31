<template>
  <div class="precisequery">
    <div class="bodyContent" v-show="isshow">
      <span class="title">带班领导人员</span>
      <div class="layui-form-item" style="width:100%;margin-bottom:5px;margin: 0 auto;height:70px; ">
        <label class="layui-form-label lableName" style="float:left;">人员查询</label>
        <div class="layui-input-block" style="margin-left: 0px;float:left;width: 220px;">
            <input id="name" type="text" placeholder="请输入卡号，姓名关键字" style=" border: solid 1px #D2D2D2; " class="layui-input  input-manager">
        </div>
        <div class="layui-form-item" style="width:100%;margin-bottom:5px;margin: 0 auto;">
          <div class="layui-input-block mCustomScrollbar _mCS_1 mCS_no_scrollbar" style="margin-left: 0px;float:left;width: 220px;height:30px;" id="groups"><div id="mCSB_1" class="mCustomScrollBox mCS-dark-3 mCSB_vertical mCSB_inside" style="max-height: 36px;" tabindex="0"><div id="mCSB_1_container" class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y" style="position:relative; top:0; left:0;" dir="ltr"><select id="groupChk" style="width: 220px;;height:30px;font-size:12px;"><option selected="" style="color:gray">请选择部门</option><option value="1">自规局</option><option value="2">智慧办</option><option value="3">运维部</option><option value="4">游客组</option><option value="6">东营_东营市</option></select></div><div id="mCSB_1_scrollbar_vertical" class="mCSB_scrollTools mCSB_1_scrollbar mCS-dark-3 mCSB_scrollTools_vertical" style="display: none;"><a href="#" class="mCSB_buttonUp" oncontextmenu="return false;"></a><div class="mCSB_draggerContainer"><div id="mCSB_1_dragger_vertical" class="mCSB_dragger" style="position: absolute; min-height: 0px; height: 0px; top: 0px;" oncontextmenu="return false;"><div class="mCSB_dragger_bar" style="line-height: 0px;"></div></div><div class="mCSB_draggerRail"></div></div><a href="#" class="mCSB_buttonDown" oncontextmenu="return false;"></a></div></div></div>
        </div>
      </div>
      <div id="zongshu"></div>
      <div class="pretable"></div>

	  </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'precisequery',
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  data() {
    return {
      isshow: false,
      totalcount:0,
      page:1,
      pages : ""
      
    }
  },
  mounted() {},
  // computed: {
  //   player() {
  //     return this.$refs.videoPlayer.player
  //   }
  // },
  watch: {
    getNowMenuName(newV, oldV) {
      if (newV === 'precisequery') {
        this.show()
      } else {
        this.hide()
      }
    }
  },
  methods: {
    ...mapMutations({
      setNowMenuName: 'setNowMenuName'
    }),
    // 显示
    show() {
      this.isshow = true;
      this.totalcount = Math.floor((document.body.clientHeight - 300) / 52);
      this.getMapList();

    },
    // 隐藏
    hide() {
      this.isshow = false
    },
    getMapList(){
      var t = this;
      var url = "";
       Cesium.Resource.fetchJson('data/prejson.json').then(function (objRes) {          
        if (objRes.status == "ok") {
            var data = objRes.data;
            var count = objRes.total;
            var all_count = '';
            all_count += '<label class="serverIn">&nbsp;&nbsp;共' + count + '条</label>';
            $('#zongshu').html(all_count);
            if (parseInt(count) != 0) {
              var html = '';
              html += '<table class = "mytable">';
              html += '<tr>';
              html += '<td style="text-align: left;" > 姓名 </td>';
              html += '<td style="text-align: left;" > 性别 </td>';
              html += '<td style="text-align: left;" > 卡号 </td>';
              html += '<td style="text-align: left;" > 部门 </td>';
              html += '<td style="text-align: left;" > 职务 </td>';
              html += '<td style="text-align: left;" > 工种 </td>';
              html += '<td style="text-align: left;" > 距离 </td>';
              html += '<td style="text-align: left;" > 下井时间 </td>';
              html += '<td style="text-align: left;" > 操作 </td>';
              html += '</tr > ';
              for (var i = 0; i < data.length; i++) {
                html += '<tr>';
                html +='<td>'+data[i+1]+'</td>';
                html += '<td>定位|下井轨迹</td>';
                html += '</tr>';
              }
              html += '<table>';
              $('.pretable').html(html);
              t.pages = Math.ceil(parseInt(count) / parseInt(totalcount));
              t.pageTo();
            }
        }      
      })
    },
    pageTo() {
      var t = this;
      //调用分页
      laypage({
          cont: 'shijipage',
          pages: t.pages, //每页显示多少条
          curr: t.page, //当前页
          skip: true, //是否开启跳页
          skin: '#3C8DBC', //按钮颜色支持16进制颜色值
          groups: 3, //连续显示分页数
          //触发分页后的回调，函数返回两个参数。 obj是一个object类型。包括了分页的所有配置信息。first一个Boolean类，检测页面是否初始加载。非常有用，可避免无限刷新。
          jump: function(obj, first) {
              if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
                  t.page = obj.curr;
                  t.getMapList();
              }
          }
      })
    }
  }
}
</script>

<style  scoped lang="scss">
@import '../libs/bootstrap-3.3.7-dist/css/bootstrap.min.css';
.precisequery {
  width: 100%;
  height: 100%;
  color: #fff;
  .bodyContent {
    position: absolute;
    top: 90px;
    left: 0px;
    background: #333;
    width: 100%;
    height: 100%;
  }
}

.vjs-custom-skin > .video-js .vjs-big-play-button {
  background-color: rgba(0, 0, 0, 0.45);
  font-size: 3em;
  /* border-radius: 50%; */
  height: 1.5em !important;
  line-height: 1.5em !important;
  margin-top: -1em !important;
}
/*这里用了第三方vue-video-player插件，但这个插件有bug，设置globalSetting:{controls:true}隐藏进度条不生效，故可设置插件样式进行隐藏vjs-progress-contro*/
.vjs-progress-control {
  visibility: hidden; // 隐藏进度条
}
.div_border {
  height: 100%;
  background-color: rgba(2, 255, 255, 0);
  border: 9px solid rgba(2, 255, 255, 0.5);
  border-image: url('img/corner.png') 19 round;
}

.centeredVideo {
  /* 	 object-fit:cover; */
  /* 	 display: none */
  height: 100% !important;
  width: 100% !important;
}
video {
  object-fit: fill;
}
.bt {
  width: 100%;
  height: 15%;
}

.nr {
  width: 100%;
  height: 85%;
}

.btP {
  padding-top: 15px;
  padding-left: 10px;
  color: #21d3dd !important;
  font-size: 1.3vw !important;
  letter-spacing: 0.2vw;
  margin-bottom: 0px !important;
}

.fbt {
  padding-left: 10px;
  padding-top: 10px;
  color: #21d3dd !important;
  letter-spacing: 0.1vw;
}

.m2_knowledge {
  position: absolute;
  width: 3840px;
  height: 2160px;
  z-index: 999;
  border-radius: 5px;
  display: none;
  overflow: hidden;
}

.m2_iframe {
  width: 100%;
  height: 100%;
  border: 0px;
  overflow: hidden;
}

.divcenter {
  height: 100%;
}

.paddingRight {
  padding-left: 0% !important;
  padding-right: 0% !important;
}

.paddingLeft {
  padding-left: 0% !important;
  padding-right: 0% !important;
}

.buspaddingRight {
  padding-left: 0% !important;
  padding-right: 0% !important;
}

.buspaddingLeft {
  padding-left: 0.5% !important;
  padding-right: 1% !important;
}

.divPart3 {
  height: 33.3333333333333%;
  padding: 0 !important;
}

.divMargin {
  height: 0.1%;
}

.nopadding {
  padding-left: 0% !important;
  padding-right: 0% !important;
}

.phis {
  text-align: left;
  color: #fff;
  font-size: 1vw;
  letter-spacing: 0.2vw;
  font-family: '微软雅黑';
  position: absolute;
}
</style>
