<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="navbar">
    <el-menu
        :default-active="route.fullPath"
        router
        class="el-menu-demo"
        mode="horizontal"
    >
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/news">新闻中心</el-menu-item>
      <el-menu-item index="/product">产品与服务</el-menu-item>
    </el-menu>
    <div class="right">企业门户官网</div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
}

.right {
  position: fixed;
  top: 0;
  right: 20px;
  width: 100px;
  height: 59px;
  line-height: 59px;
  text-align: center;
}
</style>
