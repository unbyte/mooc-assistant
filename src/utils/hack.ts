export const preventBanClick: () => void = () => {
  const saveScript = document.createElement("script");
  saveScript.textContent = `Object.freeze(EventTarget.prototype);`;
  (document.head || document.documentElement).prepend(saveScript);
};
