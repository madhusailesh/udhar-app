// import express from "express";
// import { createTransaction } from "../controllers/transactionController.js";
// import authMiddleware from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/create", authMiddleware, createTransaction);

// export default router;


import express from "express";

import {
  createTransaction,
  getPendingRequests,
  approveTransaction,
  rejectTransaction,
} from "../controllers/transactionController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createTransaction);

router.get("/pending", authMiddleware, getPendingRequests);

router.put("/approve/:id", authMiddleware, approveTransaction);

router.put("/reject/:id", authMiddleware, rejectTransaction);

export default router;