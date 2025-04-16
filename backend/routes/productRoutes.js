import { Router } from "express";
import { addProduct, getAllProducts } from "../controllers/productsController.js";

const router = Router();

router.get("/allProducts",getAllProducts);
router.post("/addProduct",addProduct);


export default router;
