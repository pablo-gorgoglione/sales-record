import express from "express";
import cors from "cors";
import indexRouter from "./routes/index";
import { errorHandler } from "./middleware/errorHandler";
import { connection } from "./db/connection";

const port = 4500;
const app = express();

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

app.listen(port, () => {
  console.log("Listening on port ", port);
});
