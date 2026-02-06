import ApiError from "../../utils/ApiError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/prisma.js";
import ENV from "../../config/envConfig.js";

const register = async (data) => {
  const { name, email, phone, username, password, role } = data;

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email,
        },
        {
          username,
        },
        {
          phone,
        },
      ],
    },
  });

  if (existingUser) {
    if (existingUser.email === email) {
      throw new ApiError(400, "Email already in use");
    }
    if (existingUser.username === username) {
      throw new ApiError(400, "Username already in use");
    }
    if (existingUser.phone === phone) {
      throw new ApiError(400, "Phone number already in use");
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      phone,
      username,
      password: hashedPassword,
      roles: [role || "CUSTOMER"],
    },
  });

  return newUser.id;
};

const login = async (credentials) => {
  const { emailOrUsername, password } = credentials;

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
    },
  });

  if (!user) {
    throw new ApiError(400, "Invalid username or password");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new ApiError(400, "Invalid username or password");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      roles: user.roles,
    },
    ENV.JWT.SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      roles: user.roles,
    },
  };
};

export default { login, register };
