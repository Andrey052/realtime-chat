import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatService, Message } from './chat.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  username: string = ''; // Имя пользователя
  message: string = ''; // Текущее сообщение
  messages: Message[] = []; // Список сообщений

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    // Загружаем имя пользователя из localStorage
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      this.username = savedUsername;
    } else {
      // Если имя не сохранено, запрашиваем его
      const newUsername = prompt('Введите ваше имя:');
      if (newUsername) {
        this.username = newUsername;
        localStorage.setItem('username', newUsername);
      }
    }

    // Подписываемся на новые сообщения
    this.chatService.getMessages().subscribe((messages) => {
      this.messages = messages;
    });
  }

  // Метод для отправки сообщения
  submit(): void {
    if (this.message.trim() && this.username) {
      const newMessage: Message = {
        username: this.username,
        message: this.message,
        timestamp: new Date(), // Добавляем время отправки
      };
      this.chatService.sendMessage(newMessage);
      this.message = ''; // Очищаем поле ввода
    }
  }
}