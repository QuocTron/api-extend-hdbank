import mongoose, { Document, Types } from "mongoose";

export interface TuitionDocument extends Document {
  sdId: string;
  description: string;
  fee: number;
  isPayment: boolean;
}

const tuitionSchema = new mongoose.Schema(
  {
    sdId: { type: String },
    description: { type: String },
    fee: { type: Number },
    isPayment: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const TuitionModel = mongoose.model<TuitionDocument>("Tuition", tuitionSchema);
export default TuitionModel;
