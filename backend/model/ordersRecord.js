import mongoose, { Schema } from "mongoose";


const ordersSchema = new mongoose.Schema({
    list:[
        {
            item: {type: Schema.Types.ObjectId, ref:"GroceryProduct",},
            quantity : {type:Number, default:1}
        }
    ],
    amount:{type:Number, required:true, default:1},
    paymentType: {type:String, default:"Online"},
    status: {type:String, default:"Order Placed"},
    isPaid: {type:Boolean, default:false},
    address:{
        type:{
            firstName:{type:String, required: true }, 
            lastName:{type:String, required: true }, 
            email:{type:String, required: true }, 
            street:{type:String, required: true }, 
            city:{type:String, required: true }, 
            state:{type:String, required: true }, 
            zipcode:{type:Number, required: true }, 
            country:{type:String, required: true }, 
            phone:{type:String, required: true }
        },
        required:true,
        default: ""
    },
    userId:
    {
        type: Schema.Types.ObjectId,
        ref:"UserInfo",
        required:true
    }
},{timestamps:true})

export const OrdersModel = mongoose.models.OrdersRecord || new mongoose.model("OrdersRecord",ordersSchema)