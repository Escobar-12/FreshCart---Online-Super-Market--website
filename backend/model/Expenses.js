import mongoose, { Schema } from "mongoose"
import { type } from "os"

const ExpenseSchema = new mongoose.Schema({
    userId:
    {
        type:Schema.Types.ObjectId,
        ref:"UserInfo",
        required:true
    },
    icon: {type:String},
    category:
    {
        type:String, required:true
    },
    amount: {type:Number,required:true},
    date:{type:Date, default:Date.now()}
},{timestamps:true})

export const expenseModel = mongoose.model.ExpenseModel || mongoose.model("Expense",ExpenseSchema);