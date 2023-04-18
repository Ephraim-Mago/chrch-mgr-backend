import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import Worker from "../models/Worker.js";

export default function UserController() {
  const createUser = asyncHandler(async (req, res, next) => {
    try {
      const worker = await Worker.findById(req.body.worker);

      if (worker) {
        const user = await User.create({ ...req.body, email: worker.email });

        if (user) {
          res
            .status(201)
            .json({ message: "User credentials created successfully" });
        } else {
          res
            .status(400)
            .json({ message: "Invalid user credentials informations" });
        }
      } else {
        res
          .status(404)
          .json({ message: "Compte ouvrier incorrecte ou introuvable" });
      }
    } catch (error) {
      res.status(500).json({ ...error });
    }
  });

  const allUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find().populate("worker").select("-password");

    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  });

  const findUser = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ _id: req.params.id })
      .populate("worker")
      .select("-password");

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  });

  const updateUser = asyncHandler(async (req, res, next) => {
    try {
      const user = await User.updateOne(
        { _id: req.params.id },
        { ...req.body, _id: req.params.id }
      );

      if (user) {
        res.status(201).json({ message: "Resource updated successfully" });
      } else {
        res.status(400).json({ message: "Invalid data" });
      }
    } catch (error) {
      res.status(500).json({ ...error });
    }
  });

  const deleteUser = asyncHandler(async (req, res, next) => {
    try {
      const user = await User.deleteOne({ _id: req.params.id });

      if (user) {
        res.status(201).json({ message: "Resource deleted successfully" });
      } else {
        res.status(400).json({ message: "Invalid data" });
      }
    } catch (error) {
      res.status(500).json({ ...error });
    }
  });

  return {
    createUser,
    allUsers,
    findUser,
    updateUser,
    deleteUser,
  };
}
