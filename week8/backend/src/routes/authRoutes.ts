
import { Router } from "express";
import { loginUserController, registerUserController } from "../controllers/authController";

const router = Router();

router.post("/auth/register", registerUserController);
router.post("/auth/login", loginUserController);

export default router;
