import Ledger from "../models/Ledger.js";




// ADD ENTRY
export const addEntry = async (req, res) => {
  try {

    const {
      customer,
      type,
      amount,
      note,
    } = req.body;


    // FIND EXISTING LEDGER
    let ledger = await Ledger.findOne({
      shopkeeper: req.user.id,
      customer,
    });


    // CREATE NEW LEDGER IF NOT EXISTS
    if (!ledger) {

      ledger = await Ledger.create({
        shopkeeper: req.user.id,
        customer,
        entries: [],
        totalBalance: 0,
      });

    }


    // NEW ENTRY
    const newEntry = {
      type,
      amount,
      note,
    };


    ledger.entries.push(newEntry);


    // UPDATE BALANCE
    if (type === "credit") {

      ledger.totalBalance += Number(amount);

    } else if (type === "debit") {

      ledger.totalBalance -= Number(amount);

    }


    // PREVENT NEGATIVE
    if (ledger.totalBalance < 0) {
      ledger.totalBalance = 0;
    }


    await ledger.save();


    res.status(200).json({
      message: "Entry Added",
      ledger,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};




// SHOPKEEPER LEDGERS
export const getShopkeeperLedgers = async (req, res) => {
  try {

    const ledgers = await Ledger.find({
      shopkeeper: req.user.id,
    }).populate(
      "customer",
      "name email"
    );

    res.status(200).json(ledgers);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};




// CUSTOMER LEDGERS
export const getCustomerLedgers = async (req, res) => {
  try {

    const ledgers = await Ledger.find({
      customer: req.user.id,
    }).populate(
      "shopkeeper",
      "name email"
    );

    res.status(200).json(ledgers);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};