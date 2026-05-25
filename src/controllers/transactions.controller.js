import {
  createTransactionSchema,
  updateTransactionSchema,
} from "../schemas/transaction.schema.js";

import {
  getAllTransactionsService,
  getTransactionByIdService,
  createTransactionService,
  updateTransactionService,
  getTransactionsSummaryService,
  deleteTransactionByIdService,
} from "../services/transactions.service.js";

/* GET ALL TRANSACTIONS */
export const getAllTransactions = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const filters = {
      type: req.query.type,
      category: req.query.category,
      search: req.query.search,
      startDate: req.query.startDate,
      endDate: req.query.endDate,
      sortBy: req.query.sortBy || "created_at",
      order: req.query.order || "desc",
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
    };

    const transactions = await getAllTransactionsService(userId, filters);

    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

/* GET TRANSACTION BY ID */
export const getTransactionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const transaction = await getTransactionByIdService(id, userId);

    res.json(transaction);
  } catch (error) {
    next(error);
  }
};

/* CREATE TRANSACTION */
export const createTransaction = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const validation = createTransactionSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Validation error",
        errors: validation.error.flatten().fieldErrors,
      });
    }

    const transaction = await createTransactionService(userId, validation.data);

    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
};

/* UPDATE TRANSACTION */
export const updateTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const validation = updateTransactionSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Validation error",
        errors: validation.error.flatten().fieldErrors,
      });
    }

    if (Object.keys(validation.data).length === 0) {
      return res.status(400).json({
        message: "At least one field is required",
      });
    }

    const transaction = await updateTransactionService(
      id,
      userId,
      validation.data,
    );

    res.status(200).json(transaction);
  } catch (error) {
    next(error);
  }
};

/* GET SUMMARY */
export const getTransactionsSummary = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const summary = await getTransactionsSummaryService(userId);

    return res.json(summary);
  } catch (error) {
    next(error);
  }
};

/* DELETE TRANSACTION */
export const deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const transaction = await deleteTransactionByIdService(id, userId);

    res.status(200).json({ message: "Transaction deleted", transaction });
  } catch (error) {
    next(error);
  }
};
