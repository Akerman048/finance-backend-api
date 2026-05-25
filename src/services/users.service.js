import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  findUserByEmail,
  insertUser,
  findUserById,
} from "../repositories/users.repository.js";

/* REGISTER */
export const registerUserService = async (data) => {
  const existingEmail = await findUserByEmail(data.email);

  if (existingEmail) {
    const error = new Error("Email already exists");
    error.status = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  return await insertUser({ ...data, password_hash: hashedPassword });
};

/* LOGIN */
export const loginUserService = async (data) => {
  const user = await findUserByEmail(data.email);

  if (!user) {
    const error = new Error("Invalid credentials");
    error.status = 401;

    throw error;
  }

  const isPasswordCorrect = await bcrypt.compare(
    data.password,
    user.password_hash,
  );

  if (!isPasswordCorrect) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  return {
    token,
  };
};

/* GET USER BY ID */
export const getUserByIdService = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  return user;
};
