<template>
    <div class="searchquery">
      <div class="show-dmdz-panel">
        <div id="searchbox-container">
            <div id="sole-searchbox-content" class="searchbox-content">
                <input id="sole-input" class="searchInput" type="text" placeholder="搜索">
                <p id="seachMap" class="searchImg" title="搜索"  @click="searchbutton($event)"><i class="icon iconfont icon-tubiao-"></i></p>             
            </div>
        </div>
        
        <div class="result-panel">
            <div class="closedig" style="display:none"> <i class="icon iconfont icon-guanbi"></i></div>
                <ul id="card-1" style="display:none">
                    <a class="card-content">
                        <ul id="poi-li" class="card animated-card"></ul>
                        <div id="showpage-poi" style="width:100%;height:50px;text-align: center;"></div>
                    </a>
                </ul>
            <li id="card-fold"></li>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { equipmentmodel } from '@/api/permission'
import { Cesium3DTilesetGraphics } from 'cesium'
export default {
  name: 'searchquery',
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  created(){
      var t = this;
      document.onkeydown=function(e){
          var key = window.event.keyCode;
          if(key == 13){
            t.searchbutton();
          }
      }
  },
  data() {
    return {
      data: [],
      querytype: 0,
      markerArr: [],
      statis: { equipmentCount: 60, equipmentStatus: { type1: 20, type2: 40 }, pop: 110 }
    }
  },
  mounted() {

  },
  watch: {
    getNowMenuName(newV, oldV) {
      if (newV === 'searchquery') {
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
      var t = this
    },
    clearbutton() {
        $('.show-dmdz-panel #sole-input').val('')
        $('.show-dmdz-panel .result-panel .suggestion-ul').html('').hide()
        $('#card-1').hide()
        $('.closedig').hide();
    },
    searchbutton() {
        var val = $('#sole-input').val()
        val ? this.showSearchOnMap('search', val, '', '') : layer.msg('请输入您要查询的关键字')
    },
    // 隐藏
    hide() {
     this.markerArr = []
     if (window.cesiumvariate.dataSources) {
       window.cesiumvariate.dataSources._primitives.removeAll()
       window.cesiumvariate.dataSources = null
     }
    },
    /**
     * @param {*} type 表示搜索的类型：直接搜索、搜索历史
     * @param {*} name 表示name名字
     * @param {*} desc 表示描述
     * @param {*} layerName 表示的图层的名称【thematic】
     * @param {*} isExact 表示的是否要精准查询
     */
    showSearchOnMap(type, name, desc, layerName, isExact) {
        var t = this
       Cesium.Resource.fetchJson('data/人员定位系统.json').then(function (jsonData) {
        t.data = jsonData.Map
        t.setPanelShow()
        const length = t.data.length
        $(this).attr('data-fold', '共搜索' + length + '条记录')
        // this.poiPopup.remove();
        if (length > 10) {
            $('#showpage-poi').show()
            layui.laypage.render({
                elem: 'showpage-poi',
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
                            t.formatGeojson(t.data, (obj.curr - 1) * 10, length)
                        } else {
                            t.formatGeojson(t.data, (obj.curr - 1) * 10, obj.curr * 10)
                        }
                    }
                }
            })
        } else {
            // 不渲染分页
            $('#showpage-poi').hide()
        }
        t.formatGeojson(t.data, 0, 10)
        $('.closedig').on('click',function(){
            $('#card-1').hide();
            $('.closedig').hide();
        })
      })
    },
    setPanelShow () {
        $(this).is(':visible') ? null : $(this).show()
        $('.show-dmdz-panel .input-clear').is(':visible') ? null : $('.show-dmdz-panel .input-clear').show()
    },
    formatGeojson(resFeature, start, end) {
        var t = this
        t.markerArr = []
        $('#card-1').show()
        $('.closedig').show();
        // 清除map 移动的监听
        let html = ''
        const features = this.getFeature(resFeature, start, end).markerData
        features.map((item, index) => {
            //const property = item.property
            let itemName = item.Name
            const name = itemName.substring(itemName.lastIndexOf('.') - 4, itemName.lastIndexOf('.'))
            const val = parseInt(30 * Math.random())

            const i = start + index + 1
            const pos = item.Position
            html += `<li data-index="${pos}">
                        <div class="col-l"><a href="javascript:void(0)" class="searchtitle">${i}</a></div>
                        <div class="ml_30 mr_10"><div class="row n-blue"><span>${name}</span></div>
                        <div class="row"><span>实时值：${val}</span></div></div>
                    </li>`
        })
        html = html || "<a style='color:#999;width:100%;text-align:center;height:30px'>无信息<a>"
        $('#poi-li').html(html);
        
        $('.result-panel').on('click', '#poi-li li', function() {
            const pos = $(this).attr('data-index')
            let posArr = pos.split(',')
            let pitch, roll, heading
            window.viewer.camera.setView({
                destination: window.fromLocal(posArr[0], posArr[1], posArr[2] - 800),
                orientation: {
                    pitch: window.Cesium.Math.toRadians(pitch || -90),
                    roll: window.Cesium.Math.toRadians(roll || 0),
                    heading: window.Cesium.Math.toRadians(heading || 0)
                }
            })
        })
      $('#poi-li').mCustomScrollbar({
            theme: 'dark-3', // 主题颜色
            scrollButtons: {
                enable: true // 是否使用上下滚动按钮
            },
            advanced: {
                updateOnContentResize: true, // 自动根据动态变换的内容调整滚动条的大小
                updateOnBrowserResize: true // 根据百分比为自适应布局 调整浏览器上滚动条的大小
            },
            autoHideScrollbar: true, // 是否自动隐藏滚动条
            scrollInertia: 100, // 滚动延迟
            horizontalScroll: false // 水平滚动条
        })
    },
    getFeature(resFeature, start, end) {
        const markerData = []
            const circleData = []
        for (let index = 0; index < resFeature.length; index++) {
            if (index >= start && index < end) {
                markerData.push(resFeature[index])
            } else {
                circleData.push(resFeature[index])
            }
        }
        const obj = {
            markerData,
            circleData
        }
        return obj
    }
  }
}

