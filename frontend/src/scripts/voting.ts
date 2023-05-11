import { socket } from "./socket";
import VoteResult from "./models/VoteResult";
import { Task } from "./models/TaskManager";

// global test variables
let currentTask: Task = {title: '', description: ''}

function initTaskTitleDiv() {
    const taskDiv: HTMLDivElement = document.createElement('div') as HTMLDivElement
    taskDiv.className = "taskTitleDivContainer";
    taskDiv.innerHTML = `
    <div>
        <h3>Task to vote about!</h3>
        <div class='singleTaskTitleCard'>
        </div>
    </div>
    `;
    document.querySelector('.sessionContainer')?.appendChild(taskDiv);
}

function updateTaskTitleDiv(theTitle: string, theDescription: string) { // loopa GLOBAL_USERS.tasks
    const singleTaskTitleCard: HTMLDivElement = document.querySelector('.singleTaskTitleCard') as HTMLDivElement
    singleTaskTitleCard.innerHTML = `
        <h5> Title: ${theTitle} </h5>
        <p> Info: ${theDescription} </p>
    `;
}

function initVoteDiv() {
    const voteDiv: HTMLDivElement = document.createElement('div') as HTMLDivElement
    voteDiv.className = "votesContainer";
    document.querySelector('.sessionContainer')?.appendChild(voteDiv);
}

function showVoteDiv(theTitle: string) {
    const showVoteDiv: HTMLDivElement = document.querySelector('.votesContainer') as HTMLDivElement
    showVoteDiv.innerHTML = `
    <div>
        <h3>Vote for: </h3>
        <h5>${theTitle}</h5>
        <form>
          <p>Select Story Point value: </p>
          <input type="radio" id="nr0" name="storyPoints" value="0">
          <label for="nr0">0</label><br>
          <input type="radio" id="nr1" name="storyPoints" value="1">
          <label for="nr1">1</label><br>
          <input type="radio" id="nr3" name="storyPoints" value="3">
          <label for="nr3">3</label><br>
          <input type="radio" id="nr5" name="storyPoints" value="5">
          <label for="nr5">5</label><br>
          <input type="radio" id="nr8" name="storyPoints" value="8">
          <label for="nr8">8</label><br>
          <button id="voteButton">Vote!</button>
        </form>
    </div>
    `;
    const voteButton: HTMLButtonElement = document.querySelector('#voteButton') as HTMLButtonElement;
    voteButton.addEventListener('click', handleVoteClick)
}

function initCardsDiv() {
    const cardsDiv: HTMLDivElement = document.createElement('div') as HTMLDivElement
    cardsDiv.className = "resultsContainer";
    cardsDiv.innerHTML = `
    <div>
        <h3>Votes of the Team</h3>
        <div class='cardsDivContainer'>
        </div>
        <div class='averagePointsContainer'>
        </div>
        <div class='finishedVotesContainer'>
        </div>
    </div>
    `;
    document.querySelector('.sessionContainer')?.appendChild(cardsDiv);
}

function handleVoteClick(e: any) {
    const username = localStorage.getItem('userName')
    e.preventDefault()
    const voteValue: HTMLInputElement = document.querySelector('input[name="storyPoints"]:checked') as HTMLInputElement;
    if (voteValue == null) {
        console.log('please select option')
    } else {
        let voteValueNumber: number = Number(voteValue.value)
        let newVote = new VoteResult(username, currentTask.title, currentTask.description, voteValueNumber)
        socket.emit('votes', newVote)
    }

}

export function initVotingSession(tasks: Task[], currentIndex: number) {
    initTaskTitleDiv()
    initCardsDiv()
    initVoteDiv()
    updateCurrentTask(tasks, currentIndex);
}

export function updateCurrentTask(tasks: Task[], currentIndex: number) {
    const title = tasks[currentIndex].title;
    const description = tasks[currentIndex].description;
    currentTask = {title: title, description: description};
    updateTaskTitleDiv(title, description);
    showVoteDiv(title)
    socket.on("updateSessionUsers", (users) => {
        const cardsDivContainer: HTMLDivElement = document.querySelector('.cardsDivContainer') as HTMLDivElement
        cardsDivContainer.innerHTML = ''
        users.forEach((user: {username:string}) => {
        const oneCard: HTMLDivElement = document.createElement('div') as HTMLDivElement
        oneCard.innerHTML = `
        <div>
            <h4>${user.username}</h4>
            <p>wating for vote...</p>
        </div>
        `;
        cardsDivContainer?.appendChild(oneCard)
    })

    })
}


socket.on('votes', (voteList: VoteResult[]) => {
    const cardsDivContainer: HTMLDivElement = document.querySelector('.cardsDivContainer') as HTMLDivElement
    cardsDivContainer.innerHTML = ''
    voteList.forEach((data: VoteResult) => {
        const cardContainer = document.createElement('div');
        cardContainer.className = 'card';
      
        const cardContent = document.createElement('div');
        cardContent.className = 'card__content';
      
        const cardFront = document.createElement('div');
        cardFront.className = 'card__front';
      
        const cardBody = document.createElement('p');
        cardBody.className = 'card__body';
        cardBody.textContent = data.userName;
      
        cardFront.appendChild(cardBody);
      
        const cardBack = document.createElement('div');
        cardBack.className = 'card__back';
      
        const cardTitle = document.createElement('h3');
        cardTitle.className = 'card__title';
        cardTitle.textContent = data.storyPoint.toString();
      
        const cardSubtitle = document.createElement('p');
        cardSubtitle.className = 'card__subtitle';
        cardSubtitle.textContent = data.taskTitle;
      
        cardBack.appendChild(cardTitle);
        cardBack.appendChild(cardSubtitle);
      
        cardContent.appendChild(cardFront);
        cardContent.appendChild(cardBack);
      
        cardContainer.appendChild(cardContent);
      
        if ( cardsDivContainer) {
            cardsDivContainer?.appendChild(cardContainer);
        }
      })
      
    //     const oneCard: HTMLDivElement = document.createElement('div') as HTMLDivElement
    //     oneCard.innerHTML = `
    //     <div>
    //         <h4>${data.userName}</h4>
    //         <h5>${data.storyPoint}</h5>
    //         <h5>${data.taskTitle}</h5>
    //     </div>
    //     `;
    //     cardsDivContainer?.appendChild(cardContainer)
    // })
})

socket.on('averageVotes', (num: number) => {
    const averageStoryPoint: HTMLDivElement = document.querySelector('.averagePointsContainer') as HTMLDivElement
    averageStoryPoint.innerHTML = `Average of: ${num} SP`;
})

socket.on('showVotingResult', (results: any) => {
    const finishedVotesContainer: HTMLDivElement = document.querySelector('.finishedVotesContainer') as HTMLDivElement
    finishedVotesContainer.innerHTML = ''
    results.forEach((data: any) => {
        const oneCard: HTMLDivElement = document.createElement('div') as HTMLDivElement
        oneCard.innerHTML = `
        <div class='resultsContainer'>
            <h4>Task:</h4>
            <h5>${data.title}</h5>
            <h4>had score:</h4>
            <h5>${data.average}</h5>
        </div>
        `;
        finishedVotesContainer?.appendChild(oneCard)
    })
})
