import express from "express";
import ApiResponse from "../utils/ApiResponse.js";
import authRouter from "../modules/auth/auth.route.js";

const router = express.Router();

router.get("/", (_, res) => {
  return ApiResponse(res, 200, "API is running", null);
});

router.use("/auth", authRouter);

export default router;
