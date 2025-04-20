import { Router } from "express";
import { addProduct, getAllProducts } from "../controllers/productsController.js";
import { VerifyRoles } from "../middleware/VerifyRoles.js";
import { allowedRoles } from "../config/allowedRoles.js";
import { verifyAccessToken } from "../middleware/VerifyAuth.js";

const router = Router();

router.get("/allProducts",getAllProducts);
router.post("/addProduct",verifyAccessToken,VerifyRoles(allowedRoles.Admin),addProduct);


export default router;
