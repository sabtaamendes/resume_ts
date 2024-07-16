import { Router } from "express";
import multer from "multer";
import fs from "fs";
import {
  getCandidates,
  getPdfByIdCandidate,
  getPagination,
  postJobsCandidates,
} from "../controllers/candidates-controller";

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
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const candidatesRouter = Router();
candidatesRouter
  .get("/candidates", getCandidates)
  .get("/candidate/:id", getPdfByIdCandidate)
  .get("/pagination", getPagination)
  .post("/upload", upload.single("file"), validateBody(candidatesSchema), postJobsCandidates);
export { candidatesRouter };
