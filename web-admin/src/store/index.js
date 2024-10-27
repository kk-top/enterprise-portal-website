import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
    state: {
        isGetterRouter: false,    //登录标志位
        isCollapsed: false,       // 侧边栏收起标志位
        userInfo: {}              // 用户信息
    },
    mutations: {
        // 登录标志位
        changeGetterRouter(state, value) {
            state.isGetterRouter = value
        },
        //控制侧边栏的展开
        changeCollapsed(state) {
            state.isCollapsed = !state.isCollapsed
        },
        changeUserInfo(state, value) {
            // 保存旧的用户信息的情况下添加新的用户信息
            state.userInfo = {
                ...state.userInfo,
                ...value
            }
        },
        clearUserInfo(state, value) {// 清除用户数据
            state.userInfo = {}
        }
    },

    plugins: [createPersistedState({
        paths: ['isCollapsed', 'userInfo'] //控制是否持久化
    })]
})
