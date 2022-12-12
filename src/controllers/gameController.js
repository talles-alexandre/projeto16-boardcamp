import { connection } from "../db/database.js";

export async function getGame(req, res) {
  try {
    const games = await connection.query("SELECT * FROM games");
    res.status(200).send(games.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function createGame(req, res) {
  try {
    const newgame = req.body;
    const result = await connection.query(
      "SELECT * FROM categories WHERE id = $1",
      [newgame.categoryId]
    );
    if (result.rowCount === 0) {
      return res.sendStatus(400);
    }
    await connection.query(
      'INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)',
      [
        newgame.name,
        newgame.image,
        Number(newgame.stockTotal),
        newgame.categoryId,
        Number(newgame.pricePerDay),
      ]
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
