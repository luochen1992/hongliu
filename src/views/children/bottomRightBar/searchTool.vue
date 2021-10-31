<template>
  <div class="searchTool">
    <div class="searchwhere">
      <el-input placeholder="请输入匹配内容" v-model="input" class="input-with-select" style="width:80%">
        <span>查询</span>
        <el-button slot="append" icon="el-icon-search" @click="searchquery"></el-button>
      </el-input>
      <el-button type="text" @click="clearQuery">清空</el-button>
    </div>
    <div class="center" v-if="tabshow">
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
    <div class="center" v-else></div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'searchTool',
  computed: {
    ...mapGetters(['getBRToolBar'])
  },
  data() {
    return {
      dialogindex: null,
      input: '',
      tabshow: false,
      tableDataall: [],
      tableData: [],
      page: {
        total: 0,
        pagesize: 10,
        currentpage: 1
      }
    }
  },
  mounted() {},
  watch: {
    getBRToolBar(newV, oldV) {
      if (newV === 'searchTool') {
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
          title: '搜索',
          shade: 0,
          skin: 'cv_dialog',
          area: ['530px', '700px'],
          offset: ['200px', 'calc(100% - 600px)'],
          zIndex: 2001,
          content: $('.searchTool'),
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
      this.showSearchOnMap()
    },
    searchquery() {
      this.input ? (this.tabshow = true) : layer.msg('请输入您要查询的关键字')
    },
    clearQuery() {
      this.tabshow = false
    },
    showSearchOnMap() {
      var self = this
      Cesium.Resource.fetchJson('data/人员定位系统.json').then(function (jsonData) {
        var arr = []
        for (var i = 0; i < jsonData.Map.length; i++) {
          var obj = jsonData.Map[i]
          var Name = obj.Name
          var Position = obj.Position.split(',')
          if (obj.Matrix === undefined) {
            obj.Matrix = '1,0,0,0,1,0,0,0,1'
          }
          var x = parseFloat(Position[0])
          var y = parseFloat(Position[1])
          var z = parseFloat(Position[2]) - 925.5

          var pos = window.fromLocal(x, y, z)
          var info = obj
          info.possion = pos
          var namelist = Name.split('/')

          info.name = namelist[2].split('.')[0] + i
          info.number = 'P_UI0004' + i * 7
          info.area = 'A区域'
          arr.push(info)
        }
        self.tableDataall = arr
        self.page = {
          total: arr.length,
          pagesize: 10,
          currentpage: 1
        }
        if (arr.length > 10) {
          self.tableData = arr.slice(0, 10)
        } else {
          self.tableData = arr
        }
      })
    },
    // 翻页
    handleCurrentChange(index) {
      var start = this.page.pagesize * (index - 1)
      this.tableData = this.tableDataall.slice(start, start + 10)
    },
    // 定位
    location(index, item) {
      var ellipsoid = viewer.scene.globe.ellipsoid
      var cartographic = ellipsoid.cartesianToCartographic(item.possion)

      var lat = Cesium.Math.toDegrees(cartographic.latitude)

      var lng = Cesium.Math.toDegrees(cartographic.longitude)

      var alt = cartographic.height + 700

      window.viewer.camera.flyTo({
        destination: window.Cesium.Cartesian3.fromDegrees(lng, lat, alt), // 经度、纬度、高度
        orientation: {
          heading: window.Cesium.Math.toRadians(285), // 绕垂直于地心的轴旋转
          pitch: window.Cesium.Math.toRadians(-65), // 绕纬度线旋转
          roll: 0 // 绕经度线旋转
        },
        duration: 1 // 飞行到目的地花费时间3秒
      })
      // uia.earth.camera.flyTo(item.possion, 5, [(360.0 * Math.PI) / 180, (-30 * Math.PI) / 180, 0])
    }
  }
}
</script>

<style  lang="scss">
.searchTool {
  width: 98%;
  height: 95%;
  color: #fff;
  .searchwhere {
    margin-top: 15px;
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
.searchTool .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #0f4970;
}
.searchTool .el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
  background-color: #0f4970;
}
.searchTool .el-input__inner{
      background: #242b42;
      color:#fff
    // border: 1px #1c233b;
}
.searchTool .el-input-group__append,.searchTool .el-input-group__prepend {
    background-color: #0a535d;
    color: #ffffff;
}
</style>