</script>

<style  lang="scss">
.spacequery {
  width: 100%;
  height: 100%;
  color: #fff;
  .spacequeryTool {
    padding: 10px 0;
    .spacequeryItem {
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
      background-color: rgba(192, 215, 233, 0.2);
    }
  }
  .el-button--primary.is-plain {
    background-color: rgba(192, 215, 233, 0.2);
  }
  .iconfont {
    font-size: 16px;
  }
}
.statisdialog {
  position: absolute;
  top: 130px;
  left: calc(50% - 90px);
  width: 180px;
  background: #03263aab;
  border: 3px solid #0f8fca;
  border-radius: 10px;
  color: #fff;
  padding: 10px;
  .tit {
    float: left;
    width: 90px;
    text-align: right;
    padding: 0 10px 0 5px;
  }
}
.show-dmdz-panel {
    position: absolute;
    left: 0%;
    top: 70px;
    width: 360px;
    /* overflow: hidden; */
    z-index: 100;
}

.show-dmdz-panel #searchbox-container {
    position: relative;
    width: 100%;
    z-index: 2;
    pointer-events: auto;
    float: left;
    box-sizing: border-box;
    box-shadow: 1px 2px 1px rgba(0, 0, 0, .15);
}

.show-dmdz-panel .searchbox-content {
    border-radius: 2px 0 0 2px;
    background-color: #334ead;
}

.searchbox-content .searchbox-content-common {
    box-sizing: border-box;
    float: left;
    width: 315px;
    height: 40px;
}

#sole-searchbox-content #sole-input {
    box-sizing: border-box;
    border: 0;
    padding: 9px 0;
    border-left: 10px solid transparent;
    border-right: 27px solid transparent;
    line-height: 20px;
    font-size: 16px;
    height: 40px;
    color: #ffffff;
    background-color: #334ead;
    position: relative;
    border-radius: 2px 0 0 2px;
}

#sole-searchbox-content #sole-input::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: #999999;
    font-size: 15px;
    letter-spacing: 2px;
}

