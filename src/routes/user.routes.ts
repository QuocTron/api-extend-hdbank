import {
  createUserSchema,
  verifyUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  saveAccountTransferSchema,
} from "./../schema/user.schema";
import express from "express";
import validateResource from "../middleware/validateResource";
import {
  confirmAccountHandler,
  createUserHandler,
  forgotPasswordHandler,
  getAccountsTransferHandler,
  getCurrentUserHandler,
  getUserHandler,
  resetPasswordHandler,
  saveAccountTransferHandler,
} from "../controller/user.controller";
import requireUser from "../middleware/requireUser";
import { validateInputUser } from "../middleware/userValidation.middleware";

const router = express.Router();
router.post(
  "/",
  validateResource(createUserSchema),
  validateInputUser,
  createUserHandler
);

router.post(
  "/forgotpassword",
  validateResource(forgotPasswordSchema),
  forgotPasswordHandler
);
router.post(
  "/resetpassword/:id/:passwordResetCode",
  validateResource(resetPasswordSchema),
  resetPasswordHandler
);
router.get("/me/:accountNo", getCurrentUserHandler);
router.post("/get", getUserHandler);
router.put(
  "/save",
  validateResource(saveAccountTransferSchema),
  saveAccountTransferHandler
);
router.get("/account-transfer/:userId", getAccountsTransferHandler);
router.get("/confirm-account-transfer/", confirmAccountHandler);
export default router;
