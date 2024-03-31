import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client/dist/sockjs';
import { Stomp } from '@stomp/stompjs';
import { MessageDto } from '../Model/MessageDto';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private stompClient: any;
  messages: MessageDto[] = [];
  // BehaviorSubject to emit the messages to the components
  private messagesSubject: BehaviorSubject<MessageDto[]> = new BehaviorSubject<MessageDto[]>([]);


  constructor(private http: HttpClient) { 
    this.initConnection();
    this.joinRoom('1100');
  }

  serviceURL = 'http://localhost:8081/api/websocket';


  // Initialize the connection to the websocket
  initConnection() {
    const url = 'http://localhost:9000/api/chat-socket';
    this.stompClient = Stomp.over(() => new SockJS(url));
    return this.stompClient;
  }
  // --------------------------------------------

  // Join a room. The room is identified by The project ID
  joinRoom(roomId: string) {

    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/topic/${roomId}`, (message: any) => {

        // Parse the message and add it to the messages array
        const messageContent = JSON.parse(message.body);
        messageContent.sender = messageContent.userId;
        delete messageContent.userId;

        // Add the message to the subject to emit it
        const currentMessages = this.messagesSubject.getValue();
        currentMessages.push(messageContent);
        this.messagesSubject.next(currentMessages);
      });
    });
  }
  // --------------------------------------------

  // Send a message to the room identified by the project ID and save it in the database
  sendMessage(roomId: string, ChatMessage: MessageDto) {
    this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(ChatMessage));

    const currentMessages = this.messagesSubject.getValue();
    this.messagesSubject.next(currentMessages);

    //post message in database with bearer token
    //return this.http.post<MessageDto>(this.serviceURL + '/saveMessage', ChatMessage)
  }
  // --------------------------------------------

  
  // Get the history of messages for a room identified by the project ID
  getHistory(roomId: string) {
    return this.http.get<MessageDto[]>(this.serviceURL + '/getHistory/' + roomId);
  }
  // --------------------------------------------
  
  // Get the messages from the subject
  getMessages() {
    return this.messagesSubject.asObservable();
  }
  // --------------------------------------------

}
