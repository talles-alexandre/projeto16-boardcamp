import { connection } from "../db/database.js";

export async function getCategories(req, res) {
  try {
    const categories = await connection.query("SELECT * FROM categories");
    res.status(200).send(categories.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function createCategories(req, res) {
  try {
    const newcategory = req.body;
    const result = await connection.query(
      "SELECT * FROM categories WHERE name = $1",
      [newcategory.name]
    );
    if (result.rowCount > 0) {
      return res.sendStatus(409);
    }
    await connection.query("INSERT INTO categories (name) VALUES ($1)", [
      newcategory.name,
    ]);

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
