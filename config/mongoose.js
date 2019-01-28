const mongoose = require("mongoose");
const { mongoURI } = require("./keys");
mongoose.Promise = global.Promise;
let options = {
  auth: {
    user: "Ankit1997",
    password: "devtodev@123"
  },
  useNewUrlParser: true
};
mongoose.connect(
  mongoURI,
  options,

  (err, db) => {
    if (!err) {
      console.log("Database Connected");
    } else {
      console.log(err);
    }
  }
);
