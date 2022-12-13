import { object, string, TypeOf, ZodType } from "zod";

export const createUserSchema = object({
  body: object({
    fullName: string({
      required_error: "First name is required",
    }),

    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    identityNumber: string({
      required_error: "First name is required",
    }),
    phone: string({
      required_error: "Phone number is required",
    }),
  }),
});

export const verifyUserSchema = object({
  params: object({
    id: string(),
    verificationCode: string(),
  }),
});

export const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }),
});

export const resetPasswordSchema = object({
  params: object({
    id: string(),
    passwordResetCode: string(),
  }),
  body: object({
    password: string({
      required_error: "Password is required",
    }).min(6, "Password is to short - Should be min 6 characters"),
    passwordConfirmation: string({
      required_error: "Password confirmation is required",
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Password do not match",
    path: ["passwordConfirmation"],
  }),
});

export const saveAccountTransferSchema = object({
  body: object({
    accountNo: string({
      required_error: "Account no is required",
    }),
    idUserTransfer: string({
      required_error: "Id user transfer is required",
    }),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];
export type VerifyUserInput = TypeOf<typeof verifyUserSchema>["params"];
export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>["body"];
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;
export type SaveAccountTransferInput = TypeOf<
  typeof saveAccountTransferSchema
>["body"];
