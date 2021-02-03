import React, { useMemo, useContext } from 'react';
import styled from 'styled-components';

import StepContext from './StepContext';
import Step from './Step';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
`;

export default function Steps(props) {
  const context = useContext(StepContext);
  const contextMemo = context.state[props.name];
  // const steps = useMemo(() => context.state[props.name], [context.state[props.name]]);
  const steps = useMemo(() => contextMemo, [contextMemo]);

  return (
    <Wrapper>
      {steps.map((s, i) => (
        <Step
          on={s !== 0}
          doubled={s === 2}
          index={i}
          key={i}
          name={props.name}
        />
      ))}
    </Wrapper>
  );
}
