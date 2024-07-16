import "reflect-metadata";
import "express-async-errors";
import express, { Express } from "express";
import cors from "cors";

import { connectDb, disconnectDB } from "./configs/database";
import { loadEnv } from "./configs/envs";

loadEnv();

import { handleApplicationErrors } from "./middlewares/handle-application-error";
import { candidatesRouter } from "./routers/candidates-router";


const app = express();

app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/", candidatesRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
  
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;