#sole-searchbox-content #sole-input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #999999;
    font-size: 15px;
    letter-spacing: 2px;
}

#sole-searchbox-content #sole-input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #999999;
    font-size: 15px;
    letter-spacing: 2px;
}

#sole-searchbox-content #sole-input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #999999;
    font-size: 15px;
    letter-spacing: 2px;
}

#sole-searchbox-content .input-clear {
    right: 62px;
}

.searchbox-content .input-clear {
    cursor: pointer;
    position: absolute;
    width: 27px;
    height: 40px;
    top: 0;
    background: url(./img/searchbox.png) no-repeat 0 -114px #fff;
}

.show-dmdz-panel #search-button:hover {
    background-color: #2e77e5;
}

.show-dmdz-panel #search-button {  
    cursor: pointer;
    border-radius: 0 2px 2px 0;
    box-shadow: 1px 2px 1px rgba(0, 0, 0, .15);
    float: right;
    margin: 1.2px 5px 1.5px 0;
    padding: 0;
    background: url(./img/searchbox.png) no-repeat 0 -76px #0177fb;
    font-size: 8px;
    cursor: pointer;
}

.show-dmdz-panel .result-panel {
    /* background-color: #fff; */
    /* box-shadow: 1px 2px 1px rgba(0, 0, 0, .15); */
    border-radius: 0 0 2px 2px;
    position: relative;
    /* background-color: #fff; */
    float: left;
    width: 360px;
    background-color:#334ead;
    z-index: 919;
    z-index: 3px;
}

.show-dmdz-panel .result-panel .suggestion-ul {
    width: 100%;
    box-shadow: 1px 2px 1px rgba(0, 0, 0, .15);
    background-color: #fff;
    border-top: 1px solid #E4E6E7;
    z-index: 10000;
    position: relative;
    overflow: auto;
}

.show-dmdz-panel .result-panel .suggestion-ul>.no_result {
    text-align: center;
    letter-spacing: 5px;
    color: #999;
}

.show-dmdz-panel .result-panel .suggestion-ul>li {
    display: block;
    height: 35px;
    line-height: 35px;
    padding-right: 40px;
    text-decoration: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
}

.show-dmdz-panel .result-panel .suggestion-ul>li>i {
    font-style: normal;
    color: #666;
    /* position: relative; */
    z-index: 1;
    padding-top: 1px;
    font-size: 15px;
    letter-spacing: 1px;
    padding-left: 30px;
}

.show-dmdz-panel .result-panel .suggestion-ul>li>em {
    margin-left: 10px;
    margin-right: 20px;
    font-style: normal;
    color: #999;
    font-size: 13px;
}

.show-dmdz-panel .result-panel .suggestion-ul>li>.history-i::before {
    content: "\e623";
    padding-right: 7px;
    font-size: 17px;
    color: #999;
    padding-left: 4px;
    position: absolute;
    left: 2px;
}

.show-dmdz-panel .result-panel .suggestion-ul>li>.suggestion-i::before {
    content: "\e618";
    padding-right: 4px;
    font-size: 24px;
    color: #999;
    position: absolute;
    left: 2px;
}

.show-dmdz-panel .result-panel .suggestion-ul>li>.search-i::before {
    content: "\e682";
    padding-right: 4px;
    font-size: 22px;
    color: #999;
    position: absolute;
    left: 4px;
    /* top: -6px; */
    margin-top: 2px;
}

.show-dmdz-panel .result-panel .cut {
    border-bottom: 1px solid #EBEBEB;
}

.show-dmdz-panel .result-panel .suggestion-ul>li>.del-histroy {
    padding-right: 7px;
    font-size: 13px;
    color: #c2c2c2;
    position: absolute;
    right: 9px;
    opacity: 0;
    z-index: 1;
}

.show-dmdz-panel .result-panel .suggestion-ul>li:hover {
    background-color: #EBEBEB;
}

.show-dmdz-panel .result-panel .suggestion-ul>li:last-child {
    margin-bottom: 10px;
}

.show-dmdz-panel .result-panel .suggestion-ul>li:hover>.del-histroy {
    opacity: 0.6;
}

