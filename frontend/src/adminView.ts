export function renderAdminCreateView (){
  const main = document.querySelector('main');
  if (main) {
    main.innerHTML = '';
  }
  const taskTitleElement = createInputElement('Task title');
  const taskDescriptionElement = createInputElement('Task description');
  const addTaskBtn = createAdminBtnElement('Add task', 'addTaskBtn', handleAddTask)
  const removeTasktBtn = createAdminBtnElement('Remove task', 'removeTaskBtn', handleRemoveTask)
  const saveSessionBtn = createAdminBtnElement('Save and start Session', 'saveSessionBtn', handleSaveSession)
  main?.append(taskTitleElement, taskDescriptionElement, addTaskBtn, removeTasktBtn, saveSessionBtn);
}

function createInputElement(placeholder: string): HTMLInputElement {
  const inputElement: HTMLInputElement = document.createElement('input')
  inputElement.type = 'text';
  inputElement.placeholder = placeholder;
  inputElement.classList.add('adminTextInput');
  return inputElement;
} 

function createAdminBtnElement(innerText: string, id: string, callback: (this: HTMLButtonElement, ev: MouseEvent) => any): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.innerText = innerText;
  btn.classList.add('adminBtn');
  btn.id = id;
  btn.addEventListener('click', callback);
  return btn;
}

function handleAddTask(this: HTMLButtonElement, ev: MouseEvent): void {
  ev.preventDefault();
  console.log('add task'); 
}

function handleRemoveTask(this: HTMLButtonElement, ev: MouseEvent): void {
  ev.preventDefault();
  console.log('remove task'); 
}

function handleSaveSession(this: HTMLButtonElement, ev: MouseEvent): void {
  ev.preventDefault();
  console.log('save session'); 
}