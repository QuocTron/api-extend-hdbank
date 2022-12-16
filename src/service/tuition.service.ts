import TuitionModel, { TuitionDocument } from "../model/tuition.model";
import { findUser } from "../service/user.service";
import { remit } from "../service/transfer.service";

export function createTuition(body: TuitionDocument) {
  return TuitionModel.create(body);
}

export function findTuitions(sdId: string) {
  return TuitionModel.find({ sdId });
}

export async function paymentTuition(
  accountSender: string,
  accountReceiver: string,
  transactionAmount: number,
  surplusAmount: number,
  contentTransaction: string,
  sdId: string
) {
  const [userSender, userReceiver] = await Promise.all([
    findUser({ accountNo: accountSender }),
    findUser({ accountNo: accountReceiver }),
  ]);

  await remit({
    accountReceiver,
    accountSender,
    transactionAmount,
    surplusAmount,
    contentTransaction,
    userIdSender: userSender?._id,
    userIdReceiver: userReceiver?._id,
  });

  return await TuitionModel.findOneAndUpdate(
    { sdId, isPayment: false, fee: { $lte: transactionAmount } },
    {
      isPayment: false,
    }
  );
}
