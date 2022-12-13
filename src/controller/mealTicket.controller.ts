import {
  buyMealTicket,
  createMealTicket,
  findMealTicket,
  updateMealTicket,
} from "./../service/mealTicket.service";
import { Request, Response } from "express";
import { CreateMealTicketInput } from "../schema/mealTicket.schema";
import MealTicketModel from "../model/mealTicket.model";

export const createMealTicketHandler = async (
  req: Request<{}, {}, CreateMealTicketInput>,
  res: Response
) => {
  try {
    const mealTicket = await createMealTicket({
      ...req.body,
    });
    return res.status(200).json({
      success: true,
      mealTicket: mealTicket,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const buyMealTicketHandler = async (req: Request, res: Response) => {
  try {
    const { mealTicketId, userId } = req.body;
    const user = await buyMealTicket(mealTicketId, userId);
    if (!user)
      return res.status(404).json({
        success: false,
        message: "Could not find user",
      });

    return res.status(200).json({
      success: true,
      message: "Buy meal ticket successfully",
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMealTicketHandler = async (req: Request, res: Response) => {
  try {
    const { mealTicketId } = req.params;
    const mealTicket = await findMealTicket(mealTicketId);
    return res.status(200).json({
      success: true,
      mealTicket: mealTicket,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const paymentMealTicketHandler = async (req: Request, res: Response) => {
  try {
    const { mealTicketId } = req.params;
    const mealTicket = await updateMealTicket(mealTicketId, {
      isPayment: true,
    });
    if (!mealTicket)
      return res.status(404).json({
        success: false,
        message: "Could not find meal ticket",
      });

    return res.status(200).json({
      success: true,
      message: "Payment has been payment",
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const useMealTicketHandler = async (req: Request, res: Response) => {
  try {
    const { mealTicketId } = req.params;
    const mealTicket = await updateMealTicket(mealTicketId, { isUse: true });
    if (!mealTicket)
      return res.status(404).json({
        success: false,
        message: "Could not find meal ticket",
      });

    return res.status(200).json({
      success: true,
      message: "Used ticket successfully",
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
