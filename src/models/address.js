import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    user_id: {
      type: String,
      required: true,
    },
    default: { type: Boolean, required: true },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Address", addressSchema);
