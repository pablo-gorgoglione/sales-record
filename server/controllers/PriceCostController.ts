import asyncHandler from "express-async-handler";
import { Response, Request } from "express";
import Price from "../models/price";
import Cost from "../models/cost";
import sequelize from "sequelize";

// @desc  Create a product cost
// @route POST /api/product/login
// @acess Private
export const postPrice = asyncHandler(async (req: Request, res: Response) => {
  const { unitPrice, productId } = req.body;
  const createdAt = new Date().toString();

  const price = await Price.create({
    unit_price: unitPrice,
    product_id: productId,
    createdAt,
  });
  if (price) {
    //if there is a user with the email, and the password match then:
    res.status(201).json({ ...price });
    return;
  }

  res.status(401);
  throw new Error("Error - talk to the admin");
});

// @desc  Create a product price
// @route POST /api/product/login
// @acess Private
export const postCost = asyncHandler(async (req: Request, res: Response) => {
  const { unitCost, productId } = req.body;
  const createdAt = new Date().toString();
  const cost = await Cost.create({
    product_id: productId as number,
    unit_cost: unitCost,
    createdAt,
  });
  if (cost) {
    res.status(201).json({ ...cost });
    return;
  }

  res.status(401);
  throw new Error("Error - talk to the admin");
});

export const latestCost = async (id: number) => {
  if (!id) {
    throw new Error("No ID");
  }
  const query = `SELECT c.unit_cost, latest_cost.createdAt FROM (
    SELECT MAX(costs.createdAt) AS createdAt, costs.product_id FROM costs WHERE costs.product_id=${id}) AS latest_cost
INNER JOIN costs c ON
c.createdAt = latest_cost.createdAt;`;
  const cost = await Cost.sequelize?.query(query, {
    type: sequelize.QueryTypes.SELECT,
    model: Cost,
  });
  /*   console.log("--- LOGGIN --- COST:", cost); */
  if (cost && cost[0]) {
    return cost[0].unit_cost;
  }
  throw new Error("No cost found, for the id: " + id);
};

export const latestPrice = async (id: number) => {
  if (!id) {
    throw new Error("No ID");
  }
  const query = `SELECT p.unit_price, latest_price.createdAt FROM (
      SELECT MAX(prices.createdAt) AS createdAt, prices.product_id FROM prices WHERE prices.product_id=${id}) AS latest_price
  INNER JOIN prices p ON
  p.createdAt = latest_price.createdAt;`;
  const price = await Price.sequelize?.query(query, {
    type: sequelize.QueryTypes.SELECT,
    model: Price,
  });
  if (price && price[0]) {
    return price[0].unit_price;
  }
  throw new Error("No price found, for the id: " + id);
};
