import { Router } from "express";
import {
  createTuitionHandler,
  getTuitionHandler,
  paymentTuitionHandler,
} from "../controller/tuition.controller";

const router = Router();

router.post("/", createTuitionHandler);
router.get("/:sdId", getTuitionHandler);
router.put("/", paymentTuitionHandler);

export default router;
