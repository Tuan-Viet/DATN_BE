import Order from "../models/order.js";

export async function updateOrderStatus(req, res) {
    try {
        const orders = await Order.find();
        if(!orders){
            return res.status(400).json({
                message: "khong tim thay order"
            })
        }
            for (const order of orders) {
                const orderId = order._id;
                const orderStatus = order.status;
                const paymentStatus = order.paymentStatus;

                // Kiểm tra trạng thái đơn hàng và thanh toán
                if (orderStatus === 4 && paymentStatus === 1) {

                        const updateStatus = await Order.findByIdAndUpdate(orderId, {
                            status: 5
                        })

                        if (!updateStatus){
                            console.log(1);

                            return res.status(400).json({message: "Loi cap nhat trang thai"})
                        }
                        return res.status(200).json(updateStatus)
                    } else {
                        console.error(`Lỗi khi cập nhật trạng thái đơn hàng ${orderId}.`);
                    }
                }
            

    } catch (error) {
        console.error('Lỗi không xác định:', error.message);
    }
}
