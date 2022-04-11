import asyncHandler from "express-async-handler";
import { Response, Request } from "express";
import Product from "../models/product";

// @route POST /api/product/
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
    res.status(201).json({ ...product });
    return;
  }

  res.status(401);
  throw new Error("Invalid product data");
});

// @route POST /api/product/login
// @acess Private
export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const productList = await Product.findAll({});
  res.status(200).json(productList);
  return;
});
