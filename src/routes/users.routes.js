import express from "express";
import {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
  getMe,
} from "../controllers/users.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { loginLimiter } from "../middlewares/loginLimiter.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginLimiter, loginUser);
router.post("/refresh", refreshToken);
router.use("/logout", logoutUser);
router.get("/me", authMiddleware, getMe);

export default router;
