import {Router} from "express";
import { addAddress } from "../controllers/user.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";


const router = Router();

router.use(protectedRoute);
// addresses
router.post("/address",addAddress);
router.get("/address",getAddress);
router.put("/address/:addressId",updateAddress);
router.delete("/address/:addressId",deleteAddress);

// wishlist
router.post("/wishlist",addToWishlist);
router.get("/wishlist",getTotalWishlist);
router.delete("/wishlist/:productId",removeFromWishlist);

export default router;