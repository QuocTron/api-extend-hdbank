import mongoose, { Document } from "mongoose";

export interface MealDocument extends Document {
  name: string;
  image: string | any;
  price: number;
  time: Date;
}

const mealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
  time: { type: Date },
});

const MealModel = mongoose.model<MealDocument>("Meal", mealSchema);
export default MealModel;
