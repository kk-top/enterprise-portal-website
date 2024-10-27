const express = require('express')
const ProductController = require('../../controllers/admin/ProductController')
const ProductRouter = express.Router()

const multer = require('multer')
const upload = multer({ dest: 'public/uploads/productCovers' })

ProductRouter.post('/add', upload.single('file'), ProductController.add)
ProductRouter.get('/list', ProductController.getList)
ProductRouter.post('/list', upload.single('file'), ProductController.updateList)
ProductRouter.get('/list/:id', ProductController.getList)
ProductRouter.delete('/list/:id', ProductController.delList)

module.exports = ProductRouter