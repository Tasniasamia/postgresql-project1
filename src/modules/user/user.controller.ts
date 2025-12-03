import { Request, Response } from "express";
import { pool } from "../../config/db.ts";
import { userService } from "./user.service.ts";

const createUser=async (req: Request, res: Response) => {
    const {id, name, email, age, phone, address} = req?.body;

   const result=await userService.createUser(name,email);
    res.status(200).json({
      status: 200,
      success: true,
      message: "user created successfully",
      data: result.rows[0],
    });
  }

const getSingleUser=async (req: Request, res: Response) => {
  const { id } = req.params;
  const result =await userService.getSingleUser(id);
  res.status(200).json({
    status: 200,
    success: true,
    data: result.rows[0],
  });
}
const getUser=async (req: Request, res: Response) => {
  const result = await userService.getUser();
  res.status(200).json({
    status: 200,
    success: true,
    data: result.rows,
  });
}

const updateUser=  async (req: Request, res: Response) => {
 
  const {id}=req?.params;
  const {name,email}=req.body;
  const result=await userService.updateUser(name,email,id);
  return res.json({
    success: true,
    message: "User updated successfully",
    data: result.rows[0],
  });
}

const deleteUser=async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userService.deleteUser(id);
  res.status(200).json({
    success: true,
    message: "Data deleted successfully",
    data: result.rowCount,
  });
}

  export const userController={
    createUser,getSingleUser,getUser,updateUser,deleteUser
  }