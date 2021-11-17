<template>
  <div class="navMenu">
    <template v-for="(navMenu, key) in navMenus">
      <!-- 最后一级菜单 -->
      <el-menu-item v-if="!navMenu.children"
                    :key="key"
                    :data="navMenu"
                    :index="navMenu.id + '_' + key">
        <el-image v-if="navMenu.img"
                  style="width:20px; height: 20px; margin: 0px 5px"
                  :src="navMenu.img"
                  fit="fill"></el-image>
        <span slot="title">{{ navMenu.name }}</span>
      </el-menu-item>

      <!-- 此菜单下还有子菜单 -->
      <el-submenu v-if="navMenu.children"
                  :key="key"
                  :data="navMenu"
                  :index="navMenu.id + '_' + key">
        <template slot="title">
          <el-image v-if="navMenu.img"
                    style="width: 20px; height: 20px; margin: 0px 5px"
                    :src="navMenu.img"
                    fit="fill"></el-image>
          <span> {{ navMenu.name }}</span>
        </template>
        <!-- 递归 -->
        <NavMenu :navMenus="navMenu.children"
                 class="subMenuClass"></NavMenu>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  props: ['navMenus'],
  data() {
    return {}
  },
  methods: {}
}
</script>

<style>
/* 水平样式 */
.el-menu--horizontal > div > .el-submenu {
  float: left;
}
/* 一级菜单的样式 */
.el-menu--horizontal > div > .el-menu-item {
  float: left;
  height: 60px;
  line-height: 60px;
  margin: 0;
  border-bottom: 2px solid transparent;
  color: #409eff;
}
/* 解决下图1 下拉三角图标 */
.el-menu--horizontal > div > .el-submenu .el-submenu__icon-arrow {
  position: static;
  vertical-align: middle;
  margin-left: 8px;
  margin-top: -3px;
}
.subMenuClass {
  background: rgba(0, 64, 110, 0.65) !important;
  width: 150px !important;
}
.subMenuClass :hover {
  background-color: rgb(0, 64, 110, 0.25) !important;
}
/* 解决下图2 无下拉菜单时 不对齐问题 */
.el-menu--horizontal > div > .el-submenu .el-submenu__title {
  height: 60px;
  line-height: 60px;
  border-bottom: 2px solid transparent;
  color: #409eff;
}
</style>
