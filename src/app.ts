import "reflect-metadata";
import "express-async-errors";
import cors from "cors";
import express, { type Express } from "express";

import { connectDb, disconnectDB } from "./configs/database";
import { loadEnv } from "./configs/envs";

loadEnv();

import { handleApplicationErrors } from "./middlewares/handle-application-error";
import { authenticationRouter } from "./routers/authentication-router";
import { candidatesRouter } from "./routers/candidates-router";
import { usersRouter } from "./routers/users-router";

const app = express();

app
	.use(cors())
	.use(express.json())
	.get("/health", (_req, res) => res.send("OK!"))
	.use("/", authenticationRouter)
	.use("/", candidatesRouter)
	.use("/", usersRouter)
	.use(handleApplicationErrors);

export function init(): Promise<Express> {
	connectDb();
	return Promise.resolve(app);
}

export async function close(): Promise<void> {
	await disconnectDB();
}

export default app;
