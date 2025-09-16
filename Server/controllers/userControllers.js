



// api to register user 

import User1 from "../models/user";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";


// generate jwt 

const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}

export const registerUser = async (req,res) =>{
    const{name,email,password} = req.body;

    try{
        const userExists = await User1.findOne({email})

        if(userExists){
            return res.json({
                success:false,
                message:"user already exists"
            })
        }
        const user = await User1.create({name,email,password})
        const token = generateToken(user._id)
        res.json({success:true,token})

    }catch(error){
        return res.json(
            {
                success:false,
                mesage:error.message
            }
        )

    }
}






// api to login user

export const loginUser = async(req,res)=>{
    const{email,password} = req.body;
    try{
        const user = await user.findOne({email})
        if(user){
            const isMatch = await bcrypt.compare(password,User1.password)
            if(isMatch){
                const token = generateToken(user._id);
                return res.json({
                    success:true,
                    token
                })
            }
        }
        return res.json({
            success:false,
            message:"invalid email or password"
        })

    }
    catch(error){
        return res.json({
            success:false,
            message:error.message
        })
    }

}


// api to get user data

export const getUser = async (req,res) =>{
    try{
        const user = req.user;
        return res.json({
            success:true,
            user
        })
    }
    catch(error){
        return res.json({
            success:false,
            message:error.message
        })
    }
}