import express from "express";
import dotenv from "dotenv"
import { corsOptions } from "./config/corsOrigins.js";
import { credentials } from "./middleware/credentials.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import { connectDB } from "./config/db.js";
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes.js"
import imgKitRouter from "./routes/imgKitRouter.js";
import incomeRouter from "./routes/incomeRoutes.js"
import expenseRouter from "./routes/expenseRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js";

dotenv.config();
const app = express();
connectDB();
const Port = process.env.PORT || 4000;

app.use(cookieParser())
app.use(express.json());
app.use(cors(corsOptions));
app.use(credentials);


app.use("/api/imgKit",imgKitRouter);

app.use("/api/auth",authRouter);
app.use("/api/income",incomeRouter);
app.use("/api/expense",expenseRouter);
app.use("/api/dashboard",dashboardRouter);


mongoose.connection.once("open",()=>
{
    app.listen(Port, () =>
    {
        console.log(`server started at port : ${Port}`)
    })
})