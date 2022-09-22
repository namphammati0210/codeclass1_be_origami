require("module-alias/register");
const cors = require("cors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const database = require("./database/connect");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const postRouter = require("./routes/api/post");
const authRouter = require("./routes/api/auth");

const { isLoggedIn } = require("@middlewares/auth");

var app = express();

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Server Origami",
    version: "1.0.0",
  },
  license: {
    name: "Licensed Under MIT",
    url: "https://spdx.org/licenses/MIT.html",
  },
  contact: {
    name: "Nampt",
    url: "fb.com",
  },
  servers: [
    {
      url: "http://localhost:3001",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./routes/api/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/posts", isLoggedIn, postRouter);
app.use("/api/auth", authRouter);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect to MongoAtlas
(async () => {
  await database.connect();
})();

module.exports = app;
