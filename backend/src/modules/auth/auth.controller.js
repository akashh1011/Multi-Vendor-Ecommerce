import expressAsyncHandler from "express-async-handler";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import authService from "./auth.service.js";
import authValidator from "./auth.validator.js";

const register = expressAsyncHandler(async (req, res) => {
  const { error } = authValidator.register.validate(req.body);
  if (error) {
    throw new ApiError(400, error.details[0].message);
  }

  const result = await authService.register(req.body);

  return ApiResponse(res, 201, "Registration Success", result);
});

const login = expressAsyncHandler(async (req, res) => {
  const { error } = authValidator.login.validate(req.body);
  if (error) {
    throw new ApiError(400, error.details[0].message);
  }

  const result = await authService.login(req.body);

  return ApiResponse(res, 200, "Login Success", result);
});

export default {
  register,
  login,
};
