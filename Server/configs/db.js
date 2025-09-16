import mongoose from 'mongoose'




const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGODB_URI}/quickgpt`);
    console.log(" Database connected:");
  } catch (error) {
    console.error(" Database connection failed:", error.message);
    
  }
};

export default connectDB;

// const connectDB = async () => {
//     try{
//         mongoose.connect('connected',()=>console.log('database connected'))
//         await mongoose.connect(`${process.env.MONGODB_URI}/quickgpt`)

//     }
//     catch(error){
//         console.log(error.message)

//     }
// }

// export default connectDB;