import { userController } from "../controllers/user.controller.js";
import { authMiddleware  } from "../middlewares/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.post("/login", userController.login);
router.post("/registrarse", userController.register);
router.get("/perfil", authMiddleware, userController.perfil);

export default router;