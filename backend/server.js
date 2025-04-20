import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors"
import { corsOptions } from "./config/corsOrigins.js";
import { credentials } from "./middleware/credentials.js"
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js"
import productsRouter from "./routes/productRoutes.js"
import ordersRouter from "./routes/ordersRoutes.js"
import sellerRouter from "./routes/sellerRoutes.js"
import { VerifyRoles } from "./middleware/VerifyRoles.js";
import { allowedRoles } from "./config/allowedRoles.js";
import { verifyAccessToken } from "./middleware/VerifyAuth.js";

dotenv.config();
const server = express();
connectDB();
const Port = process.env.PORT || 5000;

server.use(cookieParser());
server.use(express.json());
server.use(cors(corsOptions));
server.use(credentials);

server.use("/api/auth",authRouter);

server.use("/api/info",userRouter);
server.use("/api/product",productsRouter);
server.use("/api/orders",ordersRouter);


mongoose.connection.once("open",()=>
{
    server.listen(Port,()=>
    {
        console.log("server started at port" + Port);
    })
})