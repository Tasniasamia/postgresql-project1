import { Request, Response } from "express";
import { pool } from "../../config/db.ts";
import { userService } from "./user.service.ts";

const createUser=async (req: Request, res: Response) => {
    console.log(typeof req?.body);
    const {id, name, email, age, phone, address} = req?.body;
  console.log("name",name);
  console.log("email",email);
   const result=await userService.createUserService(name,email);
    res.status(200).json({
      status: 200,
      success: true,
      message: "user created successfully",
      data: result.rows[0],
    });
  }
  export const userController={
    createUser,
  }