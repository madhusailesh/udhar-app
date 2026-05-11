import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import transactionRoutes from "./routes/transactionRoutes.js";
dotenv.config();//it loads environment variables from a .env file into process.env, allowing you to access them in your application.

connectDB();

const app = express();

app.use(cors());// CORS = Cross-Origin Resource Sharing, it allows your backend to accept requests from different origins (like your frontend running on a different port).
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.get("/", (req, res) => {
  res.send("Backend Running");
});
app.get("/api/test", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route working",
    user: req.user,
  });
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});