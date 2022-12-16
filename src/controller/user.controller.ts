import { NextFunction, Request, Response } from "express";
import {
  CreateUserInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  SaveAccountTransferInput,
  VerifyUserInput,
} from "./../schema/user.schema";

import {
  createUser,
  findUser,
  findUserByAccountNo,
  findUserByEmail,
  findUserById,
  getAccountsTransfer,
  saveAccountTransfer,
  updateUser,
} from "../service/user.service";
import sendEmail from "../utils/mailer";
import log from "../utils/logger";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890abcdef", 10);
//=> "4f90d13a42"
console.log("chạy nè m", nanoid());

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) {
  const body = req.body;

  try {
    const user = await createUser(body);

    return res.send({
      success: true,
      message: "User successfully created",
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).send({
        success: false,
        message: "Account already exists",
      });
    }
    return res.status(500).send(error);
  }
}

export async function updateUserHandler(req: Request, res: Response) {
  try {
    const { credential, accountNo } = req.body;
    const user = await updateUser(
      { credential },
      {
        $set: {
          accountNo: accountNo,
        },
      }
    );
    if (!user) return res.status(404).json("Could not find user");
    return res.status(200).json("Update successfully");
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
}
export async function forgotPasswordHandler(
  req: Request<{}, {}, ForgotPasswordInput>,
  res: Response
) {
  const { email } = req.body;
  const message =
    "If a user with that email is registered you will receive a password reset email";

  const user = await findUserByEmail(email);
  if (!user) {
    log.debug(`User with email '${email}' does not exist`);
    return res.send(message);
  }
  log.debug(`Password reset email to ${email}`);
  return res.send(message);
}
export async function resetPasswordHandler(
  req: Request<ResetPasswordInput["params"], {}, ResetPasswordInput["body"]>,
  res: Response
) {
  const { id, passwordResetCode } = req.params;

  const user = await findUserById(id);

  if (
    !user ||
    !user.passwordResetCode ||
    user.passwordResetCode !== passwordResetCode
  ) {
    {
      return res.status(400).send("Could not reset password");
    }
  }
  user.passwordResetCode = null;
  await user.save();
  return res.send("Successfully updated password");
}

export async function getUserHandler(req: Request, res: Response) {
  try {
    const user = await findUser(req.body);
    return res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getCurrentUserHandler(req: Request, res: Response) {
  const { accountNo } = req.params;
  const user = await findUserByAccountNo(accountNo);
  return res.send(user);
}

export async function saveAccountTransferHandler(
  req: Request<{}, {}, SaveAccountTransferInput>,
  res: Response
) {
  try {
    const { accountNo, idUserTransfer } = req.body;

    const userUpdate = await saveAccountTransfer(accountNo, idUserTransfer);
    if (!userUpdate)
      return res.status(404).json({
        success: false,
        message: "Could not find user",
      });

    return res.status(200).json({
      success: true,
      message: "Update successfully",
      user: userUpdate,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getAccountsTransferHandler(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const user = await getAccountsTransfer(userId);
    if (!user)
      return res.status(404).json({
        success: false,
        message: "Could not find user",
      });
    return res.status(200).json(user?.accountNoTransfers);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function confirmAccountHandler(req: Request, res: Response) {
  try {
    const { credential } = req.body;
    const user = await findUser({ credential });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "Mật khẩu không đúng" });

    return res.status(200).json({
      success: true,
      message: "Xác nhận thành công",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
