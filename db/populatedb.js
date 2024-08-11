#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
    category_id SERIAL PRIMARY KEY,
    category TEXT NOT NULL);

CREATE TABLE IF NOT EXISTS items (
    item_id SERIAL PRIMARY KEY,
    item TEXT NOT NULL,
    quantity INT,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) 
);

INSERT INTO categories(category)
VALUES ('Electric Guitar'), ('Acoustic Electric Guitar'), ('Acoustic Guitar');

INSERT INTO items (item, quantity, category_id) 
VALUES
  ('PRS SE Customs 24', '20', '1'),
  ('Fender Play Stratocaster', '10', '1'),
  ('Gibson Les Paul', '30', '1'),
  ('Fender Vintra II Tele', '10', '1'),
  ('Taylor American Dream AD17E', '20', '2'),
  ('Martin DJR-10E', '10', '2'),
  ('Martin 000-28E', '10', '2'),
  ('FENDER CD-60SCE Dreadnought', '5', '3'),
  ('STAGG Grand Auditorium', '10', '3'),
  ('FENDER FC1 Classical', '30', '3');
`;

async function main() {
  console.log("seeding...");
  console.log(process.env.CONNECTION_STRING);
  const client = new Client({
    connectionString: "postgresql://hamish:1Hammer1$@localhost:5432/items"
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
