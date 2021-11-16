<template>
  <div class="Keyboard">
      <table>
            <tr>
                <td> 相机平移:</td>
                <td>W:向前平移</td>
                <td>S:向后平移 </td>
                <td>A:向左平移 </td>
                <td>D:向右平移</td>
                <td>Q:相机抬高</td>
                <td>E:相机降低</td>
            </tr>
            <tr>
                <td> 相机固定:</td>
                <td> &uarr;:抬头</td>
                <td> &darr;:低头 </td>
                <td> &larr;:向左旋转 </td>
                <td> &rarr;:向右旋转</td>
            </tr>
            <tr>
                <td> 目标点固定:</td>
                <td>I:飞近</td>
                <td>K:飞远 </td>
                <td>J:逆时针旋转 </td>
                <td>L:顺时针旋转</td>
                <td>U:向上旋转</td>
                <td>O:向下旋转</td>
            </tr>
        </table>
  </div>
</template>

<script>
export default {
  name: 'Keyboard',
  computed: {
  },
  data() {
    return {
      dialogindex: null
    }
  },
  props: {
    isKeyboard: {
      type: Number

    }
  },
  mounted() {},
  watch: {
    isKeyboard: {
      handler(newval, oldval) {
 if (newval > 1) {
        this.show()
      } else {
        this.hide()
      }
      },
      immediate: true
    }
  },
  methods: {
    // 显示
    show() {
      if (!window.keyNavagation) {
         window.keyNavagation = new CTMap.KeyboardNavigation(window.viewer)
      }
      window.keyNavagation.enable = true
    },
    // 隐藏
    hide() {
      if (window.keyNavagation) {
      window.keyNavagation.enable = false
      }
    }
  }
}
</script>

<style  lang="scss">
.Keyboard {
            height: auto;
            position: absolute;
            right: 20px;
            top: 80px;
            color: #edffff;
            width: 710px;
            padding: 10px;
            background: #00000080;
            border: 1px solid #ffffff66;
            border-radius: 2px;
            font-size: 15px;
}
td {
    padding: 0px 10px;
}
</style>
