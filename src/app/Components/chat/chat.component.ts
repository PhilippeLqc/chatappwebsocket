import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../Service/chat.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatMessage } from '../../Model/chatMessage';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  userId: string="";
  messageList: any[] = [];
  userMessage: string = ''; // Propriété pour stocker la valeur de l'entrée de texte

  constructor(private chatService: ChatService,  private route: ActivatedRoute) {
   }

   ngOnInit(): void {
    this.userId = this.route.snapshot.params["userId"];
    this.chatService.joinRoom('room1');
    this.listenerMessages();
   }

  sendMessage() {
    const chatMessage: ChatMessage = {
      message: this.userMessage, 
      user: this.userId
    } as ChatMessage;
    this.chatService.sendMessage('room1', chatMessage);
    this.userMessage = '';
  }

  listenerMessages() {
    this.chatService.getMessages().subscribe((messages: any) => {
      this.messageList = messages.map((message: any) => ({
        ...message,
        message_side: messages.user === this.userId ? 'sender' : 'receiver'
      }))
    });
  }
}
