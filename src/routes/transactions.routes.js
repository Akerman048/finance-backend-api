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

router.get("/", authMiddleware, getAllTransactions); //get all transactions
router.get("/summary", authMiddleware, getTransactionsSummary); // get summary
router.get("/:id", authMiddleware, getTransactionById); //get transaction by id
router.post("/", authMiddleware, createTransaction); // create transaction
router.patch("/:id", authMiddleware, updateTransaction); // update transaction

router.delete("/:id", authMiddleware, deleteTransaction); // delete transaction

export default router;
