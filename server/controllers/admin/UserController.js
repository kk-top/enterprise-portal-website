const UserService = require('../../services/admin/UserService')
const JWT = require("../../util/JWT")

const UserController = {
    // 登录接口
    login: async (req, res) => {
        const result = await UserService.login(req.body)

        // 登录校验
        if (result.length === 0) {
            res.send({ code: "-1", error: "用户名密码不匹配" })
        } else {
            // 生成token(用户信息,有效时间7天)
            const token = JWT.generate({
                _id: result[0]._id,
                username: result[0].username
            }, "1d")
            res.setHeader("Authorization", token)   //同时将token在响应头中返回给前端
            res.send({
                ActionType: 'OK',
                data: {
                    username: result[0].username,
                    gender: result[0].gender ? result[0].gender : 0,
                    introduction: result[0].introduction,
                    avatar: result[0].avatar,
                    role: result[0].role
                }
            })
        }
    },

    // 更新用户
    upload: async (req, res) => {
        const { username, introduction, gender } = req.body
        const token = req.headers['authorization'].split(' ')[1]
        const avatar = req.file ? `/uploads/avatars/${ req.file.filename }` : ''
        const payload = JWT.verify(token)
        await UserService.upload({
            _id: payload._id, username, introduction, gender: Number(gender), avatar
        })
        if (avatar) {
            res.send({
                ActionType: 'OK',
                data: {
                    username, introduction,
                    gender: Number(gender),
                    avatar
                }
            })
        } else {
            res.send({
                ActionType: 'OK',
                data: {
                    username, introduction,
                    gender: Number(gender)
                }
            })
        }
    },

    // 添加用户
    add: async (req, res) => {
        const { username, introduction, gender, role, password } = req.body
        const avatar = req.file ? `/uploads/avatars/${ req.file.filename }` : ''
        await UserService.add({
            username, introduction, gender: Number(gender), avatar, role: Number(role), password
        })
        res.send({ ActionType: 'OK' })
    },

    // 获取用户列表
    getList: async (req, res) => {
        const result = await UserService.getList(req.params)
        res.send({ ActionType: 'OK', data: result })
    },

    // 删除用户
    delList: async (req, res) => {
        await UserService.delList({ _id: req.params.id })
        res.send({ ActionType: 'OK' })
    },

    // 修改用户
    putList: async (req, res) => {
        await UserService.putList(req.body)
        res.send({ ActionType: 'OK' })
    }
}

module.exports = UserController