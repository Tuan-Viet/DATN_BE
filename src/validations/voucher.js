import Joi from "joi";

const validVoucherTypes = ["percent", "value", "Type3"]; // Thay thế bằng các loại Voucher cụ thể

export const voucherValidationSchema = Joi.object({
    title: Joi.string().required(),
    type: Joi.string().valid(...validVoucherTypes).required(),
    code: Joi.string().required(),
    quantity: Joi.number().integer().min(0).required(),
    discount: Joi.number().min(0).required(),
    used: Joi.number().integer().min(0).required(),
    minOrderValue: Joi.number().required(),
    validFrom: Joi.date().iso().required(),
    validTo: Joi.date().iso().greater(Joi.ref('validFrom')).required(),
});
