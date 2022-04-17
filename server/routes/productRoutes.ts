import express from "express";
import { postCost, postPrice } from "../controllers/PriceCostController";
import {
  getProduct,
  getProducts,
  postProduct,
  putProduct,
} from "../controllers/productController";
import Price from "../models/price";
const router = express.Router({ mergeParams: true });

//ROUTES
router.route("/:idProduct/cost").post(postCost);
router.route("/:idProduct/price").post(postPrice);
router.route("/:idProduct").get(getProduct).put(putProduct);
router.route("/").post(postProduct).get(getProducts);

export default router;
