import { UpdateQuery } from "mongoose";
import MealTicketModel, { MealTicketDocument } from "../model/mealTicket.model";
import UserModel from "../model/user.model";
import { CreateMealTicketInput } from "../schema/mealTicket.schema";

export const createMealTicket = async (input: CreateMealTicketInput) => {
  console.log(input);
  return MealTicketModel.create(input);
};

export const updateMealTicket = async (
  mealTicketId: string,
  update: UpdateQuery<MealTicketDocument>
) => {
  return MealTicketModel.findByIdAndUpdate(mealTicketId, update, { new: true });
};

export const buyMealTicket = async (mealTicketId: string, userId: string) => {
  return UserModel.findByIdAndUpdate(
    userId,
    {
      $push: {
        mealTickets: mealTicketId,
      },
    },
    {
      new: true,
    }
  );
};

export const findMealTicket = async (mealTicketId: string) => {
  return MealTicketModel.findById(mealTicketId).populate([
    {
      path: "meal",
    },
    {
      path: "student",
      select: "fullName",
    },
  ]);
};
