const PostRepository = require("@repositories/PostRepository");

const getAllPosts = async (req, res, next) => {
  console.log(req.userId);
  const posts = await PostRepository.getPosts();
  return res.status(200).send([...posts, { user: req.userRole }]);
};

module.exports = {
  getAllPosts,
};
