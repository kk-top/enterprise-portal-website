<script setup>
import { reactive, ref } from 'vue'
import Upload from '@/components/upload/Upload.vue'
import upload from '@/util/upload'
import { useRouter } from 'vue-router'

const router = useRouter()

// 表单数据
const productForm = reactive({
  title: '',
  introduction: '',
  detail: '',
  cover: '',
  file: null
})

// 表单验证规则
const productFormRules = reactive({
  title: [{ required: true, message: '请输入名字', trigger: 'blur' }],
  introduction: [{ required: true, message: '请输入简要描述', trigger: 'blur' }],
  detail: [{ required: true, message: '请输入详细描述', trigger: 'blur' }],
  cover: [{ required: true, message: '请上传产品图片', trigger: 'blur' }]
})


// 选择完图片后回显示
const handleChange = file => {
  productForm.cover = URL.createObjectURL(file)
  productForm.file = file
}

// 提交表单
const productFormRef = ref()
const submitForm = () => {
  productFormRef.value.validate(async (valid) => {
    if (valid) {
      await upload('/adminapi/product/add', productForm)
      ElMessage.success('添加成功')
      await router.push(`/product-manage/productlist`)
    }
  })
}
</script>

<template>
  <div>
    <el-page-header
        content="添加产品"
        icon=""
        title="产品管理"
    />
    <el-form
        ref="productFormRef"
        :model="productForm"
        :rules="productFormRules"
        class="demo-ruleForm"
        label-width="80px"
    >
      <el-form-item
          label="产品名称"
          prop="title"
      >
        <el-input v-model="productForm.title"/>
      </el-form-item>

      <el-form-item
          label="产品简要描述"
          prop="introduction"
      >
        <el-input
            v-model="productForm.introduction"
            type="textarea"
        />
      </el-form-item>

      <el-form-item
          label="产品详细描述"
          prop="detail"
      >
        <el-input
            v-model="productForm.detail"
            type="textarea"
        />
      </el-form-item>

      <!-- 图片上传 -->
      <el-form-item
          label="产品图片"
          prop="cover"
      >
        <Upload
            :avatar="productForm.cover"
            @change-img="handleChange"
        />
      </el-form-item>

      <el-form-item>
        <el-button
            type="primary"
            @click="submitForm()"
        >添加产品
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
