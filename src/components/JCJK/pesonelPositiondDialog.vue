<template>
  <div v-drag class="pesonelPositiondDialog">
    <div v-show="ishander" class="hander"></div>
    <div class="center">
      <el-table :data="tableData" border size="mini" class="dialogtable" style="width: 100%">
        <el-table-column type="index" label="序号" width="50" align="center"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="170" align="center"> </el-table-column>
        <el-table-column prop="number" label="卡号" align="center"> </el-table-column>
        <el-table-column prop="area" label="区域" align="center"> </el-table-column>
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
  name: 'pesonelPositiondDialog',
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
    // 自定义指令
    // drag(el, bindings) {
    //   el.onmousedown = function (e) {
    //     var disx = e.pageX - el.offsetLeft;
    //     var disy = e.pageY - el.offsetTop;
    //     document.onmousemove = function (e) {
    //       el.style.left = e.pageX - disx + "px";
    //       el.style.top = e.pageY - disx + "px";
    //     };
    //     document.onmouseup = function () {
    //       document.onmousemove = document.onmouseup = null;
    //     };
    //   };
    // },
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
      default: []
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
    // 定位
    location(index, item) {
      //debugger;
      var ellipsoid = viewer.scene.globe.ellipsoid
      var cartographic = ellipsoid.cartesianToCartographic(item.possion)

      var lat = Cesium.Math.toDegrees(cartographic.latitude)

      var lng = Cesium.Math.toDegrees(cartographic.longitude)

      var alt = cartographic.height + 700

      window.viewer.camera.flyTo({
        destination: window.Cesium.Cartesian3.fromDegrees(lng, lat, alt), // 经度、纬度、高度
        orientation: {
          heading: window.Cesium.Math.toRadians(285.03), // 绕垂直于地心的轴旋转
          pitch: window.Cesium.Math.toRadians(-95.74), // 绕纬度线旋转
          roll: 0 // 绕经度线旋转
        },
        duration: 1 // 飞行到目的地花费时间3秒
      })
      // uia.earth.camera.flyTo(item.possion, 5, [(360.0 * Math.PI) / 180, (-30 * Math.PI) / 180, 0])
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
.pesonelPositiondDialog {
  position: absolute;
  top: 60px;
  left: 50px;
  width: 600px;
  max-height: 500px;
  min-height: 50px;
  background-color: transparent;
  z-index: 10;
  border: 2px solid #3f82a09e;
  box-shadow: 4px 2px 2px #184f7b91;
  .hander {
    width: 100%;
    height: 36px;
    background-color: #0d68a7bb;
    border-radius: 5px 5px 0 0;
  }
  .center {
    width: 100%;
    max-height: 500px;
    background-color: #08224488;
    color: #fff;

    .dialogtable {
      background: transparent;
      color: #fff;
      max-height: calc(100% - 50px);
      thead {
        color: #ffffff;
      }
      tr {
        background-color: transparent;
        th {
          background-color: transparent;
        }
        .el-button--success {
          background-color: #2b727b;
        }
      }
      .el-table__header {
        background-color: #00325c99;
      }
    }
    .tablepage {
      width: 90%;
      margin: 10px 3%;
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
.pesonelPositiondDialog .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #0f4970;
}
.pesonelPositiondDialog .el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
  background-color: #0f4970;
}
</style>
