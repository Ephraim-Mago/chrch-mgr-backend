import express from "express";
import auth from "../middlewares/auth.js";
import memberController from "../controllers/MemberController.js";

const router = express.Router();
const { allMembers, createMember, findMember, updateMember, deleteMember } =
  memberController();

router.get("/", auth, allMembers);
router.get("/:id", auth, findMember);
router.post("/", auth, createMember);
router.put("/:id", auth, updateMember);
router.delete("/:id", auth, deleteMember);

export default router;
