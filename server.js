const express = require("express");
const mongoose = require("./config/mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

// require Routes
const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//middleware for passport
app.use(passport.initialize());
const passportSetup = require("./config/passportSetup");

//redirecting the routes to router files
app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// Starting a server
let port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Connected at connected port 5000");
});
