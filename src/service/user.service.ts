import { FilterQuery } from "mongoose";
import UserModel, { UserDocument } from "../model/user.model";

export function createUser(input: Partial<UserDocument>) {
  return UserModel.create(input);
}

export function findUserById(id: string) {
  return UserModel.findById(id);
}
export function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).populate([
    {
      path: "mealTickets",
      select: "-student",
    },
    {
      path: "accountNoTransfers",
      select: "fullName accountNo",
    },
  ]);
}
export function findUserByAccountNo(accountNo: string) {
  return UserModel.findOne({ accountNo });
}
export function findUserByEmail(email: string) {
  return UserModel.findOne({ email });
}

export function saveAccountTransfer(accountNo: string, idUserTransfer: string) {
  return UserModel.findOneAndUpdate(
    {
      accountNo: accountNo,
    },
    {
      $push: {
        accountNoTransfers: idUserTransfer,
      },
    },
    {
      new: true,
    }
  );
}

export function getAccountsTransfer(userId: string) {
  return UserModel.findById(userId).populate({
    path: "accountNoTransfers",
    select: "fullName accountNo",
  });
}
