<script setup>
import { reactive, ref } from 'vue'
import editor from '@/components/editor/Editor.vue'
import Upload from '@/components/upload/Upload.vue'
import upload from '@/util/upload'
import { useRouter } from 'vue-router'

const router = useRouter()

const newsFormRef = ref()

// 新闻表单数据
const newsForm = reactive({
  title: '',          // 标题
  content: '',        // 内容
  category: 1,        // 1 最新动态, 2典型案例 3 通知公告
  cover: '',          // 封面图片
  file: null,         // 图片数据
  isPublish: 0        // 0 未发布, 1 已发布
})

// 表单规则验证
const newsFormRules = reactive({
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
  category: [{ required: true, message: '请选择分类', trigger: 'blur' }],
  cover: [{ required: true, message: '请上传图片', trigger: 'blur' }],
})

// 富文本编辑器内容
const handleChange = data => {
  newsForm.content = data
}

// 新闻类别
const options = [
  { label: '最新动态', value: 1 },
  { label: '产品预告', value: 2 },
  { label: '通知公告', value: 3 },
]

// 图片回调
const handleUploadChange = (file) => {
  // 作变量转换,使用原生的url对象,将选中的图片转变成upload可识别的url
  newsForm.cover = URL.createObjectURL(file);
  newsForm.file = file
}

// 提交表单数据
const submitForm = () => {
  // 规则校验
  newsFormRef.value.validate(async (valid) => {
    if (valid) {
      await upload('/adminapi/news/add', newsForm)
      ElMessage.success('添加成功')
      await router.push(`/news-manage/newslist`)
    }
  })
}
</script>

<template>
  <div>
    <!-- 头部标题 -->
    <el-page-header
        content="创建新闻"
        icon=""
        title="新闻管理"
    />
    <!-- form表单 -->
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
        <!-- 富文本编辑器(自己封装,监听event字段) -->
        <editor @event="handleChange"/>
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
        >添加新闻
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
