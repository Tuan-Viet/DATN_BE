
import axios from "axios";
import crypto from "crypto";
import Order from "../models/order.js";

export async function createPayment(requestBody) {
  try {
    const response = await axios.post(
      "https://test-payment.momo.vn/v2/gateway/api/create",
      requestBody
    );
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
    const ipnUrl =
      "https://datn-be-gy1y.onrender.com/api/paymentMethod/momo_ipn";
    const amount = req.body.totalMoney;
    const requestType = "payWithATM";
    const extraData = "";

    const rawSignature =
      "accessKey=" +
      accessKey +
      "&amount=" +
      amount +
      "&extraData=" +
      extraData +
      "&ipnUrl=" +
      ipnUrl +
      "&orderId=" +
      orderId +
      "&orderInfo=" +
      orderInfo +
      "&partnerCode=" +
      partnerCode +
      "&redirectUrl=" +
      redirectUrl +
      "&requestId=" +
      requestId +
      "&requestType=" +
      requestType;
      const signatureBuffer = Buffer.from(rawSignature, "utf-8");
     const signature =  crypto
      .createHmac("sha256", secretKey)
      .update(signatureBuffer)
      .digest("hex");
console.log(signature);
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
      lang: "vi",
    };

    // Gọi hàm từ mô hình để tạo yêu cầu thanh toán
    const payUrl = await createPayment(requestBody);

    // Chuyển hướng người dùng đến URL thanh toán
    res.redirect(payUrl);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal Server Error");
  }
}


export const momoIpn = async (req, res) => {
  try {
    const orderId = req.body.orderId;
    const amount = req.body.amount;
    const orderInfo = req.body.orderInfo;
    const transId = req.body.transId;
    const resultCode = req.body.resultCode;
    const message = req.body.message;
    const payType = req.body.payType;
    const responseTime = req.body.responseTime;
    const extraData = req.body.extraData;
    const requestId = req.body.requestId;
    let checkAmount = true;
    const ipnUrl =
      "https://datn-be-gy1y.onrender.com/api/paymentMethod/momo_ipn";
    const partnerCode = "MOMO";
    const redirectUrl = "https://momo.vn/return";
    const requestType = "payWithATM";
    const accessKey = "F8BBA842ECF85";
    const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    // Xác thực chữ ký
    const rawSignature =
      "accessKey=" +
      accessKey +
      "&amount=" +
      amount +
      "&extraData=" +
      extraData +
      "&ipnUrl=" +
      ipnUrl +
      "&orderId=" +
      orderId +
      "&orderInfo=" +
      orderInfo +
      "&partnerCode=" +
      partnerCode +
      "&redirectUrl=" +
      redirectUrl +
      "&requestId=" +
      requestId +
      "&requestType=" +
      requestType;
      const signatureBuffer = Buffer.from(rawSignature, "utf-8");
      const signature = crypto
      .createHmac("sha256", secretKey)
      .update(signatureBuffer)
      .digest("hex");
    const isSignatureValid = signature == req.body.signature? true: false
    console.log("1 ",req.body.signature);
    console.log("2 ",signature);
    if (!isSignatureValid) {
      // Chữ ký không hợp lệ, có thể bị tấn công giả mạo
      console.error("Invalid signature");
      return res.status(400).send("Invalid signature");
    }

    // Xác định trạng thái giao dịch
    const transactionStatus = req.body.resultCode === 0 ? "SUCCESS" : "FAILED";

    // Trích xuất thông tin từ req.body và cập nhật cơ sở dữ liệu

    const checkOrderId = await Order.findOne({ _id: orderId });

    if (checkOrderId) {
      checkOrderId.totalMoney == amount
        ? (checkAmount = true)
        : (checkAmount = false);
      if (checkAmount) {
        if (checkOrderId.paymentStatus === 0) {
          if (resultCode === 0) {
            await Order.updateOne({ _id: orderId }, { paymentStatus: 1 });
            return res.status(204);
          } else {
            await Order.findByIdAndDelete(orderId);
            return res.status(204);
          }
        }
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal Server Error");
  }
};
