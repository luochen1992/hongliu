<template>
  <div class="sunlight">
    <el-form ref="form" label-width="80px" size="mini">
      <el-form-item label="日期">
        <el-date-picker v-model="nowdate" type="date" placeholder="选择日期"> </el-date-picker>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-select v-model="startTime" placeholder="">
          <el-option label="6" value="6"></el-option>
          <el-option label="8" value="8"></el-option>
          <el-option label="10" value="10"></el-option>
          <el-option label="12" value="12"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-select v-model="stopTime" placeholder="">
          <el-option label="14" value="14"></el-option>
          <el-option label="16" value="16"></el-option>
          <el-option label="18" value="18"></el-option>
          <el-option label="20" value="20"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="startSunlight">播放</el-button>
        <el-button @click="endSunlight">暂停</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'sunlight',
  computed: {
    ...mapGetters(['getToolBar'])
  },
  data() {
    return {
      dialogindex: null,
      nowdate: new Date(),
      startTime: '6',
      stopTime: '20'
    }
  },
  mounted() {},
  watch: {
    getToolBar(newV, oldV) {
      if (newV === 'sunlight') {
        this.show()
      } else {
        this.hide()
      }
    }
  },
  methods: {
    ...mapMutations({
      setToolBar: 'setToolBar'
    }),
    // 显示
    show() {
      var _this = this
      if (!_this.dialogindex) {
        _this.dialogindex = window.layui.layer.open({
          type: 1,
          title: '日照分析',
          shade: 0,
          skin: 'cv_dialog',
          area: ['250px', '200px'],
          offset: ['200px', 'calc(100% - 340px)'],
          zIndex: 2001,
          content: $('.sunlight'),
          success: function (layero, index) {
            _this.succCallback()
          },
          cancel: function (index, layero) {
            window.layui.layer.close(_this.dialogindex)
            _this.setToolBar(null)
            _this.dialogindex = null
          }
        })
      }
    },
    // 隐藏
    hide() {
      window.layui.layer.close(this.dialogindex)
      this.dialogindex = null
      this.sunlight(window.viewer, {
        play: false
      })
    },
    succCallback() {},
    startSunlight() {
      this.sunlight(window.viewer, {
        play: true,
        multiplier: 5000,
        clockRange: window.Cesium.ClockRange.LOOP_STOP,
        clockStep: window.Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER
      })
    },
    endSunlight() {
      this.sunlight(window.viewer, {
        play: false
      })
    },

    sunlight(viewer, config) {
      var endTime = null

      var i = this.startTime
      var a = this.stopTime
      var r = new Date(new Date(this.nowdate).setHours(Number(i)))
      var o = new Date(new Date(this.nowdate).setHours(Number(a)))
      if (!config.play) {
        endTime = viewer.clock.currentTime
        viewer.clock.shouldAnimate = false
        viewer.scene.globe.enableLighting = false
        viewer.shadows = false
      } else {
        viewer.scene.globe.enableLighting = true
        viewer.shadows = true
        viewer.clock.startTime = window.Cesium.JulianDate.fromDate(r)
        viewer.clock.stopTime = window.Cesium.JulianDate.fromDate(o)
        viewer.clock.clockRange = config.clockRange
        viewer.clock.clockStep = config.clockStep
        viewer.clock.multiplier = config.multiplier
        if (((viewer.clock.shouldAnimate = true), endTime)) {
          viewer.clock.currentTime = endTime
        } else {
          viewer.clock.currentTime = window.Cesium.JulianDate.fromDate(r)
        }
      }
    }
  }
}
</script>

<style  lang="scss">
.sunlight {
  width: 98%;
  height: 100%;
  color: #fff;
  .el-form-item__label {
    color: #fff;
  }
}
</style>
