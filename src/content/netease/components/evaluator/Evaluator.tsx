import React, { RefObject, useRef, useState } from "react";
import "./evaluator.less";
import { openOptionsFromContent } from "../../../../utils/runtime";
import { EvaluatorWorker } from "./worker";
import { NumberInput } from "../../../../components/NumberInput";

interface ControllerProps {
  comment: RefObject<HTMLTextAreaElement>;
  random: RefObject<HTMLInputElement>;
  times: RefObject<HTMLInputElement>;
  frequency: RefObject<HTMLInputElement>;
}

export const Evaluator: React.FC = () => {
  return (
    <div id="mooc-assistant-evaluator">
      <h2>互评</h2>
      <Panel />
    </div>
  );
};

const Panel: React.FC = () => {
  const refComment = useRef<HTMLTextAreaElement>(null);
  const refTimes = useRef<HTMLInputElement>(null);
  const refFrequency = useRef<HTMLInputElement>(null);
  const refRandom = useRef<HTMLInputElement>(null);

  return (
    <div id="mooc-assistant-evaluator-panel">
      <textarea
        placeholder="评语"
        id="mooc-assistant-evaluator-comment"
        ref={refComment}
        disabled={true}
      />
      <div id="mooc-assistant-evaluator-config">
        <NumberInput
          inputRef={refFrequency}
          label={"秒/份"}
          id={"mooc-assistant-evaluator-frequency"}
          min={2}
          max={12}
          defaultValue={2}
        />

        <NumberInput
          inputRef={refTimes}
          label={"份"}
          id={"mooc-assistant-evaluator-times"}
          min={1}
          max={30}
          defaultValue={1}
        />

        <span>
          <input
            type="checkbox"
            id="mooc-assistant-evaluator-random"
            defaultChecked={true}
            ref={refRandom}
            onChange={({ target: { checked } }) => {
              refComment.current!.disabled = checked;
            }}
          />
          <label htmlFor="mooc-assistant-evaluator-random">随机评语</label>
        </span>
      </div>
      <div id="mooc-assistant-evaluator-controller">
        <Controller
          comment={refComment}
          frequency={refFrequency}
          random={refRandom}
          times={refTimes}
        />
      </div>
    </div>
  );
};

const Controller: React.FC<ControllerProps> = props => {
  return (
    <>
      <WorkButton {...props} />
      <OptionsButton />
    </>
  );
};

const WorkButton: React.FC<ControllerProps> = ({
  comment,
  random,
  times,
  frequency
}) => {
  const [flag, setFlag] = useState<boolean>(false);
  const refWorkButton = useRef<HTMLSpanElement>(null);

  return (
    <span
      onClick={async () =>
        flag
          ? EvaluatorWorker.stop()
          : EvaluatorWorker.run(
              times.current!.valueAsNumber,
              frequency.current!.valueAsNumber,
              random.current!.checked,
              comment.current!.value,
              res => {
                if (res) setFlag(true);
                else {
                  refWorkButton.current!.className = "shake";
                  setTimeout(
                    () => (refWorkButton.current!.className = ""),
                    400
                  );
                }
              },
              () => setFlag(false)
            )
      }
      ref={refWorkButton}
    >
      {(flag ? "停止" : "开始") + "互评"}
    </span>
  );
};

const OptionsButton: React.FC = () => {
  return <span onClick={openOptionsFromContent}>打开配置页面</span>;
};
