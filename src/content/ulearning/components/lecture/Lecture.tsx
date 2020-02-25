import React, {useRef} from "react";
import "./lecture.less";
import {NumberInput} from "../../../../components/NumberInput";

export const Lecture: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <span>视频播放</span>
      <ul>
        <li className="no-change-color">
          <NumberInput inputRef={inputRef} label={"倍速"} id={"mooc-assistant-speed"} min={1} max={16} defaultValue={1}/>
        </li>
        <li onClick={() => playAsRate(inputRef.current!.valueAsNumber)}>
          倍速播放
        </li>
      </ul>
    </div>
  );
};

const playAsRate: (rate: number) => void = rate => {
  const video = document.querySelector('video');
  video!.play().then(() => video!.playbackRate = rate)
};
