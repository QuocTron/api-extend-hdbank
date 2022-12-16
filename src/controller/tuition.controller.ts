import { Request, Response } from "express";
import { TuitionDocument } from "../model/tuition.model";
import {
  createTuition,
  findTuitions,
  paymentTuition,
} from "../service/tuition.service";

export async function createTuitionHandler(
  req: Request<{}, {}, TuitionDocument>,
  res: Response
) {
  try {
    const tuition = await createTuition(req.body);
    return res.status(200).json(tuition);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
}

export async function getTuitionHandler(req: Request, res: Response) {
  try {
    const { sdId } = req.params;
    const tuitions = await findTuitions(sdId);
    return res.status(200).json(tuitions);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
}

export async function paymentTuitionHandler(req: Request, res: Response) {
  try {
    const {
      accountSender,
      accountReceiver,
      transactionAmount,
      surplusAmount,
      contentTransaction,
      sdId,
    } = req.body;

    const tuition = await paymentTuition(
      accountSender,
      accountReceiver,
      transactionAmount,
      surplusAmount,
      contentTransaction,
      sdId
    );
    if (!tuition) return res.status(404).json("Could not find tuition");
    return res.status(200).json("Payment successfully");
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
}
