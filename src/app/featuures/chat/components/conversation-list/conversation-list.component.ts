import { Component, inject } from '@angular/core';
import { ChatStore } from '../../state/chat.store';
import { Conversation } from '../../models/conversation.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-conversation-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './conversation-list.component.html',
  styleUrl: './conversation-list.component.css'
})
export class ConversationListComponent {
  chatStore = inject(ChatStore);

    onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.chatStore.setSearch(value);
  }

  selectConversation(conversation: Conversation) {
  this.chatStore.selectConversation(conversation);
}

togglePin(conversation: Conversation) {
  this.chatStore.togglePin(conversation);
}
}
