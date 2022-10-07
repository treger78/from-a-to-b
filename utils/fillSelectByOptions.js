export const fillSelectByOptions = (startTimeArray, newSelectID, parent) => {
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
