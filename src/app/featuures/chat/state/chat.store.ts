import { Injectable, signal, computed, inject } from '@angular/core';
import { Conversation } from '../models/conversation.model';
import { Message } from '../models/message.model';
import { IndexedDbService } from '../../../core/storage/indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class ChatStore {


     private db = inject(IndexedDbService);

     
  // State
  conversations = signal<Conversation[]>([]);
  selectedConversation = signal<Conversation | null>(null);
  searchText = signal('');

  // Computed Signal
 filteredConversations = computed(() => {
  const search = this.searchText().trim().toLowerCase();

  if (!search) {
    return this.conversations();
  }

  return this.conversations().filter(conversation =>
    conversation.customer.name.toLowerCase().includes(search)
  );
});


loadConversations(conversations: Conversation[]) {
  this.conversations.set(conversations);
}

  // Actions
setConversations(conversations: Conversation[]) {

  this.conversations.set(conversations);

  this.db.saveConversations(conversations);

}



selectConversation(conversation: Conversation) {

  conversation.unreadCount = 0;

  this.selectedConversation.set({
    ...conversation
  });

  this.conversations.update(conversations =>
    conversations.map(c =>
      c.id === conversation.id ? { ...conversation } : c
    )
  );

  this.db.saveConversations(this.conversations());

}

  setSearch(text: string) {
    this.searchText.set(text);
  }



  addMessage(message: Message) {

  const conversation = this.selectedConversation();

  if (!conversation) return;

  conversation.messages.push(message);

  conversation.lastMessage = message.text;

  conversation.lastMessageTime = message.timestamp;

  this.selectedConversation.set({
    ...conversation
  });

  this.conversations.update(conversations =>
    conversations.map(c =>
      c.id === conversation.id ? { ...conversation } : c
    )
  );

  this.db.saveConversations(this.conversations());

}




typing = signal(false);

setTyping(value:boolean){
    this.typing.set(value);
}




refreshConversation() {

  const conversation = this.selectedConversation();

  if (!conversation) return;

  this.selectedConversation.set({
    ...conversation
  });

   this.db.saveConversations(this.conversations());

}




updateDraft(text: string) {

  const conversation = this.selectedConversation();

  if (!conversation) return;

  conversation.draft = text;

  this.selectedConversation.set({
    ...conversation
  });

  this.conversations.update(list =>
    list.map(c =>
      c.id === conversation.id ? { ...conversation } : c
    )
  );

  this.db.saveConversations(this.conversations());

}



togglePin(conversation: Conversation) {

  conversation.pinned = !conversation.pinned;

  this.conversations.update(list => {

    const updated = list.map(c =>
      c.id === conversation.id ? { ...conversation } : c
    );

    return updated.sort((a, b) => {

      if (a.pinned === b.pinned) {
        return 0;
      }

      return a.pinned ? -1 : 1;

    });

  });

  this.db.saveConversations(this.conversations());

}
}