const SuperRequest = require("supertest");
const app = require("../app");
const database = require("@database/connect");
const {
  MISSING_PARAMS,
  // EXISTED_USER,
  // NOT_FOUND_USER,
  INVALID_PASSWORD,
  // LOGIN_SUCCESSFULLY,
} = require("@constants/httpMessages");

beforeAll(async () => {
  await database.connect();
});

afterAll(async () => {
  await database.disconnect();
});

const mockUser = {
  email: "nampt3@gmail.com",
  password: "123456",
};

describe("POST /api/auth/login ", () => {
  test("Login Successfully return response with status 200 and token", async () => {
    const response = await SuperRequest(app)
      .post("/api/auth/login")
      .send(mockUser)
      .set("Accept", "application/json");

    console.log(
      "🚀 ~ file: PostController.test.js ~ line 16 ~ test ~ response",
      response.body
    );

    expect(response.status).toBe(200);
    expect(typeof response.body).toBe("string");
  });

  test("Login Failed return response with status 400 when missing email", async () => {
    const response = await SuperRequest(app)
      .post("/api/auth/login")
      .send({ password: "123456" })
      .set("Accept", "application/json");

    expect(response.status).toBe(400);
    expect(response.text).toBe(MISSING_PARAMS);
  });

  test("Login Failed return response with status 400 when user enter wrong password", async () => {
    const response = await SuperRequest(app)
      .post("/api/auth/login")
      .send({ email: mockUser.email, password: "1234567" })
      .set("Accept", "application/json");

    expect(response.status).toBe(400);
    expect(response.text).toBe(INVALID_PASSWORD);
  });
});

// TODO: POST /api/auth/register
