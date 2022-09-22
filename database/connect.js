require("dotenv").config();
const mongoose = require("mongoose");

const connect = async () => {
  try {
    // Connect to the MongoDB cluster
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect to DB OK");
  } catch (error) {
    console.log("🚀 ~ file: connect.js ~ line 13 ~ connect ~ error", error);
  }
};

const disconnect = async () => {
  try {
    await mongoose.connection.close();
    console.log("Mongoose is disconnected");
  } catch (error) {
    console.log("🚀 ~ file: connect.js ~ line 22 ~ disconnect ~ error", error);
  }
};

module.exports = {
  connect,
  disconnect,
};
