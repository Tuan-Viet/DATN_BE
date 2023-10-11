import express from "express"
import routerCategory from "./category.js"
import routerImages from "./upload.js"

const router = express.Router()

router.use('/categories', routerCategory)
router.use('/images', routerImages)


export default router