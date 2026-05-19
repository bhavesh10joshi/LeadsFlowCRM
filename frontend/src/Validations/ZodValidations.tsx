import { z } from "zod"

export const LoginValidations = z.object({
   email : z.string().includes("@") ,
   password : z.string().min(6)
});

export const SignUpValidations = z.object({
   name : z.string().min(2) ,
   email : z.string().includes("@") ,
   password : z.string().min(6)
});
