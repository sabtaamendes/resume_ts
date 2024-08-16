import { prisma } from "../../configs/database";

async function create(data: { token: string; userId: number }) {
	return await prisma.session.create({
		data: {
			token: data.token,
			users_id: data.userId,
		},
	});
}

const sessionRepository = {
	create,
};

export default sessionRepository;
