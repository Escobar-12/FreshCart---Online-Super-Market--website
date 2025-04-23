import { Router } from "express";
import { login, logout, register, refresh } from "../controllers/authController.js";
import { verifyAccessToken } from "../middleware/VerifyAuth.js";
import { userModel } from "../model/userInfo.js";
import { allowedRoles } from "../config/allowedRoles.js";
import { VerifyRoles } from "../middleware/VerifyRoles.js";


const router = Router();

router.post("/login",login);
router.post("/register",register);
router.get("/logout", logout);
router.get("/refresh", refresh);
router.get("/me",verifyAccessToken,async (req, res)=>{
    try
    {
        const user = await userModel.findOne({ _id: req.user.id }).select("-password");
        if(!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ 
            user: user.name, 
            roles: user.role,
            profile: user.img,
            id:user._id
        });
        
    }
    catch(err)
    {
        res.status(500).json({ message: "Server error", error: err.message });
    }
})

router.get("/isAdmin",verifyAccessToken,VerifyRoles(allowedRoles.Admin), (req,res)=>
{
    return res.status(200).json({success:true, message:"Allowed"});
})

export default router;