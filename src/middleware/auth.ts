import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config/index.ts";
export const auth=(...roles:string[])=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
      if(roles.length === 0){
        res.status(400).json({
            success:false,
            status:400,
            message:"You are not allowed"
        })
      }
      const token=await req.headers.authorization;
      if(!token){
        res.status(400).json({
            success:false,
            status:400,
            message:"You are not allowed"
        })
      }


     
      console.log("config.jwt_secret",config.jwt_secret);
      const decoded=await jwt.verify(token as string,config.jwt_secret as string);
      if(!decoded){
        res.status(400).json({
            success:false,
            status:400,
            message:"You are not allowed"
        })
      }
      req.user=decoded as JwtPayload;
      next();

    }
}