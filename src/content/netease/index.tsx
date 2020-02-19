import ReactDOM from "react-dom";
import React, {useRef} from "react";
import "./netease.less";
import {Evaluator} from "./components/evaluator/Evaluator";
import {Console} from "./components/console/Console";

document.body.insertAdjacentHTML("afterbegin", "<div id='mooc-assistant-mount'></div>");


interface ToggleProps {
  toggle: () => void;
}

export const Toggle: React.FC<ToggleProps> = props => {
  return (
    <div id="mooc-assistant-toggle" onClick={props.toggle} title="展开/收起慕课助手">
      <span>慕课助手</span>
    </div>
  );
};

export const Body: React.FC = () => {
  return (
    <div id="mooc-assistant-body">
      <Evaluator/>
    </div>
  );
};


const App: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <div id="mooc-assistant" ref={mainRef}>
      <Toggle toggle={() => mainRef.current!.classList.toggle('show')}/>
      <Body/>
      <Console/>
    </div>
  )
};

ReactDOM.render(<App/>, document.getElementById('mooc-assistant-mount'));
