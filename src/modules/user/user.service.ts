import { pool } from "../../config/db.ts";

const createUser=async(name:string,email:string)=>{
    const result = await pool.query(
        `INSERT INTO users (name,email) VALUES ($1, $2) RETURNING * `,
        [name, email]
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