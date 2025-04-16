import { Router } from "express";
import { verifyAccessToken } from "../middleware/VerifyAuth.js";
import { getUserAddress, setUserAddress, removeAddress } from "../controllers/userController.js";
const router = Router();


router.post("/addAddress",verifyAccessToken,setUserAddress);
router.get("/getAddress",verifyAccessToken,getUserAddress);
router.post("/removeAddress",verifyAccessToken,removeAddress);

export default router;