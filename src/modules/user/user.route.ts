import { Request, Response, Router } from "express";
import { pool } from "../../config/db.ts";
import logger from "../../middleware/logger.ts";
import { userController } from "./user.controller.ts";

const route=Router();
route.post("/users",logger, userController.createUser);
  
  

export  const userRoutes=route;