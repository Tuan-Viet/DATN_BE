import Order from "../models/order.js";
import OrderReturn from "../models/order_return.js";


export async function updateOrderStatus(req, res) {
  try {
    const orders = await Order.find();
    if (orders.length === 0) {
        return res.status(400).json({
          message: "Không tìm thấy đơn hàng",
        });
      }
    let orderChangeArr = [];
    for (const order of orders) {
      if (order.status === 4 && order.paymentStatus === 1) {
        const updateStatus = await Order.findByIdAndUpdate(order._id, {
          status: 5,
        });

        if (!updateStatus) {
          return res.status(400).json({ message: "Loi cap nhat trang thai" });
        }
        orderChangeArr.push(updateStatus);    
        const orderReturn = await OrderReturn.findOne({ orderId: order._id });
        console.log(orderReturn);
      if (orderReturn && orderReturn.status == 3) {
        const updateReturnStatus = await OrderReturn.findByIdAndUpdate(
          orderReturn._id,
          {
            status: 4,
          }
        );
        console.log(updateReturnStatus);
        if (!updateReturnStatus) {
          return res
            .status(400)
            .json({ message: "Lỗi cập nhật trạng thái đơn trả hàng" });
        }
      }
      }
    }
    return res.status(200).json(orderChangeArr);
  } catch (error) {
    console.error("Lỗi không xác định:", error.message);
  }
}
