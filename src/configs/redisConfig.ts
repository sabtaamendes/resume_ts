import { createClient } from "redis";

const redisClient = createClient();

// Função para obter um valor do Redis
async function getRedis(
	key: string,
): Promise<{ filename: string; pdf: string } | null> {
	try {
		const value = await redisClient.get(key);
		return JSON.parse(value);
	} catch (error) {
		console.error("Erro ao obter valor do Redis:", error);
		throw error;
	}
}

// Função para definir um valor no Redis
async function setRedis(
	key: string,
	value: { filename: string; pdf: string },
): Promise<string> {
	try {
		// fazer json stringfy pra buscar o valor no redis
		const result = await redisClient.setEx(key, 3600, JSON.stringify(value)); //expira em 1 hora que equivale a 3600 segundos

		return result;
	} catch (error) {
		console.error("Erro ao definir valor no Redis:", error);
		throw error;
	}
}

async function setAuthorizationUser(params: { token: string; userId: number }) {
	return await redisClient.setEx(
		`user-${params.userId}`,
		3600,
		JSON.stringify(params),
	);
}

async function getAuthorizationUser(params: { userId: number }) {
	return await redisClient.get(`user-${params.userId}`);
}

redisClient.on("error", (err) => console.log("Redis Client Error", err));

redisClient.connect();

export {
	redisClient,
	getRedis,
	setRedis,
	setAuthorizationUser,
	getAuthorizationUser,
};
