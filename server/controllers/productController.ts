import asyncHandler from "express-async-handler";
import { Response, Request } from "express";
import Product from "../models/product";

// @route POST /api/products/
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
    res.status(201).json(product.toJSON());
    return;
  }

  res.status(401);
  throw new Error("Invalid product data");
});

// @route GET /api/products/
// @acess Private
export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const productList = await Product.findAll({});
  res.status(200).json({ productList });
  return;
});

// @route GET /api/product/:idProduct
// @acess Privates
export const getProduct = asyncHandler(async (req: Request, res: Response) => {
  const idProduct = req.params.idProduct;
  if (!idProduct) {
    res.status(400);
    throw new Error("Can't find a product without an id");
  }
  const product = await Product.findByPk(idProduct);
  if (product) {
    res.json(product.toJSON());
    return;
  }
  res.status(404);
  throw new Error("Product not found. Id: " + idProduct);
});

// @route PUT /api/product/:idProduct
// @acess Privates
export const putProduct = asyncHandler(async (req: Request, res: Response) => {
  const idProduct = req.params.idProduct;
  const {
    category_id,
    name,
    stock,
    description,
  }: { category_id: number; name: string; stock: number; description: string } =
    req.body;
  if (!idProduct) {
    res.status(400);
    throw new Error("Can't find a product without an id");
  }

  const product = await Product.findByPk(idProduct);
  if (product) {
    product.category_id = category_id ? category_id : product.category_id;
    product.name = name ? name : product.name;
    product.stock = stock ? stock : product.stock;
    product.description = description ? description : product.description;
    await product.save();
    res.json(product.toJSON());
    return;
  }
  res.status(404);
  throw new Error("Product not found");
});
