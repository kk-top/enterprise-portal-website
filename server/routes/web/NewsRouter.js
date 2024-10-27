const express = require('express')
const NewsController = require('../../controllers/web/NewsController')
const NewsRouter = express.Router()

NewsRouter.get('/list', NewsController.getList)
NewsRouter.get('/list/:id', NewsController.getList)
NewsRouter.get('/toplist', NewsController.getTopList)

module.exports = NewsRouter