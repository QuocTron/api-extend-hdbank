import { FilterQuery } from "mongoose";
import TransferModel, { TransferDocument } from "../model/transfer.model";
import { findUser } from "./user.service";

export async function remit(input: Partial<TransferDocument>) {
  const { accountReceiver, accountSender } = input;
  const [userSender, userReceiver] = await Promise.all([
    findUser({ accountNo: accountSender }),
    findUser({ accountNo: accountReceiver }),
  ]);
  return TransferModel.create({
    ...input,
    userIdSender: userSender?._id,
    userIdReceiver: userReceiver?._id,
  });
}

export async function getTransfersByUser(query: FilterQuery<TransferDocument>) {
  return TransferModel.find(query);
}
