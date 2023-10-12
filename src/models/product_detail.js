import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productDetailSchema = new mongoose.Schema(
    {
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        color_id: {
            type: String,
            required: true,
        },
        size_id: {
            type: String,
            required: true,
        },
        sold: {
            type: Number,
            required: true,
            min: 0,
        },
        quantity: {
            type: Number,
            required: true,
            min: 0,
        },
        image: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
        deleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true, versionKey: false }
);
productDetailSchema.plugin(mongoosePaginate);

export default mongoose.model("ProductDetail", productDetailSchema);