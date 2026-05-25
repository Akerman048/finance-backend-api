import {
  findAllTransactions,
  findTransactionById,
  insertTransaction,
  updateTransactionById,
  getTransactionsSummaryRepository,
  deleteTransactionById,
} from "../repositories/transactions.repository.js";

import { createError } from "../utils/createError.js";

/* GET ALL TRANSACTIONS */
export const getAllTransactionsService = async (userId,filters) => {
  return await findAllTransactions(userId,filters);
};

/* GET TRANSACTION BY ID */
export const getTransactionByIdService = async (id, userId) => {
  const transaction = await findTransactionById(id, userId);
  if (!transaction) {
    throw createError(404, "Transaction not found");
  }
  return transaction;
};

/* CREATE TRANSACTION */
export const createTransactionService = async (userId, data) => {
  return await insertTransaction(userId, data);
};

/* UPDATE TRANSACTION BY ID */
export const updateTransactionService = async (id, userId, data) => {
  const existingTransaction = await findTransactionById(id, userId);

  if (!existingTransaction) {
    throw createError(404, "Transaction not found");
  }

  const updatedData = {
    title: data.title ?? existingTransaction.title,
    amount: data.amount ?? existingTransaction.amount,
    type: data.type ?? existingTransaction.type,
    category: data.category ?? existingTransaction.category,
    date: data.date ?? existingTransaction.date,
  };

  return await updateTransactionById(id, userId, updatedData);
};

/* GET SUMMARY */
export const getTransactionsSummaryService = async (userId) => {
  return await getTransactionsSummaryRepository(userId);
};

/* DELETE TRANSACTION BY ID */
export const deleteTransactionByIdService = async (id, userId) => {
  const existingTransaction = await findTransactionById(id, userId);

  if (!existingTransaction) {
    throw createError(404, "Transaction not found");
  }

  return await deleteTransactionById(id, userId);
};
