import express from "express";
import { getSale, getSales, postSale } from "../controllers/saleController";
import { protect } from "../middleware/authentication";

const router = express.Router();

router.route("").post(protect, postSale).get(protect, getSales);
router.route("/:saleId").get(protect, getSale);

export default router;
