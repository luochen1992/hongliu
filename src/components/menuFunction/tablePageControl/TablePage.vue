<template>
  <div v-drag class="tablePageDialog">
    <div v-show="ishander" class="hander"></div>
    <div class="center">
      <el-table :data="tableData" border size="mini" :row-class-name="tableRowClassName" cell-class-name="table-cell" class="dialogtable" style="width: 100%">
        <el-table-column type="index" label="序号" width="50" align="center"> </el-table-column>
        <el-table-column v-for="(columnitem, cindex) in tablecolumn" :key="cindex" :prop="columnitem.prop" :label="columnitem.label" :width="columnitem.width" :align="columnitem.align">
        </el-table-column>
        <el-table-column label="操作" align="center" width="80">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="location(scope.$index, scope.row)">定位</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="tablepage">
        <el-pagination @current-change="handleCurrentChange" :pager-count="5" :current-page="page.currentpage" :page-size="page.pagesize" layout="prev, pager, next, jumper, total" :total="page.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tablePageDialog',
  directives: {
    drag: {
      // 指令的定义
      bind: function (el) {
        const odiv = el // 获取当前元素
        el.onmousedown = (e) => {
          // 算出鼠标相对元素的位置
          const disX = e.clientX - odiv.offsetLeft
          const disY = e.clientY - odiv.offsetTop
          let left = ''
          let top = ''
          document.onmousemove = (e) => {
            // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            left = e.clientX - disX
            top = e.clientY - disY
            // 绑定元素位置到positionX和positionY上面
            // 移动当前元素
            odiv.style.left = left + 'px'
            odiv.style.top = top + 'px'
          }
          document.onmouseup = (e) => {
            document.onmousemove = null
            document.onmouseup = null
          }
        }
      }
    }
  },
  data() {
    return {
      ishander: false,
      tableDataall: [],
      tableData: [],
      page: {
        total: 0,
        pagesize: 10,
        currentpage: 1
      }
    }
  },
  props: {
    pData: {
      type: Array,
      default: function () {
        return []
      }
    },
    tablecolumn: {
      type: Array,
      default: function () {
        return [
          // { label: '姓名', prop: 'name', width: '170', align: 'center' },
          // { label: '卡号', prop: 'number', width: '', align: 'center' },
          // { label: '区域', prop: 'area', width: '', align: 'center' }
        ]
      }
    }
  },
  watch: {
    pData: {
      handler(newval, oldval) {
        if (newval) {
          this.tableDataall = newval
          this.page = {
            total: newval.length,
            pagesize: 10,
            currentpage: 1
          }
          if (newval.length > 10) {
            this.tableData = newval.slice(0, 10)
          } else {
            this.tableData = newval
          }
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      const body = document.querySelector('body')
      if (body.append) {
        body.append(this.$el)
      } else {
        body.appendChild(this.$el)
      }
    })
  },
  methods: {
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'success-row'
      } else if (rowIndex % 2 === 1) {
        return 'warning-row'
      }
    },
    // 定位
    location(index, item) {
      var _this = this
      if (window.cesiumvariate._preObj) {
        viewer.entities.remove(window.cesiumvariate._preObj)
      }
      let lng = 0 ,lat = 0,alt = 0,flag = 0
      if(item.flag){ flag = item.flag}
      // 用于判断json文件中的坐标是否为WGS经纬度；flag=1为经纬度坐标；flag = 0 为其他坐标系（例如2000坐标系等）
      if(flag){
         lng = item.possion.x
        lat = item.possion.y
        alt = item.possion.z
      }else{
        var ellipsoid = viewer.scene.globe.ellipsoid
         var cartographic = ellipsoid.cartesianToCartographic(item.possion)
         lng = Cesium.Math.toDegrees(cartographic.longitude)
         lat = Cesium.Math.toDegrees(cartographic.latitude)
         alt = cartographic.height
      }
      if(lng==0 || lat==0){return;}  // 如果经纬度为0，证明json文件中无此数据，则返回
      
      let heading = 285.03,pitch = -95.74,roll = 0
      if(item.orientation){
          heading = item.orientation.heading?item.orientation.heading:285.03
          pitch = item.orientation.pitch?item.orientation.pitch:-95.74
          roll = item.orientation.roll?item.orientation.roll:0
      }
       
      
      // 确认飞过去的方式
      let flymode = 0
      if(item.flymode){flymode = item.flymode}
      if(flymode){
           window.centerAt2({
              x: lng,
              y: lat,
              z: alt,
              heading: heading,
              pitch: pitch,
              roll: roll
        })
      }else{
         window.viewer.camera.flyTo({
          destination: window.Cesium.Cartesian3.fromDegrees(lng, lat, alt), // 经度、纬度、高度
          orientation: {
            heading: window.Cesium.Math.toRadians(heading), // 绕垂直于地心的轴旋转
            pitch: window.Cesium.Math.toRadians(pitch), // 绕纬度线旋转
            roll: window.Cesium.Math.toRadians(roll) // 绕经度线旋转
          },
          duration: 1 // 飞行到目的地花费时间3秒
        })
      }
     
    },
    // 翻页
    handleCurrentChange(index) {
      var start = this.page.pagesize * (index - 1)
      this.tableData = this.tableDataall.slice(start, start + 10)
    }
  }
}
</script>
<style lang="scss">
.tablePageDialog {
  position: absolute;
  top: 60px;
  left: 50px;
  width: auto;
  max-height: 500px;
  min-height: 50px;
  font-family: PingFangSC-Medium;
  background-color: transparent;
  z-index: 10;
  border: 3px solid #3f82a09e;
  box-shadow: 4px 2px 2px #184f7b91;
  .hander {
    width: 100%;
    //height: 36px;
    background-color: #0d68a7bb;
    border-radius: 5px 5px 0 0;
  }
  .center {
    width: 100%;
    //max-height: 500px;
    color: #fff;
    border-style: none;
    .dialogtable {
      background-color: rgba(28, 35, 59, 0.5);
      box-shadow: inset 0 -1px 0 0 #000723;
      color: #fff;
      max-height: calc(100% - 50px);
      border-style: none;
      .table-cell {
        border: 1px #000723;
        box-shadow: inset 0 -1px 0 0 #000723;
        color: #fff;
      }
      .warning-row {
        background: rgba(36, 43, 66, 0.8);
      }
      .success-row {
        background: rgba(28, 35, 59, 0.8);
      }

      thead {
        color: #ffffff;
        background: #3c4860;
      }
      tr {
        background-color: transparent;
        th {
          background-color: transparent;
          border-color: #000723;
          border-right-style: none;
        }
        .el-button--success {
          background-color: #104777;
          border: 1px solid #009bff;
          border-radius: 4px;
        }
        .el-button--success:hover {
          background: #104777;
          border: 1px solid #0fcce1;
        }
      }
      .el-table__header {
        background-color: #00325c99;
      }
    }
    .tablepage {
      width: 100%;
      height: 100%;
      //margin: 10px 3%;
      padding: 10px 0px;
      background: #000723;
      .el-pagination {
        li {
          background: transparent;
          color: #fff;
        }
      }
      .el-pagination__jump {
        color: #fff;
      }
      .el-pagination__total {
        color: #fff;
      }
    }
  }
}
.tablePageDialog .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #0f4970;
}
.tablePageDialog .el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
  background-color: #0f4970;
}
</style>
