import express from "express";
import { postProduct } from "../controllers/productController";
const router = express.Router();

router.post("/", postProduct);

export default router;
