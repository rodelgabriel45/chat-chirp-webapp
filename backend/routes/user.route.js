import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  getSender,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", verifyToken, getUsers);
router.put("/update/:id", verifyToken, updateUser);
router.get("/getSender/:messageId", verifyToken, getSender);

export default router;
