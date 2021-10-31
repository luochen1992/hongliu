<template>
  <div class="emergencydisaster">
    <water-route></water-route>
    <gas-route></gas-route>
    <fire-route></fire-route>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import FireRoute from './emergencydisaster/fireRoute.vue'
import GasRoute from './emergencydisaster/gasRoute.vue'
import WaterRoute from './emergencydisaster/waterRoute.vue'
// 避灾路线
export default {
  components: { WaterRoute, GasRoute, FireRoute },
  name: 'emergencydisaster',
  data() {
    return {}
  },
  props: {
    emergencydisasterdata: {
      type: Array
    }
  },
  watch: {
    emergencydisasterdata: {
      handler(newval, oldval) {
        if (newval.indexOf('水灾应急路线') > -1) {
          this.setNowMenuName('emergwaterRoute')
        }
        if (newval.indexOf('火灾应急路线') > -1) {
          this.setNowMenuName('emergfireRoute')
        }
        if (newval.indexOf('瓦斯应急路线') > -1) {
          this.setNowMenuName('emerggasRoute')
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations({
      setNowMenuName: 'setNowMenuName'
    })
  }
}
</script>

<style scoped>
.emergencydisaster {
  position: absolute;
  background-color: red;
  top: 50px;
  bottom: 100px;
  height: 0px;
}
</style>
