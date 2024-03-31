import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client/dist/sockjs';
import { Stomp } from '@stomp/stompjs';
import { MessageDto } from '../Model/MessageDto';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private stompClient: any;
  messages: MessageDto[] = [];
  private messagesSubject: BehaviorSubject<MessageDto[]> = new BehaviorSubject<MessageDto[]>([]); // Subject pour émettre des messages


  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { 
    this.initConnection();
    this.joinRoom('1100');
  }

  serviceURL = 'http://localhost:8081/api/websocket';
  
  initConnection() {
    const url = 'http://localhost:9000/api/chat-socket';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
  }

  joinRoom(roomId: string) {
    this.stompClient.connect({}, () => {
      console.log('La méthode joinRoom a été appelée avec roomId:', roomId);
      this.stompClient.subscribe(`/topic/${roomId}`, (message: any) => {
        const messageContent = JSON.parse(message.body);
        messageContent.sender = messageContent.userId;
        console.log("messageContent", messageContent)
        console.log("messageContent.userId", messageContent.userId)
        delete messageContent.userId;
        const currentMessages = this.messagesSubject.getValue();
        currentMessages.push(messageContent);
        this.messagesSubject.next(currentMessages);
      });
    });
  }

  sendMessage(roomId: string, ChatMessage: MessageDto) {
    this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(ChatMessage));

    const currentMessages = this.messagesSubject.getValue();
    this.messagesSubject.next(currentMessages);

    //post message in database with bearer token
    return this.http.post<MessageDto>(this.serviceURL + '/saveMessage', ChatMessage).subscribe((message: any) => {
      console.log("message", message);
    });
  }

  getHistory(roomId: string) {
    console.log("getHistory called with roomId:", roomId);
    return this.http.get<MessageDto[]>(this.serviceURL + '/getHistory/' + roomId);
  }
  
  getMessages() {
    return this.messagesSubject.asObservable();
  }

}
