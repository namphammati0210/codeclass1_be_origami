const jwt = require("jsonwebtoken");

const { NOT_LOGGEDIN_YET } = require("@constants/httpMessages");

const isLoggedIn = (req, res, next) => {
  // Authentication
  try {
    const token = req.headers.access_token || req.headers.token;

    if (!token) return res.status(401).send(NOT_LOGGEDIN_YET);

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!verifiedToken) return res.status(401).send(NOT_LOGGEDIN_YET);

    req.userId = verifiedToken.id;
    req.userEmail = verifiedToken.email;
    req.userRole = verifiedToken.role;

    return next();
  } catch (error) {
    console.log("🚀 ~ file: auth.js ~ line 22 ~ isLoggedIn ~ error", error);
    next(error);
  }
};

module.exports = {
  isLoggedIn,
};
