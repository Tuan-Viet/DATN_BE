import moment from "moment/moment";
import Order from "../models/order";
import "moment-timezone";
export const productRevenue = async (req, res) => {
  try {
    const productRevenue = await Order.find({
      //     createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
      //     deleted: false,
    }).populate({
      path: "orderDetails",
      populate: {
        path: "productDetailId",
        populate: {
          path: "product_id",
        },
      },
    });

    if (!productRevenue) {
      return res.status(400).json({ message: "Khong co ket qua" });
    }
    let productRevenueArray = [];

    // Duyệt qua các đơn đặt hàng
    productRevenue.forEach((order) => {
      // Duyệt qua các chi tiết đơn đặt hàng
      order.orderDetails.forEach((detail) => {
        // Kiểm tra xem sản phẩm đã tồn tại trong mảng chưa
        const existingProduct = productRevenueArray.find(
          (product) =>
            product.productId.toString() ===
            detail.productDetailId.product_id._id.toString()
        );

        if (existingProduct) {
          // Nếu sản phẩm đã tồn tại, cập nhật thông tin
          existingProduct.quantitySold += detail.quantity;
          existingProduct.totalOrders += 1;
          existingProduct.totalRevenue += detail.totalMoney;
          // Tính lợi nhuận theo công thức của bạn
          existingProduct.profit +=
            (detail.price - detail.costPrice) * detail.quantity;
        } else {
          // Nếu sản phẩm chưa tồn tại, thêm vào mảng
          productRevenueArray.push({
            productId: detail.productDetailId.product_id._id,
            productName: detail.productDetailId.product_id.title,
            quantitySold: detail.quantity,
            totalOrders: 1,
            totalRevenue: detail.totalMoney,
            // Tính lợi nhuận theo công thức của bạn
            profit: (detail.price - detail.costPrice) * detail.quantity,
          });
        }
      });
    });

    return res.status(200).json(productRevenueArray);
  } catch (error) {
    console.log(error);
  }
};
export const orderRevenue = async (req, res) => {
  try {
    const orders = await Order.find().populate({
      path: "orderDetails",
      populate: {
        path: "productDetailId",
        populate: {
          path: "product_id",
        },
      },
    });

    if (!orders) {
      return res.status(400).json({ message: "Không có kết quả" });
    }

    let orderStatisticsArray = [];

    orders.forEach((order) => {
      let totalQuantitySold = 0;
      let totalOrderValue = 0;
      let totalRevenue = 0;
      let totalProfit = 0;

      order.orderDetails.forEach((detail) => {
        totalQuantitySold += detail.quantity;
        totalOrderValue += detail.totalMoney;
        totalRevenue += detail.price * detail.quantity;
        totalProfit += (detail.price - detail.costPrice) * detail.quantity;
      });

      orderStatisticsArray.push({
        orderId: order._id,
        totalQuantitySold: totalQuantitySold,
        totalOrderValue: totalOrderValue,
        totalRevenue: totalRevenue,
        totalProfit: totalProfit,
      });
    });

    return res.status(200).json(orderStatisticsArray);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const orderRevanueByDate = async (req, res) => {
  try {
    const orders = await Order.find().populate({
      path: "orderDetails",
      populate: {
        path: "productDetailId",
        populate: {
          path: "product_id",
        },
      },
    });

    if (!orders) {
      return res.status(400).json({ message: "Không có kết quả" });
    }

    let orderStatisticsByTime = {};

    orders.forEach((order) => {
      const date = moment(order.createdAt)
        .tz("Asia/Ho_Chi_Minh")
        .format("YYYY-MM-DD");

      if (!orderStatisticsByTime[date]) {
        orderStatisticsByTime[date] = {
          totalOrders: 0,
          totalOrderValue: 0,
          totalRevenue: 0,
          totalProfit: 0,
          totalCostPrice: 0,
          totalQuantitySold: 0,
        };
      }

      let totalQuantitySold = 0;
      let totalOrderValue = 0;
      let totalRevenue = 0;
      let totalProfit = 0;
      let totalCostPrice = 0;

      order.orderDetails.forEach((detail) => {
        totalCostPrice += detail.costPrice * detail.quantity;
        totalQuantitySold += detail.quantity;
        totalOrderValue += detail.totalMoney;
        totalRevenue += detail.price * detail.quantity;
        totalProfit += (detail.price - detail.costPrice) * detail.quantity;
      });

      orderStatisticsByTime[date].totalOrders += 1;
      orderStatisticsByTime[date].totalOrderValue += totalOrderValue;
      orderStatisticsByTime[date].totalRevenue += totalRevenue;
      orderStatisticsByTime[date].totalProfit += totalProfit;
      orderStatisticsByTime[date].totalQuantitySold += totalQuantitySold;
      orderStatisticsByTime[date].totalCostPrice += totalCostPrice;
    });

    const resultArray = Object.entries(orderStatisticsByTime).map(
      ([date, stats]) => ({
        date: date,
        totalOrders: stats.totalOrders,
        totalOrderValue: stats.totalOrderValue,
        totalRevenue: stats.totalRevenue,
        totalProfit: stats.totalProfit,
        totalQuantitySold: stats.totalQuantitySold,
        totalCostPrice: stats.totalCostPrice,
      })
    );

    return res.status(200).json(resultArray);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
export const orderRevanueByMonth = async (req, res) => {
  try {
    const orders = await Order.find().populate({
      path: 'orderDetails',
      populate: {
        path: 'productDetailId',
        populate: {
          path: 'product_id',
        },
      },
    });

    if (!orders) {
      return res.status(400).json({ message: "Không có kết quả" });
    }

    let orderStatisticsByMonth = {};

    orders.forEach((order) => {
      const month = moment(order.createdAt).tz('Asia/Ho_Chi_Minh').format('YYYY-MM');

      if (!orderStatisticsByMonth[month]) {
        orderStatisticsByMonth[month] = {
          totalOrders: 0,
          totalOrderValue: 0,
          totalRevenue: 0,
          totalProfit: 0,
          totalCostPrice: 0,
          totalQuantitySold: 0,
        };
      }

      let totalQuantitySold = 0;
      let totalOrderValue = 0;
      let totalRevenue = 0;
      let totalProfit = 0;
      let totalCostPrice = 0;


      order.orderDetails.forEach((detail) => {
        totalCostPrice += detail.costPrice * detail.quantity;
        totalQuantitySold += detail.quantity;
        totalOrderValue += detail.totalMoney;
        totalRevenue += detail.price * detail.quantity;
        totalProfit += (detail.price - detail.costPrice) * detail.quantity;
      });

      orderStatisticsByMonth[month].totalOrders += 1;
      orderStatisticsByMonth[month].totalOrderValue += totalOrderValue;
      orderStatisticsByMonth[month].totalRevenue += totalRevenue;
      orderStatisticsByMonth[month].totalProfit += totalProfit;
      orderStatisticsByMonth[month].totalQuantitySold += totalQuantitySold;
      orderStatisticsByMonth[month].totalCostPrice += totalCostPrice;
    });

    const resultArray = Object.entries(orderStatisticsByMonth).map(([month, stats]) => ({
      month: month,
      totalOrders: stats.totalOrders,
      totalOrderValue: stats.totalOrderValue,
      totalRevenue: stats.totalRevenue,
      totalProfit: stats.totalProfit,
      totalQuantitySold: stats.totalQuantitySold,
      totalCostPrice: stats.totalCostPrice,
    }));

    return res.status(200).json(resultArray);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
