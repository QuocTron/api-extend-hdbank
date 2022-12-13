import { date, object, string, TypeOf } from "zod";

export const createMealTicketSchema = object({
  body: object({
    student: string({
      required_error: "Student is required",
    }),
    meal: string({
      required_error: "Meal is required",
    }),
  }),
});

export type CreateMealTicketInput = TypeOf<
  typeof createMealTicketSchema
>["body"];
