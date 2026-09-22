import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  // updateProduct,
  // deleteProduct,
} from "../controllers/admin.controller.js";
import { protectRoute, isAdmin } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";
const router = Router();

router.use(protectRoute, isAdmin);

router.post("/products", upload.array("images", 3), createProduct);
router.get("/products", getAllProducts);
// router.put("/products/:id", upload.array("images", 3), updateProduct);
// router.delete("/products/:id", deleteProduct);
export default router;
