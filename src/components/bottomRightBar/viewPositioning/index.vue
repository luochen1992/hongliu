<template>
    <div class = "viewPositioning">
        <ul class="el-menu-snap"
            @mouseover="changeLength(true)"
            @mouseleave="changeLength(false)"
            :style="sliderStyle">
        <li @click="flyToPosition((navIndex = 1))">
            <img src="../../../../public/img/snap/办公大楼.png" />
            <div><span>办公大楼</span></div>
        </li>
        <li @click="flyToPosition((navIndex = 2))"
            v-show="snapShow">
            <img src="../../../../public/img/snap/联建楼.png" />
            <div><span>联建楼</span></div>
        </li>
         <li @click="flyToPosition((navIndex = 3))">
            <img src="../../../../public/img/snap/餐饮楼.png" />
            <div><span>餐饮楼</span></div>
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
            <img src="../../../../public/img/snap/培训楼.png" />
            <div><span>培训楼</span></div>
        </li>
        <li @click="flyToPosition((navIndex = 7))"
            v-show="snapShow">
            <img src="../../../../public/img/snap/煤仓.png" />
            <div><span>煤仓</span></div>
        </li>
        <li @click="flyToPosition((navIndex = 8))"
            v-show="snapShow">
            <img src="../../../../public/img/snap/一号回风斜井.png" />
            <div><span>一号回风斜井</span></div>
        </li>
        <li @click="flyToPosition((navIndex = 9))"
            v-show="snapShow">
            <img src="../../../../public/img/snap/二号回风立井.png" />
            <div><span>二号回风立井</span></div>
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
            name: '办公大楼',
            id: 1,
            heading: 1.325855818867787,
            pitch: -21.818228994026637,
            roll: 0.004691677799152737,
            x: 110.40700423080524,
            y: 38.93334189501416,
            z: 1319.0677954670311
            },
            {
            name: '联建楼',
            id: 2,
            heading: 274.8345487970042,
            pitch: -12.645470335859912,
            roll: 359.80800634315193,
            x: 110.40640515426355,
            y: 38.934500596034646,
            z: 1297.6038027233426
            },
            {
            name: '餐饮楼',
            id: 3,
            heading: 358.7502099432243,
            pitch: -17.706891153316782,
            roll: 359.9956911912005,
            x: 110.40705889044209,
            y: 38.934386566817174,
            z: 1307.2824099784236
            },
            {
            name: '主斜井',
            id: 4,
            heading: 1.6556597065268994,
            pitch: -7.1973181215773545,
            roll: 0.00547701894801743,
            x: 110.39615019370625,
            y: 38.933276514856686,
            z: 1287.4741518110554
            },
            {
            name: '副斜井',
            id: 5,
            heading: 289.86327699793947,
            pitch: -5.837061080648015,
            roll: 359.82224961226984,
            x: 110.4019580506598,
            y: 38.93397063594572,
            z: 1275.8008008467968
            },
            {
            name: '培训楼',
            id: 6,
            heading: 42.75017486807664,
            pitch: -12.636775994413268,
            roll: 0.1308488829160627,
            x: 110.4067384007148,
            y: 38.934021230855464,
            z: 1336.4508018205568
            },
            {
            name: '煤仓',
            id: 7,
            heading: 288.94313091493336,
            pitch: -9.913383119339056,
            roll: 359.8194580229694,
            x: 110.40472188703193,
            y: 38.93509749080178,
            z: 1330.9930329256226
            },
            {
            name: '一号回风斜井',
            id: 8,
            heading: 315.45269918775125,
            pitch: -38.30487464783891,
            roll: 359.83163289645046,
            x: 110.37023094539913,
            y: 38.93480471558305,
            z: 1330.0008661361578
            },
            {
            name: '二号回风立井',
            id: 9,
            heading: 349.925782401537,
            pitch: -24.979058199827854,
            roll: 359.9636678350265,
            x: 110.28591053931154,
            y: 38.932277192829616,
            z: 1370.2400534737967
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

    