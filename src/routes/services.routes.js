import { Router } from "express";
import { AuthSession } from "../middlewares/authSession.middleware.js";
import { getOneService, getServices, registerService } from "../controllers/services.controller.js";


const router = Router();

router.get("/services", AuthSession, getServices);
router.post("/services", AuthSession, registerService);
router.get("/services/:id", AuthSession, getOneService);

export default router;