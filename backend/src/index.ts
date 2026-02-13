import express from 'express'
import {createSchema, signInSchema, signUpSchema} from './validators' 
import { ContentModel, LinkModel, UserModel,ObjectId } from './db'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { auth } from './middleware'
import cloudinary from './utils/cloudinary'
import {getPublicIdFromCloudinaryUrl} from './utils/getPublicId'
import bodyParser from 'body-parser';
import ogRouter from './og'
import uploadRoutes from './routes/upload';
import documentProxyRoutes from './routes/documentProxy';
import {nanoid} from 'nanoid'
import cors from 'cors'
import nodemailer from 'nodemailer'

dotenv.config()

const app= express()
app.use(cors({
    origin: [process.env.CLIENT_URL as string] ,
    credentials: true
}))

app.use(express.json())


app.get('/health', (req, res)=>{

  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date(),
  });

})


app.post('/signup', async function(req, res){
const response = signUpSchema.safeParse(req.body)
if(!response.success){
    res.status(411).json({
        error: response.error 
    })
    return
}
const email= req.body.email
const findUser=await UserModel.findOne({
    email
})
if(findUser){
res.json({
    message: "User already exists!"
})
return
}
const name= req.body.name
const password= req.body.password
const hashedPassword=await bcrypt.hash(password,5)
try{
await UserModel.create({
    email,
    name,
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
const email= req.body.email
const password= req.body.password
try{
const findUser=await UserModel.findOne({
    email
})

if(!findUser){
    res.json({
        message: "User does not exist!"
    })
    return
}
const check=await bcrypt.compare(password,findUser.password)
if(!check){
    res.json({
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

app.post('/resetpassword', async function(req, res){
const email= req.body.email
try{
const findUser= await UserModel.findOne({
    email
})
if(!findUser){
res.status(404).json({
    message: "Email not found!"
})
return
}
//@ts-ignore
const token= jwt.sign({
    userId: findUser._id
}, process.env.RESET_SECRET as string, {expiresIn: '15m'} )
const resetLink= `${process.env.CLIENT_URL}/resetpassword?token=${token}`

const transporter= nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
})

await transporter.sendMail({
    from: 'MindVault <no-reply@mindvault.com>',
    to: email,
    subject: "Reset Password",
    html: `<p>Click on <a href="${resetLink}">${resetLink}</a> to reset your password. Link expires in 15 minutes.</p>`
})


res.json({
    message: "Reset link sent to your email"
})

}catch(e){
    res.status(500).json({
        error: "Error occured. Please try again!"
    })
}
})

app.post('/createnewpassword', async function(req, res){
    const token= req.body.token
const password= req.body.password;
try{
const decoded= jwt.verify(token, process.env.RESET_SECRET as string)
const hashedPassword= await bcrypt.hash(password, 5)
await UserModel.updateOne({
    //@ts-ignore
    _id: decoded.userId
},{
    password: hashedPassword
})

res.json({
    message: "Password reset successfully!"
})

}catch(e){
    res.status(400).json({
        error: "Invalid token"
    })
}

})



app.post('/create',auth,async function(req,res){
    const content= req.body.content
    const type= req.body.type
    const title= req.body.title
    const subtitle= req.body.subtitle
    const tags= req.body.tags
const response=createSchema.safeParse({
    content,
    type,
    title,
    subtitle
})

if(!response.success){
    res.status(411).json({
        error: "Invalid inputs!" 
    })
    return
}
try{
await ContentModel.create({
    content,
    type,
    title,
    subtitle,
    tags,
     isImportant: false,
    //@ts-ignore
    userId: new ObjectId(req.id)
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
    userId: new ObjectId(req.id)
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

app.delete('/delete/:id',auth, async function(req,res){
const contentId=req.params.id
try{

const response= await ContentModel.findOne({
    _id: contentId,
    //@ts-ignore
    userId: new ObjectId(req.id)
})

if(!response){
    res.status(404).json({
        error: "Content not found!"
    })
    return
}

if(response.type=='document' && response.content){
const url= response.content
const publicId= getPublicIdFromCloudinaryUrl(url);
   if (publicId) {
          await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
        }
}

await ContentModel.deleteOne({
    _id: contentId,
    //@ts-ignore
    userId: new ObjectId(req.id)
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

app.post('/share/settings/:shareOn', auth, async function(req,res){
const shareOn= req.params.shareOn === 'true'
try{
if(!shareOn){
await LinkModel.deleteOne({
    //@ts-ignore
    userId: new ObjectId(req.id)
})

res.json({
    message: "Share is disabled"
})
return
}
const existingSharableId= await LinkModel.findOne({
    //@ts-ignore
    userId: new ObjectId(req.id)
})
if(existingSharableId){
    res.json({
        //@ts-ignore
        sharableId: `/share?id=${existingSharableId.hash}`
    })
    return
}

const sharableId= nanoid()
await LinkModel.create({
    hash: sharableId,
    //@ts-ignore
    userId: new ObjectId(req.id)
})

res.json({
    sharableId: `/share?id=${sharableId}`
})
}catch(e){
 res.status(403).json({
    error: "Error occured. Please try again!"
})  
}

})


app.get('/share/content/:id', async function(req,res){
const sharableId= req.params.id
try{
const response= await LinkModel.findOne({
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
const allContent=await ContentModel.find({
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

app.get('/sharemode',auth, async function(req,res){
    try{
const response= await LinkModel.findOne({
    //@ts-ignore
    userId: new ObjectId(req.id)
})
if(!response){
    res.json({
        shareOn: false
    })
}else{
    res.json({
        shareOn: true
    })
}
    }catch(e){
           res.status(403).json({
    error: "Error occured. Please try again!"
})  
    }

})


app.post('/toggleimportant', auth, async function(req, res){
const contentId= req.body.contentId
const isImportant= req.body.isImportant
try{
await ContentModel.updateOne({
    _id: contentId
},{
    isImportant: !isImportant
})

res.json({
    message: "Updated successfully!"
})
}catch(e){
   res.status(403).json({
    error: "Error occured. Please try again!"
})  
}

})

app.post('/deletepublicid', auth, async function(req, res){
  const { publicId } = req.body;

  if (!publicId) {
    return res.status(400).json({ error: 'Missing publicId' });
  }

  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
    return res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Deletion failed' });
  }

})

app.use(express.urlencoded({ extended: true }));
app.use('/api', uploadRoutes);
app.use('/api', documentProxyRoutes);

app.use(bodyParser.json());

app.use('/api/og', ogRouter);


app.listen(3000, ()=>
    console.log("Server is running")
)