import express from "express";
import UserController from "../controllers/UserController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();
const { createUser, allUsers, findUser, updateUser, deleteUser } =
  UserController();

router.get("/", auth, allUsers);
router.get("/:id", auth, findUser);
router.post("/", auth, createUser);
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);

export default router;
