import React, { RefObject, useRef } from "react";
import "./player.less";
import { NumberInput } from "../../../../components/NumberInput";
import { resetPlayRate, setPlayRate } from "./worker";

interface ControllerProps {
  rate: RefObject<HTMLInputElement>;
}

export const Player: React.FC = () => {
  return (
    <div id="mooc-assistant-player">
      <h2>视频倍速</h2>
      <Panel />
    </div>
  );
};

const Panel: React.FC = () => {
  const refRate = useRef<HTMLInputElement>(null);
  return (
    <div id="mooc-assistant-player-panel">
      <NumberInput
        inputRef={refRate}
        label={"倍"}
        id={"mooc-assistant-player-rate"}
        min={1}
        max={100}
        defaultValue={1}
      />
      <div id="mooc-assistant-player-controller">
        <Controller rate={refRate} />
      </div>
    </div>
  );
};

const Controller: React.FC<ControllerProps> = props => {
  return (
    <>
      <WorkButton {...props} />
      <ResetButton />
    </>
  );
};

const WorkButton: React.FC<ControllerProps> = ({ rate }) => {
  const refWorkButton = useRef<HTMLSpanElement>(null);

  return (
    <span
      onClick={async () => setPlayRate(rate.current!.valueAsNumber)}
      ref={refWorkButton}
    >
      设置
    </span>
  );
};

const ResetButton: React.FC = () => {
  return <span onClick={async () => resetPlayRate()}>重置</span>;
};
