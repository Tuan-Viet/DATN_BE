import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Tham chiếu đến model sản phẩm
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Tham chiếu đến model người dùng
      required: true,
    },
    color: {
      type: String
    },
    size: {
      type: String
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    images: [
      {
        type: Object,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Tạo model cho đánh giá sản phẩm
export default mongoose.model("Review", reviewSchema);
