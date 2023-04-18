import Member from "../models/Member.js";
import asyncHandler from "express-async-handler";

export default function memberController() {
  const allMembers = asyncHandler(async (req, res, next) => {
    const members = await Member.find().populate("workers");

    if (members) {
      res.status(200).json(members);
    } else {
      res.status(400).json({ message: "Data not found" });
    }
  });

  const findMember = asyncHandler(async (req, res, next) => {
    const member = await Member.findOne({ _id: req.params.id }).populate(
      "workers"
    );

    if (member) {
      res.status(200).json(member);
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  });

  const createMember = asyncHandler(async (req, res, next) => {
    try {
      if (!req.body.workers)
        return res
          .status(400)
          .json({ error: "Un ouvrier responsable du fidèle est requis" });

      const member = await Member.create({ ...req.body });

      if (member) {
        res.status(201).json({ message: "Resource created successfully" });
      } else {
        res.status(400).json({ message: "Invalid data" });
      }
    } catch (error) {
      res.status(500).json({ ...error });
    }
  });

  const updateMember = asyncHandler(async (req, res, next) => {
    try {
      if (!req.body.workers && !req.body.workers.length)
        return res
          .status(400)
          .json({ error: "Un ouvrier responsable du fidèle est requis" });

      const member = await Member.updateOne(
        { _id: req.params.id },
        { ...req.body, _id: req.params.id }
      );

      if (member) {
        res.status(201).json({ message: "Resource updated successfully" });
      } else {
        res.status(400).json({ message: "Invalid data" });
      }
    } catch (error) {
      res.status(500).json({ ...error });
    }
  });

  const deleteMember = asyncHandler(async (req, res, next) => {
    try {
      const member = await Member.deleteOne({ _id: req.params.id });

      if (member) {
        res.status(201).json({ message: "Resource deleted successfully" });
      } else {
        res.status(400).json({ message: "Invalid data" });
      }
    } catch (error) {
      res.status(500).json({ ...error });
    }
  });

  return {
    allMembers,
    findMember,
    createMember,
    updateMember,
    deleteMember,
  };
}
