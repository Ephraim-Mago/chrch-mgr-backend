import express from "express";
import auth from "../middlewares/auth.js";
import departmentController from "../controllers/DepartmentController.js";

const router = express.Router();
const {
  allDepartments,
  findDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} = departmentController();

router.get("/", auth, allDepartments);
router.get("/:id", auth, findDepartment);
router.post("/", auth, createDepartment);
router.put("/:id", auth, updateDepartment);
router.delete("/:id", auth, deleteDepartment);

export default router;
