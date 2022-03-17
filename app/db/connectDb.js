module.exports = () => {
  const { setGlobalRates } = require("../scheduled/scheduled");
  const mongoose = require("mongoose");
  mongoose.Promise = global.Promise;
  try {
    mongoose.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true
    });
    console.log("Successfully connected to the database");
    setGlobalRates();
  } catch (err) {
    console.log("Could not connect to the database. Error...", err);
    process.exit();
  }
};
