import { object, string, TypeOf, ZodType } from "zod";

export const createMealSchema = object({
  body: object({
    fullName: string({
      required_error: "Name is required",
    }),
    image: string({
      required_error: "Image is required",
    }),
    email: string({
      required_error: "Email is required",
    }),
  }),
});

export type CreateMealInput = TypeOf<typeof createMealSchema>["body"];
