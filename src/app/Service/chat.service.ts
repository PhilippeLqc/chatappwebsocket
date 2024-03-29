import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client/dist/sockjs';
import { Stomp } from '@stomp/stompjs';
import { ChatMessage } from '../Model/chatMessage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private stompClient: any;
  messages: ChatMessage[] = [];
  private messagesSubject: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]); // Subject pour émettre des messages

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
        messageContent.sender = messageContent.user;
        delete messageContent.user;

        const currentMessages = this.messagesSubject.getValue();
        currentMessages.push(messageContent);

        this.messagesSubject.next(currentMessages);
        console.log("messageSubject", this.messagesSubject.getValue());
        console.log("messageContent", messageContent);
      });
    });
  }
  sendMessage(roomId: string, ChatMessage: ChatMessage) {
    this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(ChatMessage));
  }

  getMessages() {
    return this.messagesSubject.asObservable();
  }
}
