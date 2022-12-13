import {
  buyMealTicketHandler,
  getMealTicketHandler,
  paymentMealTicketHandler,
  useMealTicketHandler,
} from "./../controller/mealTicket.controller";
import { Router } from "express";
import { createMealTicketHandler } from "../controller/mealTicket.controller";

const router = Router();

router.post("/", createMealTicketHandler);
router.post("/buy-meal-ticket", buyMealTicketHandler);
router.get("/:mealTicketId", getMealTicketHandler);
router.put("/payment/:mealTicketId", paymentMealTicketHandler);
router.put("/use-ticket/:mealTicketId", useMealTicketHandler);

export default router;
