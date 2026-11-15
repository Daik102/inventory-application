#! /usr/bin/env node

import { Client } from "pg";

const SQL = `
CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 100 ) NOT NULL,
  type VARCHAR ( 30 ) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0 AND stock <= 99),
  cost INTEGER NOT NULL DEFAULT 0 CHECK (cost >= 0 AND cost <= 99999)
);

INSERT INTO items (name, type, stock, cost) 
VALUES 
  ('Iron Sword', 'Sword', 3, 100),
  ('Oak Spear', 'Spear', 5, 150),
  ('Wood Arrow', 'Arrow', 2, 180),
  ('Bronze Sword', 'Sword', 7, 70),
  ('Golden Axe', 'Axe', 2, 1500),
  ('Thunder Rod', 'Rod', 10, 300),
  ('Steel Hammer', 'Hammer', 3, 500),
  ('Shuriken', 'Others', 1, 1000);
`;

async function main() {
  console.log("seeding...");
  const connectionString = process.argv[2] || process.env.DATABASE_URL;
  const client = new Client({
    connectionString,
    ssl: connectionString.includes("localhost") ? false : { rejectUnauthorized: false },
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
