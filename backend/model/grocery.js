import mongoose, {Schema} from "mongoose";

const groceryScheme = new Schema({
    name: {type:String, default:"", required: true, },
    category: {type:String, default:"", required: true, },
    rating: {type:Number, default:0 },
    price: {type:Number, default:0, required: true, },
    offerPrice: {type:Number, default:0, required: true, },
    image: {type:[String], default:[], required: true, },
    description: {type:[String], default:[], required: true, },
    inStock: {type:Boolean, default:true},
}, {timestamps:true})

export const GroceryModel = mongoose.models.GroceryProduct || mongoose.model("GroceryProduct",groceryScheme);