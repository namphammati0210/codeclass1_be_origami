const Post = require("@database/models/PostModel");

const getPosts = async () => {
  try {
    const posts = await Post.find({});
    return posts;
  } catch (error) {
    console.log(
      "🚀 ~ file: PostRepository.js ~ line 9 ~ getPosts ~ error",
      error
    );
  }
};

const getPostById = async (id) => {
  try {
    const post = await Post.findById(id);
    return post;
  } catch (error) {
    console.log(
      "🚀 ~ file: PostRepository.js ~ line 20 ~ getPost ~ error",
      error
    );
  }
};

module.exports = {
  getPosts,
  getPostById,
};
