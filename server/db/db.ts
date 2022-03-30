import mysql, { PoolConnection } from "mysql";
import dotenv from "dotenv";

dotenv.config();
const host = process.env.HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DATABASE;

const pool = mysql.createPool({
  connectionLimit: 100,
  user: user,
  host: host,
  password: password,
  database: database,
});

export const getConnection = () => {
  return new Promise<PoolConnection>((resolve, reject) => {
    pool.getConnection((err: Error, conn: PoolConnection) => {
      if (err) reject(err);
      resolve(conn);
    });
  });
};
