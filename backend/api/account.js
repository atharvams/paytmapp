import { Router } from "express";
import middleware from "../middleware.js";
import { account, user } from "../db.js";
import mongoose from "mongoose";

export const accountRouter = Router();

accountRouter.get("/", (req, res) => {
  console.log("Hello from account");
  res.json({
    message: "Hello from account!",
  });
});

accountRouter.get("/balance", middleware, async (req, res) => {
  const balance = await account.findOne({
    userId: req.userId,
  });
  res.json({
    balance: balance.amount,
  });
});

accountRouter.post("/transfer", middleware, async (req, res) => {
  const { amount, to } = req.body;
  console.log(amount, to);
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const sender = await account
      .findOne({
        userId: req.userId,
      })
      .session(session);
    const receiver = await account
      .findOne({
        userId: to,
      })
      .session(session);

    if (!receiver) {
      session.abortTransaction();
      return res.status(400).json({
        message: "Invalid receiver!",
      });
    }

    if (sender.userId.toString() === receiver.userId.toString()) {
      session.abortTransaction();
      return res.status(400).json({
        message: "Sender and receiver cannot be the same!",
      });
    }

    if (!sender || sender.amount < amount) {
      session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient amount!",
      });
    }

    //update balances
    await account
      .updateOne({ userId: req.userId }, { $inc: { amount: -amount } })
      .session(session);
    await account
      .updateOne({ userId: to }, { $inc: { amount: amount } })
      .session(session);

    await session.commitTransaction();
    session.endSession();

    res.json({
      message: "Transaction completed successfully!",
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({
      message: "Transaction failed!",
    });
  }
});
