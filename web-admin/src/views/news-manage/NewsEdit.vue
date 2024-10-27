<script setup>
import { onMounted, reactive, ref } from 'vue'
import editor from '@/components/editor/Editor.vue'
import Upload from '@/components/upload/Upload.vue'
import upload from '@/util/upload'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const route = useRoute()
const newsFormRef = ref()
const newsForm = reactive({
  title: '',
  content: '',
  category: 1,      // 1 最新动态, 2产品预告 3 通知公告
  cover: '',
  file: null,
  isPublish: 0,     // 0 未发布, 1 已发布
})

// 表单校验规则
const newsFormRules = reactive({
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
  category: [{ required: true, message: '请选择分类', trigger: 'blur' }],
  cover: [{ required: true, message: '请上传图片', trigger: 'blur' }]
})

// editor内容改变回调
const handleChange = data => {
  newsForm.content = data
}

// 新闻类别
const options = [
  { label: '最新动态', value: 1 },
  { label: '产品预告', value: 2 },
  { label: '通知公告', value: 3 },
]

// 图片数据回调
const handleUploadChange = (file) => {
  newsForm.cover = URL.createObjectURL(file)
  newsForm.file = file
}

// 提交表单
const submitForm = () => {
  newsFormRef.value.validate(async (valid) => {
    if (valid) {
      await upload('/adminapi/news/list', newsForm)
      ElMessage.success('更新成功')
      router.back()
    }
  })
}

// 返回
const goBack = () => {
  router.back()
}

// 挂载时获取数据
onMounted(async () => {
  const res = await axios.get(`/adminapi/news/list/${ route.params.id }`)
  Object.assign(newsForm, res.data.data[0])
})
</script>

<template>
  <div>
    <el-page-header
        content="编辑新闻"
        title="新闻管理"
        @back="goBack()"
    />
    <el-form
        ref="newsFormRef"
        :model="newsForm"
        :rules="newsFormRules"
        class="demo-ruleForm"
        label-width="80px"
    >
      <el-form-item
          label="标题"
          prop="title"
      >
        <el-input v-model="newsForm.title"/>
      </el-form-item>
      <el-form-item
          label="内容"
          prop="content"
      >
        <editor v-if="newsForm.content" :content="newsForm.content" @event="handleChange"/>
      </el-form-item>

      <el-form-item
          label="类别"
          prop="category"
      >
        <el-select
            v-model="newsForm.category"
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
          label="封面"
          prop="cover"
      >
        <Upload
            :avatar="newsForm.cover"
            @change-img="handleUploadChange"
        />
      </el-form-item>

      <el-form-item>
        <el-button
            type="primary"
            @click="submitForm()"
        >更新新闻
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.el-form {
  margin-top: 50px;
}
</style>
