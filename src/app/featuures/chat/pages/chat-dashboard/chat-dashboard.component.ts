import { Component, inject } from '@angular/core';
import { ConversationListComponent } from '../../components/conversation-list/conversation-list.component';
import { ChatWindowComponent } from '../../components/chat-window/chat-window.component';
import { CustomerPanelComponent } from '../../components/customer-panel/customer-panel.component';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-dashboard',
  standalone: true,
  imports: [
       ConversationListComponent,
    ChatWindowComponent,
    CustomerPanelComponent
  ],
  templateUrl: './chat-dashboard.component.html',
  styleUrl: './chat-dashboard.component.css'
})
export class ChatDashboardComponent {
 private chatService = inject(ChatService);

  ngOnInit(): void {
    this.chatService.loadConversations();
  }
}
