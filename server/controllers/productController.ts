import asyncHandler from "express-async-handler";
import { Response, Request } from "express";
import Product from "../models/product";

// @desc  Create a product
// @route POST /api/product/login
// @acess Private
export const postProduct = asyncHandler(async (req: Request, res: Response) => {
  const { name, description, stock, category_id } = req.body;

  const product = await Product.create({
    id: 0,
    category_id,
    description,
    name,
    stock,
  });
  if (product) {
    //if there is a user with the email, and the password match then:
    res
      .status(201)
      .json({ message: "product successfully created", ...product });
    return;
  }

  res.status(401);
  throw new Error("Invalid email or password");
});
