import { pool } from "./pool.js";

export async function getAllItems(sort = 'id', order = 'asc', search = '', type = '') {
  // Whitelist allowed column names and sort directions
  const allowedColumns = ['name', 'type', 'stock', 'cost'];
  const safeColumn = allowedColumns.includes(sort) ? sort : 'id';
  const safeOrder = order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';

  const params = [`%${search.trim()}%`];
  let query = `SELECT * FROM items WHERE name ILIKE $1`;

  if (type) {
    params.push(type);
    query += ` AND type = $${params.length}`;
  }

  query += ` ORDER BY ${safeColumn} ${safeOrder}`;

  const { rows } = await pool.query(query, params);
  return rows;

  //const { rows } = await pool.query("SELECT * FROM items ORDER BY cost ASC");
}

export async function insertItem({ name, type, stock, cost }) {
  await pool.query("INSERT INTO items (name, type, stock, cost) VALUES ($1, $2, $3, $4)", [name, type, stock, cost]);
}

export async function getItemById(id) {
  const { rows } = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
  return rows[0];
}

export async function editItem(id, { name, type, stock, cost }) {
  await pool.query(
    `UPDATE items 
     SET name = $1, type = $2, stock = $3, cost = $4 
     WHERE id = $5`,
    [name, type, stock, cost, id]
  );
}

export async function deleteItem(id) {
  await pool.query('DELETE FROM items WHERE id = $1', [id]);
}
