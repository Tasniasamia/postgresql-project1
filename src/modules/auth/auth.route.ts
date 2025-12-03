import { Router } from "express";
import logger from "../../middleware/logger.ts";
import { AuthController } from "./auth.controller.ts";


const route=Router();
route.post("/auth/login",logger, AuthController.loginUser);

export  const AuthRoutes=route;