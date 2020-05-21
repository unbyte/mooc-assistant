import React from "react";
import "./answer.less";

export const Answer: React.FC = () => {
  return (
    <div>
      <span>习题答案</span>
      <ul>
        <li onClick={fetchAnswers}>获取答案</li>
        <li onClick={clearAnswers}>隐藏答案</li>
      </ul>
    </div>
  );
};

const INSERT_PLACE = "afterbegin";

const genAnswerTip: (tip: string) => string = tip =>
  `<div class='answer-tip'>${tip}</div>`;

const fetchAnswers: () => void = () => {
  // 先判断当前页面
  if (!document.getElementsByClassName("question-view").length) return;
  // 考虑是不是要加个提示啥的

  // 获取
  document.querySelectorAll<HTMLDivElement>(".question-wrapper").forEach(e => {
    // 清除之前的
    if (e.firstElementChild!.className === "answer-tip") {
      e.removeChild(e.firstElementChild!);
    }

    // 获取
    const questionID: string = e.id.replace("question", "");
    fetch(`https://api.ulearning.cn/questionAnswer/${questionID}`).then(res => {
      res.json().then(
        value =>
          e.insertAdjacentHTML(
            INSERT_PLACE,
            genAnswerTip(answerToText(value["correctAnswerList"] as string[]))
          ),
        () => e.insertAdjacentHTML(INSERT_PLACE, genAnswerTip("获取失败"))
      );
    });
  });
};

const clearAnswers: () => void = () => {
  document.querySelectorAll<HTMLDivElement>(".question-wrapper").forEach(e => {
    if (e.firstElementChild!.className === "answer-tip") {
      e.removeChild(e.firstElementChild!);
    }
  });
};

const answerToText: (answer: string[]) => string = answer =>
  answer.map(a => (a === "true" ? "对" : a === "false" ? "错" : a)).join(" ");
