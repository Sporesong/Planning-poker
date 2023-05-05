import './style.css'
let joinButton: HTMLButtonElement;

export function renderTeamView() {
    const messageBox = document.createElement("div");
    messageBox.classList.add(".messageBox");
    messageBox.innerText = 
    "Thanks for waiting! We're preparing the next session of Planning Poker and it will be ready to play shortly. Get ready to estimate some stories and have fun collaborating with your team!";

    const users = [];
    const usersList = document.createElement("ul");
    usersList.classList.add(".usersList");
    //fånga upp users och lägg till i arrayen
    //appenda li elements med users som loggat in

    joinButton = document.createElement("button");
    joinButton.classList.add(".joinButtonInactive");

    const startPageContainer = document.querySelector(".startPageContainer") as HTMLElement;
    startPageContainer.appendChild(messageBox);
    startPageContainer.appendChild(usersList);
    startPageContainer.appendChild(joinButton);

    socket.on("session ready", function activateJoinButton() {
        joinButton.classList.toggle(".joinButtonInactive");
    })

    
joinButton.addEventListener("click", () => {
    //här ska man skickas till votingvyn
    });
    
};
