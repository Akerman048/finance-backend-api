import { pool } from "../db/pool.js";

/* FIND USER BY EMAIL */
export const findUserByEmail = async (email) => {
  const result = await pool.query(
    `
    SELECT * FROM users
    WHERE email = $1
    `,
    [email],
  );

  return result.rows[0];
};

/* INSERT USER */
export const insertUser = async (data) => {
  const result = await pool.query(
    `
    INSERT INTO users (
    name,
    email,
    password_hash
    )
    VALUES ($1,$2,$3)
    RETURNING id,name,email
    `,
    [data.name, data.email, data.password_hash],
  );

  return result.rows[0];
};

/* FIND USER BY ID */
export const findUserById = async (userId) => {
  const result = await pool.query(
    `
    SELECT id,email,name
    FROM users
    WHERE id = $1
    `,
    [userId],
  );

  return result.rows[0];
};
