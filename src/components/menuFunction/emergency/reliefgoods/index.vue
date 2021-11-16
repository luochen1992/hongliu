<template>
  <div class="reliefgoods">
    <span>{{ item1show }}</span>
    <span>{{ item2show }}</span>
  </div>
</template>

<script>
// 救援物资
export default {
  name: 'reliefgoods',
  data() {
    return {
      item1show: false,
      item2show: false,
      dialogindex: null
    }
  },
  props: {
    reliefgoodsdata: {
      type: Array
    }
  },
  watch: {
    reliefgoodsdata: {
      handler(newval, oldval) {
        if (window.cesiumvariate.reliefgoods === undefined) {
          window.cesiumvariate.reliefgoods = {}
        }
        if (newval.length > 1) {
          var index = newval.indexOf(oldval[0])
          newval.splice(index, 1)
        }
        if (newval.indexOf('物资台账') > -1) {
          if (!this.item1show) {
            this.showitem1()
            this.item1show = true
          }
        } else {
          if (this.item1show) {
            this.clearItem1()
            this.item1show = false
          }
        }
        if (newval.indexOf('物资分布') > -1) {
          if (!this.item2show) {
            this.showitem2()
            this.item2show = true
          }
        } else {
          if (this.item2show) {
            this.clearItem2()
            this.item2show = false
          }
        }
      },
      immediate: true
    }
  },
  mounted() {},
  methods: {
    showitem1() {
      var _this = this
      if (!_this.dialogindex) {
        window.layui.layer.close(_this.dialogindex)
        _this.dialogindex = window.layui.layer.open({
          type: 1,
          title: '物资台账',
          shade: 0,
          skin: 'cv_dialog',
          area: ['auto', 'auto'],
          offset: '180px',
          zIndex: 2001,
          content: `<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
                                <div class="layui-tab-contentwuzi">
                                   
                                <div class="layui-tab-item layui-show" >
                        <table class="layuitablewuzi">
                          <thead>
                            <tr>
                              <th>序号</th>
                              <th>物资名称</th>
                              <th>类型</th>
                              <th>单位</th>
                              <th>数量</th>
                              <th>用途</th>
                              <th>存放地点</th>
                              <th>管理责任人</th>
                              <th>联系方式</th>
                              <th>备注</th>
                            </tr> 
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>水龙头</td>
                              <td>装备工具</td>
                              <td>米</td>
                              <td>200</td>
                              <td></td>
                              <td>应急物资储备库</td>
                              <td>王金友</td>
                              <td>010-84264555</td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>消防水枪</td>
                              <td>装备工具</td>
                              <td>支</td>
                              <td>2</td>
                              <td></td>
                              <td>应急物资储备库</td>
                              <td>王金友</td>
                              <td>010-84264555</td>
                              <td></td>
                            </tr>
                            <tr>
                            <td>3</td>
                            <td>草袋子</td>
                            <td>装备工具</td>
                            <td>把</td>
                            <td>4</td>
                            <td></td>
                            <td>应急物资储备库</td>
                            <td>王金友</td>
                            <td>010-84264555</td>
                            <td></td>
                          </tr>
                          <tr>
                          <td>4</td>
                          <td>铜锹</td>
                          <td>装备工具</td>
                          <td>把</td>
                          <td>1</td>
                          <td></td>
                          <td>通风队库房</td>
                          <td>孙学胜</td>
                          <td>010-84268349</td>
                          <td></td>
                        </tr>
                        <tr>
                        <td>5</td>
                        <td>铜锤</td>
                        <td>装备工具</td>
                        <td>把</td>
                       <td>1</td>
                        <td></td>
                        <td>通风队库房</td>
                        <td>孙学胜</td>
                        <td>010-84268349</td>
                        <td></td>
                      </tr>
                      <tr>
                     <td>6</td>
                      <td>铜镐</td>
                      <td>装备工具</td>
                      <td>把</td>
                      <td>1</td>
                      <td></td>
                      <td>通风队库房</td>
                      <td>孙学胜</td>
                      <td>010-84268349</td>
                      <td></td>
                    </tr>
                    <tr>
                    <td>7</td>
                    <td>撬杠</td>
                    <td>装备工具</td>
                    <td>把</td>
                    <td>5</td>
                    <td></td>
                    <td>应急物资储备库</td>
                    <td>王金友</td>
                    <td>010-84264555</td>
                    <td></td>
                  </tr>
                  <tr>
                              <td>8</td>
                              <td>斧子</td>
                              <td>装备工具</td>
                              <td>把</td>
                              <td>5</td>
                              <td></td>
                              <td>应急物资储备库</td>
                              <td>王金友</td>
                              <td>010-84264555</td>
                              <td></td>
                            </tr>
                            <tr>
                            <td>9</td>
                            <td>鱼水锯</td>
                            <td>装备工具</td>
                            <td>把</td>
                            <td>5</td>
                            <td></td>
                            <td>应急物资储备库</td>
                            <td>王金友</td>
                            <td>010-84264555</td>
                            <td></td>
                          </tr>
                          <tr>
                          <td>10</td>
                          <td>放火桶</td>
                          <td>装备工具</td>
                          <td>只</td>
                          <td>5</td>
                          <td></td>
                          <td>应急物资储备库</td>
                          <td>王金友</td>
                          <td>010-84264555</td>
                          <td></td>
                        </tr>
                        <tr>
                        <td>11</td>
                        <td>管子垫</td>
                        <td>装备工具</td>
                        <td>个</td>
                        <td>100</td>
                        <td></td>
                        <td>应急物资储备库</td>
                        <td>王金友</td>
                        <td>010-84264555</td>
                        <td></td>
                      </tr>
                      <tr>
                      <td>12</td>
                      <td>风筒</td>
                      <td>装备工具</td>
                      <td>节</td>
                      <td>20</td>
                      <td></td>
                      <td>应急物资储备库</td>
                      <td>王金友</td>
                      <td>010-84264555</td>
                      <td></td>
                    </tr>
                    <tr>
                    <td>13</td>
                    <td>污水泵</td>
                    <td>装备工具</td>
                    <td>台</td>
                    <td>1</td>
                    <td></td>
                    <td>设备库</td>
                    <td>徐盛</td>
                    <td>010-84264532</td>
                    <td></td>
                  </tr>
                  <tr>
                  <td>14</td>
                  <td>变管缩头</td>
                  <td>装备工具</td>
                  <td>个</td>
                  <td>8</td>
                  <td></td>
                  <td>应急物资储备库</td>
                  <td>王金友</td>
                  <td>010-84264555</td>
                  <td></td>
                </tr>
                <tr>
                <td>15</td>
                <td>镀锌铁线</td>
                <td>装备工具</td>
                <td>kg</td>
                <td>50</td>
                <td></td>
                <td>应急物资储备库</td>
                <td>王金友</td>
                <td>010-84264555</td>
                <td></td>
              </tr>
              <tr>
              <td>16</td>
              <td>接管工具</td>
              <td>装备工具</td>
              <td>把</td>
              <td>5</td>
              <td></td>
              <td>应急物资储备库</td>
              <td>王金友</td>
              <td>010-84264555</td>
              <td></td>
            </tr>
                          </tbody>
                        </table>
                      </div>
                              </div>
                          </div>`,
          success: function (layero, index) {
          },
          cancel: function (index, layero) {
            window.layui.layer.close(_this.dialogindex)
            _this.dialogindex = null
          }
        })
      }
    },
    clearItem1() {
      window.layui.layer.close(this.dialogindex)
      this.dialogindex = null
    },
    showitem2() {
      this.addMaterialStorage()
    },
    clearItem2() {
      viewer.dataSources.remove(window.cesiumvariate.reliefgoods._dataSource)
      window.cesiumvariate.reliefgoods._dataSource = null
    },
    // 添加井下储备仓库label标签
    addMaterialStorage() {
      var _dataSource = new Cesium.CustomDataSource(Cesium.createGuid())
      window.cesiumvariate.reliefgoods._dataSource = _dataSource
      viewer.dataSources.add(_dataSource)
      window.Cesium.when.all([window.Cesium.Resource.fetchImage('img/labelBg.png')], function (images) {
        var canvas = document.createElement('canvas')
        canvas.width = 138
        canvas.height = 160

        var ctx = canvas.getContext('2d')
        ctx.font = '12px Arial'
        ctx.fillStyle = 'rgb(255,255,255)'
        ctx.drawImage(images[0], 0, 0, 96, 96)
        ctx.fillText('井下消防器材库', 6, 20)
        var pintest = canvas.toDataURL()

        var officePin = _dataSource.entities.add({
          name: '井下消防器材库',
          position: new window.Cesium.Cartesian3.fromDegrees(112.725751, 35.6666295, -41.9433),
          billboard: {
            image: pintest,
            verticalOrigin: window.Cesium.VerticalOrigin.BOTTOM,
            scaleByDistance: new Cesium.NearFarScalar(3000, 1.0, 6000, 0)
          }
        })
        ctx.clearRect(0, 0, 200, 200)
        ctx.drawImage(images[0], 0, 0, 96, 96)
        ctx.fillText('应急物资储备库', 6, 20)
        var pintest = canvas.toDataURL()
        var rujinkouPin = _dataSource.entities.add({
          name: '应急物资储备库',
          position: new window.Cesium.Cartesian3.fromDegrees(112.7229144, 35.6634401, -44.7817),
          billboard: {
            image: pintest,
            verticalOrigin: window.Cesium.VerticalOrigin.BOTTOM,
            scaleByDistance: new Cesium.NearFarScalar(3000, 1.0, 6000, 0)
          }
        })
        ctx.clearRect(0, 0, 200, 200)
        ctx.drawImage(images[0], 0, 0, 96, 96)
        ctx.fillText('设备库', 35, 20)
        var pintest = canvas.toDataURL()
        var dormitoryPin = _dataSource.entities.add({
          name: '设备库',
          position: new window.Cesium.Cartesian3.fromDegrees(112.7238377, 35.6648601, -44.9223),
          billboard: {
            image: pintest,
            verticalOrigin: window.Cesium.VerticalOrigin.BOTTOM,
            scaleByDistance: new Cesium.NearFarScalar(3000, 1.0, 6000, 0)
          }
        })
        ctx.clearRect(0, 0, 200, 200)
        ctx.drawImage(images[0], 0, 0, 96, 96)
        ctx.fillText('保卫科', 35, 20)
        var pintest = canvas.toDataURL()
        var canteenPin = _dataSource.entities.add({
          name: '保卫科',
          position: new window.Cesium.Cartesian3.fromDegrees(112.726476, 35.6667926, -39.9535),
          billboard: {
            image: pintest,
            verticalOrigin: window.Cesium.VerticalOrigin.BOTTOM,
            scaleByDistance: new Cesium.NearFarScalar(3000, 1.0, 6000, 0)
          }
        })
      })
    },
    addCircle() {
      const data = {
        id: '111',
        lon: 112.725751,
        lat: 35.6666295,
        height: -41.9433
      }
      viewer.scene.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(112.725751, 35.6666295, 0)
      })
      this.addCircleWave(data)
    },

    addCircleWave(data) {
      viewer.entities.add({
        id: data.id,
        name: '',
        position: Cesium.Cartesian3.fromDegrees(data.lon, data.lat, data.height),
        ellipse: {
          height: 0,
          semiMinorAxis: 2,
          semiMajorAxis: 2,
          material: new Cesium.CircleWaveMaterialProperty({
            duration: 2e3,
            gradient: 0,
            color: new Cesium.Color(1.0, 0.0, 0.0, 1.0),
            count: 3
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.reliefgoods {
  position: absolute;
  height: 0px;
}
</style>
