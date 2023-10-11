import express from "express"
import routerCategory from "./category.js"

const router = express.Router()

router.use('/categories', routerCategory)

export default router