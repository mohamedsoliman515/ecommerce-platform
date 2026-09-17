import { Router } from "express";
import { createProduct } from "../controllers/admin.controller.js";
import {protectRoute, isAdmin} from "../middleware/auth.middleware.js";
const router = Router();
router.post("/product",protectRoute, isAdmin,createProduct)
export default router;