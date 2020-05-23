export const sleep: (time: number) => Promise<void> = time => {
  return new Promise(resolve => setTimeout(resolve, time));
};