.show-dmdz-panel .result-panel .suggestion-ul>li>.del-histroy:hover {
    opacity: 1;
}

.show-dmdz-panel #card-1 {
    pointer-events: auto;
    background: #fff;
    box-shadow: 1px 2px 1px rgba(0, 0, 0, .15);
    overflow: auto;
    overflow-x: hidden;
    position: absolute;
    border-radius: 2px;
    width: 100%;
    top: 10px;
    /* -webkit-transition: height .5s;
            transition: height .5s; */
}

.show-dmdz-panel #card-fold {
    width: 100%;
    height: 40px;
    padding: 0px 8px;
    line-height: 40px;
    box-sizing: border-box;
    visibility: hidden;
    opacity: 0;
    -webkit-transition: opacity .1s .1s;
    transition: opacity .1s .1s;
    cursor: pointer;
    color: #3385ff;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    letter-spacing: 1px;
    background: #fff;
    box-shadow: 1px 2px 1px rgba(0, 0, 0, .15);
    position: absolute;
    top: 10px;
}

.show-dmdz-panel .card-content {
    display: inline-block;
    display: block;
    /* width: 100%; */
    padding: 10px 0px;
    background: #142f78;
}

.show-dmdz-panel .card-active::before {
    opacity: 1;
}

.show-dmdz-panel .card .col-l {
    float: left;
}

.show-dmdz-panel .card .no-1 {
    background-image: url(./img/marker/markers_new.png);
    width: 18px;
    height: 25px;
    display: inline-block;
    margin-left: 6px;
    margin-top: 4px;
    background-position: 0 -139px;
}

.show-dmdz-panel .card .no-2 {
    background-image: url(./img/marker/markers_new.png);
    width: 18px;
    height: 25px;
    display: inline-block;
    margin-left: 6px;
    margin-top: 4px;
    background-position: -18px -139px;
}

.show-dmdz-panel .card .no-3 {
    background-image: url(./img/marker/markers_new.png);
    width: 18px;
    height: 25px;
    display: inline-block;
    margin-left: 6px;
    margin-top: 4px;
    background-position: -36px -139px;
}

.show-dmdz-panel .card .no-4 {
    background-image: url(./img/marker/markers_new.png);
    width: 18px;
    height: 25px;
    display: inline-block;
    margin-left: 6px;
    margin-top: 4px;
    background-position: -54px -139px;
}

.show-dmdz-panel .card .no-5 {
    background-image: url(./img/marker/markers_new.png);
    width: 18px;
    height: 25px;
    display: inline-block;
    margin-left: 6px;
    margin-top: 4px;
    background-position: -72px -139px;
}

.show-dmdz-panel .card .no-6 {
    background-image: url(./img/marker/markers_new.png);
    width: 18px;
    height: 25px;
    display: inline-block;
    margin-left: 6px;
    margin-top: 4px;
    background-position: -90px -139px;
}

.show-dmdz-panel .card .no-7 {
    background-image: url(./img/marker/markers_new.png);
    width: 18px;
    height: 25px;
    display: inline-block;
    margin-left: 6px;
    margin-top: 4px;
    background-position: -108px -139px;
}

.show-dmdz-panel .card .no-8 {
    background-image: url(./img/marker/markers_new.png);
    width: 18px;
    height: 25px;
    display: inline-block;
    margin-left: 6px;
    margin-top: 4px;
    background-position: -126px -139px;
}

.show-dmdz-panel .card .no-9 {
    background-image: url(./img/marker/markers_new.png);
    width: 18px;
    height: 25px;
    display: inline-block;
    margin-left: 6px;
    margin-top: 4px;
    background-position: -144px -139px;
}

.show-dmdz-panel .card .no-10 {
    background-image: url(./img/marker/markers_new.png);
    width: 18px;
    height: 25px;
    display: inline-block;
    margin-left: 6px;
    margin-top: 4px;
    background-position: -162px -139px;
}

.show-dmdz-panel .card .col-r {
    float: right;
    width: 75px;
    margin-right: 10px;
    margin-top: 10px;
    text-align: right;
}

