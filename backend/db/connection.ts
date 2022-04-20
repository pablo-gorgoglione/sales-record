import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
const host = process.env.HOST as string;
const user = process.env.DB_USER as string;
const password = process.env.DB_PASSWORD as string;
const database = process.env.DATABASE as string;
const testDatabase = process.env.TESTDATABASE as string;
let useDatabase = "";

if (process.env.NODE_ENV === "test") {
  useDatabase = testDatabase;
} else {
  useDatabase = database;
}

const db = new Sequelize(useDatabase, user, password, {
  host: host,
  dialect: "mysql",
  logging: false,
});

export const connection = async () => {
  try {
    await db.authenticate();
    if (process.env.NODE_ENV === "test") {
      console.log("Test Database is online.");
    } else {
      console.log("Database is online.");
    }
  } catch (error) {
    console.log(error);
  }
};
export { db };
