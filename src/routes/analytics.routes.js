import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getMonthlyAnalytics } from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/monthly", authMiddleware, getMonthlyAnalytics);

export default router;
