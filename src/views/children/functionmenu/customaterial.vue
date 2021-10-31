<template>
  <div class="customaterial"></div>
</template>
 <script>
import {mapGetters, mapMutations } from 'vuex'
import tooltip from '../../../js/cusmaterial'
export default {
  name: 'customaterial',
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  data() {
    return {
      isshow: false,
      dialogindex: null,
      entitieslist: []
    }
  },
  mounted() {},
  watch: {
    getNowMenuName(newV, oldV) {
      if (newV === 'customaterial') {
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
      window.flyTo(50, 30, 100)
     var item = viewer.entities.add({
            name: 'PolylineTrail',
            polygon: {
                hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights([
                    50, 30, 250000,
                    60 , 30, 250000,
                    60 , 32, 250000,
                    50, 32, 250000,
                ]),
                width: 15,
                material: new Cesium.PolylineTrailLinkMaterialProperty(Cesium.Color.WHITE, 3000,1)
            }
        });

    },
    // 隐藏
    hide() {     
      if(typeof(item) != 'undefined'){
        viewer.entities.remove(item);
      }
    }
  }
}
</script>