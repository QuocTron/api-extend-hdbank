import { MealDocument } from "./../model/meal.model";
import { createMeal, getAllMeal } from "../service/meal.service";
import { NextFunction, Request, Response } from "express";
import { CreateMealInput } from "../schema/meal.schema";

export const createMealHandler = async (
  req: Request<{}, {}, CreateMealInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) return res.status(500).json("Upload file failed");

    const meal = await createMeal({
      ...req.body,
      image: `/public/meals/${req.file.filename}`,
    });

    return res.status(200).json({ success: true, meal: meal });
  } catch (error: any) {
    return res.status(500).json({});
  }
};
export const getAllMealHandler = async (req: Request, res: Response) => {
  try {
    const meals = await getAllMeal();
    return res.status(200).json({
      success: true,
      meals: meals,
    });
  } catch (error: any) {
    return res.status;
  }
};
