import { Router } from "express";
import { getAllOrders, getOrder, removeOrder, addOrder, adminOrders } from "../controllers/ordersController.js";
import { verifyAccessToken } from "../middleware/VerifyAuth.js";

const router = Router();


router.get("/getOrder/:orderId",verifyAccessToken,getOrder)
router.get("/allOrders/:page",verifyAccessToken,getAllOrders)
router.get("/AdminOrders",verifyAccessToken,adminOrders)
router.post("/addOrder",verifyAccessToken,addOrder)
router.delete("/deleteOrder/:orderId",verifyAccessToken,removeOrder)

export default router;