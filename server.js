import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDatabase from "./config/mongoose.config.js";
import departmentRoutes from "./routers/departmentRoutes.js";
import workerRoutes from "./routers/workerRoutes.js";
import memberRoutes from "./routers/memberRoutes.js";
import userRoutes from "./routers/userRoutes.js";
import authRoutes from "./routers/authRoutes.js";

// Configuration and Initialization
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//Routes
app.use("/api/departments", departmentRoutes);
app.use("/api/workers", workerRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is Runing...");
});

// Start Server
app.listen(PORT, () => {
  connectDatabase();
  console.log("server listening on port :", PORT);
});
