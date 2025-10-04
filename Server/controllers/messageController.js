// text based ai chat message controller 
import axios from 'axios'
import User from "../models/user.js"
import Chat from "../models/chat.js"
import imagekit from '../configs/imagekit.js'
import openai from '../configs/openai.js'

export const textMessageController = async(req,res)=>{
    try{
        const userId = req.user._id
        if(req.user.credits<1){
            return res.json({
                success:false,
                message:"you don't have enough credits to use this feature "
            })
        }
        const{chatId,prompt} = req.body

        const chat = await Chat.findOne({userId,_id:chatId})
        chat.messages.push({role:"user",content:prompt,timestamp:Date.now(),isImage:false})

    const {choices} = await openai.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
       
        {
            role: "user",
            content: prompt,
        },
    ],
});
const reply = {...choices[0].message,timestamp:Date.now(),isImage:false}
res.json({
    success:true,
    reply
})
chat.messages.push(reply)
await chat.save()
await User.updateOne({_id:userId},{$inc:{credits:-1}})


    }
    catch(error){
        res.json({
            success:false,
            message:error.message
        })
    }
}
 
// image generatin message controller 

export const imageMessageController = async(req,res) =>{
    try{
        const userId = req.user._id;
        // check credits 
        if(req.user.credits<2){
            return res.json({
                success:false,
                message:"you don't have enogugh credits to use this feature"
            })
        }
        const{prompt,chatId,isPublished} = req.body
        // Find chat 
        const chat = await Chat.findOne({userId,_id:chatId})

        // push user message 
        chat.messages.push({
            role:'user',
            content:prompt,
            timestamp:Date.now(),
            isImage:false
            
        });
        // encoded prompt 
        const encodedPrompt = encodeURIComponent(prompt)

        // construct imagekit ai generation url 
        const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/quickgpt/${Date.now()}.png?tr=w-800,h-800`;
        // fetching from imagekit 
        const aiImageResponse = await axios.get(generatedImageUrl,{
            responseType:"arraybuffer"
        })
        console.log(aiImageResponse)

        // convert to base64
        const base64Image = `data:image/png;base64,${Buffer.from(aiImageResponse.data,"binary").toString('base64')}`;
        console.log(base64Image)
        

        // upload to imagekit media library 

        const uploadResponse = await imagekit.upload({
            file:base64Image,
            fileName:`${Date.now()}.png`,
            folder:"quickgpt"
        })
        const reply = {
            role:'assistant',
            content:uploadResponse.url,
            timestamp:Date.now(),
            isImage:true,
            isPublished
        }
        res.json({
            success:true,
            reply
        })
        chat.messages.push(reply)
        await chat.save()
        await User.updateOne({_id:userId},{$inc:{credits:-2}})
    }catch(error){
        res.json({
            success:false,
            message:error.message
        })

    }
}



