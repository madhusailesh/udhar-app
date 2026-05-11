import Transaction from "../models/Transaction.js";



// CREATE UDHAR REQUEST
export const createTransaction = async (req, res) => {
  try {

    const { customer, itemName, amount } = req.body;

    const transaction = await Transaction.create({
      shopkeeper: req.user.id,
      customer,
      itemName,
      amount,
    });

    res.status(201).json({
      message: "Udhar request created",
      transaction,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};




// GET CUSTOMER PENDING REQUESTS
export const getPendingRequests = async (req, res) => {
  try {

    const requests = await Transaction.find({
      customer: req.user.id,
      status: "pending",
    }).populate("shopkeeper", "name email");

    res.status(200).json(requests);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};




// APPROVE REQUEST
export const approveTransaction = async (req, res) => {
  try {

    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    transaction.status = "approved";

    await transaction.save();

    res.status(200).json({
      message: "Transaction approved",
      transaction,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};




// REJECT REQUEST
export const rejectTransaction = async (req, res) => {
  try {

    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    transaction.status = "rejected";

    await transaction.save();

    res.status(200).json({
      message: "Transaction rejected",
      transaction,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};