import { Task, TaskManager } from "./models/TaskManager";
const taskManager = new TaskManager();
import { socket } from "./socket";

//RENDER

export function renderAdminCreateView () {
  const main = document.querySelector('main');
  if (main) {
    main.innerHTML = '';
  }
  const taskTitleElement = createInputElement('Task title', 'titleInput');
  const taskDescriptionElement = createInputElement('Task description', 'descriptionInput');
  const addTaskBtn = createAdminBtnElement('Add task', 'addTaskBtn', handleAddTask)
  const saveSessionBtn = createAdminBtnElement('Save and start Session', 'saveSessionBtn', handleSaveSession)
  main?.append(taskTitleElement, taskDescriptionElement, addTaskBtn, saveSessionBtn);
  printTaskList();
}

function printTaskList() {
  const adminViewContainer = document.querySelector('.adminViewContainer') as HTMLElement;
  adminViewContainer.innerHTML = '';

  if (taskManager.tasks.length === 0) {
    return adminViewContainer.innerHTML = 'No tasks added to session yet';
  }

  taskManager.tasks.forEach((task, index) => {
    const titleElement: HTMLHeadingElement = createH3Element(task.title);
    const descriptionElement: HTMLParagraphElement = createPElement(task.description);
    const btn = createAdminBtnElement('Delete task', index.toString(), handleRemoveTask);
    adminViewContainer.append(titleElement, descriptionElement, btn);
  })
}

//ELEMENT CREATION

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

function createH3Element(innerText: string): HTMLHeadingElement {
  const element: HTMLHeadingElement = document.createElement('h3');
  element.innerText = innerText;
  return element;
}

function createPElement(innerText: string): HTMLParagraphElement {
  const element: HTMLHeadingElement = document.createElement('p');
  element.innerText = innerText;
  return element;
}

// EVENT FUNCTIONS

function handleAddTask(this: HTMLButtonElement, ev: MouseEvent): void {
  ev.preventDefault();

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
  titleElement.placeholder = "Task added to session";
  printTaskList();
}

function handleRemoveTask(this: HTMLButtonElement, ev: MouseEvent): void {
  ev.preventDefault();
  taskManager.deleteTask(Number(this.id));
  printTaskList()
}

function handleSaveSession(this: HTMLButtonElement, ev: MouseEvent): void {
  ev.preventDefault();
  socket.emit('createSession', taskManager.tasks);
}
