import { Router } from "express";
import userRoutes from "./userRoutes";
import productRoutes from "./productRoutes";
import saleRoutes from "./saleRoutes";
import categoryRoutes from "./categoryRoutes";
const router = Router();

// URL/api/users/ ...
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/sales", saleRoutes);
router.use("/categories", categoryRoutes);

export default router;
