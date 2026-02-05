import express from "express";
import ApiResponse from "../utils/ApiResponse.js";
import authRouter from "../modules/auth/auth.route.js";
import { prisma } from "../lib/prisma.js";


const router = express.Router();

router.get("/", (_, res) => {
  return ApiResponse(res, 200, "API is running", null);
});

router.use("/auth", authRouter);


router.get("/user", async (_, res) => {
  const users = await prisma.user.findMany();
  return ApiResponse(res, 200, "User route is working", users);
})

;
export default router;
