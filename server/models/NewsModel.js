const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NewsType = {
    title: String,           // 标题
    content: String,         // 内容
    category: Number,        //类别,1,2,3
    cover: String,           //封面(保存的是路径)
    isPublish: Number,       // 0未发布, 1已发布
    editTime: Date
}

const NewsModel = mongoose.model('news', new Schema(NewsType))

module.exports = NewsModel