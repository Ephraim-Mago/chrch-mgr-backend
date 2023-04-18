import express from "express";
import auth from "../middlewares/auth.js";
import AuthController from "../controllers/AuthController.js";

const router = express.Router();
const { infos, login, register } = AuthController();

router.post("/register", register);
router.post("/login", login);
router.get("/user", auth, infos);

export default router;
