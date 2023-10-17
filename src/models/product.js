import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        discount: {
            type: Number,
            required: false,
        },
        description: {
            type: String,
            required: true,
        },
        images: [
            {
                type: Object,
                required: true,
            },
        ],
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        variants: [
            {
                imageColor: { type: String, required: true },
                nameColor: { type: String, required: true },
                items: [
                    {
                        size: { type: String, required: true },
                        quantity: { type: Number, required: true },
                        available: { type: Boolean, default: true },
                        hide: { type: Boolean, default: false },
                    }
                ],
                sold: {
                    type: Number,
                    required: true,
                    default: 0,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
                updatedAt: {
                    type: Date,
                    default: Date.now,
                },
            }
        ],
        isSale: {
            status: {
                type: Boolean,
                default: false
            },
            percent: {
                type: Number,
                default: 0,
                max: 100,
            },
            end: {
                type: Date
            }
        },
        review: {
            count: {
                type: Number,
                require: false,
                default: 0
            },
            avg: {
                type: Number,
                required: false
            },
            items: [
                {
                    byUser: {
                        type: String
                    },
                    content: {
                        type: String
                    },
                    date: {
                        type: Date,
                        default: Date.now
                    }

                }
            ]
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
        hide: {
            type: Boolean,
            default: false,
        },
        deleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true, versionKey: false }
);
productSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", productSchema);