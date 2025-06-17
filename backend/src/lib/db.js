const mongoose = require("mongoose");

const connectDataBase = () => {
  const url = process.env.DB_URL;
  const connect_DB = mongoose.connect(url);
  connect_DB.then(() => {
    console.log("connect DB success");
  });
};

module.exports = connectDataBase;
