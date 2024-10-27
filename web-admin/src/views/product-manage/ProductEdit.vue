<script setup>
import { onMounted, reactive, ref } from 'vue'
import Upload from '@/components/upload/Upload.vue'
import upload from '@/util/upload'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter();
const route = useRoute();

const productForm = reactive({
  title: '',
  introduction: '',
  detail: '',
  cover: '',
  file: null
})

// 表单校验规则
const productFormRules = reactive({
  title: [{ required: true, message: "请输入名字", trigger: "blur" }],
  introduction: [{ required: true, message: "请输入简要描述", trigger: "blur" }],
  detail: [{ required: true, message: "请输入详细描述", trigger: "blur" }],
  cover: [{ required: true, message: "请上传产品图片", trigger: "blur" }]
})

// 选择完图片后回调
const handleChange = file => {
  productForm.cover = URL.createObjectURL(file)
  productForm.file = file
}

// 提交表单
const productFormRef = ref()
const submitForm = () => {
  productFormRef.value.validate(async valid => {
    if (valid) {
      await upload("/adminapi/product/list", productForm)
      await router.push(`/product-manage/productlist`)
    }
  })
}

// 路由回退
const goBack = () => {
  router.back()
}

// 挂载获取对应的产品id数据
onMounted(() => {
  getData()
})

// 获取对应id的产品数据
const getData = async () => {
  const res = await axios.get(`/adminapi/product/list/${ route.params.id }`)
  Object.assign(productForm, res.data.data[0])
}
</script>

<template>
  <div>
    <el-page-header
        content="编辑产品"
        title="产品管理"
        @back="goBack()"
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
        >更新产品
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
