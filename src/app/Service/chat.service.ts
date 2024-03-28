
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import SockJS from 'sockjs-client/dist/sockjs';
import { Stomp } from '@stomp/stompjs';
import { ChatMessage } from '../Model/chatMessage';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private stompClient: any;

  constructor() { 
    this.initConnection();
  }

  initConnection() {
    const url = 'http://localhost:9000/chat-socket';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
  }

  joinRoom(roomId: string) {
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/topic/${roomId}`, (message: any) => {
        const messageContent = JSON.parse(message.body);
        console.log(messageContent);
      });
    });
  }
  sendMessage(roomId: string, ChatMessage: ChatMessage) {
    this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(ChatMessage));
  }
}
