import { Router } from "express";
import { ReservationController } from "../controllers/reservationController.js";
import { authenticate, requireAdmin } from "../middleware/auth.js";

const router = Router();

router.post("/", authenticate, ReservationController.create);
router.get("/user", authenticate, ReservationController.getByUser);
router.get("/all", authenticate, requireAdmin, ReservationController.getAll);
router.delete("/:id", authenticate, ReservationController.delete);

export default router;
