import express from "express";
import {
  getUsers,
  getUserById,
  register,
  updateUserById,
  ChatGptResponse,
  updateFeedback,
} from "../controllers/user-controller.js";
const router = express.Router();
router.get("/", getUsers);
router.patch("/feedback/:id", updateFeedback);
router.post("/chatGPT", ChatGptResponse);
router.get("/:id", getUserById);
router.post("/", register);
router.put("/:id", updateUserById);

export default router;
