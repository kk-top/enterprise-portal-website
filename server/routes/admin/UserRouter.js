const express = require('express')
const UserController = require('../../controllers/admin/UserController')
const UserRouter = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'public/uploads/avatars' })

UserRouter.post("/login", UserController.login)
UserRouter.post("/upload", upload.single('file'), UserController.upload)
UserRouter.post("/add", upload.single('file'), UserController.add)
UserRouter.get("/list", UserController.getList)
UserRouter.get("/list/:id", UserController.getList)
UserRouter.put("/list/:id", UserController.putList)
UserRouter.delete("/list/:id", UserController.delList)

module.exports = UserRouter;
