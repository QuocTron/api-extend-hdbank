import mongoose, { Document, Types } from "mongoose";

export interface UserDocument extends Document {
  email: string;
  phone: string;
  identityNumber: string;
  fullName: string;
  credential: string;
  passwordResetCode: string | null;
  accountNo: string;
  accountNoTransfers: Types.ObjectId[];
  mealTickets: Types.ObjectId[];
}
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    identityNumber: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    credential: { type: String, required: true },
    passwordResetCode: { type: String, default: null },
    accountNo: { type: String },
    accountNoTransfers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    mealTickets: [{ type: mongoose.Schema.Types.ObjectId, ref: "MealTicket" }],
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
