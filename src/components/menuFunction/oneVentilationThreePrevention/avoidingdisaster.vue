<template>
  <div class="avoidingdisaster">
    <water-route></water-route>
    <gas-route></gas-route>
    <fire-route></fire-route>
    <coaldust-route></coaldust-route>
    <roof-route></roof-route>
    <chamber-route></chamber-route>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import FireRoute from './fireroute/index.vue'
import GasRoute from './gasroute/index.vue'
import WaterRoute from './waterroute/index.vue'
import CoaldustRoute from './coaldustroute/index.vue'
import RoofRoute from './roofroute/index.vue'
import ChamberRoute from './chamberroute/index.vue'
// 避灾路线
export default {
  components: { WaterRoute, GasRoute, FireRoute, CoaldustRoute, RoofRoute, ChamberRoute },
  name: 'avoidingdisaster',
  data() {
    return {}
  },
  props: {
    avoidingdisasterdata: {
      type: Array
    }
  },
  watch: {
    avoidingdisasterdata: {
      handler(newval, oldval) {
        if (newval.indexOf('水灾避灾路线') > -1) {
          this.setNowMenuName('waterroute')
        }
        if (newval.indexOf('火灾避灾路线') > -1) {
          this.setNowMenuName('fireroute')
        }
        if (newval.indexOf('瓦斯避灾路线') > -1) {
          this.setNowMenuName('gasroute')
        }
        if (newval.indexOf('顶板避灾路线') > -1) {
          this.setNowMenuName('roofroute')
        }
        if (newval.indexOf('煤尘避灾路线') > -1) {
          this.setNowMenuName('coaldustroute')
        }
         if (newval.indexOf('硐室避灾路线') > -1) {
          this.setNowMenuName('chamberroute')
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
.avoidingdisaster {
  position: absolute;
  background-color: red;
  top: 100px;
  bottom: 100px;
  height: 0px;
}
</style>
