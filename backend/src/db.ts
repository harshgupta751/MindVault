import mongoose from 'mongoose'
import { required } from 'zod/v4/core/util.cjs'
const Schema= mongoose.Schema
const ObjectId= Schema.Types.ObjectId
import dotenv from 'dotenv'
dotenv.config()
mongoose.connect(process.env.MongoDB_URL as string)

const UserSchema= new Schema({
username: {type: String,required: true, unique: true},
password: {type: String, required: true}
})

const ContentSchema= new Schema({
link: {type: String, required:true},
type: {type:String, enum:["Document", "Tweet", "Youtube","Link"], required:true },
title: {type:String, required: true},
tags: [{type: ObjectId, required:true,ref:'Tags'}],
userId: {type:ObjectId, required: true,ref: 'Users'}
})

const TagSchema= new Schema({
tag: {type:String, required: true}
})

const LinkSchema= new Schema({
    hash: {type: String, required: true, unique: true},
    userId: {type: ObjectId, required: true, ref: 'Users'}
})

export const UserModel= mongoose.model('Users',UserSchema)
export const ContentModel= mongoose.model('Contents',ContentSchema)
export const TagModel= mongoose.model('Tags',TagSchema)
export const LinkModel= mongoose.model('Links',LinkSchema)

