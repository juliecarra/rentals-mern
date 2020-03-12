const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const router = new express.Router();

const middleware = require("./middlewares/jwt");

const User = require("../models/User");

/** 
@route    /api/users/signup
@method   POST
@desc     register a new user
@access   public
*/

router.post(
  "/signup",
  [
    check("username", "please add a valid username").isLength({
      min: 5,
      max: 32
    }),
    check("email", "please enter a valid email").isEmail(),
    check(
      "password",
      "please enter a password with 5 or more characters"
    ).isLength({ min: 5, max: 32 })
  ],
  async (req, res) => {
    // express - validator;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      let user = await User.findOne({ email }); //find a user by his email

      if (user) {
        return res.status(400).json({ message: "user already exists" });
      } else {
        const salt = await bcrypt.genSaltSync(10); //cryptography library
        const hashed = await bcrypt.hashSync(password, salt); //generates a secured random hashed password
        user = new User({
          username,
          email,
          password: hashed
        });
        await user.save(); //new user is saved to database

        //payload contains the informations of the user
        const payload = {
          user: {
            id: user.id
          }
        };
        //signature verifies the user's informations thanks to the secret
        //if the user's informations are legit then, a token is generated
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: 360000 },
          (error, token) => {
            if (error) throw error;
            res.json({ token });
          }
        );
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("server error");
    }
  }
);

/** 
@route    /api/auth
@method   GET
@desc     get current logged in user
@access   private
*/

router.get("/login", middleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

/** 
  @route    /api/auth/login
  @method   POST
  @desc     log in user
  @access   public
  */

router.post(
  "/login",
  [
    check("email", "please enter a valid email").isEmail(),
    check("password", "password is required").exists()
  ],
  async (req, res) => {
    //express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await await User.findOne({ email }); //see if user already exists

      if (!user) {
        res.status(400).json({ errors: [{ message: "wrong credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password); //verifies if the password stored in the database is matching what the user entered
      if (!isMatch) {
        res.status(400).json({ errors: [{ message: "wrong credentials" }] });
      } else {
        const payload = {
          user: {
            id: user.id,
            username: user.username,
            bookings: user.bookings
          }
        };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: 360000 },
          (error, token) => {
            if (error) throw error;
            res.json({ token });
          }
        );
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
