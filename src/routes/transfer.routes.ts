import express from "express";
import {
  getTransfersUserHandler,
  remitHandler,
} from "../controller/transfer.controller";
import validateResource from "../middleware/validateResource";
import { remitSchema } from "../schema/transfer.schema";

const router = express.Router();

router.post("/", validateResource(remitSchema), remitHandler);
router.get("/:userIdSender", getTransfersUserHandler);

export default router;
