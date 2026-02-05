import ApiError from "../../utils/ApiError.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {prisma} from "../../lib/prisma.js";

const loginService = expressAsyncHandler(async (credentials) => {
  const { email, password } = credentials;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError(400, "Invalid username or password");
  }

  // Compare passwords
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new ApiError(400, "Invalid username or password");
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  };
});

export { loginService };
