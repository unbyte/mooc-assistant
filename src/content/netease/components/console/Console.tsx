import React, { RefObject, useRef } from "react";
import "./console.less";

let ConsoleRef: RefObject<HTMLTextAreaElement>;

export const echo: (msg: string) => void = msg => {
  ConsoleRef.current!.value += `${msg}\n`;
  ConsoleRef.current!.scrollTo({ top: ConsoleRef.current!.scrollHeight });
};

export const clearEchoed: () => void = () => {
  ConsoleRef.current!.value = "";
};

export const Console: React.FC = () => {
  ConsoleRef = useRef<HTMLTextAreaElement>(null);
  return (
    <div id="mooc-assistant-console">
      <textarea value={""} disabled={true} ref={ConsoleRef} />
    </div>
  );
};
