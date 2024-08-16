import supertest from "supertest";
import app, { init } from "../../src/app";
import { faker } from "@faker-js/faker";
import { cleanDb } from "../helpers";
import httpStatus from "http-status";
import { redisClient } from "../../src/configs/redisConfig";

beforeAll(async () => {
  await init();
  await cleanDb();
});

afterAll(async () => {
  await redisClient.disconnect();
});

const server = supertest(app);

describe("POST /users", () => {
  it("should respond with status 201 when body is valid", async () => {
    const body = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const response = await server.post("/users").send(body);
    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body).toEqual({
      id: expect.any(Number),
      email: body.email,
    });
  });

  it("should respond with status 400 when body is invalid", async () => {
    const body = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
    };
    const response = await server.post("/users").send(body);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
});


