import { Router } from "express";
import { AccommodationController } from "../controllers/accommodationController.js";
import { authenticate, requireAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/", AccommodationController.getAll);
router.get("/:id", AccommodationController.getById);
router.post("/", authenticate, requireAdmin, AccommodationController.create);
router.put("/:id", authenticate, requireAdmin, AccommodationController.update);
router.delete("/:id", authenticate, requireAdmin, AccommodationController.delete);

export default router;
