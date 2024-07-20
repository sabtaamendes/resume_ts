import Joi from "joi";

export const candidatesSchema = Joi.object({
	fullname: Joi.string().required(),
	phone: Joi.string().max(11).required(),
	email: Joi.string().email().required(),
	desired_position: Joi.string().required(),
});
