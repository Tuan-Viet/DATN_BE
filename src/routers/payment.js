
import express from "express";
import { vnpayIpn, vnpayMethod } from "../controllers/payment.js";

const routerPay = express.Router()
routerPay.post('/create_payment_url', vnpayMethod);
routerPay.get('/vnpay_ipn',vnpayIpn)


export default routerPay