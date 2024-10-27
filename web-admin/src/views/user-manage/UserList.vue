<script setup>
import { onMounted, reactive, ref } from 'vue'
import axios from 'axios'

// 表单数据
let userForm = reactive({
  username: '',
  password: '',
  role: 2,          // 1 是管理员 ,2编辑
  introduction: ''
})

// 表单规则
const userFormRules = reactive({
  username: [{ required: true, message: '请输入名字', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  role: [{ required: true, message: '请选择权限', trigger: 'blur' }],
  introduction: [{ required: true, message: '请输入介绍', trigger: 'blur' }]
})

// 权限选项
const options = [
  { label: '管理员', value: 1 },
  { label: '编辑', value: 2 }
]

// 挂载时获取用户数据
const tableData = ref([]);
onMounted(() => {
  getTableData()
})

// 获取用户列表数据函数
const getTableData = async () => {
  const res = await axios.get('/adminapi/user/list')
  tableData.value = res.data.data
}

// 编辑事件
const dialogVisible = ref(false)
const handleEdit = async data => {
  const res = await axios.get(`/adminapi/user/list/${ data._id }`)
  Object.assign(userForm, res.data.data[0])
  dialogVisible.value = true
}

// 编辑确认回调
const userFormRef = ref()
const handleEditConfirm = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      await axios.put(`/adminapi/user/list/${ userForm._id }`, userForm)
      dialogVisible.value = false
      await getTableData()
    }
  })
}

// 删除事件
const handleDelete = async data => {
  await axios.delete(`/adminapi/user/list/${ data._id }`)
  await getTableData()
}
</script>

<template>
  <!-- 用户列表 -->
  <div>
    <el-card>
      <el-page-header
          content="用户列表"
          icon=""
          title="用户管理"
      />
      <!-- table控件 -->
      <el-table
          :data="tableData"
          style="width: 100%"
      >
        <el-table-column
            label="用户名"
            prop="username"
            width="180"
        />
        <el-table-column
            label="头像"
            width="180"
        >
          <template #default="scope">
            <div v-if="scope.row.avatar">
              <el-avatar
                  :size="50"
                  :src="'http://localhost:3000'+scope.row.avatar"
              ></el-avatar>
            </div>
            <!-- 默认头像 -->
            <div v-else>
              <el-avatar
                  :size="50"
                  src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="角色">
          <template #default="scope">
            <!-- {{scope.row.role===1?'管理员':'编辑'}}
             -->
            <el-tag
                v-if="scope.row.role===1"
                class="ml-2"
                type="danger"
            >管理员
            </el-tag>

            <el-tag
                v-else
                class="ml-2"
                type="success"
            >编辑
            </el-tag>

          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button
                size="small"
                @click="handleEdit( scope.row)"
            >编辑
            </el-button>
            <el-popconfirm cancelButtonText="取消" confirmButtonText="确定" title="你确定要删除吗?"
                           @confirm="handleDelete(scope.row)">
              <template #reference>
                <el-button
                    size="small"
                    type="danger"
                >删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 编辑弹框 -->
    <el-dialog
        v-model="dialogVisible"
        title="编辑用户"
        width="50%"
    >
      <el-form
          ref="userFormRef"
          :model="userForm"
          :rules="userFormRules"
          class="demo-ruleForm"
          label-width="80px"
      >
        <el-form-item
            label="用户名"
            prop="username"
        >
          <el-input v-model="userForm.username"/>
        </el-form-item>
        <el-form-item
            label="密码"
            prop="password"
        >
          <el-input
              v-model="userForm.password"
              type="password"
          />
        </el-form-item>

        <el-form-item
            label="角色"
            prop="role"
        >
          <el-select
              v-model="userForm.role"
              class="m-2"
              placeholder="Select"
              style="width:100%"
          >
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item
            label="个人简介"
            prop="introduction"
        >
          <el-input
              v-model="userForm.introduction"
              type="textarea"
          />
        </el-form-item>

      </el-form>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button
                        type="primary"
                        @click="handleEditConfirm()"
                    >确认</el-button>
                </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.el-table {
  margin-top: 50px;
}
</style>

