import { prisma } from "../../configs/database";
import { Prisma } from "@prisma/client";

async function findByEmail(email: string, select?: Prisma.usersSelect) {
  const params: Prisma.usersFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return await prisma.users.findUnique(params);
}

async function create(data: {
  username: string;
  email: string;
  password: string;
}) {
  const result = await prisma.users.create({
    data,
  });

  console.log(result, 'RESULT');
  return result;
}

const userRepository = {
  findByEmail,
  create,
};

export default userRepository;