import asyncHandler from "express-async-handler";
import { Response, Request } from "express";
import Sale from "../models/sale";
import SaleItem from "../models/saleItem";
import { latestCost, latestPrice } from "./PriceCostController";
import db from "../db/connection";

interface ClientItemSale {
  productId: number;
  qty: number;
}

//the client send the productList with and the server search for the latest cost and price to
// fill the data on the saleItem

// @route POST /api/sales
// @acess Private
export const postSale = asyncHandler(async (req: Request, res: Response) => {
  const { productList }: { productList: Array<ClientItemSale> } = req.body;
  const userId = req.user?.id as number;

  const t = await db.transaction();

  const sale = await Sale.create({ user_id: userId });
  if (!sale) {
    res.status(500);
    t.rollback();
    throw new Error("Error creating the sale.");
  }

  let total = 0;
  productList.forEach(async (product, idx, productList) => {
    //search for the latest cost
    try {
      const cost = await latestCost(product.productId);
      const price = await latestPrice(product.productId);
      const profit = price - cost;
      const subtotal = price * product.qty;
      console.log(subtotal);
      total = total + subtotal;

      await SaleItem.create({
        product_id: product.productId,
        quantity: product.qty,
        profit,
        sale_id: sale.id,
        subtotal,
        unit_price: price,
        unit_cost: cost,
      });
      //if is the last item of the array save the sale.
      if (idx === productList.length - 1) {
        console.log(`index: ${idx}, total:${total}`);
        sale.total = total;
        await sale.save();
        t.commit();
        res.status(201).json(sale.toJSON());
        return;
      }
    } catch (error) {
      t.rollback();

      console.log(error);
      throw new Error("Error creating the sale.");
    }
  });
});

// @route GET /api/sales
// @acess Private
export const getSale = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id as number;
  const sale = await Sale.findOne({ where: { user_id: userId } });
  if (sale) {
    const saleItems = await SaleItem.findAll({ where: { sale_id: sale.id } });
    res.json({ sale, saleItems });
    return;
  }
});
