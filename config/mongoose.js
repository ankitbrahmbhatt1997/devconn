const mongoose = require("mongoose");
const { mongoURI } = require("./keys");
mongoose.Promise = global.Promise;
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true },
  (err, db) => {
    if (!err) {
      console.log("Database Connected");
    } else {
      console.log(err);
    }
  }
);
