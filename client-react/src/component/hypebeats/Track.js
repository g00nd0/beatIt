import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { VolumeUp, Backspace } from "@material-ui/icons";
import Steps from "./Steps";
import StepContext from "./StepContext";
const Wrapper = styled.div`
  display: flex;
  flex: 1;
`;

const Info = styled.div`
  flex: 0 0 155px;
  background: linear-gradient(#292929, #111);
  border: 1px solid #555;
`;

const Name = styled.h2`
  color: white;
  font-size: 14px;
  margin-left: 20px;
  line-height: 100%;
  margin: 0;
  vertical-align: middle;
  padding: 0px 10px;
  line-height: 50px;
`;

export default function Track({ buffer, name, setBuffers }) {
  const context = useContext(StepContext);
  const clearRow = () => {
    console.log("clearing row for", name);
    // console.log("context.state", context.state)
    const currentState = context.state;
    const cleanRow = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const newState = {
      ...currentState,
      [name]: cleanRow,
    };
    console.log("newState", newState);
    context.setSteps(newState);
  };

  useEffect(() => {
    setBuffers((buffers) => ({
      ...buffers,
      [name]: buffer,
    }));
  }, [buffer]);
  return (
    <Wrapper>
      <Info>
        <Name>
          {name}
          {"    "}
          <VolumeUp
            onClick={() => {
              buffer.start();
            }}
          />
          {"   "}
          <Backspace
            onClick={() => {
              clearRow();
            }}
          />
        </Name>
      </Info>
      <Steps name={name} />
    </Wrapper>
  );
}
