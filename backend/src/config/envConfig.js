import "dotenv/config";

function requireEnv(name, devDefault) {
  if (!process.env[name]) {
    if (process.env.NODE_ENV !== "production" && devDefault !== undefined) {
      return devDefault;
    }
    throw new Error(`Missing required env var: ${name}`);
  }
  return process.env[name];
}

export const LOG_ENV = {
  LEVEL: process.env.LOG_LEVEL || "combined",
  FOLDER: process.env.LOG_FOLDER || "logs",
  FILE: process.env.LOG_FILE || "app.log",
  ERROR_FILE: process.env.LOG_ERROR_FILE || "error.log",
  MAX_SIZE: process.env.LOG_MAX_SIZE || "10m",
  MAX_FILES: Number(process.env.LOG_MAX_FILES) || 14,
};

export const CORS_ENV = {
  ORIGINS: requireEnv("CORS_ORIGINS", "http://localhost:3000")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean),
  METHODS: process.env.CORS_METHODS || "GET,HEAD,PUT,PATCH,POST,DELETE",
  CREDENTIALS: process.env.CORS_CREDENTIALS === "true",
};

export const JWT_ENV = {
  SECRET: requireEnv("JWT_SECRET", "DEV_ONLY_JWT_SECRET_MySuperSecretKey"),
  EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1h",
};

export const DATABASE_ENV = {
  URL: requireEnv("DATABASE_URL", "postgresql://user:password@localhost:5432/multivendorecommerce"),
};  

const ENV = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT) || 3000,
  JWT: JWT_ENV,
  LOG: LOG_ENV,
  CORS: CORS_ENV,
  DATABASE: DATABASE_ENV,
};

export default Object.freeze(ENV);
