import Joi from "joi";

export const reviewSchema = Joi.object({
  productId: Joi.string(),
  userId: Joi.string(),
  rating: Joi.number().required(),
  comment: Joi.string().required(),
  images: Joi.array().required(),
  color: Joi.string(),
  size: Joi.string()
});