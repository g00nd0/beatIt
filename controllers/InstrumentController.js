const express = require("express");
const router = express.Router();
const Instrument = require("../models/instrument");
const methodOverride = require("method-override");
router.use(methodOverride("_method"));

router.get("/seed", (req, res) => {
  Instrument.create(
    [
      {
        name: "Kick",
        soundFile: "/sounds/kick.wav",
        picture: "http://somepic.url/kick.jpg",
      },
      {
        name: "Sub1",
        soundFile: "/sounds/bass.wav",
        picture: "http://somepic.url/sub1.jpg",
      },
      {
        name: "Sub2",
        soundFile: "/sounds/sub.wav",
        picture: "http://somepic.url/sub2.jpg",
      },
      {
        name: "Snare",
        soundFile: "/sounds/snare.wav",
        picture: "http://somepic.url/snare.jpg",
      },
      {
        name: "Clap",
        soundFile: "/sounds/clap.wav",
        picture: "http://somepic.url/clap.jpg",
      },
      {
        name: "HiHat",
        soundFile: "/sounds/hat2.wav",
        picture: "http://somepic.url/hiHat.jpg",
      },
      {
        name: "OpenHiHat",
        soundFile: "/sounds/openhihat.wav",
        picture: "http://somepic.url/openHiHat.jpg",
      },
    ],
    (error, instrument) => {
      res.redirect("/api/instrument");
    }
  );
});

router.get("/", (req, res) => {
  //index, get all
  Instrument.find({}, (error, instrument) => {
    res.send(instrument);
  });
});

router.get("/:id", (req, res) => {
  //show one instrument from id
  Instrument.findById(req.params.id, (error, instrument) => {
    res.send(instrument);
    return instrument;
  });
});

router.get("/name/:name", (req, res) => {
  //show one instrument from name
  Instrument.find({ name: req.params.name }, (error, instrument) => {
    res.send(instrument);
    return instrument;
  });
});

module.exports = router;
