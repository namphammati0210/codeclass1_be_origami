const SuperRequest = require("supertest");
const app = require("../app");
const database = require("@database/connect");

beforeAll(async () => {
  await database.connect();
});

afterAll(async () => {
  await database.disconnect();
});

describe("GET /api/posts", () => {
  test("response with status 200 and list of posts", async () => {
    const response = await SuperRequest(app)
      .get("/api/posts")
      .set("Accept", "application/json");

    console.log(
      "🚀 ~ file: PostController.test.js ~ line 16 ~ test ~ response",
      response.body
    );

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
