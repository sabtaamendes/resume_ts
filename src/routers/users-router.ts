import { Router } from "express";

import { createUserSchema } from "../schemas/users-schema";
import { validateBody } from "../middlewares/validation-middleware";
import { usersPost } from "../controllers/users-controller";

const usersRouter = Router();

usersRouter.post("/users", validateBody(createUserSchema), usersPost);

export { usersRouter };