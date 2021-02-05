const express = require("express");
const router = express.Router();
const Instrument = require("../models/instrument");

const defaultGrid = Array(16).fill(0);
// const getInstruments = async () => {
//   let instrArray = [];
//   await Instrument.find({}, (error, instruments) => {
//     // console.log(instruments);
//     instrArray = instruments.map((instrument) => {
//       return {
//         id: instrument.id,
//         name: instrument.name,
//         beatRow: defaultGrid,
//       };
//     });
//   });
//   //   console.log(instrArray);
//   return instrArray;
// };

// const instrumentArray = getInstruments();
// console.log(instrumentArray[1]);
// console.log(getInstruments().mongooseCollection.name);

const defaultBeat = [
  {
    // instrument: instrumentArray[0]._id, //how does it know the ids?
    // instrument: "601b73cfcb84de34a9b825c5",
    name: "kick",
    beatRow: defaultGrid,
  },
  {
    // instrument: instrumentArray[1].name,
    // instrument: "601b73cfcb84de34a9b825c7",
    name: "sub1",
    beatRow: defaultGrid,
  },
  {
    name: "sub2",
    beatRow: defaultGrid,
  },
  {
    name: "snare",
    beatRow: defaultGrid,
  },
  {
    name: "clap",
    beatRow: defaultGrid,
  },
  {
    name: "hiHat",
    beatRow: defaultGrid,
  },
  {
    name: "openHiHat",
    beatRow: defaultGrid,
  },
];

// const defaultBeat = instrumentArray;
// console.log("here");
// console.log(instrumentArray);

const modelDefaults = {
  sequence: defaultBeat,
};

module.exports = modelDefaults;