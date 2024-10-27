<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { loadSlim } from 'tsparticles-slim'
import { useStore } from 'vuex'
import axios from 'axios'

const store = useStore()
const router = useRouter()

// 表单绑定的响应式对象
const loginForm = reactive({
  username: '',
  password: ''
})

// 表单的验证规则
const loginRules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

//提交表单
const loginFormRef = ref()
const submitForm = () => {
  // 触发表单校验
  loginFormRef.value.validate((valid) => {
    if (valid) {
      axios.post('/adminapi/user/login', loginForm).then(res => {
        // 登录校验
        if (res.data.ActionType === 'OK') {
          store.commit('changeUserInfo', res.data.data)
          store.commit('changeGetterRouter', false)
          ElMessage.success('登录成功')
          router.push('/index')
        } else {
          ElMessage.error('用户名和密码不匹配')
        }
      })
    }
  })
}

// 配置particles(粒子)
const options = {
  background: {
    color: {
      value: "#2d3a4b"
    }
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push"
      },
      onHover: {
        enable: true,
        mode: "repulse"
      },
      resize: true
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40
      },
      push: {
        quantity: 4
      },
      repulse: {
        distance: 200,
        duration: 0.4
      }
    }
  },
  particles: {
    color: {
      value: "#66CCFF"
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1
    },
    collisions: {
      enable: true
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 6,
      straight: false
    },
    number: {
      density: {
        enable: true,
        area: 800
      },
      value: 80
    },
    opacity: {
      value: 0.5
    },
    shape: {
      type: "circle"
    },
    size: {
      random: true,
      value: 5
    }
  },
  detectRetina: true
};

// 配置粒子变换函数
const particlesInit = async (engine) => {
  await loadSlim(engine)
}
</script>

<template>
  <div>
    <!-- 配置粒子展示 -->
    <Particles
        id="tsparticles"
        :options="options"
        :particlesInit="particlesInit"
    />

    <!-- 登录表单验证 -->
    <div class="formContainer">
      <h3>企业门户网站后台管理系统</h3>
      <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginRules"
          class="loginForm"
          label-width="80px"
          status-icon
      >
        <el-form-item
            label="用户名"
            prop="username"
        >
          <el-input
              v-model="loginForm.username"
              autocomplete="off"
          />
        </el-form-item>
        <el-form-item
            label="密码"
            prop="password"
        >
          <el-input
              v-model="loginForm.password"
              autocomplete="off"
              type="password"
          />
        </el-form-item>
        <el-form-item>
          <el-button
              type="primary"
              @click="submitForm()"
          >登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.formContainer {
  width: 500px;
  height: 300px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgba($color: #000000, $alpha: 0.5);
  color: white;
  text-align: center;
  padding: 20px;

  h3 {
    margin-top: 20px;
    font-size: 30px;
  }

  .loginForm {
    margin-top: 50px;
  }
}

:deep(.el-form-item__label) {
  color: white;
}
</style>    
