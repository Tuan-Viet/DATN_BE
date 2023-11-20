// var partnerCode = "MOMO";
// var accessKey = "F8BBA842ECF85";
// var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
// var requestId = partnerCode + new Date().getTime();
// var orderId = requestId;
// var orderInfo = "pay with MoMo";
// var redirectUrl = "https://momo.vn/return";
// var ipnUrl = "https://callback.url/notify";
// // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
// var amount = "50000";
// var requestType = "captureWallet"
// var extraData = ""; //pass empty value if your merchant does not have stores

// //before sign HMAC SHA256 with format
// //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
// var rawSignature = "accessKey="+accessKey+"&amount=" + amount+"&extraData=" + extraData+"&ipnUrl=" + ipnUrl+"&orderId=" + orderId+"&orderInfo=" + orderInfo+"&partnerCode=" + partnerCode +"&redirectUrl=" + redirectUrl+"&requestId=" + requestId+"&requestType=" + requestType
// //puts raw signature
// console.log("--------------------RAW SIGNATURE----------------")
// console.log(rawSignature)
// //signature
// const crypto = require('crypto');
// var signature = crypto.createHmac('sha256', secretkey)
//     .update(rawSignature)
//     .digest('hex');
// console.log("--------------------SIGNATURE----------------")
// console.log(signature)

// //json object send to MoMo endpoint
// const requestBody = JSON.stringify({
//     partnerCode : partnerCode,
//     accessKey : accessKey,
//     requestId : requestId,
//     amount : amount,
//     orderId : orderId,
//     orderInfo : orderInfo,
//     redirectUrl : redirectUrl,
//     ipnUrl : ipnUrl,
//     extraData : extraData,
//     requestType : requestType,
//     signature : signature,
//     lang: 'en'
// });
// //Create the HTTPS objects
// const https = require('https');
// const options = {
//     hostname: 'test-payment.momo.vn',
//     port: 443,
//     path: '/v2/gateway/api/create',
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Content-Length': Buffer.byteLength(requestBody)
//     }
// }
// //Send the request and get the response
// const req = https.request(options, res => {
//     console.log(`Status: ${return res.statusCode}`);
//     console.log(`Headers: ${JSON.stringify(res.headers)}`);
//     res.setEncoding('utf8');
//     res.on('data', (body) => {
//         console.log('Body: ');
//         console.log(body);
//         console.log('payUrl: ');
//         console.log(JSON.parse(body).payUrl);
//     });
//     res.on('end', () => {
//         console.log('No more data in response.');
//     });
// })

// req.on('error', (e) => {
//     console.log(`problem with request: ${e.message}`);
// });
// // write data to request body
// console.log("Sending....")
// req.write(requestBody);
// req.end();
import axios from "axios";
import crypto from "crypto";
import Order from "../models/order.js";


export async function createPayment(requestBody) {
    try {
      const response = await axios.post('https://test-payment.momo.vn/v2/gateway/api/create', requestBody);
      return response.data.payUrl;
    } catch (error) {
      throw error;
    }
  }
export async function handleCreatePayment(req, res) {
    try {
      const partnerCode = "MOMO";
      const accessKey = "F8BBA842ECF85";
      const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
      const requestId = partnerCode + new Date().getTime();
      const orderId = req.body._id;
      const orderInfo = "pay with MoMo";
      const redirectUrl = "https://momo.vn/return";
      const ipnUrl = "https://datn-be-gy1y.onrender.com/api/paymentMethod/momo_ipn";
      const amount = req.body.totalMoney;
      const requestType = "payWithATM";
      const extraData = "";
  
      const rawSignature = "accessKey="+accessKey+"&amount=" + amount+"&extraData=" + extraData+"&ipnUrl=" + ipnUrl+"&orderId=" + orderId+"&orderInfo=" + orderInfo+"&partnerCode=" + partnerCode +"&redirectUrl=" + redirectUrl+"&requestId=" + requestId+"&requestType=" + requestType;
  
      const signature = crypto.createHmac('sha256', secretKey)
          .update(rawSignature)
          .digest('hex');
  
      const requestBody = {
        partnerCode: partnerCode,
        accessKey: accessKey,
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        extraData: extraData,
        requestType: requestType,
        signature: signature,
        lang: 'vi'
      };
  
      // Gọi hàm từ mô hình để tạo yêu cầu thanh toán
      const payUrl = await createPayment(requestBody);
  
      // Chuyển hướng người dùng đến URL thanh toán
      res.redirect(payUrl);
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).send('Internal Server Error');
    }
  }


  function verifySignature(data, signature, secretKey) {
    const expectedSignature = crypto.createHmac('sha256', secretKey)
      .update(data)
      .digest('hex');
  
    return expectedSignature === signature;
  }
  export const momoIpn = async(req, res) => {
    try {
      const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
        console.log(JSON.stringify(req.body));
      // Xác thực chữ ký
      const isSignatureValid = verifySignature(JSON.stringify(req.body), req.body.signature, secretKey);
  
      if (!isSignatureValid) {
        // Chữ ký không hợp lệ, có thể bị tấn công giả mạo
        console.error('Invalid signature');
        return  res.status(400).send('Invalid signature');
      }
  
      // Xác định trạng thái giao dịch
      const transactionStatus = req.body.resultCode === 0 ? 'SUCCESS' : 'FAILED';
  
      // Trích xuất thông tin từ req.body và cập nhật cơ sở dữ liệu
      const orderId = req.body.orderId;
      const amount = req.body.amount;
      const orderInfo = req.body.orderInfo;
      const transId = req.body.transId;
      const resultCode = req.body.resultCode;
      const message = req.body.message;
      const payType = req.body.payType;
      const responseTime = req.body.responseTime;
      const extraData = req.body.extraData;
      let checkAmount = true;
      const checkOrderId = await Order.findOne({ _id: orderId });

      if (checkOrderId){
      checkOrderId.totalMoney == amount ? checkAmount = true: checkAmount = false
      if (checkAmount) {
        if (checkOrderId.paymentStatus === 0) {
            if (resultCode === 0){
            await Order.updateOne({ _id: orderId }, { paymentStatus: 1 });
                return res.status(204)
            }else {
                await Order.findByIdAndDelete(orderId)
                return res.status(204)
            }
            
        }
    }
      }
      

    } catch (error) {
      console.error('Error:', error);
      return res.status(500).send('Internal Server Error');
    }
  };