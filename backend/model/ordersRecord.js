import mongoose, { Schema } from "mongoose";


const ordersSchema = new mongoose.Schema({
    list:
    {
        type: [Schema.Types.ObjectId],
        default:[]
    }
})

export const OrdersModel = mongoose.models(OrdersRecord) || new mongoose.model("OrdersRecord",ordersSchema)