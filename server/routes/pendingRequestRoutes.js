import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createPendingRequest,
  getCustomerPendingRequests,
  approvePendingRequest,
  rejectPendingRequest,
} from "../controllers/pendingRequestController.js";

const router = express.Router();




// CREATE REQUEST
router.post(
  "/create",
  authMiddleware,
  createPendingRequest
);




// GET CUSTOMER PENDING
router.get(
  "/customer",
  authMiddleware,
  getCustomerPendingRequests
);




// APPROVE
router.put(
  "/approve/:id",
  authMiddleware,
  approvePendingRequest
);




// REJECT
router.put(
  "/reject/:id",
  authMiddleware,
  rejectPendingRequest
);

export default router;