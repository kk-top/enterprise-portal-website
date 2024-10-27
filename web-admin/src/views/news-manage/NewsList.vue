<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import formatTime from '@/util/formatTime'
import { Delete, Edit, Star, StarFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const tableData = ref([])
const previewData = ref({})
const dialogVisible = ref(false)

// 挂载时获取数据
onMounted(() => {
  getTableData()
})

// 获取新闻数据函数
const getTableData = async () => {
  const res = await axios.get(`/adminapi/news/list`)
  tableData.value = res.data.data
}

// 格式化分类信息
const categoryFormat = (category) => {
  const arr = ['最新动态', '产品预告', '通知公告']
  return arr[category - 1]
}

// 发布回调(发布新闻)
const handleSwitchChange = async (item) => {
  await axios.put(`/adminapi/news/publish`, {
    _id: item._id,
    isPublish: item.isPublish
  })
  await getTableData()
}

// 预览回调函数
const handlePreview = data => {
  previewData.value = data
  dialogVisible.value = true
}

// 删除回调函数
const handleDelete = async (item) => {
  await axios.delete(`/adminapi/news/list/${ item._id }`)
  await getTableData()// 重新获取新闻数据
}

// 编辑回调
const handleEdit = item => {
  router.push(`/news-manage/editnews/${ item._id }`)
}
</script>

<template>
  <div>
    <!-- 头部标题 -->
    <el-card>
      <el-page-header
          content="新闻列表"
          icon=""
          title="新闻管理"
      />
      <!-- table表单 -->
      <el-table
          :data="tableData"
          style="width: 100%"
      >
        <el-table-column
            label="标题"
            prop="title"
            width="180"
        />
        <el-table-column
            label="分类"

        >
          <template #default="scope">
            {{ categoryFormat(scope.row.category) }}
          </template>
        </el-table-column>

        <el-table-column
            label="更新时间"
        >
          <template #default="scope">
            {{ formatTime.getTime(scope.row.editTime) }}
          </template>
        </el-table-column>
        <el-table-column
            label="是否发布"

        >
          <template #default="scope">
            <el-switch
                v-model="scope.row.isPublish"
                :active-value="1"
                :inactive-value="0"
                @change="handleSwitchChange(scope.row)"
            />
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <!-- 预览按钮 -->
            <el-button
                :icon="Star"
                circle
                type="success"
                @click="handlePreview(scope.row)"
            ></el-button>
            <!-- 编辑按钮 -->
            <el-button
                :icon="Edit"
                circle
                @click="handleEdit(scope.row)"
            ></el-button>
            <!-- 删除按钮(删除提示控件) -->
            <el-popconfirm
                cancelButtonText="取消"
                confirmButtonText="确定"
                title="你确定要删除吗?"
                @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-button
                    :icon="Delete"
                    circle
                    type="danger"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 预览新闻 -->
    <el-dialog
        v-model="dialogVisible"
        title="预览新闻"
        width="50%"
    >
      <div>
        <h2>{{ previewData.title }}</h2>
        <div style="font-size:12px;color:gray;">{{ formatTime.getTime(previewData.editTime) }}</div>

        <el-divider>
          <el-icon>
            <star-filled/>
          </el-icon>
        </el-divider>

        <div class="htmlContent" v-html="previewData.content"></div>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.el-table {
  margin-top: 50px;
}
:deep(.htmlContent) {
  img {
    max-width: 100%;
  }
}
</style>
