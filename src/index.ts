import express from "express";
import dotenv from "dotenv";
import connectToDb from "./utils/connectToDB";
import log from "./utils/logger";
import router from "./routes";
import dessrializeUser from "./middleware/deserializeUser";
import path from "path";
dotenv.config();

const app = express();
app.use(
  "/api/public",
  express.static(path.join(path.dirname(__dirname), "src/public/images"))
);
app.use(express.json());
app.use(dessrializeUser);
app.use(router);
8
const port = process.env.PORT || 3001;
app.listen(port, () => {
  log.info(`App started at http://localhost:${port}`);
  connectToDb();
});
