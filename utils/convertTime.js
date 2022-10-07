import { addZero } from "./addZero.js";
import { CONSTS } from "./constants.js";

export const convertTime = (timeArray) => {
  const userGMT = - new Date().getTimezoneOffset() / 60;

  timeArray.forEach((time, i) => {
    if (userGMT === CONSTS.GMT) return;

    const currentTime = time.split(':');
  
    const date = new Date();
  
    date.setHours(Number(currentTime[0]) + userGMT, Number(currentTime[1]));
  
    timeArray[i] = `${date.getHours()}:${date.getMinutes()}`;
  
    const splitedTime = timeArray[i].split(':');
  
    addZero(splitedTime, timeArray, i);
  });
};
