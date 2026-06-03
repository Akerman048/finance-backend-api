import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getMonthlyAnalytics } from "../controllers/analytics.controller.js";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: User financial analytics
 */

/**
 * @swagger
 * /analytics/monthly:
 *   get:
 *     summary: Get monthly analytics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly income, expenses and balance
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   month:
 *                     type: string
 *                     example: 2026-06
 *                   income:
 *                     type: number
 *                     example: 2500
 *                   expenses:
 *                     type: number
 *                     example: 1200
 *                   balance:
 *                     type: number
 *                     example: 1300
 *       401:
 *         description: Unauthorized
 */
router.get("/monthly", authMiddleware, getMonthlyAnalytics);

export default router;
