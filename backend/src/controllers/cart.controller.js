import { Cart } from "../models/cart.model";

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