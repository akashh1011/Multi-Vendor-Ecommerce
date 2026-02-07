import Joi from "joi";

const createProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
  discountPrice: Joi.number().positive().less(Joi.ref("price")).optional(),
  images: Joi.array().items(Joi.string().uri()).required(),
  categoryId: Joi.string().uuid().required(),
  isActive: Joi.boolean().optional().default(true),
});

const getAllProductsSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  categoryId: Joi.string().uuid().optional(),
  vendorId: Joi.string().uuid().optional(),
});

const updateProductSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  price: Joi.number().positive().optional(),
  discountPrice: Joi.number().positive().less(Joi.ref("price")).optional(),
  images: Joi.array().items(Joi.string().uri()).optional(),
  categoryId: Joi.string().uuid().optional(),
  isActive: Joi.boolean().optional(),
});

const idSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

const getProductBySlugSchema = Joi.object({
  slug: Joi.string().required(),
});

const getProductsByCategorySchema = Joi.object({
  categoryId: Joi.string().uuid().required(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
});

export default {
  createProductSchema,
  getAllProductsSchema,
  updateProductSchema,
  idSchema,
  getProductBySlugSchema,
  getProductsByCategorySchema,
};
