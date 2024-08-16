import supertest from "supertest";
import app, { init } from "../../src/app";
import { faker } from "@faker-js/faker";
import { cleanDb } from "../helpers";
import httpStatus from "http-status";
import { post } from "../factories/candidates-factory";
import { redisClient } from "../../src/configs/redisConfig";
import { createUser } from "../factories/users-factory";
import { signIn } from "../../src/services/authentication-service";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

afterAll(async () => {
  await redisClient.disconnect();
});

const server = supertest(app);

describe("GET /candidates", () => {
  const createUserAdmin = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
 
  const generateValidFile = () => ({
    filename: faker.lorem.word(),
    pdf: Buffer.from(faker.lorem.word()),
  });
  

  it("should respond with status 401 when is not a valid token", async () => {
    const response = await server.get("/candidates").set('Authorization', `Bearer ${faker.lorem.word()}`);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED); 
  });

  it("should respond with status 401 if there is no token", async () => {
    const response = await server.get("/candidates");
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 200 and an array of candidates", async () => {
    const body = {
      fullname: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.lorem.word(),
      desired_position: faker.lorem.word(),
      ...generateValidFile(),
    };

    await post(
      body.fullname,
      body.email,
      body.phone,
      body.desired_position,
      body.filename,
      body.pdf
    );

    const createUserAdmin = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    await createUser(createUserAdmin)
    const signInAdmin = await signIn({ email: createUserAdmin.email, password: createUserAdmin.password })
    const response = await server.get(`/candidates`).set('Authorization', `Bearer ${signInAdmin.token}`);


    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          fullname: expect.any(String),
          email: expect.any(String),
          phone: expect.any(String),
        }),
      ])
    );
  });

  it("should respond with an empty array when there is no candidates", async () => {
    const createUserAdmin = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    await createUser(createUserAdmin)
    const signInAdmin = await signIn({ email: createUserAdmin.email, password: createUserAdmin.password })
    const response = await server.get("/candidates").set('Authorization', `Bearer ${signInAdmin.token}`);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([]);
  });
});

describe("GET /candidate/:id", () => {
  it("should respond with status 200 and a pdf of a id belongs", async () => {
    const createCandidateAndResume = await post(
      faker.person.fullName(),
      faker.internet.email(),
      faker.lorem.word(),
      faker.lorem.word(),
      faker.lorem.word(),
      Buffer.from(faker.lorem.word())
    );
    const createUserAdmin = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    
    await createUser(createUserAdmin)
    const signInAdmin = await signIn({ email: createUserAdmin.email, password: createUserAdmin.password });

    const response = await server.get(`/candidate/${createCandidateAndResume.id}`).set('Authorization', `Bearer ${signInAdmin.token}`);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toBeInstanceOf(Buffer);
  });

  it("should respond with status 404 if there is no pdf", async () => {
    const createUserAdmin = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    await createUser(createUserAdmin)
    const signInAdmin = await signIn({ email: createUserAdmin.email, password: createUserAdmin.password })
    const response = await server.get("/candidate/1").set('Authorization', `Bearer ${signInAdmin.token}`);;
    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.text).toBe("No result for this search!");
  });
});

describe("GET /pagination", () => {
  it("should respond with status 200 and an array of candidates", async () => {
    const query = {
      page: 1,
      limit: 10,
    };

    const response = await server.get(
      `/pagination/?page=${query.page}&limit=${query.limit}`
    );
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual({
      results: expect.arrayContaining([]),
      page: expect.any(String),
      totalPages: expect.any(Number),
    });
  });
});

describe("POST candidates", () => {
  it("should respond with status 200 when body is valid", async () => {
    const response = await server
      .post("/upload")
      .field("fullname", faker.person.fullName())
      .field("email", faker.internet.email())
      .field("phone", faker.lorem.word())
      .field("desired_position", faker.lorem.word())
      .attach("file", Buffer.from(faker.lorem.word()), {
        filename: faker.lorem.word(),
      });

    expect(response.status).toBe(201);
    expect(response.text).toBe("Usuário e arquivo PDF salvos com sucesso.");
  });

  it("should respond status 400 when there is no file attached", async () => {
    const body = {
      fullname: 'Teste da Silva',
      email: 'sD2pT@example.com',
      phone: '99999999999',
      desired_position: 'Analista de teste',
    };
    
    const response = await server.post("/upload").send(body);
    expect(response.status).toBe(400);
    expect(response.text).toBe("Arquivo pdf não enviado.");
  });
});
