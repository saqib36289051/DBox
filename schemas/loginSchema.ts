import { z } from "zod";
export default z.object({
  phone_number: z
    .string({ required_error: "Phone Number is required" })
    .min(11, { message: "Phone Number Must be 11" })
    .max(11, { message: "Phone Number Must be 11" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(4, { message: "Password is required" })
    .max(8, { message: "Password is required" }),
});
