import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getAllOrders,
  getAllCustomers,
  updateOrderStatus,
  getDashboardStats,
} from "../controllers/admin.controller.js";
import { protectRoute, isAdmin } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";
const router = Router();

router.use(protectRoute, isAdmin);
// products 
router.post("/products", upload.array("images", 3), createProduct);
router.get("/products", getAllProducts);
router.put("/products/:id", upload.array("images", 3), updateProduct);
router.delete("/products/:id", deleteProduct);
// orders
router.get("/orders",getAllOrders)
router.patch("/orders/:orderId/status",updateOrderStatus)
// customers
router.get("/customers",getAllCustomers)
// dashboard
router.get("/dashboard/stats",getDashboardStats)

export default router;
