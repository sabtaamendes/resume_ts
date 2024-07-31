import { prisma } from "../../configs/database";

async function findByEmail(email: string) {
  const users = await prisma.users.findUnique({ where: { email } });
  console.log('CONSOLE QUE APARECERÁ NO TESTE', users, 'AQUI TERMINA O CONSOLE')
  return users
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
