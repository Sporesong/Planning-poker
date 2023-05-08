import { socket } from "./socket";
let joinButton: HTMLButtonElement;

export function renderTeamView() {
    const messageBox = document.createElement("div");
    messageBox.classList.add(".messageBox");
    messageBox.innerText = 
    "Thanks for waiting! We're preparing the next session of Planning Poker and it will be ready to play shortly. Get ready to estimate some stories and have fun collaborating with your team!";


    const usersList = document.createElement("ul");
    usersList.classList.add(".usersList");
    //localStorage get username
    //socket.emit username till backend
    //fånga upp users och lägg till i arrayen
    //appenda li elements med users som loggat in

    joinButton = document.createElement("button");
    joinButton.classList.add("joinButtonInactive");
    joinButton.innerText = "Join session";

    const startPageContainer = document.querySelector(".startPageContainer") as HTMLElement;
    startPageContainer.appendChild(messageBox);
    startPageContainer.appendChild(usersList);
    startPageContainer.appendChild(joinButton);

 /*    socket.on("sessionReady", function activateJoinButton() {
        joinButton.classList.toggle(".joinButtonInactive");
    }) */

    
joinButton.addEventListener("click", () => {
    //här ska man skickas till votingvyn
    });

    //socket.on(createSession)
    
    
};
