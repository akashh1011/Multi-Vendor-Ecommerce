import ApiError from "../../utils/ApiError.js";
import { prisma } from "../../config/prisma.js";

const getAllProducts = async ({
  page = 1,
  limit = 10,
  categoryId,
  vendorId,
} = {}) => {
  const skip = (page - 1) * limit;

  const total = await prisma.product.count({
    where: {
      isActive: true,
      categoryId: categoryId || undefined,
      vendorId: vendorId || undefined,
    },
  });

  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      categoryId: categoryId || undefined,
      vendorId: vendorId || undefined,
    },
    include: {
      category: true,
      vendor: true,
    },
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  return {
    products,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
};

// get product by id
const getProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      vendor: true,
      ratings: true,
    },
  });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

// get product by slug
const getProductBySlug = async (slug) => {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      vendor: true,
      ratings: true,
    },
  });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

const getProductsByCategory = async (categoryId, { page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;
  const total = await prisma.product.count({
    where: {
      isActive: true,
      categoryId,
    },
  });

  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      categoryId,
    },
    include: {
      category: true,
      vendor: true,
      ratings: true,
    },
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  return {
    products,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
};

const getAllProductsForVendor = async (user, query) => {
  const { page = 1, limit = 10 } = query;

  let vendorId;
  if (user.roles.includes("ADMIN")) {
    vendorId = query.vendorId; // Admin can pass vendorId to see all products
  } else {
    vendorId = user.id; // Vendor can see only their products
  }

  const skip = (page - 1) * limit;
  const total = await prisma.product.count({
    where: {
      vendorId,
    },
  });

  const products = await prisma.product.findMany({
    where: {
      vendorId,
    },
    include: {
      category: true,
      vendor: true,
      ratings: true,
    },
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  return {
    products,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
};

// create product
const createProduct = async (data, user) => {
  const { name, description, price, discountPrice, categoryId, isActive } =
    data;

  let vendorId;
  if (user.roles.includes("ADMIN")) {
    vendorId = data.vendorId;
  } else {
    vendorId = user.id;
  }

  const result = await prisma.product.create({
    data: {
      name,
      description,
      price,
      discountPrice: discountPrice || null,
      categoryId,
      vendorId,
      isActive,
    },
  });
  return result;
};

// update product
const updateProduct = async (id, data, user) => {
  const isAdmin = user.roles.includes("ADMIN");

  if (!isAdmin) {
    const product = await prisma.product.findFirst({
      where: { id, vendorId: user.id },
    });

    if (!product) {
      throw new ApiError(404, "Product not found or not authorized");
    }
  }

  const updateData = {};

  if (data.name !== undefined) updateData.name = data.name;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.price !== undefined) updateData.price = data.price;
  if (data.discountPrice !== undefined)
    updateData.discountPrice = data.discountPrice ?? null;
  if (data.categoryId !== undefined) updateData.categoryId = data.categoryId;
  if (data.isActive !== undefined) updateData.isActive = data.isActive;

  return prisma.product.update({
    where: { id },
    data: updateData,
  });
};

// toggle product status as active inactive
const toggleProductStatus = async (id, user) => {
  const isAdmin = user.roles.includes("ADMIN");

  let product;

  if (isAdmin) {
    product = await prisma.product.findUnique({
      where: { id },
    });
  } else {
    product = await prisma.product.findFirst({
      where: {
        id,
        vendorId: user.id,
      },
    });
  }

  if (!product) {
    throw new ApiError(404, "Product not found or not authorized");
  }

  await prisma.product.update({
    where: { id },
    data: {
      isActive: !product.isActive,
    },
  });

  return { ...product, isActive: !product.isActive };
};

// delete product
const deleteProduct = async (id, user) => {
  const isAdmin = user.roles.includes("ADMIN");

  let product;
  if (isAdmin) {
    product = await prisma.product.findUnique({ where: { id } });
  } else {
    product = await prisma.product.findFirst({
      where: {
        id,
        vendorId: user.id,
      },
    });
  }
  if (!product) {
    throw new ApiError(404, "Product not found or not authorized");
  }

  await prisma.product.delete({ where: { id } });
  return null;
};

export default {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getAllProductsForVendor,
  getProductBySlug,
  createProduct,
  updateProduct,
  toggleProductStatus,
  deleteProduct,
};
