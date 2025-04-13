import mongoose, { mongo, Schema } from "mongoose";

const IncomeSchema = new mongoose.Schema({
    userId:
    {
        type:Schema.Types.ObjectId, ref:"UserInfo", required:true
    },
    icon:
    {
        type:String
    },
    source:
    {
        type:String, required: true
    },
    amount:
    {
        type: Number, required: true
    },
    date:
    {
        type:Date, default:Date.now,
        required:true
    }
},{timestamps:true})

export const incomeModel = mongoose.model.IncomeSchema || mongoose.model("Income",IncomeSchema);

