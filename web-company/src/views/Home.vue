<script setup>
import Home1 from '@/assets/home1.png'
import Home2 from '@/assets/home2.png'
import Home3 from '@/assets/home3.png'
</script>

<template>
  <div class="container">
    <el-carousel
        height="calc(100vh - 60px)"
        :pause-on-hover="false"
        interval="4000"
    >
      <el-carousel-item
          :key="1"
      >
        <div :style="{ backgroundImage: `url(${ Home1 })` }"></div>
      </el-carousel-item>
      <el-carousel-item
          :key="2"
      >
        <div :style="{ backgroundImage: `url(${ Home2 })` }"></div>
      </el-carousel-item>
      <el-carousel-item
          :key="3"
      >
        <div :style="{ backgroundImage: `url(${ Home3 })` }"></div>
      </el-carousel-item>
    </el-carousel>
    <div class="center">企业官网</div>
  </div>
</template>

<style lang="scss" scoped>
.el-carousel div {
  width: 100%;
  height: 100%;
  background-size: cover;
}

.container {
  position: relative;
}

.center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 100px;
  line-height: 100px;
  font-size: 60px;
  color: white;
  text-align: center;
}
</style>
