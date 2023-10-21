import express from "express"
import routerProduct from "./product.js"
import routerProductDetail from "./productDetail.js"
import routerCategory from "./category.js"
import routerImages from "./upload.js"
import routerSize from "./size.js"
import routerColor from "./color.js"
import routerVoucher from "./voucher.js"

const router = express.Router()

router.use('/products', routerProduct)
router.use('/productDetails', routerProductDetail)
router.use('/categories', routerCategory)
router.use('/images', routerImages)
router.use('/sizes', routerSize)
router.use('/colors', routerColor)
router.use('/vouchers', routerVoucher)



export default router