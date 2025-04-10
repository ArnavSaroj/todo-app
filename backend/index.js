import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./models/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log("database connected successfully:", res.rows[0].now);
  }
});

app.get("/alltodos", async (req, res) => {
  try {
    const response = await db.query("select * from all_todos");
    res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
});

app.post("/puttodos", async (req, res) => {
  try {
    const { description } = req.body;

    const response = await db.query(
      "insert into all_todos (description) values ($1) returning *",
      [description]
    );

    res.status(200).json(response.rows[0]);
  } catch (error) {
    console.error(error);
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await db.query("select * from all_todos where id=$1", [
      id,
    ]);

    res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);
  }
});

app.patch("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const response = await db.query(
      "update all_todos set description=$1 where id=$2 returning *",
      [description, id]
    );
    res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await db.query("delete from all_todos where id=$1", [id]);

    res.status(200).send("query succesfully deleted");
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`server listening to port ${port} 👍`);
});
