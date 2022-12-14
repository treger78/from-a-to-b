import { CONSTS } from "./constants.js";

export const blockWrongTimeForReturnSelect = () => {
  const returnTimeSelect = document.getElementById('return-time');

  if (!returnTimeSelect) return;
  
  returnTimeSelect.addEventListener('focus', () => {
    const startTime = document.getElementById('start-time').value.split(':');
    const options = returnTimeSelect.children;

    for (let i = 0; i < options.length; i += 1) {
      const returnTime = options[i].value.split(':');
      const startDate = new Date();
      const returnDate = new Date();

      startDate.setHours(Number(startTime[0]), Number(startTime[1]));
      returnDate.setHours(Number(returnTime[0]), Number(returnTime[1]));

      options[i].removeAttribute('disabled');

      if (startDate.getTime() + (CONSTS.ONE_DIRECTION_TIME * 60000) > returnDate.getTime()) {
        options[i].setAttribute('disabled', 'true');
      }
    }
  });

  const blockedOption = document.createElement('option');
  blockedOption.textContent = '';
  blockedOption.value = '';
  blockedOption.setAttribute('selected', 'true');
  blockedOption.setAttribute('disabled', 'true');

  returnTimeSelect.insertAdjacentElement('afterbegin', blockedOption);
}
