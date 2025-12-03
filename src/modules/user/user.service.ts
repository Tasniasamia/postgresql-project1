import bcrypt from "bcryptjs";
import { pool } from "../../config/db";

const createUser=async(payload:Record<string,unknown>)=>{
    const {name,email,role,password}= payload;
    const hasPassword=bcrypt.hashSync(password as string,10);
    const result = await pool.query(
        `INSERT INTO users (name,email,password,role) VALUES ($1, $2, $3, $4) RETURNING name,email,role `,
        [name, email,hasPassword,role]
      );
      return result;
}


const getSingleUser=async(id:number|string|any)=>{
    const result= await pool.query(`SELECT * FROM users WHERE id=${id}`);
    return result;
}

const getUser=async()=>{
    const result=await pool.query("SELECT * FROM users");
    return result;
}

const updateUser=async(name:string,email:string,id:number|string|any)=>{
    const result = await pool.query( `
    UPDATE users SET name=$1 , email=$2 WHERE id=$3 RETURNING *;`, [name,email,id]);
  return result;
}

const deleteUser=async(id:string|number|any)=>{
    const result=await pool.query(`DELETE FROM users WHERE id=${id}`);
    return result;
}


export const userService={
    createUser,
    getSingleUser,
    getUser,
    updateUser,
    deleteUser
}