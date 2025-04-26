import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";
import dotenv from 'dotenv';
const PORT = process.env.PORT || 8800;


dotenv.config();

const app = express();
app.use(cors({ origin: 'https://roomvista-code.vercel.app',  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true }));
app.use(express.json());
app.use(cookieParser());
// console.log(process.env.DATABASE_URL)+
app.get('/',(req,res)=>res.json({hello:"main"}))
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});