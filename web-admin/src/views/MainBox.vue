<script setup>
import TopHeader from '@/components/mainbox/TopHeader.vue'
import SideMenu from '@/components/mainbox/SideMenu.vue'
</script>

<template>
  <!-- 组件库的布局容器设置 -->
  <el-container>
    <!-- 侧边栏 -->
    <SideMenu />
    <el-container direction="vertical">
      <!-- 顶部区域 -->
      <TopHeader />
      <!-- 内容主题区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>