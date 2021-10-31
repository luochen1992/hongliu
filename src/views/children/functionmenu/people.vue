<template>
  <div class="people">
    <div class="peopleTool">
      <div class="peopleItem" @click="updateinfo">人员</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'people',
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  data() {
    return {
      isshow: false,
      dialogindex: null,
      time: 1
    }
  },
  mounted() {},
  watch: {
    getNowMenuName(newV, oldV) {
      if (newV === 'people') {
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
      var _this = this
      if (!_this.dialogindex) {
        _this.dialogindex = window.layui.layer.open({
          type: 1,
          title: '工作人员',
          shade: 0,
          skin: 'cv_dialog',
          area: ['250px', 'auto'],
          offset: ['130px', '60px'],
          zIndex: 2001,
          content: $('.people'),
          success: function (layero, index) {
            _this.succCallback()
          },
          cancel: function (index, layero) {
            window.layui.layer.close(_this.dialogindex)
            _this.setNowMenuName(null)
            _this.dialogindex = null
          }
        })
      }
    },
    // 隐藏
    hide() {
      window.layui.layer.close(this.dialogindex)
      this.dialogindex = null
      if (this.dataSources) {
        viewer.dataSources.remove(this.dataSources)
        this.dataSources = null
      }
    },
    succCallback() {
      var _this = this
      _this.dataSources = new Cesium.CustomDataSource(Cesium.createGuid())
      viewer.dataSources.add(_this.dataSources)
      window.centerAt2({"x":112.7284651,"y":35.6688427,"z":-20})
      _this.updateinfo()
    },
    updateinfo() {
      var _this = this
      _this.dataSources._primitives.removeAll()
      var url = 'https://mockapi.eolinker.com/4v7q56U186a9d6737982ef8ff2aea16413f736d615fe47e/api/geo/getpeople?time=' + _this.time
      _this.time++
      if (_this.time === 3) {
        _this.time = 1
      }
      Cesium.Resource.fetchJson(url).then(function (res) {
        for (var j = 0; j < res.data.length; j++) {
            var obj = res.data[j]
            var Name = obj.Name
            var Position = (obj.Position).split(',')
            var matrix = (obj.Matrix).split(',')
            var x = parseFloat(Position[0])
            var y = parseFloat(Position[1])
            var z = parseFloat(Position[2])
            // addModel33("models/mo/jw2.gltf",Matrix,(x),(y),(z));

            var lon = 112.7293848
            var lat = 35.6739366
            var alt = 0
            matrix = matrix.map(Number)
            var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(lon, lat, alt))
            var mat4 = Cesium.Matrix4.fromArray([
                matrix[0], matrix[1], matrix[2], 0.0,
                matrix[3], matrix[4], matrix[5], 0.0,
                matrix[6], matrix[7], matrix[8], 0.0,
                x, y, z, 1.0
            ])
            // mat4 = mat4.map(Number);

            Cesium.Matrix4.multiply(modelMatrix, mat4, modelMatrix)
            var model =_this.dataSources._primitives.add(Cesium.Model.fromGltf({
                url: 'data/kg_rydw_cjgb.gltf',
                modelMatrix: modelMatrix,
                scale: 1
            }))
        }     
      })
    }
  }
}
</script>

<style  lang="scss">
.people {
  width: 100%;
  height: 100%;
  color: #fff;
  .peopleTool {
    padding: 10px 0;
    .peopleItem {
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
}
</style>
