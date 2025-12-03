import bcrypt from "bcryptjs";
import { pool } from "../../config/db.ts";
import config from "../../config/index.ts";
import jwt, { JwtPayload } from "jsonwebtoken"
const loginUser=async(email:string,password:string)=>{

const result=await pool.query('SELECT * FROM users WHERE email=$1',[email]);

if(result.rows.length === 0){
    return null;
}

const user=result?.rows[0];
const matchPassword=await bcrypt.compare(password as string,user?.password);
if(!matchPassword){
    return false;
}
const secret= config.jwt_secret as string;
const token= jwt.sign({name:user?.name,email,role:user?.role},secret,{ algorithm: 'HS256',expiresIn:'24h' });
return {token,user};

}



export const AuthService={
    loginUser
}