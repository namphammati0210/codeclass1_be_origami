const bcrypt = require("bcrypt");

const hash = async (data) => {
  try {
    const hashedData = await bcrypt.hash(data, 10);
    return hashedData;
  } catch (error) {
    console.log("🚀 ~ file: bcrypt.js ~ line 8 ~ hash ~ error", error);
    return error;
  }
};

const comparePassword = async (plainPassword, hash) => {
  const isValidPassword = await bcrypt.compare(plainPassword, hash);
  return isValidPassword;
};

module.exports = {
  hash,
  comparePassword,
};
