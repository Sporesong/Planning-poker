import { socket } from "./socket";
import { initVotingSession } from "./voting";
let joinButton: HTMLButtonElement;

export function renderTeamView() {
    const messageBox = document.createElement("div");
    messageBox.classList.add("messageBox");
    messageBox.innerText = 
    "Thanks for waiting! We're preparing the next session of Planning Poker and it will be ready to play shortly. Get ready to estimate some stories and have fun collaborating with your team!";


    const usersList = document.createElement("ul");
    usersList.classList.add("usersList");
    socket.on("updateOnlineUsers", (users) => {
    console.log(typeof users);
      usersList.innerHTML = "";
      users.forEach((user: {username:string}) => {
        const li = document.createElement("li");
        li.textContent = user.username;
        usersList.appendChild(li);  
      });
    });

    joinButton = document.createElement("button");
    joinButton.classList.add("joinButtonInactive");
    joinButton.innerText = "Join session";

    const startPageContainer = document.querySelector(".startPageContainer") as HTMLElement;
    startPageContainer.appendChild(messageBox);
    startPageContainer.appendChild(usersList);
    startPageContainer.appendChild(joinButton);

    socket.on("sessionActive", function activateJoinButton() {
        joinButton.classList.toggle(".joinButtonInactive");
    });

    joinButton.addEventListener("click", () => {
        socket.on("sessionStart", function activateJoinButton() {
            startPageContainer.innerHTML = "";
            initVotingSession();
            });
        });    
    };
