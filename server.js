const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require('helmet');
const db_connection = require("./config/database");
const category_route = require('./routes/category_route');

dotenv.config({ path: "config.env" });
const ENV = process.env.NODE_ENV;

// connection with db
db_connection();

//   Middlewares
app.use(helmet());
app.use(express.json());
if (ENV === "development") {
  app.use(morgan("dev"));
  console.log("amr")
};

// mount Routes
app.use('/api/v1/categories', category_route)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening on port localhost:${PORT}`);
});
