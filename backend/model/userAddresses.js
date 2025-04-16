import mongoose, {Schema} from "mongoose";
import { type } from "os";

const addressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    city:   { type: String, required: true },
    zip:    { type: Number, required: true },
    country:{ type: String, required: true }
})

export default addressSchema;