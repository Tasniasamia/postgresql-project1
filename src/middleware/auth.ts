import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config/index.ts";
export const auth=(...roles:string[])=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
    try{
     
      const token=await req.headers.authorization;
      if(!token){
        res.status(400).json({
            success:false,
            status:400,
            message:"You are not allowed"
        })
      }

      const decoded=await jwt.verify(token as string,config.jwt_secret as string) as JwtPayload;
      if(roles.length && !roles.includes(decoded?.role)){
        res.status(400).json({
            success:false,
            status:400,
            message:"You are not allowed"
        })
      }
      req.user=decoded;
      next();
    }
    catch(error:any){
        res.status(400).json({
            success:false,
            status:400,
            message:error.message
        })
    }
    }
}