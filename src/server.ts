import express, {
  json,
  urlencoded,
  type NextFunction,
  type Request,
  type Response,
} from "express";

import initDB, { pool } from "./config/db.ts";
import config from "./config/index.ts";
import logger from "./middleware/logger.ts";
import { userRoutes } from "./modules/user/user.route.ts";
import { AuthRoutes } from "./modules/auth/auth.route.ts";
const app = express();
const port = config.port;


app.use(json());
app.use(urlencoded());
initDB();


app.use('/api/v1',userRoutes);
app.use('/api/v1',AuthRoutes);








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
