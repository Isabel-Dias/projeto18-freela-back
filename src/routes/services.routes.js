import { Router } from "express";
import { AuthSession } from "../middlewares/authSession.middleware.js";
import { getServices, registerService } from "../controllers/services.controller.js";


const router = Router();

router.get("/services", AuthSession, getServices);
router.post("/services", AuthSession, registerService)

export default router;