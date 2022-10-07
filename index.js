import { startTimeFromA, startTimeFromB } from "./utils/timeData.js";
import { CONSTS } from "./utils/constants.js";
import { addZero } from "./utils/addZero.js";
import { convertTime } from "./utils/convertTime.js";
import { blockWrongTimeForReturnSelect } from "./utils/blockWrongTimeForReturnSelect.js";
import { createNewLabel } from "./utils/createNewLabel.js";
import { fillSelectByOptions } from "./utils/fillSelectByOptions.js";
import { getDeclension } from "./utils/getDeclension.js";
import { getTicketsQuantity, getDirection, getTime } from "./utils/getTicketData.js";

convertTime(startTimeFromA);
convertTime(startTimeFromB);

const direction = document.getElementById('route');

direction.addEventListener('change', () => {
  const span = document.getElementsByClassName('time');

  if (span.length) {
    for (let i = 0; i < span.length; i += 1) {
      span[i].remove();
    }
  }

  const directionValue = direction.value;

  const newSpan = document.createElement('span');
  newSpan.classList.add('time');

  if (directionValue === CONSTS.FROM_A) {
    createNewLabel('time', 'Выберите время', newSpan);
    fillSelectByOptions(startTimeFromA, 'time', newSpan);
  } else if (directionValue === CONSTS.FROM_B) {
    createNewLabel('time', 'Выберите время', newSpan);
    fillSelectByOptions(startTimeFromB, 'time', newSpan);
  } else {
    createNewLabel('start-time', 'Выберите время отправления', newSpan);
    fillSelectByOptions(startTimeFromA, 'start-time', newSpan);

    createNewLabel('return-time', 'Выберите время возвращения', newSpan);
    fillSelectByOptions(startTimeFromB, 'return-time', newSpan);
  }

  document.getElementById('route').insertAdjacentElement('afterend', newSpan);

  blockWrongTimeForReturnSelect();
});

const btn = document.getElementById('calculate');

btn.addEventListener('click', () => {
  const ticketsQuantity = getTicketsQuantity();
  const direction = getDirection();
  const time = getTime();

  const isOneTime = typeof time !== 'object';

  const price = isOneTime ?
    ticketsQuantity * CONSTS.ONE_DIRECTION_PRICE :
    ticketsQuantity * CONSTS.TWO_DIRECTION_PRICE;

  const date = new Date();

  let arriveTime = null;

  if (isOneTime) {
    const splitedTime = time.split(':');

    date.setHours(Number(splitedTime[0]), Number(splitedTime[1]) + CONSTS.ONE_DIRECTION_TIME);

    arriveTime = `${date.getHours()}:${date.getMinutes()}`.split(':');

    addZero(arriveTime);
  } else {
    let splitedTime = time.startTime.split(':');
    
    date.setHours(Number(splitedTime[0]), Number(splitedTime[1]) + CONSTS.ONE_DIRECTION_TIME);

    let timeString = `${date.getHours()}:${date.getMinutes()}`.split(':');

    addZero(timeString);

    arriveTime = {
      startTime: timeString,
    }

    splitedTime = time.returnTime.split(':');
    
    date.setHours(Number(splitedTime[0]), Number(splitedTime[1]) + CONSTS.ONE_DIRECTION_TIME);

    timeString = `${date.getHours()}:${date.getMinutes()}`.split(':');

    addZero(timeString)

    arriveTime['returnTime'] = timeString;
  }

  const declensions = ['билет', 'билета', 'билетов'];

  if (isOneTime) {
    alert(`
      Вы выбрали ${ticketsQuantity} ${getDeclension(ticketsQuantity, ...declensions)} по маршруту ${direction} стоимостью ${price}р.
      Время в пути составит ${CONSTS.ONE_DIRECTION_TIME} минут.
      Теплоход отправляется в ${isOneTime ? time : time.startTime} и прибывает в ${arriveTime.join(':')}.
    `);
  } else {
    alert(`
      Вы выбрали ${ticketsQuantity} ${getDeclension(ticketsQuantity, ...declensions)} по маршруту ${direction} стоимостью ${price}р.
      Время в пути из A в B составит ${CONSTS.ONE_DIRECTION_TIME} минут.
      Теплоход из A в B отправляется в ${time.startTime} и прибывает в ${arriveTime.startTime.join(':')}.
      Время обратного пути составит ${CONSTS.ONE_DIRECTION_TIME} минут.
      Теплоход отправляется в ${time.returnTime} и прибывает в ${arriveTime.returnTime.join(':')}.
    `);
  }
});
