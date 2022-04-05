import express from "express";
import { login, register } from "../controllers/userController";
// import { login } from "../controllers/userController";

const router = express.Router();

router.post("/", register);
router.post("/login", login);

export default router;
