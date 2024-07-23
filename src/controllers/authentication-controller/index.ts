import type { Request, Response } from "express";
import httpStatus from "http-status";
import authenticationService from '../../services/authentication-service';
export async function singInPost(req: Request, res: Response) {
	const { email, password } = req.body as { email: string; password: string };

	try {
		const result = await authenticationService.signIn({ email, password });

		return res.status(httpStatus.OK).send(result);
	} catch (error) {
		console.log(error)
		return res.status(httpStatus.UNAUTHORIZED).send(error);
	}
}
