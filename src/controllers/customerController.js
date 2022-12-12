import { connection } from "../db/database.js";

export async function getCustomers(req, res) {
  const { cpf } = req.query;

  try {
    const params = [];
    let clause = "";
    if (cpf) {
      params.push(`${cpf}%`);
      clause += `WHERE cpf ILIKE $${params.length}`;
    }

    const customers = await connection.query(
      `SELECT * FROM customers ${clause} ${params}`
    );

    res.status(200).send(customers.rows[0]);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getCustomer(req, res) {
  const { id } = req.params;

  try {
    const result = await connection.query(
      "SELECT * FROM customers WHERE id= $1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }

    res.status(200).send(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function createCustomer(req, res) {
  try {
    const newcustomer = req.body;
    const result = await connection.query(
      "SELECT * FROM customers WHERE cpf = $1",
      [newcustomer.cpf]
    );
    if (result.rowCount > 0) {
      return res.sendStatus(409);
    }
    await connection.query(
      "INSERT INTO customers (name,phone,cpf,birthday) VALUES ($1,$2,$3,$4)",
      [
        newcustomer.name,
        newcustomer.phone,
        newcustomer.cpf,
        newcustomer.birthday,
      ]
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function updateCustomer(req, res) {
  const { id } = req.params;

  try {
    const customer = req.body;
    const result = await connection.query(
      "SELECT * FROM customers WHERE cpf = $1 AND id <> $2",
      [customer.cpf, id]
    );
    if (result.rowCount > 0) {
      return res.sendStatus(409);
    }
    await connection.query(
      `UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5`,
      [customer.name, customer.phone, customer.cpf, customer.birthday, id]
    );

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
