const mongoose = require("mongoose")
// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/company-system').then(res => {
    console.log('数据库已链接')
})