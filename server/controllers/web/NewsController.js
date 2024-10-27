const NewsService = require('../../services/web/NewsService')

const NewsController = {
    // 获取已发布的新闻列表
    getList: async (req, res) => {
        const result = await NewsService.getList({ _id: req.params.id })
        res.send({ ActionType: 'OK', data: result })
    },

    // 获取前几条新闻列表
    getTopList: async (req, res) => {
        const result = await NewsService.getTopList({ limit: req.query.limit })
        res.send({ ActionType: 'OK', data: result })
    }


}

module.exports = NewsController