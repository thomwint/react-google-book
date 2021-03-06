const express = require("express");
const logger = require("morgan");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googleBookList");

app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
