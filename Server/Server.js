import express from "express";

import "dotenv/config";

import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import messageRouter from "./routes/messageRoute.js";

const app = express();

await connectDB();

// middleware

app.use(cors());
app.use(express.json());


// routes

app.get("/", (req, res) => res.send("server is live"));
app.use('/api/user',userRouter)
app.use('/api/chat',chatRouter)
app.use('/api/message',messageRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on the port ${PORT}`);
});
