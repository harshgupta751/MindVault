import mongoose from 'mongoose'
const Schema= mongoose.Schema
export const ObjectId= mongoose.Types.ObjectId
import dotenv from 'dotenv'
dotenv.config()
mongoose.connect(process.env.MongoDB_URL as string)

const UserSchema= new Schema({
email: {type: String,required: true, unique: true},
name: {type: String, required:true},
password: {type: String, required: true}
})

const ContentSchema= new Schema({
content: {type: String, required:true},
type: {type:String, enum:["note", "video", "link", "document"], required:true },
title: {type:String, required: true},
subtitle: {type:String},
tags: {type: [String]},
isImportant: {type: Boolean, required: true},
userId: {type:ObjectId, required: true,ref: 'Users'}
},{
    timestamps: true
})


const LinkSchema= new Schema({
    hash: {type: String, required: true, unique: true},
    userId: {type: ObjectId, required: true, ref: 'Users'}
})

export const UserModel= mongoose.model('Users',UserSchema)
export const ContentModel= mongoose.model('Contents',ContentSchema)
export const LinkModel= mongoose.model('Links',LinkSchema)

