import { enableES5, produce } from "immer";

// 인터넷 익스플로러 11 지원 관련
const enableES5Produce = (...args) => {
  enableES5();

  return produce(...args);
};

export default enableES5Produce;
