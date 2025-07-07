// const mongoose = require("mongoose");

// const connectDataBase = () => {
//   const url = process.env.DB_URL;
//  mongoose
//     .connect(
//       `mongodb+srv://thienhung27hao:${process.env.DB_PASSWORD}@cleaning.yobcz0b.mongodb.net/`
//     )
//     .then(() => {
//       console.log("Connected to MongoDB Atlas");
//     })
//     .catch((err) => {
//       console.error(err);
//     });
//   // connect_DB.then(() => {
//   //   console.log("connect DB success");
//   // });
// };

// module.exports = connectDataBase;

const mongoose = require("mongoose");

const connectDataBase = () => {
  const url = process.env.DB_URL;
  const connect_DB = mongoose.connect(url);
  connect_DB.then(() => {
    console.log("connect DB success");
  });
};

module.exports = connectDataBase;
