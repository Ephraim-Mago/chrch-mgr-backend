import Worker from "../models/Worker.js";

import asyncHandler from "express-async-handler";

export default function workerController() {
  const allWorkers = asyncHandler(async (req, res, next) => {
    const workers = await Worker.find().populate("department");

    if (workers) {
      res.status(200).json(workers);
    } else {
      res.status(400).json({ message: "Data not found" });
    }
  });

  const findWorker = asyncHandler(async (req, res, next) => {
    const worker = await Worker.findOne({ _id: req.params.id }).populate(
      "department"
    );

    if (worker) {
      res.status(200).json(worker);
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  });

  const createWorker = asyncHandler(async (req, res, next) => {
    try {
      const worker = await Worker.create({ ...req.body });

      if (worker) {
        res.status(201).json({ message: "Resource created successfully" });
      } else {
        res.status(400).json({ message: "Invalid data" });
      }
    } catch (error) {
      res.status(500).json({ ...error });
    }
  });

  const updateWorker = asyncHandler(async (req, res, next) => {
    try {
      const worker = await Worker.updateOne(
        { _id: req.params.id },
        { ...req.body, _id: req.params.id }
      );

      if (worker) {
        res.status(201).json({ message: "Resource updated successfully" });
      } else {
        res.status(400).json({ message: "Invalid data" });
      }
    } catch (error) {
      res.status(500).json({ ...error });
    }
  });

  const deleteWorker = asyncHandler(async (req, res, next) => {
    try {
      const worker = await Worker.deleteOne({ _id: req.params.id });

      if (worker) {
        res.status(201).json({ message: "Resource deleted successfully" });
      } else {
        res.status(400).json({ message: "Invalid data" });
      }
    } catch (error) {
      res.status(500).json({ ...error });
    }
  });

  return {
    allWorkers,
    findWorker,
    createWorker,
    updateWorker,
    deleteWorker,
  };
}
