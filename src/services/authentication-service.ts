import sessionRepository from "../respositories/session-repository";
import userRepository from "../respositories/users-repository";
import { exclude } from "../utils/prisma-utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { invalidCredentialsError } from "../errors/invalid-credential-error";

async function signIn(params: { email: string; password: string }) {
  const { email, password } = params;

  const user = await getUserOrFail(email);

  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id);

  return {
    user: exclude(user, "password"),
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
