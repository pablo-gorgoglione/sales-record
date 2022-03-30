import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { Response, Request } from "express";
import generateToken from "../utils/generateToken";
import { findByEmail, saveOne } from "../db/userOperations";
import { PoolConnection } from "mysql";
import { getConnection } from "../db/db";

export const test = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: "This is a test route" });
});

// @desc Register a new user
// @route POST /api/users
// @acess Public
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password, name, lastname } = req.body;

    const conn = await getConnection();
    const validatedEmail = await findByEmail(conn, email);
    if (!validatedEmail) {
      res.status(400);
      throw new Error("Email is already in use");
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser: any = await saveOne(conn, {
      email: email,
      password: hashPassword,
      id: 0,
      lastname: lastname,
      name: name,
      created_at: "",
    });
    console.log("Type of new user: ", typeof newUser);
    if (newUser.affectedRows !== 1) {
      throw new Error("Invalid user data");
    }

    res.status(200).json({ message: "Esto funciona", newUser });
  }
);
