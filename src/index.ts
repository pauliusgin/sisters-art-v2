import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { configureExpress } from "./app/config/express";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static("public"));

configureExpress(app);

app.listen(PORT, async () => {
  console.log(`\x1b[34mServer is running on port ${PORT}\x1b[0m`);
});

export default app;
