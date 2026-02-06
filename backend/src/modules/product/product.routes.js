import express from "express";
import productController from "./product.controller.js";
import { auth, authorize } from "../../middlewares/auth.middleware.js";

const router = express.Router();

const ADMIN_VENDOR = ["ADMIN", "VENDOR"];

router.get("/", productController.allProducts);
router.get("/:id", productController.productById);
router.get("/slug/:slug", productController.productBySlug);

router.post(
  "/",
  auth,
  authorize(ADMIN_VENDOR),
  productController.createProduct
);
router.put(
  "/:id",
  auth,
  authorize(ADMIN_VENDOR),
  productController.updateProduct
);
router.patch(
  "/:id/toggle",
  auth,
  authorize(ADMIN_VENDOR),
  productController.toggleProductStatus
);
router.delete(
  "/:id",
  auth,
  authorize(ADMIN_VENDOR),
  productController.deleteProduct
);

export default router;
