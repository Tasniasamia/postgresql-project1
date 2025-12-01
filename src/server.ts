import express, {
  json,
  urlencoded,
  type Request,
  type Response,
} from "express";
import http from "http";
import { config } from "./app/config/index.js";
import { db } from "./app/config/database.js";
const app = express();
const port = config.port;

(async () => {
  await db.query(`
CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  age INT,
  phone VARCHAR(11),
  address TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()

)`);
})();

app.use(json());
app.use(urlencoded());

app.get("/users/:id", async(req: Request, res: Response) => {
    console.log("hit here")
    const {id} = req.params;
    console.log("id",id);

    const result=await db.query(`SELECT * FROM users WHERE id=${id}`);
    console.log(result);
    res.status(200).json({
      status: 200,
      success: true,
      data: result.rows,
    });

});






app.get("/users", async(req: Request, res: Response) => {
    
    const result=await db.query('SELECT * FROM users');
    res.status(200).json({
      status: 200,
      success: true,
      data: result.rows,
    });

});

app.post("/users", async (req: Request, res: Response) => {
  console.log(typeof req?.body);
  const [, a, b, c, d, e] = Object.values(req.body);

  const result = await db.query(
    `INSERT INTO users (name,email,age,phone,address) VALUES ($1, $2, $3, $4, $5) RETURNING * `,
    [a, b, c, d, e]
  );
  res.status(200).json({
    status: 200,
    success: true,
    message:"user created successfully",
    data: result.rows[0],
  });
});


// app.put("/users", async (req: Request, res: Response) => {
//     console.log(typeof req?.body);
//     const [f, a, b, c, d, e] = Object.values(req.body);
  
//     const result = await db.query(
//       `UPDATE users SET name=$1, email=$2, age=$3, phone=$4, address=$5  WHERE id=$6 RETURNING * `,
//       [a, b, c, d, e,f]
//     );
//     res.status(200).json({
//       status: 200,
//       success: true,
//       message:"user updated successfully",
//       data: result.rows[0],
//     });
//   });

app.put("/users/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
  
    if (!id) {
      return res.status(400).json({ message: "User ID missing" });
    }
  
    let fields:any = [];
    let values = [];
  
    Object.entries(data).forEach(([key, value], index) => {
      fields.push(`${key}=$${index + 1}`);
      values.push(value);
    });
  
    if (fields.length === 0) {
      return res.status(400).json({ message: "No data to update" });
    }
  
    const query = `
      UPDATE users
      SET ${fields.join(", ")}
      WHERE id=$${fields.length + 1}
      RETURNING *;
    `;
  
    values.push(id);
  
    const result = await db.query(query, values);
  
    return res.json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  });

app.delete("/users/:id",async (req: Request, res: Response) => {
    const { id } = req.params;
    const deleteData=await db.query(`DELETE FROM users WHERE id=${id}`);
    console.log(deleteData);
    res.status(200).json({
        success:true,
        message:'Data deleted successfully',
        data:deleteData
    })
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
