import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import { prisma } from "../configs/database";

export async function createUser(params: {
  username?: string;
  email?: string;
  password?: string;
}) {
  const incomingPassword = params.password || faker.internet.password();
  const hashedPassword = await bcrypt.hash(incomingPassword, 10);

  return prisma.users.create({
    data: {
      username: params.username || faker.internet.userName(),
      email: params.email || faker.internet.email(),
      password: hashedPassword,
    },
  });
}

