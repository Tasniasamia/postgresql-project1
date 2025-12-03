import { Router } from "express";
import logger from "../../middleware/logger";
import { userController } from "./user.controller";
import { auth } from "../../middleware/auth";

const route=Router();
route.post("/users",logger, userController.createUser);
route.get("/users",auth("admin","user"),userController.getUser );
route.get("/users/:id",logger, userController.getSingleUser);
route.put("/users/:id",logger,userController.updateUser);
route.delete("/users/:id",logger,userController.deleteUser);
export  const userRoutes=route;