import { io } from "socket.io-client";
import VoteResult from "./models/voteResult";
const socket = io('http://localhost:3000');

//global test variables
const randomUserName: string = 'jesper'
const randomTask: string  = 'Create new internet'
const randomTaskInfo: string  = 'steal idea from silicon valley tvshow'

function initVoteDiv() {
    const voteDiv: HTMLDivElement = document.createElement('div') as HTMLDivElement
    voteDiv.innerHTML = `
    <div>
        <h3>Title of vote</h3>
        <form>
          <p>Select Story Point</p>
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

    document.querySelector('.sessionContainer')?.appendChild(voteDiv);
    const voteButton: HTMLButtonElement = document.querySelector('#voteButton') as HTMLButtonElement;
    voteButton.addEventListener('click', handleVoteClick)
}

function initCardsDiv() {
    const cardsDiv: HTMLDivElement = document.createElement('div') as HTMLDivElement
    cardsDiv.innerHTML = `
    <div>
        <h3>Votes of the Team</h3>
        <div class='cardsDivContainer'>
            Här ska korten komma!
        </div>
    </div>
    `;
    document.querySelector('.sessionContainer')?.appendChild(cardsDiv);
}

function handleVoteClick(e: any) {
    e.preventDefault()
    const voteValue: HTMLInputElement = document.querySelector('input[name="storyPoints"]:checked') as HTMLInputElement;
    if (voteValue == null) {
        console.log('please select option')
    } else {
        let voteValueNumber: number = Number(voteValue.value)
        let newVote = new VoteResult(randomUserName, randomTask, randomTaskInfo, voteValueNumber)
        socket.emit('votes', newVote)
    }

}

initVoteDiv()
initCardsDiv();

socket.on('votes', (data: VoteResult) => {
    const oneCard: HTMLDivElement = document.createElement('div') as HTMLDivElement
    oneCard.innerHTML = `
    <div>
        <h4>${data.userName}</h4>
        <h5>${data.storyPoint}</h5>
        <h5>${data.taskTitle}</h5>
    </div>
    `;
    document.querySelector('.cardsDivContainer')?.appendChild(oneCard)
})

