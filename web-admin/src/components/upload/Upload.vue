<script setup>
import { Plus } from '@element-plus/icons-vue'
import { computed, defineEmits, defineProps } from 'vue'

const props = defineProps({
  avatar: String
})

const emit = defineEmits(['changeImg'])

const uploadAvatar = computed(
    () =>
        props.avatar.includes('blob')
            ? props.avatar
            : 'http://localhost:3000' + props.avatar
)

const handleChange = file => {
  emit('changeImg', file.raw)
}
</script>

<template>
  <el-upload
      :auto-upload="false"
      :on-change="handleChange"
      :show-file-list="false"
      action="https://jsonplaceholder.typicode.com/posts/"
      class="avatar-uploader"
  >
    <img
        v-if="props.avatar"
        :src="uploadAvatar"
        alt
        class="avatar"/>
    <el-icon
        v-else
        class="avatar-uploader-icon"
    >
      <Plus/>
    </el-icon>
  </el-upload>
</template>

<style lang="scss" scoped>
:deep(.el-upload) {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

:deep(.el-upload:hover) {
  border-color: var(--el-color-primary);
}

:deep(.el-icon.avatar-uploader-icon) {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
}
</style>
