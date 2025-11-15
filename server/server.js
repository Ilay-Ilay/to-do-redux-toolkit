import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { sequelize } from "./db.js";
import errorHandler from "./error-handler-middleware.js";
import authRouter from "./auth-router.js";
import apiRouter from "./api-router.js";
import verifyToken from "./verify-me-middleware.js";

const app = express();

const PORT = process.env.PORT || 4444;

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/api", verifyToken, apiRouter);

app.use(errorHandler);

(async () => {
  sequelize.authenticate();
  //   sequelize.sync({ force: true });
  sequelize.sync();
  app.listen(PORT, () => {
    console.log(`Server runs at:${PORT}`);
  });
})();
