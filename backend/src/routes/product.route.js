import {Router} from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { getAllProducts } from "../controllers/admin.controller";
import { getProductById } from "../controllers/product.controller";

const router = Router();
router.use(protectRoute);
router.get("/", getAllProducts);
router.get("/:id", getProductById);



export default router;