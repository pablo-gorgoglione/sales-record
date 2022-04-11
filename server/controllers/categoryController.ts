import asyncHandler from "express-async-handler";
import { Response, Request } from "express";
import Category from "../models/category";

// @desc  Create a product category
// @route POST /api/product/login
// @acess Private
export const postCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { name } = req.body;

    const category = await Category.create({
      name,
    });
    if (category) {
      res.status(201).json({ ...category });
      return;
    }

    res.status(401);
    throw new Error("Error - talk to the admin");
  }
);
