import { Router } from "express";
import logger from "../../middleware/logger.ts";
import { userController } from "./user.controller.ts";

const route=Router();
route.post("/users",logger, userController.createUser);
route.get("/users",logger,userController.getUser );
route.get("/users/:id",logger, userController.getSingleUser);
route.put("/users/:id",logger,userController.updateUser);
route.delete("/users/:id",logger,userController.deleteUser);
export  const userRoutes=route;