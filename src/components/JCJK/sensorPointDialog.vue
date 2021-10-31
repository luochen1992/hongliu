<template>
  <div v-drag class="sensorPointDialog">
    <div v-show="ishander" class="hander"></div>
    <div class="center">
      <el-table
        :data="tableData"
        border
        size="mini"
        class="dialogtable"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="50" align="center">
        </el-table-column>
        <el-table-column label="位置" width="170" align="center">
          <template slot-scope="scope">
            <span style="color: #2196f3">{{ scope.row.location }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="90" align="center">
          <template slot-scope="scope">
            <span v-if="(scope.row.status = '在线')" style="color: #4caf50"
              >在线</span
            >
            <span v-else-if="(scope.row.status = '离线')" style="color: #cddc39"
              >离线</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="area" label="区域" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" width="80">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="location(scope.$index, scope.row)"
              >定位</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="tablepage">
        <el-pagination
          @current-change="handleCurrentChange"
          :pager-count="5"
          :current-page="page.currentpage"
          :page-size="page.pagesize"
          layout="prev, pager, next, jumper, total"
          :total="page.total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "sensorPointDialog",
  directives: {
    drag: {
      // 指令的定义
      bind: function (el) {
        let odiv = el; //获取当前元素
        el.onmousedown = (e) => {
          //算出鼠标相对元素的位置
          let disX = e.clientX - odiv.offsetLeft;
          let disY = e.clientY - odiv.offsetTop;
          let left = "";
          let top = "";
          document.onmousemove = (e) => {
            //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            left = e.clientX - disX;
            top = e.clientY - disY;
            //绑定元素位置到positionX和positionY上面
            //移动当前元素
            odiv.style.left = left + "px";
            odiv.style.top = top + "px";
          };
          document.onmouseup = (e) => {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      },
    },
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
        currentpage: 1,
      },
    };
  },
  props: {
    pData: {
      type: Array,
      default: [],
    },
  },
  watch: {
    pData: {
      handler(newval, oldval) {
        if (newval) {
          this.tableDataall = newval;
          this.page = {
            total: newval.length,
            pagesize: 10,
            currentpage: 1,
          };
          if (newval.length > 10) {
            this.tableData = newval.slice(0, 10);
          } else {
            this.tableData = newval;
          }
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      const body = document.querySelector("body");
      if (body.append) {
        body.append(this.$el);
      } else {
        body.appendChild(this.$el);
      }
    });
  },
  methods: {
    // 定位
    location(index, item) {
      uia.earth.camera.flyTo(item.possion, 5, [
        (360.0 * Math.PI) / 180,
        (-30 * Math.PI) / 180,
        0,
      ]);
    },
    // 翻页
    handleCurrentChange(index) {
      var start = this.page.pagesize * (index - 1);
      this.tableData = this.tableDataall.slice(start, start + 10);
    },
  },
};
</script>
<style lang="scss">
.sensorPointDialog {
  position: absolute;
  top: 60px;
  left: 50px;
  width: 600px;
  max-height: 500px;
  min-height: 50px;
  background-color: transparent;
  z-index: 10000;
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
.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
  background-color: #0f4970;
}
</style>