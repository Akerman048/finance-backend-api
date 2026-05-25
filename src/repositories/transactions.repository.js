import { pool } from "../db/pool.js";

/* FIND ALL TRANSACTIONS */
export const findAllTransactions = async (userId, filters) => {
  const conditions = ["user_id = $1"];
  const values = [userId];

  if (filters.type) {
    values.push(filters.type);
    conditions.push(`type = $${values.length}`);
  }

  if (filters.category) {
    values.push(filters.category);
    conditions.push(`category = $${values.length}`);
  }

  if (filters.search) {
    values.push(`%${filters.search}%`);
    conditions.push(`title ILIKE $${values.length}`);
  }

  if (filters.startDate) {
    values.push(filters.startDate);
    conditions.push(`date >= $${values.length}`);
  }

  if (filters.endDate) {
    values.push(filters.endDate);
    conditions.push(`date <= $${values.length}`);
  }

  const allowedSortBy = ["created_at", "date", "amount", "title"];
  const sortBy = allowedSortBy.includes(filters.sortBy)
    ? filters.sortBy
    : "created_at";

  const order = filters.order.toLowerCase() === "asc" ? "ASC" : "DESC";

  const page = Math.max(filters.page, 1);
  const limit = Math.min(Math.max(filters.limit, 1), 100);
  const offset = (page - 1) * limit;

  values.push(limit);
  const limitIndex = values.length;

  values.push(offset);
  const offsetIndex = values.length;

  const result = await pool.query(
    `
    SELECT *
    FROM transactions
    WHERE ${conditions.join(" AND ")}
    ORDER BY ${sortBy} ${order}
    LIMIT $${limitIndex}
    OFFSET $${offsetIndex}
    `,
    values,
  );

  return {
    data: result.rows,
    page,
    limit,
  };
};

/* FIND TRANSACTION BY ID */
export const findTransactionById = async (id, userId) => {
  const result = await pool.query(
    `
    SELECT * 
    FROM transactions
    WHERE id = $1 AND user_id = $2`,
    [id, userId],
  );

  return result.rows[0];
};

/* INSERT NEW TRANSACTION*/
export const insertTransaction = async (userId, data) => {
  const { title, amount, type, category, date } = data;

  const result = await pool.query(
    `
    INSERT INTO transactions
    (user_id, title, amount, type, category, date)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `,
    [userId, title, amount, type, category, date],
  );

  return result.rows[0];
};

/* UPDATE TRANSACTION BY ID */
export const updateTransactionById = async (id, userId, data) => {
  const { title, amount, type, category, date } = data;

  const result = await pool.query(
    `
    UPDATE transactions
    SET 
      title = $1,
      amount = $2,
      type = $3,
      category = $4,
      date = $5
    WHERE id = $6 AND user_id = $7
    RETURNING *
    `,
    [title, amount, type, category, date, id, userId],
  );

  return result.rows[0];
};

/* GET SUMMARY */
export const getTransactionsSummaryRepository = async (userId) => {
  const result = await pool.query(
    `
    SELECT
      COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) AS income,
      COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) AS expenses
    FROM transactions
    WHERE user_id = $1
    `,
    [userId],
  );

  const income = Number(result.rows[0].income);
  const expenses = Number(result.rows[0].expenses);

  return {
    income,
    expenses,
    balance: income - expenses,
  };
};
/* DELETE TRANASCTION BY ID */
export const deleteTransactionById = async (id, userId) => {
  const result = await pool.query(
    `
    DELETE FROM transactions
    WHERE id = $1 AND user_id = $2
    RETURNING *
    `,
    [id, userId],
  );

  return result.rows[0];
};
