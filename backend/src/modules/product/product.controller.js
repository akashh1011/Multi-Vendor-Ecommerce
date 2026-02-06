import expressAsyncHandler from "express-async-handler";
import productValidator from "./product.validator.js";
import productService from "./product.service.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

const allProducts = expressAsyncHandler(async (req, res) => {
  const errors = productValidator.getAllProductsSchema.validate(
    req.query
  ).error;
  if (errors) {
    throw new ApiError(400, "Invalid query parameters", errors.details);
  }
  const products = await productService.getAllProducts(req.query);
  return ApiResponse(res, 200, "Products retrieved successfully", products);
});

const productById = expressAsyncHandler(async (req, res) => {
  const errors = productValidator.idSchema.validate(req.params).error;
  if (errors) {
    throw new ApiError(400, "Invalid product ID", errors.details);
  }
  const product = await productService.getProductById(req.params.id);

  return ApiResponse(res, 200, "Product retrieved successfully", product);
});

const productBySlug = expressAsyncHandler(async (req, res) => {
  const errors = productValidator.getProductBySlugSchema.validate(
    req.params
  ).error;
  if (errors) {
    throw new ApiError(400, "Invalid product slug", errors.details);
  }
  const product = await productService.getProductBySlug(req.params.slug);
  return ApiResponse(res, 200, "Product retrieved successfully", product);
});

const createProduct = expressAsyncHandler(async (req, res) => {
  const errors = productValidator.createProductSchema.validate(req.body).error;
  if (errors) {
    throw new ApiError(400, "Invalid product data", errors.details);
  }
  const product = await productService.createProduct(req.body, req.user);
  return ApiResponse(res, 201, "Product created successfully", product);
});

const updateProduct = expressAsyncHandler(async (req, res) => {
  const idErrors = productValidator.idSchema.validate(req.params).error;
  if (idErrors) {
    throw new ApiError(400, "Invalid product ID", idErrors.details);
  }

  const bodyErrors = productValidator.updateProductSchema.validate(
    req.body
  ).error;
  if (bodyErrors) {
    throw new ApiError(400, "Invalid product data", bodyErrors.details);
  }

  const updatedProduct = await productService.updateProduct(
    req.params.id,
    req.body,
    req.user
  );
  return ApiResponse(res, 200, "Product updated successfully", updatedProduct);
});

const toggleProductStatus = expressAsyncHandler(async (req, res) => {
  const idErrors = productValidator.idSchema.validate(req.params).error;
  if (idErrors) {
    throw new ApiError(400, "Invalid product ID", idErrors.details);
  }

  const updatedProduct = await productService.toggleProductStatus(
    req.params.id,
    req.user
  );
  return ApiResponse(
    res,
    200,
    "Product status toggled successfully",
    updatedProduct
  );
});

const deleteProduct = expressAsyncHandler(async (req, res) => {
  const idErrors = productValidator.idSchema.validate(req.params).error;
  if (idErrors) {
    throw new ApiError(400, "Invalid product ID", idErrors.details);
  }

  const result = await productService.deleteProduct(req.params.id, req.user);
  return ApiResponse(res, 200, "Product deleted successfully", result);
});

export default {
  allProducts,
  productById,
  productBySlug,
  createProduct,
  updateProduct,
  toggleProductStatus,
  deleteProduct,
};
