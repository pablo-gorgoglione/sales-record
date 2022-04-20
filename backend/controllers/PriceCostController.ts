import asyncHandler from "express-async-handler";
import { Response, Request } from "express";
import Price from "../models/price";
import Cost from "../models/cost";
import sequelize from "sequelize";

// @route POST /api/product/:idProduct/price
// @acess Private
export const postPrice = asyncHandler(async (req: Request, res: Response) => {
  const { unitPrice } = req.body;
  const idProduct = +req.params.idProduct;
  const createdAt = new Date().toString();

  const price = await Price.create({
    unit_price: unitPrice,
    product_id: idProduct,
    createdAt,
  });
  if (price) {
    //if there is a user with the email, and the password match then:
    res.status(201).json(price.toJSON());
    return;
  }

  res.status(401);
  throw new Error("Error - Not price found");
});

// @route POST /api/product/:idProduct/cost
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
    res.status(201).json(cost.toJSON());
    return;
  }

  res.status(401);
  throw new Error("Error - not cost found");
});

// @desc Select the latest cost value
export const latestCost = async (id: number) => {
  if (!id) {
    throw new Error("Invalidad product id. Id: " + id);
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
  throw new Error("No cost found with id: " + id);
};

// @desc Select the latest price value
export const latestPrice = async (id: number) => {
  if (!id) {
    throw new Error("Invalidad product id. Id: " + id);
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
  throw new Error("No price found with id: " + id);
};
