import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  addEntry,
  getShopkeeperLedgers,
  getCustomerLedgers,
} from "../controllers/ledgerController.js";

const router = express.Router();


// ADD ENTRY
router.post(
  "/add",
  authMiddleware,
  addEntry
);


// SHOPKEEPER LEDGERS
router.get(
  "/shopkeeper",
  authMiddleware,
  getShopkeeperLedgers
);


// CUSTOMER LEDGERS
router.get(
  "/customer",
  authMiddleware,
  getCustomerLedgers
);

export default router;