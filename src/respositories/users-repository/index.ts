import { prisma } from "../../configs/database";

async function findByEmail(email: string) {
  return prisma.users.findUnique({ where: { email } });
}

async function create(data: {
  username: string;
  email: string;
  password: string;
}) {
  const result = await prisma.users.create({
    data,
  });

  delete result.password;
  delete result.created_at;
  return result;
}

const userRepository = {
  findByEmail,
  create,
};

export default userRepository;
