import { RemitInput } from "./../schema/transfer.schema";
import { Request, Response } from "express";
import { getTransfersByUser, remit } from "../service/transfer.service";

export async function remitHandler(
  req: Request<{}, {}, RemitInput>,
  res: Response
) {
  try {
    const transfer = await remit(req.body);
    return res.status(200).json({
      success: true,
      transfer,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getTransfersUserHandler(req: Request, res: Response) {
  try {
    const { userIdSender } = req.params;
    const transfers = await getTransfersByUser({ userIdSender });
    return res.status(200).json({
      success: true,
      transfers,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
