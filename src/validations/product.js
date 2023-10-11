import joi from "joi";
export const productSchema = joi.object({
    title: joi.string().required(),
    price: joi.number().required().min(0),
    discount: joi.number().required().min(0),
    description: joi.string().required(),
    // images: joi.array().required(),
    thumnail: joi.string().required(),
    categoryId: joi.string().required(),
    createdAt: joi.date().default(() => new Date()),
    updatedAt: joi.date().default(() => new Date()),
    deleted: joi.boolean().default(false),
});
