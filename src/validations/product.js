import joi from "joi";
export const productSchema = joi.object({
    title: joi.string().required(),
    price: joi.number().required().min(0),
    discount: joi.number().required().min(0),
    description: joi.string().required(),
    images: joi.array().required(),
    variants: joi.array().required(),
    categoryId: joi.string().required(),
    deleted: joi.boolean().default(false),
});
