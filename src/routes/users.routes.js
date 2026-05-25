import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
} from "../controllers/users.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { loginLmiter } from "../middlewares/loginLimiter.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginLmiter, loginUser);
router.get("/me", authMiddleware, getMe);

export default router;
