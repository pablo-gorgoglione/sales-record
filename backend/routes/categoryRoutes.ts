import express from "express";
import { getCategories, postCategory } from "../controllers/categoryController";
import { protect } from "../middleware/authentication";

const router = express.Router();
router.route("/").post(protect, postCategory).get(getCategories);

export default router;
