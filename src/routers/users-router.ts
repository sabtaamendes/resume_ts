import { Router } from "express";

<<<<<<< HEAD
import { createUserSchema } from "../schemas/users-schema";
import { validateBody } from "../middlewares/validation-middleware";
import { usersPost } from "../controllers/users-controller";
=======
import { usersPost } from "../controllers/users-controller";
import { validateBody } from "../middlewares/validation-middleware";
import { createUserSchema } from "../schemas/users-schema";
>>>>>>> 6665872 (feat: tests)

const usersRouter = Router();

usersRouter.post("/users", validateBody(createUserSchema), usersPost);

<<<<<<< HEAD
export { usersRouter };
=======
export { usersRouter };
>>>>>>> 6665872 (feat: tests)
