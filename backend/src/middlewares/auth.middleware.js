import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import ENV from "../config/envConfig.js";

const auth = expressAsyncHandler(async (req, _res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

  if (!token) throw new ApiError(401, "Unauthorized: No token provided");

  try {
    const decoded = jwt.verify(token, ENV.JWT.SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    throw new ApiError(401, "Unauthorized: Invalid token");
  }
});

const authorize = (requiredRoles) => {
  return (req, _res, next) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized: No user information");
    }
    const userRoles = req.user.roles || [];
    const hasRole = requiredRoles.some((role) => userRoles.includes(role));
    if (!hasRole) {
      throw new ApiError(403, "Forbidden: You do not have the required role");
    }
    next();
  };
};

export { auth, authorize };
