import { NextFunction,Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export function auth(req:Request,res: Response,next:NextFunction){
const authorization=req.headers.authorization
if(!authorization || !authorization.startsWith("Bearer ")){
res.json({
    message: "You are not Signed In!"
})
return
}
const token= authorization.split(" ")[1]
try{
const decoded= jwt.verify(token,process.env.JWT_SECRET as string)
//@ts-ignore
req.id=decoded.id
next()

}catch(e){
    res.json({
    message: "You are not Signed In!"
})

}

}

