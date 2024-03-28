import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../Service/chat.service';
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
messages: ChatMessage[] = [];

  constructor(private chatService: ChatService) {

   }

   ngOnInit(): void {
       
    this.chatService.joinRoom('room1');
   }

    sendMessage(){
      const chatMessage = {message: 'hello', user: 'user1'} as ChatMessage;
      this.chatService.sendMessage("room1", chatMessage);
    }
}
