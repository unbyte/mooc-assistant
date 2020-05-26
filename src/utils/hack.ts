// to anti `EventTarget.prototype.addEventListener = function(){check whether a click is from real user}`
export const preventBanClick: () => void = () => {
  const saveScript = document.createElement("script");
  saveScript.textContent = `Object.freeze(EventTarget.prototype);`;
  (document.head || document.documentElement).prepend(saveScript);
};
