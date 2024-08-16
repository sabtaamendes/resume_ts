import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
	getAuthorizationUser,
	setAuthorizationUser,
} from "../configs/redisConfig";
import { invalidCredentialsError } from "../errors/invalid-credential-error";
import sessionRepository from "../respositories/session-repository";
import userRepository from "../respositories/users-repository";
import { exclude } from "../utils/prisma-utils";

export async function signIn(params: { email: string; password: string }) {
	const { email, password } = params;

	const user = await getUserOrFail(email);

	await validatePasswordOrFail(password, user.password);
	const token = await createSession(user.id);

	const resultUserRedis = await getAuthorizationUser({ userId: user.id });
	if (resultUserRedis) {
		await setAuthorizationUser({ token, userId: user.id });

		return {
			user: exclude(user, "created_at", "password"),
			token,
		};
	}

	await setAuthorizationUser({ token, userId: user.id });

	return {
		user: exclude(user, "created_at", "password"),
		token,
	};
}

async function getUserOrFail(email: string) {
	const user = await userRepository.findByEmail(email);
	if (!user) throw invalidCredentialsError();

	return user;
}

async function createSession(userId: number) {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET);
	await sessionRepository.create({
		token,
		userId,
	});

	return token;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
	const isPasswordValid = await bcrypt.compare(password, userPassword);
	if (!isPasswordValid) throw invalidCredentialsError();
}

const authenticationService = {
	signIn,
};

export default authenticationService;
