import { socket } from "./socket";
import { initVotingSession, updateCurrentTask } from "./voting";
let joinButton: HTMLButtonElement;

export function renderTeamView() {
  const messageBox = document.createElement("div");
  messageBox.classList.add("messageBox");
  messageBox.innerText = 
  "Thanks for waiting! We're preparing the next session of Planning Poker and it will be ready to play shortly. Get ready to estimate some stories and have fun collaborating with your team!";

  const loggedInContainer = document.createElement("div");
  loggedInContainer.classList.add("loggedInContainer");
  const loggedInHeader = document.createElement("h3");
  loggedInHeader.classList.add("loggedInHeader");
  loggedInHeader.innerHTML = "Logged in users";
  const loggedInUsersList = document.createElement("ul");
  loggedInUsersList.classList.add("loggedInUsersList");
  socket.on("updateOnlineUsers", (users) => {
  // console.log(typeof users);
    loggedInUsersList.innerHTML = "";
    users.forEach((user: {username:string}) => {
      const li = document.createElement("li");
      li.textContent = user.username;
      loggedInUsersList.appendChild(li);  
    });
  });

  const inSessionContainer = document.createElement("div");
  inSessionContainer.classList.add("inSessionContainer");
  const inSessionHeader = document.createElement("h3");
  inSessionHeader.classList.add("inSessionHeader");
  inSessionHeader.innerHTML = "Users in session";
  const joinedUsersList = document.createElement("ul");
  joinedUsersList.classList.add("joinedUsersList");
  socket.on("updateSessionUsers", (users) => {
  // console.log(typeof users);
    joinedUsersList.innerHTML = "";
    users.forEach((user: {username:string}) => {
      const li = document.createElement("li");
      li.textContent = user.username;
      joinedUsersList.appendChild(li);  
    });
  });

  const buttonAndListContainer = document.createElement("div");
  buttonAndListContainer.classList.add("buttonAndListContainer");
  const joinButton = document.createElement("button");
  joinButton.disabled = true;
  joinButton.innerText = "Join session";

  const startPageContainer = document.querySelector(".startPageContainer") as HTMLElement;
  startPageContainer.appendChild(messageBox);
  startPageContainer.appendChild(buttonAndListContainer);
  buttonAndListContainer.appendChild(joinButton);
  buttonAndListContainer.appendChild(loggedInContainer);
  loggedInContainer.appendChild(loggedInHeader);
  loggedInContainer.appendChild(loggedInUsersList);
  buttonAndListContainer.appendChild(inSessionContainer);
  inSessionContainer.appendChild(inSessionHeader);
  inSessionContainer.appendChild(joinedUsersList);
 

  socket.on("sessionActive", function activateJoinButton() {
      joinButton.disabled = false;
  });

  joinButton.addEventListener('click', () => {
    const username = localStorage.getItem("userName")
    const user = {username:username}

    socket.on('startSession', (data) => {
      initVotingSession(data.tasks, data.currentTaskIndex);
    });

    socket.on('updateCurrentTask', (data) => {
      updateCurrentTask(data.tasks, data.currentTaskIndex);
  })
  
    socket.emit("userJoin", user)
  });

};
