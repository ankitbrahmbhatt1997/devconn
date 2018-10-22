const mongoose = require("mongoose");

let mongoURI = "mongodb://localhost:27017/DevConnector";

mongoose.connect(
  mongoURI,
  { useNewUrlParser: true },
  () => {
    console.log("Database Connected");
  }
);
