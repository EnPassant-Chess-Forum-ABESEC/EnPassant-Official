import express from "express";
import { onBoardUser } from "../controllers/userController.js";
import { protect, adminMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.put("/onboard", protect, onBoardUser);

export default router;
