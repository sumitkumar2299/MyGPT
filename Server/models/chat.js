import mongoose from 'mongoose'
import User from './user.js';

const chatSchema = new mongoose.Schema({
    userId:{
        type:String,
        ref:User,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true

    },
    messages:[
        {
            isImage:{
                type:Boolean,
                required:true
            },
            isPublished:{
                type:Boolean,
                default:false
            },
            role:{
                type:String,
                required:true
            },
            tiemstamp:{
                type:Number,
                required:true
            }
        }
    ]
},{type:Number,required:true})


const Chat  = mongoose.model('chat',chatSchema)
export default Chat;