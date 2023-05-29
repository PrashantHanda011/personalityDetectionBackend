import express from "express";
import { login, SignUp } from "../controllers/login-controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", SignUp);

export default router;
