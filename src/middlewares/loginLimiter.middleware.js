import rateLimit from "express-rate-limit";

export const loginLmiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    message: "Too many login attempts, try again later",
  },
});
