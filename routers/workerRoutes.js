import express from "express";
import auth from "../middlewares/auth.js";
import workerController from "../controllers/WorkerController.js";

const router = express.Router();
const { allWorkers, findWorker, createWorker, updateWorker, deleteWorker } =
  workerController();

router.get("/", auth, allWorkers);
router.get("/:id", auth, findWorker);
router.post("/", auth, createWorker);
router.put("/:id", auth, updateWorker);
router.delete("/:id", auth, deleteWorker);

export default router;
