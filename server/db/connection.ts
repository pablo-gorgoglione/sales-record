import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
const host = process.env.HOST as string;
const user = process.env.DB_USER as string;
const password = process.env.DB_PASSWORD as string;
const database = process.env.DATABASE as string;

const db = new Sequelize(database, user, password, {
  host: host,
  dialect: "mysql",
});

export const connection = async () => {
  try {
    await db.authenticate();
    console.log("Database is online.");
  } catch (error) {
    throw new Error("Database connection failed.");
  }
};
export default db;
//without sequileze
/* import mysql, { PoolConnection } from "mysql";
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
 */
