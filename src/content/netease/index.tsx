import ReactDOM from "react-dom";
import React, { useRef } from "react";
import "./netease.less";
import { Evaluator } from "./components/evaluator/Evaluator";
import { Console } from "./components/console/Console";
import { Player } from "./components/player/Player";
import { Marker } from "./components/marker/marker";
import { getConfig } from "../../utils/storage";
import { FeatureKeys, FeatureStatusList } from "../../../features";

document.body.insertAdjacentHTML(
  "afterbegin",
  "<div id='mooc-assistant-mount'></div>"
);

interface ToggleProps {
  toggle: () => void;
}

export const Toggle: React.FC<ToggleProps> = ({ toggle }) => {
  return (
    <div id="mooc-assistant-toggle" onClick={toggle} title="展开/收起慕课助手">
      <span>慕课助手</span>
    </div>
  );
};

export const Body: React.FC = () => {
  return (
    <div id="mooc-assistant-body">
      <Evaluator />
      <Player />
      {features && features[FeatureKeys.MOOC_MARK_LEARNT] && <Marker />}
    </div>
  );
};

const App: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <div id="mooc-assistant" ref={mainRef}>
      <Toggle toggle={() => mainRef.current!.classList.toggle("show")} />
      <Body />
      <Console />
    </div>
  );
};

let features: FeatureStatusList;

// 丑是丑了点，比根组件 useState 触发 diff 好点
getConfig()
  .then(({ featureStatus }) => {
    features = featureStatus;
  })
  .finally(() => {
    ReactDOM.render(<App />, document.getElementById("mooc-assistant-mount"));
  });

// 如果是在课程页面内，则同步页面上挂在 window 下的变量
if (/(spoc)?\/learn\//.test(window.location.href)) {
  const scripts = document.querySelectorAll("script:not([src])");
  if (scripts.length !== 0) {
    eval(scripts[scripts.length - 1].innerHTML);
  }
}
