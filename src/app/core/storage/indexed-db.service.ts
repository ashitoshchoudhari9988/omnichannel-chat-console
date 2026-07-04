import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Conversation } from '../../featuures/chat/models/conversation.model';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService extends Dexie {

  conversations!: Table<Conversation, number>;

  constructor() {
    super('OmniChatDB');

    this.version(1).stores({
      conversations: 'id'
    });
  }

  saveConversations(data: Conversation[]) {
    return this.conversations.bulkPut(data);
  }

  getConversations() {
    return this.conversations.toArray();
  }

}