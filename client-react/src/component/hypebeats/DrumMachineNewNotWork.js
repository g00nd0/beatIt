import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Tone from "tone";
import axios from "axios";
import useBPM from "./useBPM";
import useStart from "./useStart";
import StepContext from "./StepContext";
import Transport from "./Transport";
import StepSequencer from "./StepSequencer";
import Fx from "./FX";

const Container = styled.div`
  max-width: 800px;
  margin: auto;
  background: linear-gradient(to bottom right, #222, #0a0a0a);
  border: 2px solid black;
  border-radius: 4px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  flex: 1;
  flex-direction: row;
  align-items: stretch;
  width: 100%;
  padding: 0px 20px 10px;
  display: flex;
`;

const Logo = styled.h1`
  font-size: 28px;
  color: #25ccf7;
  font-family: "Righteous", cursive;
  padding: 20px;
  margin: 0;
  text-transform: uppercase;
  display: inline-block;
`;

const config = {
  tracks: ["Kick", "Sub1", "Sub2", "Snare", "Clap", "HiHat", "OpenHiHat"],
  samples: {
    Kick: "/sounds/kick.wav",
    Sub1: "/sounds/bass.wav",
    Sub2: "/sounds/sub.wav",
    Snare: "/sounds/snare.wav",
    Clap: "/sounds/clap.wav",
    HiHat: "/sounds/hat2.wav",
    OpenHiHat: "/sounds/openhihat.wav",
  },
};

const initialStepState = {
  Kick: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  Sub1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  Sub2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  Snare: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  Clap: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  HiHat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  OpenHiHat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

export default function DrumMachine(props) {
  //set in retreivedSeq object useEffect?
  const [stepState, setSteps] = useState(initialStepState);
  const [buffers, setBuffers] = useState({});
  const [currentStep, setCurrentStepState] = useState(0);
  const [beatSeqName, setbeatSeqName] = useState("Untitled");
  const [newConfig, setNewConfig] = useState(config);
  const [start, startButton] = useStart();
  const [bpm, bpmSelector] = useBPM(65);

  const buffersRef = useRef(buffers);
  buffersRef.current = buffers;
  const stepsRef = useRef(stepState);
  stepsRef.current = stepState;
  const currentStepRef = useRef(currentStep);
  currentStepRef.current = currentStep;

  useEffect(
    //steps
    () => {
      axios.get("/api/instrument").then((response) => {
        const currentConfig = newConfig;

        currentConfig.samples.Kick = response.data[0].soundFile;
        currentConfig.samples.Sub1 = response.data[1].soundFile;
        currentConfig.samples.Sub2 = response.data[2].soundFile;
        currentConfig.samples.Snare = response.data[3].soundFile;
        currentConfig.samples.Clap = response.data[4].soundFile;
        currentConfig.samples.HiHat = response.data[5].soundFile;
        currentConfig.samples.OpenHiHat = response.data[6].soundFile;

        setNewConfig(currentConfig);
      });

      Tone.Transport.scheduleRepeat(function (time) {
        Object.keys(buffersRef.current).forEach((b) => {
          let targetStep = stepsRef.current[b][currentStepRef.current];
          let targetBuffer = buffersRef.current[b];

          if (targetStep === 1) {
            targetBuffer.start(time);
          } else if (targetStep === 2) {
            targetBuffer.start();
            targetBuffer.start("+64n");
            targetBuffer.start("+32n");
          }
        });

        setCurrentStepState((step) => {
          return step > 14 ? 0 : step + 1;
        });
      }, "16n");
    },
    [newConfig]
  );

  useEffect(
    //bpm
    () => {
      Tone.Transport.bpm.value = bpm;
    },
    [bpm]
  );

  useEffect(
    //start steps
    () => {
      if (start) {
        Tone.Transport.start();
      } else {
        Tone.Transport.stop();
        setCurrentStepState(0);
      }
    },
    [start]
  );

  const handleSaveClick = (e) => {
    //AXIOS PUT TO EDIT
    console.log("clicked save, to axios put");
    const beatSetUp = {
      userId: "user10", //{userId} from session storage
      name: beatSeqName,
      tempo: bpm,
      beatGrid: stepState,
      username: "to remove this username field. use id",
    };
    console.log("beatSetUp", beatSetUp);
    axios
      .put("/beatSequence/", beatSetUp) //previously was post
      .then((response) => {
        console.log("posted to MongoDB", response);
      })
      .catch((error) => {
        console.log("error response", error.response.data.error);
      });
    //also need newplaylist name to appear in the list
  };

  return (
    <StepContext.Provider value={{ state: stepState, setSteps }}>
      <Container>
        {console.log(newConfig)}
        <Transport>
          <Logo>{beatSeqName}</Logo>
          {bpmSelector}
          {startButton}
        </Transport>
        <React.Suspense fallback={<p>loading</p>}>
          <StepSequencer
            config={config}
            currentStep={currentStepRef.current}
            playing={start}
            setBuffers={setBuffers}
          />
          <ButtonContainer>
            <Fx
              sound={process.env.PUBLIC_URL + "/sounds/loop.wav"}
              title="Turn Up (F)"
            />
            <Fx
              sound={process.env.PUBLIC_URL + "/sounds/loop130.wav"}
              title="SQUAD (Am)"
            />
            <Fx
              sound={process.env.PUBLIC_URL + "/sounds/hey.wav"}
              title="Hey"
            />
            <Fx
              sound={process.env.PUBLIC_URL + "/sounds/yeah.wav"}
              title="Yeah"
            />
          </ButtonContainer>
        </React.Suspense>
        <div>
          <button onClick={(e) => handleSaveClick(e)}>Save</button>
        </div>
      </Container>
    </StepContext.Provider>
  );
}
