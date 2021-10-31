<template>
  <div class="avoidingdisaster">
    <water-route></water-route>
    <gas-route></gas-route>
    <fire-route></fire-route>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import FireRoute from './avoidingdisaster/fireRoute.vue'
import GasRoute from './avoidingdisaster/gasRoute.vue'
import WaterRoute from './avoidingdisaster/waterRoute.vue'
// 避灾路线
export default {
  components: { WaterRoute, GasRoute, FireRoute },
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
