import { startTimeFromA, startTimeFromB } from "./utils/timeData.js";
import { CONSTS } from "./utils/constants.js";
import { convertTime } from "./utils/convertTime.js";
import { blockWrongTimeForReturnSelect } from "./utils/blockWrongTimeForReturnSelect.js";
import { createNewLabel } from "./utils/createNewLabel.js";
import { fillSelectByOptions } from "./utils/fillSelectByOptions.js";
import { getDeclension } from "./utils/getDeclension.js";
import { getTicketsQuantity, getDirection, getTime } from "./utils/getTicketData.js";

convertTime(startTimeFromA, true);
convertTime(startTimeFromB, true);

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

  if (!ticketsQuantity || !direction || !time || time.returnTime === '') {
    return alert('Не все данные заполнены. Пожалуйста, укажите направление, время и количество билетов!');
  }

  const isOneTime = typeof time !== 'object';

  const price = isOneTime ?
    ticketsQuantity * CONSTS.ONE_DIRECTION_PRICE :
    ticketsQuantity * CONSTS.TWO_DIRECTION_PRICE;

  const date = new Date();

  let arriveTime = null;

  if (isOneTime) {
    arriveTime = convertTime([time], false);
  } else {
    arriveTime = {
      startTime: convertTime([time.startTime], false),
      returnTime: convertTime([time.returnTime], false),
    }
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
