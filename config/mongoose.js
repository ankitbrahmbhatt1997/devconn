const mongoose = require("mongoose");
const { mongoURI } = require("./keys");

mongoose.connect(
  mongoURI,
  { useNewUrlParser: true },
  () => {
    console.log("Database Connected");
  }
);
