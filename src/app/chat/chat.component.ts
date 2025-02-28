import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from '../message/message.component';
import { MessageFormComponent } from '../message-form/message-form.component';
import { ChatService } from '../chat.service';
import { Message } from '../models/message.model';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, MessageComponent, MessageFormComponent],
  templateUrl: './chat.component.html',  
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getMessages().subscribe(messages => {
      this.messages = messages;
    });

    const username = localStorage.getItem('username');
    if (!username) {
      const newUsername = prompt('Введите ваше имя:');
      if (newUsername) {
        localStorage.setItem('username', newUsername);
      }
    }
  }

  onMessageSent(message: Message): void {
    this.chatService.sendMessage(message);
  }
}