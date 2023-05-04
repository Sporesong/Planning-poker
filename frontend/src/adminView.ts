function renderAdminCreateView (){
  const main = document.querySelector('main');
  if (main) {
    main.innerHTML = '';
  }
  const taskTitleElement = createInputElement('Task title');
  const taskDescriptionElement = createInputElement('Task description');
  main?.append(taskTitleElement, taskDescriptionElement);
}

function createInputElement(placeholder: string): HTMLInputElement {
  const inputElement: HTMLInputElement = document.createElement('input')
  inputElement.type = 'text';
  inputElement.placeholder = placeholder;
  inputElement.classList.add('adminTextInput');
  return inputElement;
} 

