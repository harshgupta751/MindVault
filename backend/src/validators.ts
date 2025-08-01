import { z } from 'zod'

export const signUpSchema= z.object({
email: z.string().email({message: "Enter valid email!"}),
name: z.string().min(3,{message: "Name must be atleast 3 characters!"}).max(50,{message: "Name must be not exceed 50 characters!"}),
password: z.string().min(6,{message:"Password should be atleast 6 characters!"}).max(8, {message: "Password must not exceed 20 characters!"})
})

export const signInSchema= z.object({
email: z.string().email({message: "Enter valid email!"}),
password: z.string().min(1,"Password should not be empty!")
})

export const createSchema= z.object({
content: z.string(),
type: z.string(),
title:z.string(),
subtitle: z.string().optional()
})




