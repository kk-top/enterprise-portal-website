<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import formatTime from '@/util/formatTime'
import { Delete, Edit } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const tableData = ref([])

// 挂载时获取数据
onMounted(() => {
  getTableData()
})

// 获取产品列表
const getTableData = async () => {
  const res = await axios.get(`/adminapi/product/list`)
  tableData.value = res.data.data
}

// 删除产品
const handleDelete = async item => {
  await axios.delete(`/adminapi/product/list/${ item._id }`)
  await getTableData()
}

// 编辑回调
const handleEdit = item => {
  router.push(`/product-manage/editproduct/${ item._id }`)
}
</script>

<template>
  <div>
    <el-card>
      <el-page-header
          content="产品列表"
          icon=""
          title="产品管理"
      />

      <!-- table表单控件 -->
      <el-table
          :data="tableData"
          style="width: 100%"
      >
        <el-table-column
            label="产品名称"
            prop="title"
            width="180"
        />
        <el-table-column
            label="简要描述"
            prop="introduction"
            width="180"
        />

        <el-table-column label="更新时间">
          <template #default="scope">
            {{ formatTime.getTime(scope.row.editTime) }}
          </template>
        </el-table-column>


        <el-table-column label="操作">
          <template #default="scope">

            <el-button
                :icon="Edit"
                circle
                @click="handleEdit(scope.row)"
            ></el-button>

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


  </div>
</template>

<style lang="scss" scoped>
.el-table {
  margin-top: 50px;
}

:deep(.htmlcontent) {
  img {
    max-width: 100%;
  }
}
</style>
