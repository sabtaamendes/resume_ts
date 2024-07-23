import type { Request, Response } from "express";
import httpStatus from "http-status";
import type { ApplicationError } from "../protocols";

export function handleApplicationErrors(
	err: ApplicationError | Error,
	_req: Request,
	res: Response,
) {
	if (err.name === "CannotEnrollBeforeStartDateError") {
		return res.status(httpStatus.BAD_REQUEST).send({
			message: err.message,
		});
	}
}
