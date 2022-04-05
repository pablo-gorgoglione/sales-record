import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { Response, Request } from "express";
import User from "../models/user";
import generateToken from "../utils/generateToken";

// @desc  Login a valid user
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

// @desc  Register a new user
// @route POST /api/users
// @acess Public
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, name, lastname } = req.body;
  const user = await User.findOne({ where: { email: email } });
  if (user) {
    res.status(400);
    throw new Error("User already exist");
  }
  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const newUser = await User.create({
    email: email,
    password: hashPassword,
    id: 0,
    lastname: lastname,
    name: name,
  });
  res.status(201).json({
    id: newUser.id,
    name: newUser.name,
    lasname: newUser.lastname,
    email: newUser.email,
    token: generateToken(newUser.id),
  });
  return;
});
