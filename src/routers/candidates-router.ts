import fs from "node:fs";
import { Router } from "express";
import multer from "multer";
import {
	getCandidates,
	getPagination,
	getPdfByIdCandidate,
	postJobsCandidates,
} from "../controllers/candidates-controller";

import { authenticateToken } from "../middlewares/authentication-middleware";
import { validateBody } from "../middlewares/validation-middleware";
import { candidatesSchema } from "../schemas/authentication-schema";

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadDir);
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

const upload = multer({ storage: storage });

const candidatesRouter = Router();
candidatesRouter
	.get("/candidates", authenticateToken, getCandidates)
	.get("/candidate/:id", authenticateToken, getPdfByIdCandidate)
	.get("/pagination", getPagination)
	.post(
		"/upload",
		upload.single("file"),
		validateBody(candidatesSchema),
		postJobsCandidates,
	);
export { candidatesRouter };
