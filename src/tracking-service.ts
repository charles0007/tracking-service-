require("dotenv").config();
import express from "express";
import log from "./logger";
import connectDB from "./db/connect";
import routes from "./routes";
import cors from "cors";

const port = process.env.PORT || 3200;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  log.info(`Server listing at port ${port}`);

  connectDB;
  // # define routes
  routes(app);
});
