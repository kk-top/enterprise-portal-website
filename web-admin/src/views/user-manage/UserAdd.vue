<script setup>
import { reactive, ref } from 'vue'
import Upload from '../../components/upload/Upload.vue'
import upload from '@/util/upload'
import { useRouter } from 'vue-router'

const userFormRef = ref()
const router = useRouter()

// 添加用户表单数据
const userForm = reactive({
  username: '',
  password: '',
  role: 2,            // 1 是管理员 ,2编辑
  introduction: '',
  avatar: '',
  file: null,
  gender: 0,          // 保密性别
})

// 表单控件校验规则
const userFormRules = reactive({
  username: [{ required: true, message: '请输入名字', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  role: [{ required: true, message: '请选择权限', trigger: 'blur' }],
  introduction: [{ required: true, message: '请输入介绍', trigger: 'blur' }],
  avatar: [{ required: true, message: '请上传头像', trigger: 'blur' }]
})

// 角色选项
const options = [
  { label: '管理员', value: 1 },
  { label: '编辑', value: 2 },
]

// 上传头像回显
const handleChange = file => {
  userForm.avatar = URL.createObjectURL(file)
  userForm.file = file
}

// 提交表单
const submitForm = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      await upload('/adminapi/user/add', userForm)
      await router.push(`/user-manage/userlist`)
    }
  })
}
</script>

<template>
  <div>
    <el-page-header
        content="添加用户"
        icon=""
        title="用户管理"
    />
    <!-- 表单控件 -->
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

      <el-form-item
          label="头像"
          prop="avatar"
      >
        <Upload
            :avatar="userForm.avatar"
            @change-img="handleChange"
        />
      </el-form-item>

      <el-form-item>
        <el-button
            type="primary"
            @click="submitForm()"
        >添加用户
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.demo-ruleForm {
  margin-top: 50px;
}
</style>