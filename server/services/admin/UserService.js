const UserModel = require("../../models/UserModel")

const UserService = {
    // 登录校验
    login: async ({ username, password }) => {
        return UserModel.find({ username, password })
    },

    // 更新用户
    upload: async ({ _id, username, introduction, gender, avatar }) => {
        if (avatar) {// 判断是否存在头像数据
            return UserModel.updateOne({ _id }, {
                username, introduction, gender, avatar
            })
        } else {
            return UserModel.updateOne({ _id }, {
                username, introduction, gender
            })
        }
    },

    // 添加用户数据
    add: async ({ username, introduction, gender, avatar, password, role }) => {
        return UserModel.create({
            username, introduction, gender, avatar, password, role
        })
    },

    // 获取用户列表数据
    getList: async ({ id }) => {
        // 判断是否有用户id传进来
        return id
            ? UserModel.find({ _id: id }, ['username','password', 'role', 'avatar', 'introduction', 'gender'])
            : UserModel.find({}, ['username', 'role', 'avatar', 'introduction', 'gender'])
    },

    // 删除用户数据
    delList: async ({ _id }) => {
        return UserModel.deleteOne({ _id })
    },

    // 修改用户数据(用户列表)
    putList: async (body) => {
        return UserModel.updateOne({ _id: body._id }, body)
    }
}

module.exports = UserService