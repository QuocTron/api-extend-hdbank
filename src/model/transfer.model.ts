import mongoose, { Document } from "mongoose";
import { UserDocument } from "./user.model";

export interface TransferDocument extends Document {
  userIdSender: UserDocument["_id"];
  accountSender: string;
  userIdReceiver: UserDocument["_id"];
  accountReceiver: string;
  transactionAmount: number;
  surplusAmount: number;
  contentTransaction: string;
}

const transferSchema = new mongoose.Schema(
  {
    userIdSender: { type: String, require: true },
    accountSender: { type: String, require: true },
    userIdReceiver: { type: String, require: true },
    accountReceiver: { type: String, require: true },
    transactionAmount: { type: Number, require: true },
    surplusAmount: { type: Number },
    contentTransaction: { type: String },
  },
  {
    timestamps: true,
  }
);

const TransferModel = mongoose.model<TransferDocument>(
  "Transfer",
  transferSchema
);

export default TransferModel;
