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