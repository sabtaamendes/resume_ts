import { Router } from "express";

import { usersPost } from "../controllers/users-controller";
import { validateBody } from "../middlewares/validation-middleware";
import { createUserSchema } from "../schemas/users-schema";

const usersRouter = Router();

usersRouter.post("/users", validateBody(createUserSchema), usersPost);

export { usersRouter };
