import express, {
  json,
  urlencoded,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import http from "http";

import initDB, { pool } from "./config/db.ts";
import config from "./config/index.ts";
import logger from "./middleware/logger.ts";
import { userRoutes } from "./modules/user/user.route.ts";
const app = express();
const port = config.port;


app.use(json());
app.use(urlencoded());
initDB();


app.use('/api/v1',userRoutes);

app.get("/users/:id", async (req: Request, res: Response) => {
  console.log("hit here");
  const { id } = req.params;
  console.log("id", id);

  const result = await pool.query(`SELECT * FROM users WHERE id=${id}`);
  console.log(result);
  res.status(200).json({
    status: 200,
    success: true,
    data: result.rows,
  });
});

app.get("/users",logger, async (req: Request, res: Response) => {
  const result = await pool.query("SELECT * FROM users");
  res.status(200).json({
    status: 200,
    success: true,
    data: result.rows,
  });
});

app.post("/users", async (req: Request, res: Response) => {
  console.log(typeof req?.body);
  const [, a, b, c, d, e] = Object.values(req.body);

  const result = await pool.query(
    `INSERT INTO users (name,email,age,phone,address) VALUES ($1, $2, $3, $4, $5) RETURNING * `,
    [a, b, c, d, e]
  );
  res.status(200).json({
    status: 200,
    success: true,
    message: "user created successfully",
    data: result.rows[0],
  });
});


app.put("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  if (!id) {
    return res.status(400).json({ message: "User ID missing" });
  }

  let fields: any = [];
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

  const result = await pool.query(query, values);

  return res.json({
    success: true,
    message: "User updated successfully",
    data: result.rows[0],
  });
});

app.delete("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleteData = await pool.query(`DELETE FROM users WHERE id=${id}`);
  console.log(deleteData);
  res.status(200).json({
    success: true,
    message: "Data deleted successfully",
    data: deleteData,
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Not Found Route",
    path: req.path,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
