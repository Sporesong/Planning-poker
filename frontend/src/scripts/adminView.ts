import { Task, TaskManager } from "./models/TaskManager";
const taskManager = new TaskManager();
import { socket } from "./socket";
import { initVotingSession, updateCurrentTask } from "./voting";

//RENDER

export function renderAdminCreateView () {
  const joinButton = document.querySelector('main button');
  const messageBox = document.querySelector('.messageBox') as HTMLDivElement;
  const adminViewContainer = document.querySelector('.adminViewContainer');
  const createTaskContainer = document.createElement('form');
  const taskListContainer = document.createElement('div');

  createTaskContainer.classList.add('createTaskContainer');
  taskListContainer.classList.add('taskListContainer');

  messageBox.innerHTML = '';
  joinButton?.remove();

  const taskTitleElement = createInputElement('Task title', 'titleInput');
  const taskDescriptionElement = createTextareaElement('Task description', 'descriptionInput');
  const addTaskBtn = createAdminBtnElement('Add task', 'addTaskBtn', handleAddTask);
  const saveSessionBtn = createAdminBtnElement('Save Session and wait for users to join', 'saveSessionBtn', handleSaveSession);
  saveSessionBtn.type = 'button';

  adminViewContainer?.append(createTaskContainer, taskListContainer);
  createTaskContainer?.append(taskTitleElement, taskDescriptionElement, addTaskBtn, saveSessionBtn);
  printTaskList();
}

function printTaskList() {
  const taskListContainer = document.querySelector('.taskListContainer') as HTMLDivElement;
  taskListContainer.innerHTML = '';

  if (taskManager.tasks.length === 0) {
    return taskListContainer.innerHTML = 'No tasks added to session yet';
  }

  taskManager.tasks.forEach((task, index) => {
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('taskContainer');

    const titleElement: HTMLHeadingElement = createH3Element(task.title);
    const descriptionElement: HTMLParagraphElement = createPElement(task.description);
    const btn = createAdminBtnElement('Delete task', index.toString(), handleRemoveTask);
    taskContainer.append(titleElement, descriptionElement, btn);
    taskListContainer.appendChild(taskContainer);
  })
}

function renderWaitingForUsers() {
  const adminViewContainer = document.querySelector('.adminViewContainer');
  const messageBox = document.querySelector('.messageBox');

  if (adminViewContainer) {
    adminViewContainer.innerHTML = '';
  }

  if (messageBox) {
    messageBox.innerHTML = '';
    messageBox.innerHTML = 'Waiting for users to join session..';
  }

  // 
  // const username = localStorage.getItem("userName");
  // const user = {username:username};
  // socket.emit('userJoin', user);
 

  const startSessionBtn = createAdminBtnElement('Start Session', 'startSessionBtn', handleStartSession);
  adminViewContainer?.appendChild(startSessionBtn);
  

  socket.on('startSession', (data) => {
    initVotingSession(data.tasks, data.currentTaskIndex);
  });

}

function renderAdminSessionBtns() {
  const adminViewContainer = document.querySelector('.adminViewContainer');
  const adminBtnsContainer = document.createElement('div');
  adminBtnsContainer.classList.add('adminBtnsContainer');

  const nextTaskBtn = createAdminBtnElement('Next task', 'nextTaskBtn', handleNextTask);
  const endSessionBtn = createAdminBtnElement('End session', 'endSessionBtn', handleEndSession);

  adminViewContainer?.append(nextTaskBtn, endSessionBtn);

  socket.on('disableNextTaskBtn', () => {
    nextTaskBtn.classList.add('disableNextTaskBtn');
    nextTaskBtn.disabled = true; // Disable the button as well
  });
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

function createTextareaElement(placeholder: string, id: string): HTMLTextAreaElement {
  const textareaElement: HTMLTextAreaElement = document.createElement('textarea');
  textareaElement.placeholder = placeholder;
  textareaElement.classList.add('adminTextareaInput');
  textareaElement.id = id;
  return textareaElement;
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

function handleSaveSession(this: HTMLButtonElement): void {
  if (taskManager.tasks.length > 0) {
    socket.emit('createSession', taskManager.tasks);
  }
  renderWaitingForUsers();
}

function handleStartSession(this: HTMLButtonElement): void {
  const messageBox = document.querySelector('.messageBox');

  if (messageBox) {
    messageBox.innerHTML = '';
    messageBox.innerHTML = 'Session started!';
  }

  const username = localStorage.getItem("userName")
  const user = {username:username}

  socket.emit('adminStartSession');
  socket.emit('userJoin', user);

  socket.on('updateCurrentTask', (data) => {
    updateCurrentTask(data.tasks, data.currentTaskIndex);
})

  this.remove();

  renderAdminSessionBtns();
}

function handleNextTask(this: HTMLButtonElement, _ev: MouseEvent): void {
  socket.emit('adminUpdateCurrentTask');
}

function handleEndSession(this: HTMLButtonElement, _ev: MouseEvent): void {
  socket.emit('adminEndSession');
}

socket.on('sessionEnded', () => {
  const username = localStorage.getItem("userName");
  console.log("session ended for admin view");

  if (username === "admin") {
    const adminViewContainer = document.querySelector('.adminViewContainer');
    if (adminViewContainer) {
      while (adminViewContainer.firstChild) {
        adminViewContainer.firstChild.remove();
      }
    }
    window.location.reload();
    renderAdminCreateView();
  }
});
