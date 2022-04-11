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
  logging: false,
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
