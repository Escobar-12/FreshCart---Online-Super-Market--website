import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors"
import { corsOptions } from "./config/corsOrigins";
import { credentials } from "./middleware/credentials"


dotenv.config();
const server = express();
connectDB();
const Port = process.env.PORT || 5000;

server.use(cookieParser());
server.use(express.json());
server.use(cors(corsOptions));
server.use(credentials);





mongoose.connection.once("open",()=>
{
    server.listen(Port,()=>
    {
        console.log("server started at port" + Port);
    })
})