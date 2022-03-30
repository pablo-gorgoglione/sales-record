import express from "express";
import { registerUser, test } from "../controllers/userController";

const router = express.Router();

router.get("/", test);
router.post("/register", registerUser);

export default router;
