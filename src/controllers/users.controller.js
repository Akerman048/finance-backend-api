import { loginUserSchema, registerUserSchema } from "../schemas/user.schema.js";
import {
  loginUserService,
  registerUserService,
  refreshAccessTokenService,
  getUserByIdService,
} from "../services/users.service.js";

/* REGISTER */
export const registerUser = async (req, res, next) => {
  try {
    const validation = registerUserSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Validation error",
        errors: validation.error.flatten().fieldErrors,
      });
    }

    const user = await registerUserService(validation.data);

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

/* LOGIN */
export const loginUser = async (req, res, next) => {
  try {
    const validation = loginUserSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Validation error",
        errors: validation.error.flatten().fieldErrors,
      });
    }

    const result = await loginUserService(validation.data);

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ accessToken: result.accessToken });
  } catch (error) {
    next(error);
  }
};

/* REFRESH TOKEN */
export const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token missing" });
    }

    const accessToken = await refreshAccessTokenService(refreshToken);

    return res.status(200).json({
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

/* LOGOUT */
export const logoutUser = async (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  return res.status(200).json({ message: "Logged out" });
};

/* GET LOGGED IN USER */
export const getMe = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await getUserByIdService(userId);

    return res.json(user);
  } catch (error) {
    next(error);
  }
};
