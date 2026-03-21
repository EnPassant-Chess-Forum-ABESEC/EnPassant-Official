import express from "express";
import { onBoardUser } from "../controllers/userController.js";
import { protect, adminMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.patch("/onboard", protect, onBoardUser);

export default router;
