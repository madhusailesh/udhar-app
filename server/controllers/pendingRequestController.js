import PendingRequest from "../models/PendingRequest.js";

import Ledger from "../models/Ledger.js";

import { io, onlineUsers } from "../server.js";




// CREATE REQUEST
export const createPendingRequest = async (req, res) => {

  try {

    const {
      customer,
      type,
      amount,
      note,
    } = req.body;




    const request = await PendingRequest.create({
      shopkeeper: req.user.id,
      customer,
      type,
      amount,
      note,
    });




    // REALTIME EVENT TO CUSTOMER
    const customerSocketId =
      onlineUsers[customer];




    if (customerSocketId) {

      io.to(customerSocketId).emit(
        "new_pending_request",
        request
      );

    }




    res.status(201).json({
      message: "Request Sent",
      request,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};




// GET CUSTOMER PENDING REQUESTS
export const getCustomerPendingRequests =
  async (req, res) => {

    try {

      const requests =
        await PendingRequest.find({
          customer: req.user.id,
          status: "pending",
        }).populate(
          "shopkeeper",
          "name email"
        );




      res.status(200).json(requests);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  };




// APPROVE REQUEST
export const approvePendingRequest =
  async (req, res) => {

    try {

      const request =
        await PendingRequest.findById(
          req.params.id
        );




      if (!request) {

        return res.status(404).json({
          message: "Request not found",
        });

      }




      // UPDATE STATUS
      request.status = "approved";

      await request.save();




      // FIND EXISTING LEDGER
      let ledger = await Ledger.findOne({
        shopkeeper: request.shopkeeper,
        customer: request.customer,
      });




      // CREATE NEW LEDGER IF NOT EXISTS
      if (!ledger) {

        ledger = await Ledger.create({
          shopkeeper: request.shopkeeper,
          customer: request.customer,
          entries: [],
          totalBalance: 0,
        });

      }




      // ADD NEW ENTRY
      ledger.entries.push({
        type: request.type,
        amount: request.amount,
        note: request.note,
      });




      // UPDATE BALANCE
      if (request.type === "credit") {

        ledger.totalBalance +=
          Number(request.amount);

      } else {

        ledger.totalBalance -=
          Number(request.amount);

      }




      // PREVENT NEGATIVE
      if (ledger.totalBalance < 0) {

        ledger.totalBalance = 0;

      }




      await ledger.save();




      // REALTIME UPDATE TO SHOPKEEPER
      const shopkeeperSocketId =
        onlineUsers[request.shopkeeper];




      if (shopkeeperSocketId) {

        io.to(shopkeeperSocketId).emit(
          "ledger_updated"
        );

      }




      // REALTIME UPDATE TO CUSTOMER
      const customerSocketId =
        onlineUsers[request.customer];




      if (customerSocketId) {

        io.to(customerSocketId).emit(
          "ledger_updated"
        );

      }




      res.status(200).json({
        message: "Request Approved",
        ledger,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  };




// REJECT REQUEST
export const rejectPendingRequest =
  async (req, res) => {

    try {

      const request =
        await PendingRequest.findById(
          req.params.id
        );




      if (!request) {

        return res.status(404).json({
          message: "Request not found",
        });

      }




      request.status = "rejected";

      await request.save();




      // REALTIME UPDATE TO SHOPKEEPER
      const shopkeeperSocketId =
        onlineUsers[request.shopkeeper];




      if (shopkeeperSocketId) {

        io.to(shopkeeperSocketId).emit(
          "request_rejected"
        );

      }




      res.status(200).json({
        message: "Request Rejected",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }

  };