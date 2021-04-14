const express = require("express");
const router = express.Router();
const BeatSequence = require("../models/beatSequence");
const Instrument = require("../models/instrument");
const methodOverride = require("method-override");
const beatSequenceDummy2 = require("../dummyData2.js");
router.use(methodOverride("_method"));

router.get("/seed", (req, res) => {
  BeatSequence.create(beatSequenceDummy2, (error, instrument) => {
    if (error) {
      res.send(error);
    } else {
      res.send(instrument);
    }
  });
});

router.get("/", (req, res) => {
  //index, get all
  BeatSequence.find({}, (error, sequence) => {
    res.send(sequence);
  });
});

router.get("/:id", (req, res) => {
  //getting one sequence
  //show one instrument
  BeatSequence.find(
    { _id: req.params.id, status: "Active" },
    (error, sequence) => {
      res.send(sequence);
      return sequence;
    }
  );
});

router.get("/user/:userId", (req, res) => {
  // get all sequences by user's id
  BeatSequence.find(
    { userId: req.params.userId, status: "Active" },
    (error, sequence) => {
      res.send(sequence);
      return sequence;
    }
  );
  console.log("get user's sequences");
});

router.post("/", (req, res) => {
  //create new beatSequence
  BeatSequence.create(req.body, (error, sequence) => {
    if (error) {
      res.send(error);
    } else {
      res.send(sequence);
      return sequence;
    }
  });
});

router.put("/:id/sdelete", (req, res) => {
  BeatSequence.findById(req.params.id, (err, sequence) => {
    if (err) {
      res.send(err);
      console.log("error occurred " + err);
    } else {
      sequence.status = "Inactive";
      sequence.save((er) => {
        if (er) {
          res.send(er);
        } else {
          res.send(sequence);
        }
      });
    }
  });
});

router.put("/:id/edit", (req, res) => {
  const newSeq = req.body;
  BeatSequence.findById(req.params.id, (err, sequence) => {
    if (err) {
      res.send(err);
    } else {
      sequence.beatGrid = newSeq.beatGrid;
      sequence.name = newSeq.name;
      sequence.tempo = newSeq.tempo;
      sequence.save((er) => {
        if (er) {
          res.send(er);
        } else {
          res.send(sequence);
        }
      });
    }
  });
});

module.exports = router;
