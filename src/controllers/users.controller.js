import { loginUserSchema, registerUserSchema } from "../schemas/user.schema.js";
import {
  loginUserService,
  registerUserService,
  getUserByIdService,
} from "../services/users.service.js";

/* REGISTER */
export const registerUser = async (req, res, next) => {
  try {
    const validation = registerUserSchema.safeParse(req.body);

    if (!validation.success) {
      return res
        .status(400)
        .json({
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

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
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
