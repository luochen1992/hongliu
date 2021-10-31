<template>
  <div class="kjxinfo">
    <el-dialog title="信息" :visible.sync="dialogVisible" width="100%" top="100px" :before-close="handleClose">
      <avue-crud :option="option" :data="data" :page.sync="page" @row-click="rowClick"></avue-crud>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'kjxinfo',
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  data() {
    return {
      isshow: false,
      dialogVisible: false,
      page: {
        pageSize: 10,
        total: 40,
        pagerCount: 5,
        currentPage: 1
      },
      option: {
        excelBtn: false,
        border: true,
        index: true,
        addBtn: false,
        expandLevel: 3,
        headerAlign: 'center',
        align: 'center',
        tree: true,
        labelWidth: 100,
        column: [
          {
            width: 130,
            label: '名称',
            prop: 'name'
          },
          {
            label: '类型',
            prop: 'type'
          },
          {
            label: '状态',
            prop: 'state',
            dicData: [
              {
                label: '工作中',
                value: 1
              },
              {
                label: '运行',
                value: 2
              },
              {
                label: '巡检',
                value: 3
              }
            ]
          },
          {
            label: '信息',
            prop: 'info'
          },
          {
            label: '更新时间',
            prop: 'updatetime'
          }
        ]
      },
      data: [
        {
          id: '1',
          name: '张三',
          type: '人员',
          state: 1,
          info: '正在检查',
          updatetime: '2021-07-05 13:21:24',
          model: 'data/Cesium-Man.glb',
          geometry: {
            x: 112.7298,
            y: 35.6738,
            z: 716.98,
            heading: 144,
            pitch: 82.28757397,
            roll: 0
          }
        },
        {
          id: '2',
          name: '车1',
          type: '车辆',
          state: 2,
          info: '救急应用',
          updatetime: '2021-07-05 14:21:24',
          model: 'data/Cesium-Man.glb',
          geometry: {
            x: 112.7269,
            y: 35.6789,
            z: 714.39,
            heading: 144,
            pitch: 82.28757397,
            roll: 0
          }
        },
        {
          id: '3',
          name: '巡1',
          type: '巡检机器人',
          state: 3,
          info: '3号巡检',
          updatetime: '2021-07-05 15:21:24',
          model: 'data/Cesium-Man.glb',
          geometry: {
            x: 112.7294,
            y: 35.6745,
            z: 717.98,
            heading: 144,
            pitch: 82.28757397,
            roll: 0
          }
        }
      ]
    }
  },
  mounted() {},
  watch: {
    getNowMenuName(newV, oldV) {
      if (newV === 'kjxinfo') {
        this.show()
        this.isshow = true
      } else {
        if (this.isshow) {
          this.hide()
          this.isshow = false
        }
      }
    }
  },
  methods: {
    ...mapMutations({
      setNowMenuName: 'setNowMenuName'
    }),
    // 显示
    show() {
      this.dialogVisible = true
    },
    // 隐藏
    hide() {
      this.dialogVisible = false
    },
    // 关闭
    handleClose() {
      this.hide()
    },
    //
    load() {
      var data = this.data
      this._dataSource = new Cesium.CustomDataSource(Cesium.createGuid())
      viewer.dataSources.add(this._dataSource)
      for (var i = 0; i < this.data.length; i++) {
        var heading = Cesium.Math.toRadians(data[i].geometry.heading)
        var pitch = Cesium.Math.toRadians(data[i].geometry.pitch)
        var roll = data[i].geometry.roll
        const x = data[i].geometry.x
        const y = data[i].geometry.y
        const z = data[i].geometry.z
        var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)

        const position = Cesium.Cartesian3.fromDegrees(x, y, z)

        var fixedFrame = Cesium.Transforms.localFrameToFixedFrameGenerator('north', 'west')
        var model = this._dataSource._primitives.add(
          Cesium.Model.fromGltf({
            id: data[i].id,
            // 资源路径
            url: data[i].model,
            // 模型矩阵
            modelMatrix: Cesium.Transforms.headingPitchRollToFixedFrame(position, hpr, Cesium.Ellipsoid.WGS84, fixedFrame, position),
            // 模型最小刻度
            minimumPixelSize: 128,
            // 模型标尺
            scale: jsonData.data[i].scale || 1.0,
            // 模型最大刻度
            maximumScale: 20000
            // // 仅用于调试。显示模型绘制时的边界球。
            // debugShowBoundingVolume: false,
            // // 仅用于调试，显示魔仙绘制时的线框
            // debugWireframe: false
          })
        )
      }
    },
    // 行点击
    rowClick(row, column, event) {
      var item = row
    }
  }
}
</script>

<style  lang="scss">
.spacequery {
  width: 100%;
  height: 100%;
  color: #fff;
}
.el-dialog {
  background-color: #1a3c57d1;
}
</style>
