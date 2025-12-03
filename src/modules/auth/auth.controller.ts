import { Request, Response } from "express";
import { AuthService } from "./auth.service.ts";

const loginUser=async (req: Request, res: Response) => {
    try{
        const {email,password}=await req.body;
        const result=await AuthService.loginUser(email,password);
        if(!result){
            res.status(400).json({
                status:400,
                message:"User Not Found",
                success:false
    
            })
        }
        return res.status(200).json({
          status: 200,
          success: true,
          message: "user created successfully",
          data: result,
        });
    }
    catch(err:any){
      return  res.status(400).json({
            status:400,
            message:err.message,
            success:false

        })
    }
 
   }

export const AuthController={
    loginUser
}