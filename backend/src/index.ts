import express, { response } from 'express'
import { success } from 'zod'
import {createSchema, signInSchema, signUpSchema} from './validators' 
import { ContentModel, LinkModel, UserModel } from './db'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { auth } from './middleware'
import {nanoid} from 'nanoid'
import cors from 'cors'
dotenv.config()

const app= express()
app.use(cors())

app.use(express.json())

app.post('/signup', async function(req, res){
const response = signUpSchema.safeParse(req.body)
if(!response.success){
    res.status(411).json({
        error: response.error 
    })
    return
}
const username= req.body.username
const findUser=await UserModel.findOne({
    username
})
if(findUser){
res.json({
    message: "Username already exits!"
})
return
}
const password= req.body.password
const hashedPassword=await bcrypt.hash(password,5)
try{
await UserModel.create({
    username,
    password: hashedPassword
})
res.json({
    message: "You are successfully Signed Up!"
})
}catch(e){
res.status(403).json({
    error: "Error occured. Please try again!"
})    

}

})

app.post('/signin', async function(req,res){
const response= signInSchema.safeParse(req.body)
if(!response.success){
    res.status(411).json({
        error: response.error
    })
    return
}
const username= req.body.username
const password= req.body.password
try{
const findUser=await UserModel.findOne({
    username: username
})

if(!findUser){
    res.status(403).json({
        message: "User does not exist!"
    })
    return
}
const check=await bcrypt.compare(password,findUser.password)
if(!check){
    res.status(403).json({
        message: "Wrong Password!"
    })
    return
}

const token= jwt.sign({
    id: findUser._id
},process.env.JWT_SECRET as string)

res.json({
    token
})

}catch(e){
    res.status(500).json({
        error: "Error occured. Please try again!"
    })
}

})

app.post('/create',auth,async function(req,res){
    const link= req.body.link
    const type= req.body.type
    const title= req.body.title
    const tags= req.body.tags
const response=createSchema.safeParse({
    link,
    type,
    title
})
if(!response.success){
    res.status(411).json({
        error: "Invalid inputs!" 
    })
    return
}
try{
await ContentModel.create({
    link,
    type,
    title,
    tags,
    //@ts-ignore
    userId: req.id
})

res.json({
    message: "Content Added!"
})
    
}catch(e){
    res.status(403).json({
    error: "Error occured. Please try again!"
})    

}

})

app.get('/allcontent',auth,async function(req,res){
  try{  
const allContent=await ContentModel.find({
    //@ts-ignore
    userId: req.id
})
  res.json({
    allContent: allContent
  })
 }catch(e){
     res.status(403).json({
    error: "Error occured. Please try again!"
})   
  }


})

app.delete('/delete',auth, async function(req,res){
const contentId=req.body.contentId
try{
await ContentModel.deleteOne({
    _id: contentId,
    //@ts-ignore
    userId: req.id
})
res.json({
    message: "Content deleted."
})

}catch(e){
 res.status(403).json({
    error: "Error occured. Please try again!"
})   

}




})

app.post('/share', auth, async function(req,res){
const shareOn= req.body.shareOn
try{
if(!shareOn){
await LinkModel.deleteOne({
    //@ts-ignore
    userId: req.id
})

res.json({
    message: "Share is disabled"
})
return
}
const existingSharableId= LinkModel.findOne({
    //@ts-ignore
    userId: req.id
})
if(existingSharableId){
    res.json({
        //@ts-ignore
        sharableId: `/share/${existingSharableId.hash}`
    })
    return
}

const sharableId= nanoid()
await LinkModel.create({
    hash: sharableId,
    //@ts-ignore
    userId: req.id
})

res.json({
    sharableId: `/share/${sharableId}`
})
}catch(e){
 res.status(403).json({
    error: "Error occured. Please try again!"
})  
}

})

app.get('/share/:id',function(req,res){
const sharableId= req.params.id
try{
const response= LinkModel.findOne({
    hash: sharableId
})
if(!response){
    res.status(404).json({
        message: "This link is not valid"
    })
    return
}
//@ts-ignore
const userId= response.userId
const allContent= ContentModel.find({
    userId
})

res.json({
    allContent
})
}catch(e){
 res.status(403).json({
    error: "Error occured. Please try again!"
})  
}


})


app.listen(3000)