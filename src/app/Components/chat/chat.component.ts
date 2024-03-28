import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../Service/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { webSocket } from 'rxjs/webSocket';
import { Client, IMessage, Stomp } from '@stomp/stompjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  public message: string = '';
  public messages: IMessage[] = [];
  public stompClient!: Client;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.connect('ws://localhost:9000/api/chat').subscribe((socket) => {
      this.stompClient = Stomp.over(socket);
      this.stompClient.onConnect = () => {
        this.stompClient.subscribe('/api/chat', (message) => {
          this.messages.push(message);
        });
      };
      this.stompClient.onStompError = (frame) => {
        console.error('STOMP error:', frame);
      }
    });
  }

  sendMessage(): void {
    if (this.message) {
      this.stompClient.publish({ destination: '/api/chat', body: this.message });
      this.message = '';
    }
  }
}
