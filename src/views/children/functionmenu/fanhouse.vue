<template>
  <div class="fanhouse">
    <div class="page" v-show="isshow">
      <div style="position:absolute;right:0%;width:50%;">
        <div class="kuang1">
          <table class="container_body_table" id="tagstable">
            <thead>
              <tr>
                <th colspan="3">1号主电机-运行参数</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="1">A相 温度</td>
                <td>13.90</td>
                <td>.C</td>
              </tr>
              <tr>
                <td colspan="1">B相 温度</td>
                <td>13.98</td>
                <td>.C</td>
              </tr>
              <tr>
                <td colspan="1">C相 温度</td>
                <td>13.94</td>
                <td>.C</td>
              </tr>
              <tr>
                <td colspan="1">前轴温度</td>
                <td>10.54</td>
                <td>.C</td>
              </tr>
              <tr>
                <td colspan="1">后轴温度</td>
                <td>10.89</td>
                <td>.C</td>
              </tr>
              <tr>
                <td colspan="1">运行电流</td>
                <td>0.15</td>
                <td>A</td>
              </tr>
              <tr>
                <td colspan="1">电机转速</td>
                <td>0</td>
                <td>%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="kuang2">
          <table class="container_body_table" id="tagstable">
            <thead>
              <tr>
                <th colspan="3">2号主电机-运行参数</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="1">A相 温度</td>
                <td>25.45</td>
                <td>.C</td>
              </tr>
              <tr>
                <td colspan="1">B相 温度</td>
                <td>25.57</td>
                <td>.C</td>
              </tr>
              <tr>
                <td colspan="1">C相 温度</td>
                <td>25.28</td>
                <td>.C</td>
              </tr>
              <tr>
                <td colspan="1">前轴温度</td>
                <td>22.38</td>
                <td>.C</td>
              </tr>
              <tr>
                <td colspan="1">后轴温度</td>
                <td>22.28</td>
                <td>.C</td>
              </tr>
              <tr>
                <td colspan="1">运行电流</td>
                <td>0.18</td>
                <td>A</td>
              </tr>
              <tr>
                <td colspan="1">电机转速</td>
                <td>0</td>
                <td>%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="kuang3">
          <table class="container_body_table" id="tagstable">
            <thead>
              <tr>
                <th colspan="3">3号主电机-运行参数</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="1">A相 温度</td>
                <td>25.76</td>
                <td>.C</td>
              </tr>
              <tr>
                <td colspan="1">B相 温度</td>
                <td>26.13</td>
                <td>.C</td>
              </tr>
              <tr>
                <td colspan="1">C相 温度</td>
                <td>26.23</td>
                <td>.C</td>
              </tr>
              <tr>
                <td colspan="1">前轴温度</td>
                <td>22.67</td>
                <td>.C</td>
              </tr>
              <tr>
                <td colspan="1">后轴温度</td>
                <td>22.73</td>
                <td>.C</td>
              </tr>
              <tr>
                <td colspan="1">运行电流</td>
                <td>0.19</td>
                <td>A</td>
              </tr>
              <tr>
                <td colspan="1">电机转速</td>
                <td>0</td>
                <td>%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'fanhouse',
  computed: {
    ...mapGetters(['getNowMenuName'])
  },
  data() {
    return {
      isshow: false
    }
  },
  mounted() {},
  watch: {
    getNowMenuName(newV, oldV) {
      if (newV === 'fanhouse') {
        this.show()
      } else {
        this.hide()
      }
    }
  },
  methods: {
    ...mapMutations({
      setNowMenuName: 'setNowMenuName'
    }),
    // 显示
    show() {
      this.isshow = true
    },
    // 隐藏
    hide() {
      // $('.page').hide()
      this.isshow = false
    }
  }
}
</script>

<style  lang="scss">
.fanhouse {
  width: 100%;
  height: 100%;
  color: #fff;
  .page {
    // display: none;
    background: url('../../../assets/images/fun_bg.jpg') repeat;
    position: absolute;
    top: 90px;
    left: 0px;
    width: 100%;
    height: 100%;
    .kuang1,
    .kuang2,
    .kuang3 {
      position: relative;
      float: left;
      width: 20%;
      margin: 10px;
      margin-top: 0px !important;
      padding: 5px;
      background-color: rgba(255, 255, 255, 0.03);
      border-width: 12px;
      border-image: url(data:image/png;base64,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artXAgQIECCwWOBzEeFzVy3+pTQkQIAAAQIEahIQLGp6td0rAQIECBDYWUCw2BlY9wQIECBAoCYBwaKmV9u9EiBAgACBnQUEi52BdU+AAAECBGoSECxqerXdKwECBAgQ2FlAsNgZWPcECBAgQKAmAcGiplfbvRIgQIAAgYcEhviPx+YXwWLex1kCBAgQIEBghYBgsQJLUwIECBAgQGBeQLCY93GWAAECBAgQWCEgWKzA0pQAAQIECBCYFxAs5n2cJUCAAAECBFYICBYrsDQlQIAAAQIE5gUEi3kfZwkQIECAAIElAtMHUQWLJVjaECBAgAABAosEBItFTBoRIECAAAECSwQEiyVK2hAgQIAAAQKLBASLRUwaESBAgAABAksEBIslStoQIECAAAEC1wWG48X/HyJYXGdylAABAgQIEPiEgGDxCTSXECBAgAABAtcFBIvrLo4SIECAAAECnxAQLD6B5hICBAgQIEDguoBgcd3FUQIECBAgQOATAoLFJ9BcQoAAAQIE6hJYHheWt6xL0N0SIECAAAECnxAQLD6B5hICBAgQIEDguoBgcd3FUQIECBAgUJ1Av8EdCxYbIOqCAAECBAjUIzAfHebP1qPkTgkQIECAAIENBASLDRB1QYAAAQIE6hbo3v+/EMGi7neCuydAgAABApsKCBabcuqMAAECBAjULSBY1P36u3sCBAgQILCpgGCxKafOCBAgQIBA3QKCRd2vv7snQIAAAQKbCggWm3LqjAABAgQI1C0gWNT9+rt7AgQIECCwqYBgsSmnzggQIECAwBcWWJAaFjT5wkBujQABAgQIENhUQLDYlFNnBAgQIECgbgHBou7X390TIECAAIFNBQSLTTl1RoAAAQIE6hYQLOp+/d09AQIECBDYVECw2JRTZwQIECBAoG4BwaLu19/dEyBAgACBTQUEi005dUaAAAECBOoWECzqfv3dPQECBAgQ2FRAsNiUU2cECBAgQKBuAcGi7tff3RMgQIAAgU0FBItNOXVGgAABAgTqFhAs6n793T0BAgQIENhUQLDYlFNnBAgQIECgVoExUggWtb7+7psAAQIECOwgIFjsgKpLAgQIECBQq4BgUesr774JECBAgMAOAoLFDqi6JECAAAECtQoIFrW+8u6bAAECBAjsICBY7ICqSwIECBAgUIXAlRRx5VAVFG6SAAECBAgQ2EFA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)
        12 fill / 1 / 0 stretch;
      box-sizing: border-box;
      border-style: solid;
    }
  }
}
</style>
