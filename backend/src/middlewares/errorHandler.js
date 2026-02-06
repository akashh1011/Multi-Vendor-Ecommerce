import ENV from "../config/envConfig.js";
import { consoleLogger } from "../utils/logger.js";

const errorHandler = (error, req, res, _) => {
  const statusCode = error?.statusCode || 500;
  const message = error?.message || "Something went wrong";

  let ip =
    req?.ip || req?.connection?.remoteAddress || req.socket?.remoteAddress;
  if (ip?.substr(0, 7) === "::ffff:") ip = ip?.substr(7);

  consoleLogger.error({
    method: req.method,
    url: req.originalUrl,
    message,
    stack: error?.stack || "No stack available",
  });

  const isProduction = ENV.NODE_ENV === "production";

  const responseError = isProduction
    ? { error: message }
    : { error: message, stack: error?.stack };

  return res.status(statusCode).json({
    success: false,
    ...responseError,
  });
};

const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "The requested resource was not found on this server.",
  });
};

export { errorHandler, notFoundHandler };
