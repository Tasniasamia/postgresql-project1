import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config/index.ts";
import { pool } from "../config/db.ts";
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
      const result=await pool.query(`SELECT id,name,email FROM WHERE email=$1`,[decoded.email]);
      const user=result.rows[0];
      if(!user){
        res.status(400).json({
            success:false,
            status:400,
            message:"User not found"
        })
      }
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