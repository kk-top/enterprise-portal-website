<script setup>
import { Avatar, HomeFilled, MessageBox, Reading, UserFilled } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const route = useRoute()

// 自定义指令
const vAdmin = {
  mounted(el) {
    if (store.state.userInfo.role !== 1) {
      // 根据当前用户的角色类型来判断是否显示该DOM元素(管理员有权编辑用户)
      el.parentNode.removeChild(el)
    }
  }
}
</script>

<template>
  <!-- 侧边栏(通过Vuex中的标志为来判断宽度[展开还是折叠]) -->
  <el-aside :width="$store.state.isCollapsed ? '64px' : '240px'">
    <!-- 设置侧边栏的属性 -->
    <el-menu
        :collapse="$store.state.isCollapsed"
        :collapse-transition="false"
        :default-active="route.fullPath"
        :router="true"
    >
      <!-- 首页(单菜单) -->
      <el-menu-item index="/index">
        <el-icon>
          <home-filled/>
        </el-icon>
        <span>首页</span>
      </el-menu-item>
      <!-- 个人中心(单菜单) -->
      <el-menu-item index="/center">
        <el-icon>
          <avatar/>
        </el-icon>
        <span>个人中心</span>
      </el-menu-item>

      <!-- 用户管理(多级菜单,仅管理员可见,自己封装一个指令获取底层DOM) -->
      <el-sub-menu v-admin index="/user-manage">
        <template #title>
          <el-icon>
            <user-filled/>
          </el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item index="/user-manage/adduser">添加用户</el-menu-item>
        <el-menu-item index="/user-manage/userlist">用户列表</el-menu-item>
      </el-sub-menu>

      <!-- 新闻管理(多级菜单) -->
      <el-sub-menu index="/news-manage">
        <template #title>
          <el-icon>
            <message-box/>
          </el-icon>
          <span>新闻管理</span>
        </template>
        <el-menu-item index="/news-manage/addnews">创建新闻</el-menu-item>
        <el-menu-item index="/news-manage/newslist">新闻列表</el-menu-item>
      </el-sub-menu>

      <!-- 产品管理(多级菜单) -->
      <el-sub-menu index="/product-manage">
        <template #title>
          <el-icon>
            <reading/>
          </el-icon>
          <span>产品管理</span>
        </template>
        <el-menu-item index="/product-manage/addproduct">添加产品</el-menu-item>
        <el-menu-item index="/product-manage/productlist"
        >产品列表
        </el-menu-item
        >
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<style lang="scss" scoped>
.el-aside {
  height: 100vh;

  .el-menu {
    height: 100vh;
  }
}
</style>

