const express = require("express");
const router = express.Router();
const User = require("../../Models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// @route     POST /api/auth/register
// @fnc       Register a User
// @access    Public

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json({ errors });
  }
  console.log(isValid);
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = "Email already exists";
        return res.status(400).json({ errors });
      } else {
        let avatar = gravatar.url(req.body.email, {
          s: "200",
          r: "pg",
          d: "mm"
        });
        let newUser = new User({
          email: req.body.email,
          name: req.body.name,
          password: req.body.password,
          avatar
        });
        newUser
          .hashPassword()
          .then(user => {
            return user.save();
          })
          .then(savedUser => {
            res.json({
              email: savedUser.email,
              name: savedUser.name
            });
          })
          .catch(e => {
            console.log(e);
          });
      }
    })
    .catch(e => {
      console.log(e);
      console.log("Unable to find the email in the Database");
    });
});

// @route     POST /api/auth/login
// @fnc       Login a User / Return a JWT token
// @access    Public

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json({ errors });
  }

  User.findOne({ email })
    .then(user => {
      if (user) {
        bcrypt
          .compare(password, user.password)
          .then(isMatch => {
            if (isMatch) {
              user.createJWT().then(token => {
                res.json({
                  msg: "Success",
                  token: `Bearer ${token}`
                });
              });
            } else {
              errors.password = "Password incorrect";
              res.status(400).json({ errors });
            }
          })
          .catch(e => console.log(e));
      } else {
        errors.email = "User not found";
        return res.status(400).json({ errors });
      }
    })
    .catch(e => {
      console.log(e);
    });
});

// @route     GET /api/auth/user
// @fnc       Return the logged in user
// @access    private

router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { name, email, id } = req.user;
    res.json({ name, email, id });
  }
);

module.exports = router;
