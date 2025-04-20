import { Router } from "express";
import { getAllOrders, getOrder, removeOrder, addOrder } from "../controllers/ordersController.js";
import { verifyAccessToken } from "../middleware/VerifyAuth.js";

const router = Router();


router.get("/getOrder/:orderId",verifyAccessToken,getOrder)
router.get("/allOrders/:page",verifyAccessToken,getAllOrders)
router.post("/addOrder",verifyAccessToken,addOrder)
router.delete("/deleteOrder/:orderId",verifyAccessToken,removeOrder)

export default router;