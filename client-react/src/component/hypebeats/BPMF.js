import React, { useEffect, useState } from "react";
import styled from "styled-components";

//BPM component
const BPM = styled.input`
  color: #25ccf7;
  border: 2px solid #25ccf7;
  font-size: 18px;
  background: none;
  padding: 10px;
  font-family: "Righteous", cursive;
  border-radius: 2;
  margin: 2px 4px;
  margin-right: 20px;
  align-self: center;
`;
//pass down initalBPM and handleBPMchange(), propsLoaded
const BPMF = (props) => {
  const [bpm, setBPM] = useState(props.initalBPM); //inital state default is 65 propsLoaded=false

  useEffect(() => {
    // trigger setBPM when propsLoaded becomes true
    if (props.propsLoaded === true) {
      setBPM(props.initalBPM);
    }
    props.handlePropsLoadedStatus(false);
  }, [props.initalBPM, props.propsLoaded]);

  const onBPMchange = (e) => {
    const newBPM = e.target.value;
    setBPM(newBPM); //to reflect FE change in the BPM component
    props.handleBPMchange(newBPM); //inform DrumMachine of the change
    console.log("accessed into useBPM bpm", newBPM);
  };

  return (
    <>
      <BPM
        type="number"
        value={bpm}
        min="60"
        max="180"
        onChange={onBPMchange}
      />
    </>
  );
};

export default BPMF;
