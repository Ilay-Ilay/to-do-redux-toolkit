import express from "express";
import verifyToken from "./verify-me-middleware.js";
import AuthController from "./auth-controller.js";

const router = express.Router();

router.get("/me", verifyToken, AuthController.me);
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

export default router;
