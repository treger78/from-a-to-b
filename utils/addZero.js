export const addZero = (splitedTime, timeArray = splitedTime, index) => {
  if (splitedTime[0].length === 1) {
    timeArray[index ? index : 0] = '0' + timeArray[index ? index : 0];
  }

  if (splitedTime[1].length === 1) {
    timeArray[index ? index : 1] = timeArray[index ? index : 1] + '0';
  }
}
