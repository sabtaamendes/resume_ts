import type { Request, Response } from "express";
import httpStatus from "http-status";
import userService from "../../services/users-service";

export async function usersPost(req: Request, res: Response) {
	const { username, email, password } = req.body as {
		username: string;
		email: string;
		password: string;
	};

	try {
		const user = await userService.createUser({ username, email, password });
		return res.status(httpStatus.CREATED).json({
			id: user.id,
			email: user.email,
		});
	} catch (error) {
		if (error.name === "DuplicatedEmailError") {
			return res.status(httpStatus.CONFLICT).send(error);
		}
		return res.status(httpStatus.BAD_REQUEST).send(error);
	}
}
