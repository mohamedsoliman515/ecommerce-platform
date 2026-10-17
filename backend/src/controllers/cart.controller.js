import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";

export async function getCart(req, res) {
    try {
        let cart = await Cart.findOne({ clerkId: req.user.clerkId }).populate("items.productId");
        if (!cart) {
            try {
                const user = req.user;
                cart = await Cart.create({
                    userId: user._id,
                    clerkId: user.clerkId,
                    items: [],
                });
            } catch (error) {
                // Another concurrent request may have created the cart
                if (error.code !== 11000) {
                    throw error;
                }
            }
        }
        res.status(200).json({ cart });
    } catch (error) {
        console.error("Error in getCart controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function addToCart(req, res) {
    try {
        const { productId, quantity = 1 } = req.body;

        // validate product exists and has stock
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        if (product.stock < quantity) {
            return res.status(400).json({ error: "Insufficient stock" });
        }

        let cart = await Cart.findOne({ clerkId: req.user.clerkId });

        if (!cart) {
            const user = req.user;

            cart = await Cart.create({
                user: user._id,
                clerkId: user.clerkId,
                items: [],
            });
        }

        // check if item already in the cart
        const existingItem = cart.items.find((item) => item.product.toString() === productId);

        if (existingItem) {

            // increment quantity by 1
            const newQuantity = existingItem.quantity + quantity;
            if (product.stock < newQuantity) {
                return res.status(400).json({ error: "Insufficient stock" });
            }
            existingItem.quantity = newQuantity;
        } else {
            // add new item
            cart.items.push({ productId: productId, quantity });
        }

        await cart.save();

        res.status(200).json({ message: "Item added to cart", cart });
    } catch (error) {
        console.error("Error in addToCart controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function updateCartItem(req, res) {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;

        // Validate product ID
        if (!mongoose.isValidObjectId(productId)) {
            return res.status(400).json({
                error: "Invalid product ID",
            });
        }
        // Validate quantity
        const qty = Number(quantity);
        if (
            quantity === undefined ||
            quantity === null ||
            quantity === "" ||
            (typeof quantity !== "number" &&
                typeof quantity !== "string") ||
            !Number.isSafeInteger(qty) ||
            qty < 1
        ) {
            return res.status(400).json({
                error: "Quantity must be a positive integer",
            });
        }
        // find cart by clerkId
        const cart = await Cart.findOne({ clerkId: req.user.clerkId });
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }
        // find item in cart
        const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
        if (itemIndex === -1) {
            return res.status(404).json({ error: "Item not found in cart" });
        }
        // check if product exists & validate stock
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        if (product.stock < qty) {
            return res.status(400).json({ error: "Insufficient stock" });
        }
        cart.items[itemIndex].quantity = qty;
        await cart.save();
        res.status(200).json({ message: "Cart updated successfully", cart });
    } catch (error) {
        console.error("Error in updateCartItem controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
export async function removeFromCart(req, res) {
    try {
        const { productId } = req.params;

        //  Validate product ID format
        if (!mongoose.isObjectIdOrHexString(productId)) {
            return res.status(400).json({
                error: "Invalid product ID",
            });
        }
        const cart = await Cart.findOne({ clerkId: req.user.clerkId });
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        //  Check whether the item exists in this cart
        const itemExists = cart.items.some(
            (item) => item.product.toString() === productId
        );

        if (!itemExists) {
            return res.status(404).json({
                error: "Item not found in cart",
            });
        }
        cart.items = cart.items.filter((item) => item.product.toString() !== productId);
        await cart.save();

        res.status(200).json({ message: "Item removed from cart", cart });
    } catch (error) {
        console.error("Error in removeFromCart controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
export const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ clerkId: req.user.clerkId });
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        cart.items = [];
        await cart.save();

        res.status(200).json({ message: "Cart cleared", cart });
    } catch (error) {
        console.error("Error in clearCart controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};