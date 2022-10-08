import { CONSTS } from "./constants.js";

export const convertTime = (timeArray, isConvertGMT) => {
  const userGMT = - new Date().getTimezoneOffset() / 60;

  timeArray.forEach((time, i) => {
    if (userGMT === CONSTS.GMT && isConvertGMT) return;

    const date = new Date();

    let splitedTime = time.split(':');

    if (isConvertGMT) {
      date.setHours(Number(splitedTime[0]) + userGMT, splitedTime[1]);
    } else {
      date.setHours(Number(splitedTime[0]), Number(splitedTime[1]) + CONSTS.ONE_DIRECTION_TIME);
    }
  
    timeArray[i] = `${date.getHours()}:${date.getMinutes()}`;
  
    splitedTime = timeArray[i].split(':');
  
    if (splitedTime[0].length === 1) {
      splitedTime[0] = '0' + splitedTime[0];
    }
    
    if (splitedTime[1].length === 1) {
      splitedTime[1] = '0' + splitedTime[1];
    }
    
    timeArray[i] = `${splitedTime[0]}:${splitedTime[1]}`;
  });

  return timeArray;
};
