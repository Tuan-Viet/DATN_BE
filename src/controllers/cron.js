import Order from "../models/order.js";

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
        console.log(order);
        const updateStatus = await Order.findByIdAndUpdate(order._id, {
          status: 5,
        });

        if (!updateStatus) {
          return res.status(400).json({ message: "Loi cap nhat trang thai" });
        }
        orderChangeArr.push(updateStatus);
      }
    }
    return res.status(200).json(orderChangeArr);
  } catch (error) {
    console.error("Lỗi không xác định:", error.message);
  }
}
