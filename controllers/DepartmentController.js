import Department from "../models/Department.js";
import asyncHandler from "express-async-handler";

export default function departmentController() {
  const allDepartments = asyncHandler(async (req, res, next) => {
    const departments = await Department.find();

    if (departments) {
      res.status(200).json(departments);
    } else {
      res.status(400).json({ message: "Data not found" });
    }
  });

  const findDepartment = asyncHandler(async (req, res, next) => {
    const department = await Department.findOne({ _id: req.params.id });

    if (department) {
      res.status(200).json(department);
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  });

  const createDepartment = asyncHandler(async (req, res, next) => {
    try {
      const department = await Department.create({ ...req.body });

      if (department) {
        res.status(201).json({ message: "Resource created successfully" });
      } else {
        res.status(400).json({ message: "Invalid data" });
      }
    } catch (error) {
      res.status(500).json({ ...error });
    }
  });

  const updateDepartment = asyncHandler(async (req, res, next) => {
    try {
      const department = await Department.updateOne(
        { _id: req.params.id },
        { ...req.body, _id: req.params.id }
      );

      if (department) {
        res.status(201).json({ message: "Resource updated successfully" });
      } else {
        res.status(400).json({ message: "Invalid data" });
      }
    } catch (error) {
      res.status(500).json({ ...error });
    }
  });

  const deleteDepartment = asyncHandler(async (req, res, next) => {
    try {
      const department = await Department.deleteOne({ _id: req.params.id });

      if (department) {
        res.status(201).json({ message: "Resource deleted successfully" });
      } else {
        res.status(400).json({ message: "Invalid data" });
      }
    } catch (error) {
      res.status(500).json({ ...error });
    }
  });

  return {
    allDepartments,
    findDepartment,
    createDepartment,
    updateDepartment,
    deleteDepartment
  };
}
