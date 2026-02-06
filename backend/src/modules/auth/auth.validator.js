import Joi from "joi";

const register = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(15).required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("VENDOR", "CUSTOMER").default("CUSTOMER"),
});

const login = Joi.object({
  emailOrUsername: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

export default {
  register,
  login,
};
