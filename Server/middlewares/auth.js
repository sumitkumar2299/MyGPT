import jwt from 'jsonwebtoken'
import User1 from '../models/user';

export const protect = async (req,res,next) =>{
    let token = req.headers.authorization;
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const userId = decoded.id;

        const user = await User1.findById(userid)
    }
    catch(error){
        
    }

}