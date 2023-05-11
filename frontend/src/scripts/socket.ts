import { io } from "socket.io-client";
export const socket = io('http://localhost:3000');

export function removeClientSockets() {
socket.off('updateCurrentTask');
socket.off('updateOnlineUsers');
socket.off('updateSessionUsers');
socket.off('startSession');
socket.off('userJoinSession');
socket.off('disableNextTaskBtn');
socket.off('sessionActive');
socket.off('disableNextTaskBtn');
}
