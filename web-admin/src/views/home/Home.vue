<script setup>
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'

const store = useStore()
const loopList = ref([])

// 头像
const avatarUrl = computed(() =>
    store.state.userInfo.avatar // 判断当前Vuex中的用户数据是否存在头像数据
        ? 'http://localhost:3000' + store.state.userInfo.avatar //域名+数据库保存的图片地址
        : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`
)
// 通过判断当前的时间来实现对应的欢迎语
const welcomeText = computed(() =>
    new Date().getHours() < 12 ? '要开心每一天.' : '喝杯咖啡提提神吧.'
)

// 页面一挂载旧获取产品数据(轮播图)
onMounted(() => {
  getData()
})

// 获取产品数据
const getData = async () => {
  const res = await axios.get(`/adminapi/product/list`)
  loopList.value = res.data.data
};
</script>

<template>
  <div>
    <el-page-header content="首页" icon="" title="企业门户网站后台管理系统"/>
    <!-- 卡片 -->
    <el-card class="box-card">
      <el-row>
        <!-- 头像 -->
        <el-col :span="4">
          <el-avatar :size="100" :src="avatarUrl"/>
        </el-col>
        <!-- 欢迎语 -->
        <el-col :span="20">
          <h3 style="line-height: 100px">
            欢迎 {{ store.state.userInfo.username }} 回来, {{ welcomeText }}
          </h3>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h4>公司产品</h4>
        </div>
      </template>
      <!-- 轮播图(走马灯) -->
      <el-carousel v-if="loopList.length" :interval="4000" height="400px" type="card">
        <!-- 获取产品数据 -->
        <el-carousel-item v-for="item in loopList" :key="item._id">
          <!-- 轮播图背景为cover封面 -->
          <div
              :style="{
              backgroundImage: `url(http://localhost:3000${ item.cover })`,
              backgroundSize: '100% 100%',
              height: '100%'
            }"
          >
            <h3>{{ item.title }}</h3>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.box-card {
  margin-top: 50px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

