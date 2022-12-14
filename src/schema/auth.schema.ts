import {object,string,TypeOf,ZodType} from "zod";



export const createSessionSchema =
object({
    body: object({
        email: string(
            {
                required_error:"Email is required",
            }
        ).email(),
        password:string({
            required_error:"Password is required",
        }).min(6,"Invalid Email or Password"),
    })
});

export type CreateSessionInput = TypeOf<typeof createSessionSchema>["body"];