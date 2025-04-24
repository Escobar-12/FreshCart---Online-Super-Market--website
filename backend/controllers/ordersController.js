import mongoose from "mongoose";
import { OrdersModel } from "../model/ordersRecord.js"
import {userModel} from "../model/userInfo.js"
import { allowedRoles } from "../config/allowedRoles.js";

const isValidId = (arr) => 
{
    return Array.isArray(arr) && arr.every((entry) => mongoose.Types.ObjectId.isValid(entry.item));
}
const limit = 5;

export const getAllOrders = async (req, res) => 
{
    try 
    {
        const user = req.user;
        const page = parseInt(req.params.page) || 0;

        const userFound = await userModel.findById(user?.id);
        if (!userFound) return res.status(401).json({ success: false, message: "Unauthorized" });

        const orderIds = userFound.orders;
        if (!orderIds || orderIds.length === 0) {
            return res.status(404).json({ success: false, message: "No Orders Found" });
        }
        const orders = await OrdersModel.find({ _id: { $in: orderIds } }).sort({createdAt:-1}).skip(page * limit).limit(limit);

        if(!orders) return res.status(400).json({success:false, message:"No Order Found"});

        res.status(200).json({ success: true, orders });
    } 
    catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const adminOrders = async (req, res) => 
{
    try 
    {
        const page = parseInt(req.params.page) || 0;

        const orders = await OrdersModel.find({}).sort({createdAt:-1}).skip(limit*page).limit(limit);
        if (!orders || orders.length === 0) {
            return res.status(404).json({ success: false, message: "No Orders Found" });
        }

        res.status(200).json({ success: true, orders });
    } 
    catch (error) 
    {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};



export const getOrder = async (req, res) =>
{
    try
    {
        const user = req.user;

        const {orderId} = req.params;
        const orderFound = await OrdersModel.findById(orderId);
        if(!orderFound) return res.status(400).json({success:false, message:"No Order Found"})

        if (user?.role !== allowedRoles.Admin && orderFound.userId.toString() !== user?.id) return res.status(401).json({ success: false, message: "Unauthorized" });

        res.status(200).json({ success: true, orderFound });
    }
    catch (error) 
    {
        console.error("Error setting address:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}


export const removeOrder = async (req, res) =>
{
    try
    {
        const user = req.user;
        const userFound = await userModel.findById(user.id);
        if (!userFound) return res.status(401).json({ success: false, message: "Unauthorized" });

        const id = req.params.orderId;
        const deleted = await OrdersModel.findById(id);
        if (!deleted) return res.status(404).json({ success: false, message: "Order not found" });
        if (user?.role !== allowedRoles.Admin && deleted.userId.toString() !== userFound._id.toString()) return res.status(401).json({ success: false, message: "Unauthorized" });


        await deleted.deleteOne(); 

        userFound.orders = userFound.orders.filter(orderId => orderId.toString() !== id);
        await userFound.save();

        res.status(200).json({ success: true, message: "Order deleted" });

    }
    catch (error) 
    {
        console.error("Error setting address:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}


export const addOrder = async (req, res) => 
    {
        try 
        {
            const { order, amount, paymentType, address } = req.body;
            const user = req.user;
            const userFound = await userModel.findById(user.id);
            if (!userFound) return res.status(401).json({ success: false, message: "Unauthorized" });
            
            if( !order || !amount || !paymentType || !address) return res.status(400).json({ success: false, message: "Missing data" });
            if (!Array.isArray(order) || !isValidId(order)) return res.status(400).json({ success: false, message: "Invalid order data " });
            
            const newOrder = new OrdersModel({ list: order, amount, paymentType, userId: user.id, address });
            await newOrder.save();
    
            if (!userFound.orders.includes(newOrder._id)) 
            {
                userFound.orders.push(newOrder._id);
            }
            await userFound.save();
    
            res.status(200).json({ success: true, message: "New Order Placed", orderId: newOrder._id });
        } 
        catch (error) 
        {
            console.error("Error placing order:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    };
    



