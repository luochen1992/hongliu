<template>
    <div class = "viewPositioning">
        <ul class="el-menu-snap"
            @mouseover="changeLength(true)"
            @mouseleave="changeLength(false)"
            :style="sliderStyle">
        <li @click="flyToPosition((navIndex = 1))">
            <img src="../../../../public/img/snap/公司大门.png" />
            <div><span>公司大门</span></div>
        </li>
        <li @click="flyToPosition((navIndex = 2))"
            v-show="snapShow">
            <img src="../../../../public/img/snap/调度中心.png" />
            <div><span>调度中心</span></div>
        </li>
        <li @click="flyToPosition((navIndex = 3))"
            v-show="snapShow">
            <img src="../../../../public/img/snap/办公大楼.png" />
            <div><span>办公大楼</span></div>
        </li>
        <li @click="flyToPosition((navIndex = 4))"
            v-show="snapShow">
            <img src="../../../../public/img/snap/主斜井.png" />
            <div><span>主斜井</span></div>
        </li>
        <li @click="flyToPosition((navIndex = 5))"
            v-show="snapShow">
            <img src="../../../../public/img/snap/副斜井.png" />
            <div><span>副斜井</span></div>
        </li>
        <li @click="flyToPosition((navIndex = 6))"
            v-show="snapShow">
            <img src="../../../../public/img/snap/洗选厂调度楼.png" />
            <div><span>洗选厂调度楼</span></div>
        </li>
        <li @click="flyToPosition((navIndex = 7))"
            v-show="snapShow">
            <img src="../../../../public/img/snap/上寺头风井.png" />
            <div><span>上寺头风井</span></div>
        </li>
        <li @click="flyToPosition((navIndex = 8))"
            v-show="snapShow">
            <img src="../../../../public/img/snap/塔里风井.png" />
            <div><span>塔里风井</span></div>
        </li>
        <li @click="flyToPosition((navIndex = 9))"
            v-show="snapShow">
            <img src="../../../../public/img/snap/中央变电所.png" />
            <div><span>中央变电所</span></div>
        </li>
        <li @click="flyToPosition((navIndex = 10))"
            v-show="snapShow">
            <img src="../../../../public/img/snap/中央水泵房.png" />
            <div><span>中央水泵房</span></div>
        </li>
        <li @click="flyToPosition((navIndex = 11))"
            v-show="snapShow">
            <img src="../../../../public/img/snap/综采工作面.png" />
            <div><span>3308综采面</span></div>
        </li>
        <li @click="flyToPosition((navIndex = 12))"
            v-show="snapShow">
            <img src="../../../../public/img/snap/掘进工作面.png" />
            <div><span>智能掘进工作面</span></div>
        </li>
        </ul>
    </div>
</template>

<script>

export default {
    name: 'viewPositioning',
    data: function(){
        return {
            snapShow: false,
            sliderStyle: {
            width: '120px'
      },
        }
    },
    methods: {
        // 定位
        flyToPosition(navIndex) {
        var bookmarkLis = [
            {
            name: '公司大门',
            id: 1,
            heading: 282.04,
            pitch: -14.41,
            roll: 359.82,
            x: 112.7348315,
            y: 35.6718464,
            z: 50.01
            },
            {
            name: '调度中心',
            id: 2,
            heading: 315.18,
            pitch: -6.43,
            roll: 359.94,
            x: 112.72990433,
            y: 35.67387058,
            z: 100.21
            },
            {
            name: '办公大楼',
            id: 3,
            heading: 307.9429292,
            pitch: -15.13,
            roll: 359.81,
            x: 112.729831547,
            y: 35.67453042,
            z: 96.60
            },
            {
            name: '主斜井',
            id: 4,
            heading: 255.90731112,
            pitch: -13.3839512,
            roll: 359.82,
            x: 112.728129420,
            y: 35.67433265,
            z: 105.9361866
            },
            {
            name: '副斜井',
            id: 5,
            heading: 310.3281277267,
            pitch: -22.40789036,
            roll: 359.81,
            x: 112.72857658,
            y: 35.67403266,
            z: 95.55
            },
            {
            name: '洗选厂调度楼',
            id: 6,
            heading: 323.28,
            pitch: -11.99,
            roll: 359.86,
            x: 112.7288481786,
            y: 35.67292530,
            z: 102.61
            },
            {
            name: '上寺头风井',
            id: 7,
            heading: 314,
            pitch: -32,
            roll: 359.92,
            x: 112.7028887,
            y: 35.6737627,
            z: 126.69
            },
            {
            name: '塔里风井',
            id: 8,
            heading: 356,
            pitch: -37,
            roll: 360.0,
            x: 112.6704490,
            y: 35.683607280,
            z: 252.305
            },
            {
            name: '中央变电所',
            id: 9,
            heading: 3.72,
            pitch: -53.41,
            roll: 360.0,
            x: 112.700209176,
            y: 35.676534207,
            z: -110.67
            },
            {
            name: '中央水泵房',
            id: 10,
            heading: 3.72,
            pitch: -53.41,
            roll: 360.0,
            x: 112.700209176,
            y: 35.676534207,
            z: -110.67
            },
            {
            name: '综采工作面',
            id: 11,
            heading: 285.84,
            pitch: -69.46,
            roll: 359.5,
            x: 112.67783,
            y: 35.67147,
            z: 2771.61
            },
            {
            name: '掘进工作面',
            id: 12,
            heading: 321.75,
            pitch: -46.40,
            roll: 360.0,
            x: 112.69514837,
            y: 35.662785380,
            z: 1260.22
            }
        ]
        var ifName = false
        let tarObj
        for (var i = 0; i <= bookmarkLis.length; i++) {
            if (bookmarkLis[i].id === navIndex) {
            ifName = true
            tarObj = bookmarkLis[i]
            break
            }
        }
        if (ifName) {
            window.viewer.camera.flyTo({
                destination: window.Cesium.Cartesian3.fromDegrees(tarObj.x, tarObj.y, tarObj.z), // 经度、纬度、高度
                orientation: {
                heading: window.Cesium.Math.toRadians(tarObj.heading), // 绕垂直于地心的轴旋转
                pitch: window.Cesium.Math.toRadians(tarObj.pitch), // 绕纬度线旋转
                roll: 0 // 绕经度线旋转
                },
                duration: 1 // 飞行到目的地花费时间3秒
            })
        }
        },
        //向左滑出
        changeLength(snapShow) {
        this.snapShow = snapShow
        //改变ul长度
        if (snapShow) {
            this.sliderStyle.width = 1380 + 'px'
        } else {
            this.sliderStyle.width = 120 + 'px'
        }
        },
    }
}
</script>
<style lang="scss" scoped>
/* ********快照管理**************** */
.el-menu-snap {
  position: absolute;
  right: 1px;
  top: 263px;
  width: 120px;
  height: 100px;
  list-style: none;
  color: #fff;
  overflow: hidden;
}
/* 一级菜单的样式 */
.el-menu-snap li {
  box-sizing: border-box;
  border: solid 1px #009bff;
  background-color: #071738;
  float: right;
  height: 100%;
  width: 110px;
  font-size: 14px;
  margin-left: 5px;
  padding-top: 10px;

  color: #909399;
  img {
    width: 100%;
    height: 60px;
  }
  div {
    height: 30px;
    text-align: center;
    color: #fff;
    font-weight: bold;
    margin-top: -10px;
  }
}
.el-menu-snap li:hover {
  cursor: pointer;
}
</style>

    