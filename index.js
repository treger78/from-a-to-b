const startTimeFromA = [
  '18:00',
  '18:30',
  '18:45',
  '19:00',
  '19:15',
  '21:00',
];

const startTimeFromB = [
  '18:30',
  '18:45',
  '19:00',
  '19:15',
  '19:35',
  '21:50',
  '21:55',
];

const CONSTS = {
  ONE_DIRECTION_PRICE: 700,
  TWO_DIRECTION_PRICE: 1200,
  ONE_DIRECTION_TIME: 50,
  FROM_A: 'из A в B',
  FROM_B: 'из B в A',
  GMT: 3,
};

const addZero = (splitedTime, timeArray = splitedTime, index) => {
  if (splitedTime[0].length === 1) {
    timeArray[index ? index : 0] = '0' + timeArray[index ? index : 0];
  }

  if (splitedTime[1].length === 1) {
    timeArray[index ? index : 1] = timeArray[index ? index : 1] + '0';
  }
}

const convertTime = (timeArray) => {
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

  const createNewLabel = (htmlFor, textContent, parent) => {
    const label = document.createElement('label');

    label.htmlFor = htmlFor;
    label.textContent = textContent;

    parent.appendChild(label);
  }

  const fillSelectByOptions = (startTimeArray, newSelectID, parent) => {
    const newSelect = document.createElement('select');
    newSelect.name = 'time';
    newSelect.id = newSelectID;

    startTimeArray.forEach((time) => {
      const newOption = document.createElement('option');

      newOption.value = time;
      newOption.textContent = time;

      newSelect.appendChild(newOption);
    });

    parent.appendChild(newSelect);
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
});

const getTicketsQuantity = () => {
  return Number(document.getElementById('num').value);
}

const getDirection = () => {
  return document.getElementById('route').value;
}

const getTime = () => {
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

const getDeclension = (number, one, two, five) => {
  number %= 100;

  if (number >= 5 && number <= 20) return five;

  number %= 10;

  if (number === 1) return one;

  if (number >= 2 && number <= 4) return two;

  return five;
}

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

  if (isOneTime) {
    const splitedTime = time.split(':');

    date.setHours(Number(splitedTime[0]), Number(splitedTime[1]) + CONSTS.ONE_DIRECTION_TIME);
  } else {
    const splitedTime = time.startTime.split(':');
    
    date.setHours(Number(splitedTime[0]), Number(splitedTime[1]) + CONSTS.ONE_DIRECTION_TIME);
  }

  const arriveTime = `${date.getHours()}:${date.getMinutes()}`.split(':');

  addZero(arriveTime);

  const declensions = ['билет', 'билета', 'билетов'];

  const message = `
    Вы выбрали ${ticketsQuantity} ${getDeclension(ticketsQuantity, ...declensions)} по маршруту ${direction} стоимостью ${price}р.
    Время в пути составит ${CONSTS.ONE_DIRECTION_TIME} минут.
    Теплоход отправляется в ${isOneTime ? time : time.startTime} и прибывает в ${arriveTime.join(':')}.
  `;

  alert(message);
});
