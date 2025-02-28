import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Message {
  username: string;
  message: string;
  timestamp?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private messagesSubject: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
  public messages$: Observable<Message[]> = this.messagesSubject.asObservable();
  private broadcastChannel: BroadcastChannel;

  constructor() {
    this.broadcastChannel = new BroadcastChannel('chat_channel');
    this.broadcastChannel.onmessage = (event) => {
      const messages = this.messagesSubject.getValue();
      messages.push(event.data);
      this.messagesSubject.next(messages);
    };

    // Загрузка сообщений из localStorage при инициализации
    const savedMessages = localStorage.getItem('chat_messages');
    if (savedMessages) {
      this.messagesSubject.next(JSON.parse(savedMessages));
    }
  }

  sendMessage(message: Message): void {
    const messages = this.messagesSubject.getValue();
    messages.push(message);
    this.messagesSubject.next(messages);
    localStorage.setItem('chat_messages', JSON.stringify(messages));
    this.broadcastChannel.postMessage(message);
  }

  getMessages(): Observable<Message[]> {
    return this.messages$;
  }
}