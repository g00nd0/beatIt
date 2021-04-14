const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const methodOverride = require("method-override");
router.use(methodOverride("_method"));
const { StatusCodes } = require("http-status-codes");
const modelDefaults = require("../models/modelDefaults");

// SEEDING
router.get("/seed", (req, res) => {
  console.log("seeding");
  User.create(modelDefaults.userSeed, (error, user) => {
    if (error) {
      console.log(error);
      return res.send({ ...error, message: "likely user already exist" });
    }
    res.redirect("/api/user");
  });
});

// INDEX (show all users - admin access only) & also to check for existing username
router.get("/", (req, res) => {
  if (req.query.username) {
    //if there is a query, check if it exist
    User.find({ username: req.query.username }, (error, oneUser) => {
      if (error) {
        res.status(StatusCodes.BAD_REQUEST).send(error);
      } else {
        //user exist
        const userObj = oneUser[0];
        const userNoPw = { ...userObj, password: "" }; //do not return password
        res.status(StatusCodes.OK).send(userNoPw);
      }
    }).lean();
  } else {
    User.find({}, (error, users) => {
      if (error) {
        res.send(error);
      } else {
        res.send(users);
      }
    });
  }
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id, (error, oneUser) => {
    if (error) {
      res.send(error);
    } else {
      //user exist
      const userNoPw = { ...oneUser, password: "" }; //do not return password
      res.status(StatusCodes.OK).send(userNoPw);
    }
  }).lean();
});

router.post(
  "/",
  body("username", "Username has to be at least 6 characters long.")
    .trim()
    .isLength({ min: 6 }),
  body(
    "password",
    "Password has to be at least 8 alphanumeric characters long."
  )
    .trim()
    .isLength({ min: 8 })
    .bail()
    .isAlphanumeric()
    .bail(),
  body("name", "Please enter your name.").trim().notEmpty(),
  body("email", "Please enter a valid email address.").isEmail(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Errors returned in an array `errors.array()`.
      const locals = { UserInput: req.body, errors: errors.array() };
      res.status(StatusCodes.BAD_REQUEST).send(locals);
    } else {
      //!! check if username already exist, if so, return error message
      //Data is valid
      //overwrite the user password with the hashed password, then pass that in to our database
      req.body.password = bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync()
      );

      //create new user
      User.create(req.body, (error, user) => {
        if (error) {
          res.send(error);
        } else {
          res.send(user);
          return user;
        }
      });
    }
  }
);

//edit account
router.put(
  "/:id",
  body("username", "Username has to be at least 6 characters long.")
    .optional()
    .trim()
    .isLength({ min: 6 }),
  body(
    "password",
    "Password has to be at least 8 alphanumeric characters long."
  )
    .optional()
    .trim()
    .isLength({ min: 8 })
    .isAlphanumeric(),
  body("name", "Please enter your name").optional().trim().notEmpty(),
  body("email", "Please enter a valid email address").optional().isEmail(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Errors returned in an array `errors.array()`.
      const locals = { UserInput: req.body, errors: errors.array() };
      res.status(StatusCodes.BAD_REQUEST).send(locals);
    } else {
      // when user update account page
      if (req.body.password && req.body.password !== "") {
        //user changes password
        req.body.password = bcrypt.hashSync(
          req.body.password,
          bcrypt.genSaltSync()
        );
      } else if (req.body.password === "") {
        // users didnt change password, remove the field "password"
        delete req.body.password;
      }
      User.findByIdAndUpdate(
        req.params.id, // id
        req.body, // what to update
        { new: true },
        (error, updatedUser) => {
          if (error) {
            res.status(StatusCodes.BAD_REQUEST).send(error);
          } else {
            res.status(StatusCodes.OK).send(updatedUser);
          }
        }
      );
    }
  }
);

router.put("/:id/sdelete", (req, res) => {
  //softdelete
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      user.status = "Inactive";
      user.save((er) => {
        if (er) {
          res.send(er);
        } else {
          res.send(user);
        }
      });
    }
  });
});

module.exports = router;
