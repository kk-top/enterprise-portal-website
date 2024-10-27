const NewsModel = require('../../models/NewsModel')

const NewsService = {
    // 获取已发布新闻列表
    getList: async ({ _id }) => {
        return _id
            ? NewsModel.find({ _id, isPublish: 1 })
            : NewsModel.find({ isPublish: 1 }).sort({ editTime: -1 })
    },
    // 获取前几条新闻数据
    getTopList: async ({ limit }) => {
        return NewsModel.find({ isPublish: 1 }).sort({ editTime: -1 }).limit(limit)
    }
}

module.exports = NewsService