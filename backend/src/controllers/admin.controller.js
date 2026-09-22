import cloudinary from "../config/cloudinary.js";
import {Product} from "../models/product.model.js";

export async function createProduct(req, res) {
    try {
        const { name, description, price, category, stock } = req.body;
            if (!name || !description || !price || !category || !stock) {
                 return res.status(400).json({ message: "All fields are required" });
            }

    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "At least one image is required" });
    } 

    if (req.files.length > 3) {
        return res.status(400).json({ message: "Maximum 3 images allowed" });
    }
    const uploadPromises = req.files.map(file => {
        return cloudinary.uploader.upload(file.path,{
            folder: "products"
        });
    });
    
    const uploadResults = await Promise.all(uploadPromises);
const imagesUrls = uploadResults.map(result => result.url);


const product =await Product.create({
    name,
    description,
    category,
    price : parseFloat(price),
    stock: parseInt(stock),
    images:imagesUrls
});

res.status(201).json({ message: "Product created successfully", product });

    } catch (error) {
        console.error("Error creating product:", error);
        
        res.status(500).json({ message: "Internal server error" });
    }

}
export async function getAllProducts(_, res) {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json({ message: "Products retrieved successfully", products });
        
    } catch (error) {
        console.error("Error getting products:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


