import { io } from "socket.io-client";
const socket = io('http://localhost:3000');

socket.on('voting', data => {
    const el: HTMLLIElement = document.createElement('li') as HTMLLIElement;
    el.innerHTML = data;
    document.querySelector('.sessionContainer')?.appendChild(el)
})

const voteButton: HTMLButtonElement = document.querySelector('#voteButton') as HTMLButtonElement;
voteButton.addEventListener