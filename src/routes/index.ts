import express from "express";
import user from "./user.routes";
import transfer from "./transfer.routes";
import meal from "./meal.route";
import mealTicket from "./mealTicket.route";

const router = express.Router();
console.log("Vô route");

router.get("/healthcheck", (_, res) => res.sendStatus(200));

router.use("/api/users", user);
router.use("/api/transfer", transfer);
router.use("/api/meals", meal);
router.use("/api/meal-ticket", mealTicket);

export default router;
