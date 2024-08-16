import Joi from "joi";

export const createUserSchema = Joi.object({
<<<<<<< HEAD
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
=======
	username: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
});
>>>>>>> 6665872 (feat: tests)
