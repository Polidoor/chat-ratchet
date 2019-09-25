import { Injectable } from '@angular/core';
import { Message } from './message';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  connexion: WebSocket;
  messageRecu = new Subject<Message>();

  constructor() {
    this.connexion = new WebSocket('ws://localhost:8081');

    this.connexion.onmessage = (message: MessageEvent) => {
      const data: Message = JSON.parse(message.data);
      this.messageRecu.next(data);
    };
  }

  public send(message: Message) {
    this.connexion.send(JSON.stringify(message));
  }
}
