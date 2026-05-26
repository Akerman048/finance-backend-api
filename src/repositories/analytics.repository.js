import { pool } from "../db/pool.js";

export const getMonthlyAnalyticsRepository = async (userId) => {
  const result = await pool.query(
    `
   SELECT
      TO_CHAR(date, 'YYYY-MM') AS month,

      COALESCE(
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END),
        0
      ) AS income,

      COALESCE(
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END),
        0
      ) AS expenses

    FROM transactions
    WHERE user_id = $1

    GROUP BY month
    ORDER BY month DESC
    `,
    [userId],
  );

  return result.rows.map((row) => ({
    month: row.month,
    income: Number(row.income),
    expenses: Number(row.expenses),
    balance: Number(row.income) - Number(row.expenses),
  }));
};
