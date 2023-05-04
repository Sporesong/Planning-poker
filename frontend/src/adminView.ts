import { Task, TaskManager } from "./models/TaskManager";
const taskManager = new TaskManager();

export function renderAdminCreateView (){
  const main = document.querySelector('main');
  if (main) {
    main.innerHTML = '';
  }
  const taskTitleElement = createInputElement('Task title', 'titleInput');
  const taskDescriptionElement = createInputElement('Task description', 'descriptionInput');
  const addTaskBtn = createAdminBtnElement('Add task', 'addTaskBtn', handleAddTask)
  const removeTasktBtn = createAdminBtnElement('Remove task', 'removeTaskBtn', handleRemoveTask)
  const saveSessionBtn = createAdminBtnElement('Save and start Session', 'saveSessionBtn', handleSaveSession)
  main?.append(taskTitleElement, taskDescriptionElement, addTaskBtn, removeTasktBtn, saveSessionBtn);
}

function createInputElement(placeholder: string, id: string): HTMLInputElement {
  const inputElement: HTMLInputElement = document.createElement('input')
  inputElement.type = 'text';
  inputElement.placeholder = placeholder;
  inputElement.classList.add('adminTextInput');
  inputElement.id = id;
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
  const adminViewContainer = document.querySelector('.adminViewContainer') as HTMLElement;

  const titleElement = document.querySelector('#titleInput') as HTMLInputElement;
  const descriptionElement = document.querySelector('#descriptionInput') as HTMLInputElement;
  const title: string = titleElement.value;
  const description: string = descriptionElement.value;

  if (title.length === 0) {
    return;
  }

  const task = new Task(title, description);
  taskManager.addTask(task);

  titleElement.value = '';
  descriptionElement.value = '';
  adminViewContainer.innerHTML = "Task added to session";
}

function handleRemoveTask(this: HTMLButtonElement, ev: MouseEvent): void {
  ev.preventDefault();
  console.log('remove task'); 
}

function handleSaveSession(this: HTMLButtonElement, ev: MouseEvent): void {
  ev.preventDefault();
  console.log('save session');

  const adminViewContainer = document.querySelector('.adminViewContainer') as HTMLElement;

  taskManager.tasks.forEach((task) => {
    adminViewContainer.innerHTML += `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
    `;
  })

}