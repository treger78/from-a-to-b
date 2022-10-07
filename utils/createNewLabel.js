export const createNewLabel = (htmlFor, textContent, parent) => {
  const label = document.createElement('label');

  label.htmlFor = htmlFor;
  label.textContent = textContent;

  parent.appendChild(label);
}
