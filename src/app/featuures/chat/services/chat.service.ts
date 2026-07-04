import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs/operators';

import { ApiService } from '../../../core/services/api.service';
import { ChatStore } from '../state/chat.store';
import { Conversation } from '../models/conversation.model';
import { IndexedDbService } from '../../../core/storage/indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {


  private db = inject(IndexedDbService);

  private api = inject(ApiService);
  private store = inject(ChatStore);

  private channels = [
    'whatsapp',
    'instagram',
    'facebook',
    'website',
    'email'
  ] as const;

async loadConversations() {

  const localData = await this.db.getConversations();

  if (localData.length > 0) {

  this.store.loadConversations(localData);
  return;

  }

  this.api.getUsers()
    .pipe(
      map((response: any) => {

        return response.users.map((user: any, index: number): Conversation => ({

          id: user.id,

          customer: {
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            phone: user.phone,
            image: user.image
          },

          channel: this.channels[index % this.channels.length],

          lastMessage: 'Hello! How can I help you?',

          lastMessageTime: new Date(),

          unreadCount: Math.floor(Math.random() * 5),

          pinned: false,

          messages: []

        }));

      })
    )
    .subscribe(conversations => {

      this.store.setConversations(conversations);

    });

}


  getAIResponse() {
  return this.api.getAIResponse();
}




streamText(
  text: string,
  callback: (value: string) => void,
  completed?: () => void
) {

  let index = 0;

  const interval = setInterval(() => {

    callback(text.substring(0, index));

    index++;

    if (index > text.length) {

      clearInterval(interval);

      completed?.();

    }

  }, 30);

}

}