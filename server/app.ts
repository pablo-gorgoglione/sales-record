import express, { Application } from "express";
import cors from "cors";
import indexRouter from "./routes/index";
import { errorHandler } from "./middleware/errorHandler";
import { connection } from "./db/connection";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        iat: number;
        exp: number;
        name: string;
      };
    }
  }
}

const port = 4500;
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);
connection();

app.use("/api", indexRouter);

app.use(errorHandler);

export { app };
