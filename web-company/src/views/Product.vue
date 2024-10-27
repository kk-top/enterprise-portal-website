<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const loopList = ref([])    // 轮播图数据

// 页面挂载获取数据
onMounted(async () => {
  const res = await axios.get('/webapi/product/list')
  loopList.value = res.data.data
})
</script>

<template>
  <div>
    <!-- 轮播图 -->
    <el-carousel
        v-if="loopList.length"
        :autoplay="true"
        direction="vertical"
        height="calc(100vh - 59px)"
        interval="8000"
        :pause-on-hover="false"
    >
      <!-- 轮播图item获取 -->
      <el-carousel-item v-for="item in loopList" :key="item._id">
        <div
            :style="{
            backgroundImage: `url(http://localhost:3000${item.cover})`,
          }"
            class="item"
        >
          <!-- 文字阐述 -->
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <h2>{{ item.title }}</h2>
              </div>
            </template>
            <div>{{ item.introduction }}</div>
            <div class="detail">{{ item.detail }}</div>

            <div class="more">
              更多信息，请访问： XXXXXXXX
            </div>
          </el-card>
        </div>
      </el-carousel-item>
    </el-carousel>
    <!-- 保底页面 -->
    <el-empty v-else description="暂无产品"/>
  </div>
</template>

<style lang="scss" scoped>
.item {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}

.box-card {
  width: 40%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.4);

  .detail,
  .more {
    margin-top: 20px;
  }
}
</style>

