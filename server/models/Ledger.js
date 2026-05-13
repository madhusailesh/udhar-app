import mongoose from "mongoose";

const entrySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["credit", "debit"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    note: {
      type: String,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
);




const ledgerSchema = new mongoose.Schema(
  {
    shopkeeper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    entries: [entrySchema],

    totalBalance: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);




const Ledger = mongoose.model(
  "Ledger",
  ledgerSchema
);

export default Ledger;