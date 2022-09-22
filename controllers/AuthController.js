const User = require("@models/UserModel");
const {
  MISSING_PARAMS,
  EXISTED_USER,
  NOT_FOUND_USER,
  INVALID_PASSWORD,
  LOGIN_SUCCESSFULLY,
} = require("@constants/httpMessages");
const { USER_ROLE } = require("@constants/role");
const { hash, comparePassword } = require("@helpers/bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    // If role isn't existed , set default role value is user
    const { email, password, role = USER_ROLE } = req.body;

    if (!email || !password) return res.status(400).send(MISSING_PARAMS);

    const user = await User.findOne({ email });

    if (user) return res.status(400).send(EXISTED_USER);

    const hashedPass = await hash(password);

    const newUser = await User.create({
      email,
      password: hashedPass,
      role,
    });

    return res.status(200).json(newUser);
  } catch (error) {
    console.log("🚀 ~ file: auth.js ~ line 27 ~ router.post ~ error", error);
    return res.status(500).json(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send(MISSING_PARAMS);

    const user = await User.findOne({ email });

    if (!user) return res.status(400).send(NOT_FOUND_USER);

    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) return res.status(400).send(INVALID_PASSWORD);

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

    return res.status(200).send({
      token,
      payload,
      messge: "login OK",
      status: 200,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: AuthController.js ~ line 43 ~ login ~ error",
      error
    );
    return res.status(500).json(error);
  }
};

module.exports = {
  register,
  login,
};
