<script setup>
import { Search } from '@element-plus/icons-vue'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import moment from 'moment'
import axios from 'axios'
import _ from 'lodash'
import NewsBg from '@/assets/newsbg.jpg'

const router = useRouter()
moment.locale("zh-cn")

const searchText = ref('')
const visible = ref(false)  // 搜索结果是否展示
const newList = ref([])     // 新闻列表
const whichTab = ref(1)     // 新闻选项卡响应式绑定,默认值为1

// 新闻选项卡分类
const tabList = [
  { label: "最新动态", name: 1 },
  { label: "产品预告", name: 2 },
  { label: "通知公告", name: 3 }
]

// 根据新闻数据中的category属性进行分类
const tabNews = computed(() => _.groupBy(newList.value, item => item.category));

// 点击对应的新闻选项卡进行新闻详情的跳转(携带新闻的id,其实就是新闻的名字)
const handleChangePage = (id) => {
  router.push(`/new/${ id }`)
}

// 挂载时获取数据
onMounted(async () => {
  const res = await axios.get('/webapi/news/list')
  newList.value = res.data.data
})

// 筛选搜索关键字(筛选新闻数组)
const searchnewslist = computed(
    () =>
        searchText.value
            ? newList.value.filter((item) => item.title.includes(searchText.value))
            : []
)

// 顶部取四篇新闻
const topNewsList = computed(() => newList.value.slice(0, 4));

// 设置时间校准
const whichTime = (time) => {
  // 快捷设置,将时间设置成时分秒形式返回
  return moment(time).format("lll");
}
</script>

<template>
  <div class="container">
    <div
        :style="{
        backgroundImage: `url(${ NewsBg })`,
      }"
        class="news-header"
    ></div>

    <!-- 搜索区域 -->
    <div class="search">
      <el-popover
          :visible="visible"
          placement="bottom"
          title="检索结果"
          width="50%"
      >
        <template #reference>
          <el-input
              v-model="searchText"
              :prefix-icon="Search"
              class="w-50 m-2"
              placeholder="请输入新闻关键字"
              size="large"
              type="search"
              @blur="visible = false"
              @input="visible = true"
          />
        </template>
        <!-- 判断当前是否有该新闻 -->
        <div v-if="searchnewslist.length">
          <div
              v-for="data in searchnewslist"
              :key="data._id"
              class="search-item"
              @click="handleChangePage(data._id)"
          >
            {{ data.title }}
          </div>
        </div>
        <!-- 若无搜索结果则展示以下页面 -->
        <div v-else>
          <el-empty :image-size="50" description="暂无新闻"/>
        </div>
      </el-popover>
    </div>
    <!-- 顶部展示四篇新闻(最新),使用栅格组件 -->
    <div class="topnews">
      <el-row :gutter="20">
        <el-col v-for="item in topNewsList" :key="item._id" :span="6">
          <el-card :body-style="{ padding: '0', height: '240px' }" shadow="hover" @click="handleChangePage(item._id)">
            <div
                :style="{
                backgroundImage: `url(http://localhost:3000${ item.cover })`,
              }"
                class="image"
            ></div>
            <div style="padding: 14px">
              <span>{{ item.title }}</span>
              <div class="bottom">
                <time class="time">{{ whichTime(item.editTime) }}</time>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 新闻选项卡功能(tags组件) -->
    <el-tabs v-model="whichTab" class="demo-tabs" style="margin: 20px">
      <!-- 选项选择 -->
      <el-tab-pane
          v-for="item in tabList"
          :key="item.name"
          :label="item.label"
          :name="item.name"
      >
        <el-row :gutter="20">
          <el-col :span="18">
            <!-- 展示对应分类对应的新闻数据 -->
            <div
                v-for="data in tabNews[item.name]"
                :key="data._id"
                style="padding: 10px"
            >
              <!-- 选项卡 -->
              <el-card
                  :body-style="{ padding: '0' }"
                  shadow="hover"
                  @click="handleChangePage(data._id)"
              >
                <!-- 新闻封面 -->
                <div
                    :style="{
                    backgroundImage: `url(http://localhost:3000${ data.cover })`,
                  }"
                    class="tab-image"
                ></div>
                <!-- 新闻内容 -->
                <div style="padding: 14px; float: left">
                  <span>{{ data.title }}</span>
                  <div class="bottom">
                    <time class="tab-time">{{ whichTime(data.editTime) }}</time>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
          <!-- 时间线组件(展示新闻的创建顺序) -->
          <el-col :span="6">
            <el-timeline>
              <el-timeline-item
                  v-for="(data, index) in tabNews[item.name]"
                  :key="index"
                  :timestamp="whichTime(data.editTime)"
              >
                {{ data.title }}
              </el-timeline-item>
            </el-timeline>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <!-- 返回顶部按钮 -->
    <el-backtop :visibility-height="100"/>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
}

.news-header {
  width: 100%;
  height: 400px;
  background-size: cover;
}

.search {
  position: absolute;
  top: 300px;
  width: 100%;
  text-align: center;

  .el-input {
    width: 50%;
  }
}

.search-item {
  height: 50px;
  line-height: 50px;

  &:hover {
    background: whitesmoke;
    color: skyblue;
  }
}

.topnews {
  margin: 20px;

  .image {
    width: 100%;
    height: 150px;
    background-size: cover;
  }

  .time {
    font-size: 13px;
    color: gray;
  }
}

// 选项卡样式
.tab-image { // 选项卡新闻封面
  width: 150px;
  height: 100px;
  background-size: cover;
  float: left;
}

.tab-time { // 选项卡新闻时间
  font-size: 13px;
  color: gray;
}
</style>
