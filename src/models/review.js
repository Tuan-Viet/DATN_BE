import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  nameUser: {
    type: String,
    default: "Admin",
  },
  comment: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});


const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    reply: [replySchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Tạo model cho đánh giá sản phẩm
export default mongoose.model("Review", reviewSchema);
