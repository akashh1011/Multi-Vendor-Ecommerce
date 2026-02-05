import ApiResponse from "../../utils/ApiResponse.js";
import { loginService } from "./auth.service.js";

const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const result = await loginService(req.body);

  return ApiResponse(res, 200, "Login Success", result);
};

export default loginController;
