import { Router } from "express";
import logger from "../../middleware/logger";
import { AuthController } from "./auth.controller";


const route=Router();
route.post("/auth/login",logger, AuthController.loginUser);

export  const AuthRoutes=route;