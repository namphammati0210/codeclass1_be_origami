const PostRepository = require("./PostRepository");
const database = require("@database/connect");
// import database from "database/connect";

beforeAll(async () => {
  await database.connect();
});

afterAll(async () => {
  await database.disconnect();
});

const mockPost = {
  id: "62bda11f83c732e45b65b726",
  author: "napmt",
};

test("Get all posts", async () => {
  const posts = await PostRepository.getPosts();
  console.log(
    "🚀 ~ file: PostRepository.test.js ~ line 14 ~ test ~ posts",
    posts
  );

  expect(posts).toBeTruthy();
  expect(posts.length).toBeGreaterThan(0);
});

test("Get post by Id", async () => {
  const post = await PostRepository.getPostById(mockPost.id);

  expect(post).toBeTruthy();
  expect(post.author).toBe(mockPost.author);
});
