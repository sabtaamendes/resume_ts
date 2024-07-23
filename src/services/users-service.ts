import userRepository from "../respositories/users-repository";
import bcrypt from "bcrypt";
import { duplicatedEmailError } from "../errors/duplicated-email-error";

export async function createUser({username, email, password }: { username: string, email: string; password: string }) {

  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 12);
  return await userRepository.create({
    username,
    email,
    password: hashedPassword,
  });
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

const userService = {
  createUser,
};

export default userService;