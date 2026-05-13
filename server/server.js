import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import pendingRequestRoutes from "./routes/pendingRequestRoutes.js";
import { createServer } from "http";
import { Server } from "socket.io";
import ledgerRoutes from "./routes/ledgerRoutes.js";
dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/ledger", ledgerRoutes);
app.use(
  "/api/pending-requests",
  pendingRequestRoutes
);
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


// SOCKET SERVER
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const onlineUsers = {};
io.on("connection", (socket) => {

  console.log("User Connected:", socket.id);


  // REGISTER USER
  socket.on("registerUser", (userId) => {
    onlineUsers[userId] = socket.id;

    console.log("Online Users:", onlineUsers);
  });


  // DISCONNECT
  socket.on("disconnect", () => {

    for (const userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId];
      }
    }

    console.log("User Disconnected");
  });

});
export { io, onlineUsers };
// START SERVER
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});