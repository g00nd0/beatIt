import React from "react";
import DrumMachine from "../component/hypebeats/DrumMachine";
import BeatSeqColumn from "../component/BeatSeqColumn";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const BeatSeq = (props) => {
  //user={userId, username}
  console.log("props at BeatSeq page", props);
  const beatseqId = useParams().id;
  console.log("beatseqId from params is", beatseqId);

  const [retrievedSeq, setRetrievedSeq] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    //for drum machine, get seq, trigger whether there is id or not
    console.log("do Axios GET beatseqid for Drum Machine");
    axios
      .get(`/api/beatSequence/${beatseqId}`)
      .then((response) => {
        //setRetrievedSeq
        console.log("set retrieved seq axios reponse", response);
        console.log("axios reponse.data & retrievedseq is", response.data);
        if (response.data.length === 1) {
          setRetrievedSeq(response.data[0]);
          setIsLoading(false);
        } else {
          console.log("length of response.data is not 1");
        }
      })
      .catch((error) => {
        console.log("BeatSeq axios error", error);
      });
  }, [beatseqId]);

  const [isNameChange, setIsNameChange] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleNameChange = (status) => {
    console.log("handleNameChange in BeatSeq, status is", status);
    setIsNameChange(status);
  };

  const handleSave = (status) => {
    setIsSaved(status);
    console.log("handleSave in BeatSeq, status is", status);
  };

  if (beatseqId === undefined || beatseqId === "") {
    // log in //only beatseqcol & empty box
    return (
      <div class="container-fluid mx-auto" id="beatseqpage-cont">
        <div class="form-h1">
          <h1>Beat Sequencer</h1>
        </div>
        <div
          class="container-fluid d-flex flex-row"
          id="beatseq-col-machine-cont"
        >
          <div class="container-fluid col-4 p-0" >
            <BeatSeqColumn />
          </div>
          <div class="container-fluid col-8 p-0" id="drumMachine-cont">
            <div class="p-4">
              <p style={{ fontSize: "24px" }}>Choose from playlist or add a sequence to load the beat sequencer...</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    // have id, axios get and drum machine
    console.log("retrievedSeq", retrievedSeq);
    return (
      <div class="container-fluid mx-auto" id="beatseqpage-cont">
        <div class="form-h1">
          <h1>Beat Sequencer</h1>
        </div>
        <div
          class="container-fluid d-flex flex-row"
          id="beatseq-col-machine-cont"
        >

          <div class="container-fluid col-4 p-0" id="">
            <BeatSeqColumn nameChange={isNameChange} saved={isSaved} />
          </div>
          <div class="container-fluid col-8 p-0" id="drumMachine-cont">
            <DrumMachine
              oneBeatSeq={retrievedSeq}
              handleNameChange={handleNameChange}
              handleSave={handleSave}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default BeatSeq;