.show-dmdz-panel .card .mr_90 {
    margin-right: 90px;
}

.show-dmdz-panel .card .ml_30 {
    margin-left: 30px!important;
}

.show-dmdz-panel .card .row {
    padding: 4px 0;
    line-height: 1.2;
    font-size: 12px;
    color: #fff;
}

.show-dmdz-panel .card .addr {
    overflow: hidden;
}

.show-dmdz-panel .card .n-blue {
    color: #3385ff!important;
    font-size: 14px;
}

.show-dmdz-panel .card li {
    margin: 0px 0px 1px 0px;
    cursor: pointer;
}

.show-dmdz-panel .card li:hover {
    background-color: #f6f6f6;
}

.show-dmdz-panel .card .active {
    background-color: #f6f6f6;
}

.show-dmdz-panel .card li:last-child {
    padding-bottom: 10px;
}

.show-dmdz-panel .card .mr_10 {
    margin-right: 10px;
}

.show-dmdz-panel .card li:hover .no-1 {
    background-position: 0 -166px;
}

.show-dmdz-panel .card li:hover .no-2 {
    background-position: -18px -166px;
}

.show-dmdz-panel .card li:hover .no-3 {
    background-position: -36px -166px;
}

.show-dmdz-panel .card li:hover .no-4 {
    background-position: -54px -166px;
}

.show-dmdz-panel .card li:hover .no-5 {
    background-position: -72px -166px;
}

.show-dmdz-panel .card li:hover .no-6 {
    background-position: -90px -166px;
}

.show-dmdz-panel .card li:hover .no-7 {
    background-position: -108px -166px;
}

.show-dmdz-panel .card li:hover .no-8 {
    background-position: -126 -166px;
}

.show-dmdz-panel .card li:hover .no-9 {
    background-position: -144px -166px;
}

.show-dmdz-panel .card li:hover .no-10 {
    background-position: -162px -166px;
}

.show-dmdz-panel .card .active .no-1 {
    background-position: 0 -166px;
}

.show-dmdz-panel .card .active .no-2 {
    background-position: -18px -166px;
}

.show-dmdz-panel .card .active .no-3 {
    background-position: -36px -166px;
}

.show-dmdz-panel .card .active .no-4 {
    background-position: -54px -166px;
}

.show-dmdz-panel .card .active .no-5 {
    background-position: -72px -166px;
}

.show-dmdz-panel .card .active .no-6 {
    background-position: -90px -166px;
}

.show-dmdz-panel .card .active .no-7 {
    background-position: -108px -166px;
}

.show-dmdz-panel .card .active .no-8 {
    background-position: -126 -166px;
}

.show-dmdz-panel .card .active .no-9 {
    background-position: -144px -166px;
}

.show-dmdz-panel .card .active .no-10 {
    background-position: -162px -166px;
}
.searchImg {
    float: right;
    /* margin: 0px 0px -10px 0; */
    /* padding: 0; */
    margin: 5px;
    font-size: 8px;
    cursor: pointer
}
.searchInput {
    height: 30px;
    width: 300px;
    line-height: 25px;
    margin-left: 5px;
    list-style: none;
    font-size: 13px;
    background-color: #334ead;
    border: 0;
    color: #ffffff;
}
input::-webkit-input-placeholder { 
/* WebKit browsers */ 
color: #ffffff; 
} 
input:-moz-placeholder { 
/* Mozilla Firefox 4 to 18 */ 
color: #ffffff; 
} 
input::-moz-placeholder { 
/* Mozilla Firefox 19+ */ 
color: #ffffff; 
} 
input:-ms-input-placeholder { 
/* Internet Explorer 10+ */ 
color: #ffffff; 
}
input:-webkit-autofill {
    box-shadow: 0 0 0 1000px #142f78 inset;
    -webkit-text-fill-color: #fff;
}
.closedig{
    position: absolute;
    right: 5px;
    z-index: 10;
    top: 10px;
    cursor: pointer;
}
.searchtitle{
    color:#3385ff;
    font-size:16px;
    font-weight: bold;
}
#poi-li li{
    padding-left:15px;
}

</style>
