import supertest from "supertest";
import app, { init } from "../../src/app";
import { faker } from "@faker-js/faker";
import { cleanDb } from "../helpers";
import httpStatus from "http-status";
import { createUser } from "@/services/users-service";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("POST /sign-in", () => {
    const generateValidBody = () => ({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
  
    it("should respond with status 200 when body is valid", async () => {
      const body = {
        username: faker.internet.userName(),
        ...generateValidBody(),
      };
      await createUser(body);
  
      const login = {
        email: body.email,
        password: body.password,
      };
      const response = await server.post("/sign-in").send(login);
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          user: {
            id: expect.any(Number),
            username: expect.any(String),
            email: expect.any(String),
            created_at: expect.any(String),
          },
          token: expect.any(String),
        })
      );
    });
  
    it("should respond with status 401 when body is invalid", async () => {
      const response = await server.post("/sign-in").send({
        email: faker.internet.email(),
        password: faker.internet.password(),
      });
  
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
      expect(response.body).toEqual({
        name: "InvalidCredentialsError",
        message: "email or password are incorrect",
      });
    });
  });