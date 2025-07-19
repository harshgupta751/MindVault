import {z, ZodArray} from 'zod'

export const signUpSchema= z.object({
username: z.string().min(3,{message: "Username must be atleast 3 characters!"}).max(20,{message: "Username must be not exceed 20 characters!"}),
password: z.string().min(6,{message:"Password should be atleast 6 characters!"}).max(8, {message: "Password must not exceed 20 characters!"})
})

export const signInSchema= z.object({
username: z.string().min(1,{message: "Username must not be empty!"}),
password: z.string().min(1,"Password should not be empty!")
})

export const createSchema= z.object({
link: z.string(),
type: z.string(),
title:z.string()
})

export const TagZod= z.object({
tag: z.string(),
})


