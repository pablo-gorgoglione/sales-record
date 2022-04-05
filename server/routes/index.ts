import { Router } from "express";
import userRoutes from "./userRoutes";
import productRoutes from "./productRoutes";
const router = Router();

// URL/api/users/ ...
router.use("/users", userRoutes);
router.use("/products", productRoutes);
export default router;
