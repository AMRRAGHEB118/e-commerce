const mongoose = require("mongoose");

const db_connection = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((con) => {
      console.log(`db connected : ${con.connection.host}`);
    })
    // .catch((err) => {
    //   console.log(`db error : ${err}`);
    //   process.exit(1);
    // });
};

module.exports = db_connection;
