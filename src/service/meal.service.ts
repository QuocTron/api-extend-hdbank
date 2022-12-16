import { CreateMealInput } from "../schema/meal.schema";
import MealModel, { MealDocument } from "./../model/meal.model";

export const createMeal = async (mealInput: CreateMealInput) => {
  console.log(mealInput);
  return MealModel.create(mealInput);
};

export const getAllMeal = async () => {
  return MealModel.find().lean();
};

export const updateMeal = async () => {
  return MealModel.updateMany(
    {},
    {
      quantity: 100,
    }
  );
};
