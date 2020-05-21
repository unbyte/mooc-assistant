import {clearEchoed, echo} from "../console/Console";

let timer: number = -1;

export const setPlayRate: (rate: number) => void = rate => {
  setVideoPlayRate(rate);

  window.onhashchange = () => {
    timer = setTimeout(() => {
        setVideoPlayRate(rate);
        timer = -1;
      },
      3000) as any;
  };


  echo(`设置 ${rate} 倍速成功`);
};

export const resetPlayRate: () => void = () => {
  clearEchoed();

  if (timer !== -1) {
    clearTimeout(timer);
    timer = -1;
  }

  setVideoPlayRate(1);

  window.onhashchange = () => {
  };
  echo(`重置视频倍速成功`);
};


const setVideoPlayRate: (rate: number) => void = rate => {
  document.querySelector("video")!.playbackRate = rate;
}
