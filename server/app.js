const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const JWT = require('./util/JWT')
require('./config/db.config')

const indexRouter = require('./routes/index')
const UserRouter = require('./routes/admin/UserRouter')
const NewsRouter = require('./routes/admin/NewsRouter')
const ProductRouter = require('./routes/admin/ProductRouter')

const WebNewsRouter = require('./routes/web/NewsRouter')
const WebProductRouter = require('./routes/web/ProductRouter')


const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

// web接口
app.use('/webapi/news', WebNewsRouter)
app.use('/webapi/product', WebProductRouter)

// token验证
app.use((req, res, next) => {
    // 开启跨域 Authorization 字段
    res.setHeader('Access-Control-Expose-Headers', 'Authorization')

    // 排除登录接口
    if (req.url === "/adminapi/user/login") {
        next()
        return;
    }

    const token = req.headers["authorization"].split(" ")[1]
    // token解析
    if (token) {
        const payload = JWT.verify(token)
        if (payload) {
            // 每一次请求,重新生成新的token
            const newToken = JWT.generate({
                _id: payload._id,
                username: payload.username
            }, "1d")
            res.setHeader("Authorization", newToken)
            next()
        } else {
            res.status(401).send({ errCode: "-1", errorInfo: "token过期" })
        }
    }
})

// admin接口
app.use('/adminapi/user', UserRouter)
app.use('/adminapi/news', NewsRouter)
app.use('/adminapi/product', ProductRouter)

module.exports = app
