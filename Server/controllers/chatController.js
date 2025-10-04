// api for creating a new chat 

import Chat from "../models/chat.js"

export const createChat = async (req,res)=>{
    try{
        const userId = req.user._id

        const chatData = {
            userId,
            message:[],
            name:'New Chat',
            userName:req.user.name
        }

        await Chat.create(chatData)
        res.json({
            success:true,
            message:"chat created"
        })

    }catch(error){
        res.json({
            success:false,
            message:error.message
        })

    }

}


// api for getting all chats 

export const getChats = async (req,res)=>{
    try{
        const userId = req.user._id

        const chats  = await Chat.find({userId}).sort({updatedAt:-1})
        
        res.json({
            success:true,
            chats
        })

    }catch(error){
        res.json({
            success:false,
            message:error.message
        })

    }

}


// api for deleting a chat 

export const deleteChat = async (req,res)=>{
    try{
        const userId = req.user._id
        const{chatId} = req.body

        await Chat.deleteOne({_id:chatId,userId})

        
        
        res.json({
            success:true,
            message:"chat deleted"
        })

    }catch(error){
        res.json({
            success:false,
            message:error.message
        })

    }

}
