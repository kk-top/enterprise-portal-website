<script setup>
import { ref, watchEffect, onBeforeUnmount } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import moment from 'moment'
import { StarFilled } from '@element-plus/icons-vue'

moment.locale('zh-cn')

const route = useRoute()
const router = useRouter()

// 新闻数据
const currentNews = ref({})   // 当前新闻列表
const topNews = ref([])       // 最新新闻列表

const stop = watchEffect(async () => {
  if (!route.params.id) return        // 判断当前路由url上是否有新闻的id参数
  const res1 = await axios.get(`/webapi/news/list/${ route.params.id }`)  // 获取对应的新闻id
  const res2 = await axios.get(`/webapi/news/toplist?limit=4`)            // 获取最近的四条新闻数据
  currentNews.value = res1.data.data[0]
  topNews.value = res2.data.data
})


onBeforeUnmount(() => {
  stop()   // 取消watch属性的监听
})

// 时间格式化
const whichTime = (time) => {
  return moment(time).format('YYYY-MM-DD HH:mm')
}

// 最新新闻跳转
const handleChange = (id) => {
  router.push(`/new/${ id }`)
}
</script>

<template>
  <div>
    <el-row>
      <!-- 左边新闻对应id的新闻主体 -->
      <el-col :offset="1" :span="17">
        <div>
          <!-- 新闻标题 -->
          <h2>{{ currentNews.title }}</h2>
          <!-- 发布时间 -->
          <div class="time">
            {{ whichTime(currentNews.editTime) }}
          </div>
          <!-- 星号分界线 -->
          <el-divider>
            <el-icon>
              <star-filled/>
            </el-icon>
          </el-divider>
          <!-- 新闻主体内容(使用v-html渲染新闻内容) -->
          <div v-html="currentNews.content"></div>
        </div>
      </el-col>
      <!-- 右边热点新闻区域 -->
      <el-col :offset="1" :pull="1" :span="4">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span style="font-size: 16px; font-weight: bold">最近新闻</span>
            </div>
          </template>
          <!-- 最近的新闻列表(点击跳转对应的新闻详情页) -->
          <div
              v-for="item in topNews"
              :key="item._id"
              class="text item"
              style="padding: 14px"
              @click="handleChange(item._id)"
          >
            <span>{{ item.title }}</span>
            <div class="bottom">
              <time class="time">{{ whichTime(item.editTime) }}</time>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div>
      <!-- 返回顶部区域组件 -->
      <el-backtop :visibility-height="100"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.el-row {
  margin-top: 30px;
}

.time {
  font-size: 13px;
  color: gray;
}
</style>
