var express = require("express");
var router = express.Router();

const { getAllPosts } = require("@controllers/PostController");

/* GET all posts. */
/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Retrieve a list of posts.
 *     description: Retrieve a list of users from API server.
 *     responses:
 *       200:
 *         description: A list of posts.
 */

router.get("/", getAllPosts);

module.exports = router;
