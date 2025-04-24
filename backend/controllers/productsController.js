import { GroceryModel } from "../model/grocery.js"

export const getAllProducts = async (req, res) => {
    try
    {
        const products = await GroceryModel.find({});   
        if(!products) return res.status(400).json({success:false, message:"No Products Found"});
        res.status(200).json({success:true, products});
    }
    catch (error) 
    {
        console.error("Error getting address:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const addProduct = async (req, res) => {
    try {
        const { name, category, price, offerPrice, description, image } = req.body;

        if (!name || !category || !price || !offerPrice || !description || !image) {
            return res.status(400).json({ success: false, message: "Missing Data" });
        }

        if (!Array.isArray(image)) {
            return res.status(400).json({ success: false, message: "Invalid Data: image must be an array" });
        }

        const newProduct = new GroceryModel({
            name,
            category,
            price,
            offerPrice,
            description,
            image
        });

        await newProduct.save();

        return res.status(201).json({ success: true, message: "Product added successfully" });
    } catch (error) {
        console.error("Error adding product:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const setStock = async (req, res) => 
{
    try 
    {
        const { id, stock } = req.body;

        const product = await GroceryModel.findById(id);
        if (!product) return res.status(400).json({ success: false, message: "Product Not Found" });

        product.inStock = stock;
        await product.save();

        res.status(200).json({ success: true, product });
    } 
    catch (error) 
    {
        console.error("Error updating stock:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getProduct = async (req, res) =>
{
    try
    {
        const id = req.params.id;
        const productFound = await GroceryModel.findById(id);
        if(!productFound) return res.status(400).json({ success: false, message: "Product Not Found" });

        return res.status(200).json({success:false, product:productFound});
    }
    catch(err)
    {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}