import { io } from "socket.io-client";
const socket = io('http://localhost:3000');

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
}

function initCardsDiv() {
    const voteDiv: HTMLDivElement = document.createElement('div') as HTMLDivElement
    voteDiv.innerHTML = `
    <div>
        <h3>Votes of the Team</h3>
        <div>
            Här ska korten komma!
        </div>
    </div>
    `;
    document.querySelector('.sessionContainer')?.appendChild(voteDiv);
}

function handleVoteClick(e: any) {
    e.preventDefault()
    console.log('click')

}

initVoteDiv()
initCardsDiv();

socket.on('voting', data => {
    const el: HTMLLIElement = document.createElement('li') as HTMLLIElement;
    el.innerHTML = data;
    document.querySelector('.sessionContainer')?.appendChild(el)
})

const voteButton: HTMLButtonElement = document.querySelector('#voteButton') as HTMLButtonElement;
voteButton.addEventListener('click', handleVoteClick)

