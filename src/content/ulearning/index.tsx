import React from "react";
import "./ulearning.less"
import ReactDOM from "react-dom";
import {Answer} from "./components/answer/Answer";
import {Lecture} from "./components/lecture/Lecture";

export {}
const App: React.FC = () => {
  return (
    <>
      <Answer/>
      <Lecture/>
    </>
  )
};

// 插入
document.querySelector<HTMLDivElement>(".operating-area")!.insertAdjacentHTML("beforeend", "<div id='mooc-assistant'></div>");

// 挂载
ReactDOM.render(<App/>, document.getElementById('mooc-assistant'));
