import joi from "joi";
export const productDetailSchema = joi.object({
    product_id: joi.string().required(),
    color_id: joi.string().required(),
    size_id: joi.string().required(),
    sold: joi.number().required().min(0),
    quantity: joi.number().required().min(0),
    image: joi.string().required(),
    createdAt: joi.date().default(() => new Date()),
    updatedAt: joi.date().default(() => new Date()),
    deleted: joi.boolean().default(false),
});
