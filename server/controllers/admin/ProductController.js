const ProductService = require('../../services/admin/ProductService')

const ProductController = {
    // 新增产品
    add: async (req, res) => {
        const cover = req.file ? `/uploads/productCovers/${ req.file.filename }` : ''
        const { title, introduction, detail } = req.body
        await ProductService.add({
            title, introduction, detail, cover, editTime: new Date()
        })
        res.send({ ActionType: 'OK' })
    },
    // 编辑产品
    updateList: async (req, res) => {
        const cover = req.file ? `/uploads/productCovers/${ req.file.filename }` : ''
        const { title, introduction, detail, _id } = req.body
        await ProductService.updateList({
            _id, title, introduction, detail, cover, editTime: new Date()
        })
        res.send({ ActionType: 'OK' })

    },
    // 获取产品列表
    getList: async (req, res) => {
        const result = await ProductService.getList({ _id: req.params.id })
        res.send({ ActionType: 'OK', data: result })
    },
    // 删除产品
    delList: async (req, res) => {
        await ProductService.delList({ _id: req.params.id })
        res.send({ ActionType: 'OK' })
    }
}

module.exports = ProductController