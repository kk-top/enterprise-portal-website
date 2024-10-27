const express = require('express')
const NewsController = require('../../controllers/admin/NewsController')
const NewsRouter = express.Router()

const multer = require('multer')
const upload = multer({ dest: 'public/uploads/newsCovers' })

NewsRouter.post('/add', upload.single('file'), NewsController.add)
NewsRouter.get('/list', NewsController.getList)
NewsRouter.get('/list/:id', NewsController.getList)
NewsRouter.post('/list', upload.single('file'), NewsController.updateList)
NewsRouter.put('/publish', NewsController.publish)
NewsRouter.delete('/list/:id', NewsController.delList)


module.exports = NewsRouter