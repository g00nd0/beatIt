const bcrypt = require("bcrypt");
const express = require("express");
const sessions = express.Router();
const User = require("../models/user.js");
const { StatusCodes } = require("http-status-codes");

sessions.get("/", (req, res) => {
  if (req.session.currentUser) {
    // if session exists
    res.status(StatusCodes.OK).send("Session found. User is logged in!");
  } else {
    res
      .status(StatusCodes.FORBIDDEN)
      .send({ error: "You are not authorized to view this page." });
  }
});

//TO ADD ON, if user is inactive/deleted, should not be able to log in
// POST on log-in /session
sessions.post("/", (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      res
        .status(500)
        .send({ error: "Oops there's a problem with the server database" });
    } else if (!foundUser) {
      res.status(401).send({ error: `Sorry, no user found` });
    } else {
      //no error with server database and found user in database
      // check User status
      if (foundUser.status === "Active") {
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
          //password match
          req.session.currentUser = foundUser;
          res.status(200).send(foundUser);
        } else {
          res.status(401).send({ error: `Password does not match` });
        }
      } else {
        res.status(401).send({ error: `User account has been deleted` });
      }
    }
  });
});

sessions.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie(this.cookie, { path: "/" });
    res.status(StatusCodes.OK).send({ msg: "Logging out" });
  });
});

module.exports = sessions;
