const express = require('express')
const ProductController = require('../../controllers/web/ProductController')
const ProductRouter = express.Router()

ProductRouter.get('/list', ProductController.getList)

module.exports = ProductRouter