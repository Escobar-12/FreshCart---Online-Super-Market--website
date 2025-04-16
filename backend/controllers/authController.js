import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {userModel} from "../model/userInfo.js"
import { allowedRoles } from "../config/allowedRoles.js";
import { profile } from "console";


export const register = async (req, res) =>
{
    const {name, email, password, img} = req.body;
    if(!name || !email || !password) return res.status(400).json({success:false, message:"Missing credentials"});
    try
    {
        const userFoundWithEmail = await userModel.findOne({email});
        const userFoundWithName = await userModel.findOne({name});
        if (userFoundWithEmail || userFoundWithName) {
            return res.status(409).json({ success: false, message: "User already exists." });
        }
        const hashedPwd = await bcrypt.hash(password,10);
        const role = allowedRoles.User; 
        const newUser = await userModel.create({
            name,email,role,img,
            password:hashedPwd,
        });

        const Access_token = jwt.sign(
            {id:newUser._id,name,role},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"10m"}
        );

        const Refresh_token = jwt.sign(
            {id:newUser._id,name,role},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:"1d"}
        );

        res.cookie("jwt", Refresh_token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            samesite: "Lax"
        });

        return res.status(200).json(
            {
                id:newUser._id,
                user:name,
                Access_token,
                role: role,
                profile:img
            }
        );
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: "Error while registering" });
    }
}
export const login = async (req, res) =>
{
    const {name, email,password} = req.body;
    if((!email && !name) || !password) return res.status(400).json({success:false , message:"Missing credentials"});
    try
    {
        const foundUser = await userModel.findOne({name});
        if(!foundUser) return res.status(400).json({success:false, message: "User not found"});
        const matchPWD = await bcrypt.compare(password, foundUser.password);
        if(!matchPWD) return res.status(401).json({success:false, message:"Invalid password"});
        
        const Access_token = jwt.sign(
            {id:foundUser._id,name:foundUser.name,role:foundUser.role},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"10m"}
        );

        const Refresh_token = jwt.sign(
            {id:foundUser._id,name:foundUser.name,role:foundUser.role},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:"1d"}
        );

        res.cookie("jwt", Refresh_token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            samesite: "Lax"
        });

        return res.status(200).json(
            {
                id:foundUser._id,
                user:name,
                Access_token,
                role: foundUser.role,
                profile:foundUser.img
            }
        );
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
}

export const refresh = async (req,res)=>
{
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    if(!refreshToken) return res.status(401).json({success:false, message:"No token found"});
    try
    {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const newAccessToken = jwt.sign(
            { id: decoded.id, name: decoded.name, role: decoded.role },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "10m"}
        )
        const userFoundWithName = await userModel.findOne({name:decoded.name});
        if(!userFoundWithName) return res.status(401).json({success:false,message:"Server Error"})
        res.json({ 
            id:decoded.id,
            user: decoded.name,  
            Access_token: newAccessToken, 
            roles: decoded.role ,
            profile:userFoundWithName.img
        });
    }
    catch(err)
    {
        console.error("Error verifying refresh token:", err);
        res.status(403).json({ success: false, message: "Invalid or expired token" });
    }
}

export const logout = async (req,res) =>
{
    try
    {
        res.clearCookie("jwt",
            {
                httpOnly:true,
                samesite:"Lax"
            }
        );
        return res.status(200).json({ success: true, message: "Logged out successfully" });
    } 
    catch (err) 
    {
        return res.status(500).json({ success: false, message: "Error while logging out" });
    }
}