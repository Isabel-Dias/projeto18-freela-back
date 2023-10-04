import { Router } from "express";
import { signUp } from "../controllers/user.controller.js";
import { signIn } from "../controllers/auth.controller.js";
import { AuthSession } from "../middlewares/authSession.middleware.js";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);

export default router;