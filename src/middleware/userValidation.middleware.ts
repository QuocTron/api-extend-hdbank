import { NextFunction, Request, Response } from "express";
import UserModel, { UserDocument } from "../model/user.model";

export async function validateInputUser(
  req: Request<{}, {}, UserDocument>,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, phone, identityNumber } = req.body;

    if (await UserModel.findOne({ email }))
      return res.status(409).json({
        success: false,
        message: "Email này đã tồn tại",
      });
    if (await UserModel.findOne({ phone }))
      return res.status(409).json({
        success: false,
        message: "Số điện thoại này đã tồn tại",
      });
    if (await UserModel.findOne({ identityNumber }))
      return res.status(409).json({
        success: false,
        message: "Mã định danh này đã tồn tại",
      });
    next();
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
}
