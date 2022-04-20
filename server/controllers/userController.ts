import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { Response, Request } from "express";
import User, { UserInstance } from "../models/user";
import generateToken from "../utils/generateToken";
import { UserWithOutId, UserWithOutPassword, UserWithToken } from "../types";

// @route POST /api/users/login
// @acess Public
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email: email } });
  if (user && (await bcrypt.compare(password, user.password))) {
    //if there is a user with the email, and the password match then:
    res.status(200).json({
      id: user.id,
      name: user.name,
      lasname: user.lastname,
      email: user.email,
      token: generateToken(user.id),
    });
    return;
  }
  res.status(401);
  throw new Error("Invalid email or password");
});

// @route POST /api/users
// @acess Public
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, name, lastname } = req.body;

  validateEmail(email, res);

  const newUser = await generateUser({ email, lastname, name, password });

  res.status(201).json(newUser);
  return;
});

const validateEmail = async (email: string, res: Response) => {
  const user = await User.findOne({ where: { email: email } });
  if (user) {
    res.status(400);
    throw new Error("User already exist");
  }
};

const generateUser = async (user: UserWithOutId): Promise<UserWithToken> => {
  const { email, lastname, name, password } = user;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const newUser = await User.create({
    email,
    password: hashPassword,
    lastname,
    name,
  });
  const token = generateToken(newUser.id);
  const { password: pw, ...userWithoutPassword } = newUser.toJSON();
  console.log(userWithoutPassword);
  return { ...userWithoutPassword, token };
};
