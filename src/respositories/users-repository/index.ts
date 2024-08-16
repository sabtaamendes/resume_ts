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

	result.password = undefined;
	result.created_at = undefined;
	return result;
}

const userRepository = {
	findByEmail,
	create,
};

export default userRepository;
