import { GroceryModel } from "../model/grocery.js"

export const getAllProducts = async (erq, res) => {
    try
    {
        const products = await GroceryModel.find({});   
        if(!products) return res.status(400).json({success:false, message:"No Products Found"});
        res.status(200).json({success:true, products});
    }
    catch (error) 
    {
        console.error("Error getting address:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const addProduct = async (req, res) => 
{
    try 
    {
        const { name, category, rating, price, offerPrice, image, description, inStock } = req.body;

        if (!name || !category || !rating || !price || !offerPrice || !image || !description || inStock === undefined) {
            return res.status(400).json({ success: false, message: "Missing Data" });
        }

        const newProduct = await GroceryModel.create({ name, category, rating, price, offerPrice, image, description, inStock });

        return res.status(201).json({ success: true, message: "Product added successfully", product: newProduct });
    }
    catch (error) 
    {
        console.error("Error adding product:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
