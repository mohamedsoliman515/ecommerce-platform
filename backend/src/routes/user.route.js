import { Router } from "express";
import { addAddress, addToWishlist, deleteAddress, getAddress, getTotalWishlist, removeFromWishlist, updateAddress } from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";


const router = Router();

router.use(protectRoute);
// addresses
router.post("/address", addAddress);
router.get("/address", getAddress);
router.put("/address/:addressId", updateAddress);
router.delete("/address/:addressId", deleteAddress);

// wishlist
router.post("/wishlist", addToWishlist);
router.get("/wishlist", getTotalWishlist);
router.delete("/wishlist/:productId", removeFromWishlist);

export default router;