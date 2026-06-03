import express from "express";

import {
  getAllTransactions,
  createTransaction,
  getTransactionById,
  updateTransaction,
  getTransactionsSummary,
  deleteTransaction,
} from "../controllers/transactions.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: User transactions management
 */

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [income, expense]
 *         example: expense
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         example: food
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         example: rent
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         example: 2026-01-01
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         example: 2026-12-31
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [created_at, date, amount, title]
 *         example: created_at
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         example: desc
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 10
 *     responses:
 *       200:
 *         description: List of transactions
 */
router.get("/", authMiddleware, getAllTransactions); //get all transactions
/**
 * @swagger
 * /transactions/summary:
 *   get:
 *     summary: Get transactions summary
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Transactions summary
 */
router.get("/summary", authMiddleware, getTransactionsSummary); // get summary
/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     summary: Get transaction by id
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Transaction found
 *       404:
 *         description: Transaction not found
 */
router.get("/:id", authMiddleware, getTransactionById); //get transaction by id
/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - amount
 *               - type
 *               - category
 *               - date
 *             properties:
 *               title:
 *                 type: string
 *                 example: Groceries
 *               amount:
 *                 type: number
 *                 example: 25.5
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *                 example: expense
 *               category:
 *                 type: string
 *                 example: food
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2026-06-03
 *     responses:
 *       201:
 *         description: Transaction created
 *       400:
 *         description: Validation error
 */
router.post("/", authMiddleware, createTransaction); // create transaction
/**
 * @swagger
 * /transactions/{id}:
 *   patch:
 *     summary: Update transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated groceries
 *               amount:
 *                 type: number
 *                 example: 30
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *                 example: expense
 *               category:
 *                 type: string
 *                 example: food
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2026-06-03
 *     responses:
 *       200:
 *         description: Transaction updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Transaction not found
 */
router.patch("/:id", authMiddleware, updateTransaction); // update transaction
/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     summary: Delete transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Transaction deleted
 *       404:
 *         description: Transaction not found
 */
router.delete("/:id", authMiddleware, deleteTransaction); // delete transaction

export default router;
