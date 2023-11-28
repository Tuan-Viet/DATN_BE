import express from "express"
import routerProduct from "./product.js"
import routerProductDetail from "./productDetail.js"
import routerCategory from "./category.js"
import routerImages from "./upload.js"
import routerAuth from "./auth.js"
import routerSize from "./size.js"
import routerColor from "./color.js"
import routerVoucher from "./voucher.js"
import routerCart from "./cart.js"
import routerOrder from "./order.js"
import routerOrderDetail from "./orderDetail.js"
import routerPay from "./payment.js"
import routerMailer from "./mailer.js"

const router = express.Router()

router.use('/products', routerProduct)
router.use('/productdetails', routerProductDetail)
router.use('/categories', routerCategory)
router.use('/images', routerImages)
router.use('/sizes', routerSize)
router.use('/colors', routerColor)
router.use('/vouchers', routerVoucher)
router.use("/auth", routerAuth);
router.use('/carts', routerCart)
router.use('/orders', routerOrder)
router.use('/orderDetails', routerOrderDetail)
router.use("/paymentMethod", routerPay)
router.use("/mail", routerMailer)



export default router