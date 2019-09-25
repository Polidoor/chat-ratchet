import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../message';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-room',
  template: `
    <div class="alert alert-light p-2" style="height: 60vh">
      <div
        *ngFor="let message of messages"
        class="border-bottom border-secondary py-2"
      >
        <strong>{{ message.username }} :</strong> {{ message.content }}
      </div>
    </div>

    <div class="alert alert-light">
      <div class="row">
        <div class="col-10">
          <input
            class="form-control"
            #message
            (keyup.enter)="send(message.value)"
            placeholder="Tapez le message que vous voulez ..."
          />
        </div>

        <div class="col">
          <button class="btn btn-primary" (click)="send(message.value)">
            Envoyer
          </button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ChatRoomComponent implements OnInit {
  username: string;
  messages: Message[] = [
    { username: 'Joseph', content: 'Salut les amis !' },
    { username: 'Patrick', content: 'Hoo salut' }
  ];

  constructor(private route: ActivatedRoute, private service: ChatService) {}

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');

    this.service.messageRecu.subscribe((message: Message) => {
      this.messages.push(message);
    });
  }

  send(message: string) {
    const data: Message = {
      username: this.username,
      content: message
    };

    this.messages.push(data);
    this.service.send(data);
  }
}
