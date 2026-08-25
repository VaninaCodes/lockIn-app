import { Router } from "express";
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from "../controllers/user.controller.js";

import{
    userIdValidation,
    createUserValidation,
    updateUserValidation,
} from "../middlewares/validation/user.validator.js";
import { validate } from "../middlewares/validate.js";

export const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", userIdValidation, validate, getUserById);
userRouter.post("/", createUserValidation, validate, createUser);
userRouter.put("/:id", userIdValidation, updateUserValidation, validate, updateUser);
userRouter.delete("/:id", userIdValidation, validate, deleteUser);