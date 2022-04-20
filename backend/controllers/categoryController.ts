import asyncHandler from "express-async-handler";
import { Response, Request } from "express";
import Category from "../models/category";

// @route POST /api/categories
// @acess Private
export const postCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { name } = req.body;

    const category = await Category.create({
      name,
    });
    if (category) {
      res.status(200).json(category.toJSON());
      return;
    }
    res.status(400);
    throw new Error("Error creating the category");
  }
);

// @route GET /api/categories
// @acess Private
export const getCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const categories = await Category.findAll({});
    if (categories) {
      res.status(200).json(
        categories.map((c) => {
          return {
            ...c.toJSON(),
            createdAt: c.createdAt?.toLocaleString(),
          };
        })
      );
      return;
    }
    res.status(200).json({ message: "no data" });
  }
);
