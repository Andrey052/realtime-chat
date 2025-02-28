import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Message } from '../models/message.model';

@Component({
  selector: 'app-message-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './message-form.component.html',  
})
export class MessageFormComponent {
  @Output() messageSent = new EventEmitter<Message>();
  messageText: string = '';

  sendMessage(): void {
    if (this.messageText.trim()) {
      const message: Message = {
        username: localStorage.getItem('username') || 'Anonymous',
        message: this.messageText,
        timestamp: new Date(),
      };
      this.messageSent.emit(message);
      this.messageText = '';
    }
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }
}