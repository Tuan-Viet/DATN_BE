import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const orderReturnSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        reason: {
            type: String,
            required: true,
        },
        status: {
            type: Number,
            default: 1,
        },
        orderId: { type: String },
        orderDetails: [{ type: mongoose.Types.ObjectId, ref: "OrderDetail" }],
        deleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true, versionKey: false }
);
orderReturnSchema.plugin(mongoosePaginate);

export default mongoose.model("OrderReturn", orderReturnSchema);
