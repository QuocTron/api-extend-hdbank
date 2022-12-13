import mongoose, { Document, Types } from "mongoose";

export interface MealTicketDocument extends Document {
  meal: Types.ObjectId;
  isPayment: boolean;
  isUse: boolean;
  expired: Date;
  student: Types.ObjectId;
}

const mealTicketSchema = new mongoose.Schema(
  {
    meal: { type: mongoose.Schema.Types.ObjectId, ref: "Meal" },
    isPayment: { type: Boolean, default: false },
    isUse: { type: Boolean, default: false },
    expired: { type: Date },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);
const MealTicketModel = mongoose.model<MealTicketDocument>(
  "MealTicket",
  mealTicketSchema
);

export default MealTicketModel;
