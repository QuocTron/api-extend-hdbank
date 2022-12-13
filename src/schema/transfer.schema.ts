import { number, object, string, TypeOf, ZodType } from "zod";

export const remitSchema = object({
  body: object({
    userIdSender: string({
      required_error: "UserIdSend is required",
    }),
    accountSender: string({
      required_error: "AccountSender is required",
    }),
    userIdReceiver: string({
      required_error: "UserIdReceiver is required",
    }),
    accountReceiver: string({
      required_error: "AccountRevciever is required",
    }),
    transactionAmount: number({
      required_error: "Transaction amount is required",
    }),
    surplusAmount: number({
      required_error: "Surplus amount is required",
    }),
    contentTransaction: string({
      required_error: "ContentTransaction is required",
    }),
  }),
});

export type RemitInput = TypeOf<typeof remitSchema>["body"];
