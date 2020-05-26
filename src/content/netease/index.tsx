import ReactDOM from "react-dom";
import React from "react";
import "./netease.less";
import {preventBanClick} from "../../utils/hack";
import {App} from "./App";

const renderApp: () => void = () => {
  document.body.insertAdjacentHTML(
    "afterbegin",
    "<div id='mooc-assistant-mount'></div>"
  );

  ReactDOM.render(<App />, document.getElementById("mooc-assistant-mount"));
};

preventBanClick();

const loadApp: () => void = () => {
  renderApp();

  // 如果是在课程页面内，则同步页面上挂在 window 下的变量
  if (/(spoc)?\/learn\//.test(window.location.href)) {
    const scripts = document.querySelectorAll("script:not([src])");
    if (scripts.length !== 0) {
      eval(scripts[scripts.length - 1].innerHTML);
    }
  }
};

// DAMN FIREFOX
window.addEventListener("load", loadApp);
