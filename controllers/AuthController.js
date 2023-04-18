import User from "../models/User.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Worker from "../models/Worker.js";

export default function AuthController() {
  const register = asyncHandler(async (req, res, next) => {
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

  const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        userId: user._id,
        token: jwt.sign(
          {
            userId: user._id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        ),
      });
    } else {
      res
        .status(401)
        .json({ message: "Adresse e-mail ou mot de passe incorrecte" });
    }
  });

  const infos = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id, {
      isAdmin: 1,
      worker: 1,
    }).populate("worker");

    res.status(200).json(user);
  });

  return {
    infos,
    register,
    login,
  };
}
