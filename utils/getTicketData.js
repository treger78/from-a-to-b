export const getTicketsQuantity = () => {
  return Number(document.getElementById('num').value);
}

export const getDirection = () => {
  return document.getElementById('route').value;
}

export const getTime = () => {
  const selectedTime = document.getElementsByName('time');

  if (selectedTime.length === 0) return;

  if (selectedTime.length > 1) {
    return {
      startTime: selectedTime[0].value,
      returnTime: selectedTime[1].value,
    };
  }

  return selectedTime[0].value;
}
