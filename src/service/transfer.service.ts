import { FilterQuery } from "mongoose";
import TransferModel, { TransferDocument } from "../model/transfer.model";

export async function remit(input: Partial<TransferDocument>) {
  return TransferModel.create(input);
}

export async function getTransfersByUser(query: FilterQuery<TransferDocument>) {
  return TransferModel.find(query);
}
