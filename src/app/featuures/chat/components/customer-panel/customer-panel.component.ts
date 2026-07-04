import { Component, inject } from '@angular/core';
import { ChatStore } from '../../state/chat.store';

@Component({
  selector: 'app-customer-panel',
  standalone: true,
  imports: [],
  templateUrl: './customer-panel.component.html',
  styleUrl: './customer-panel.component.css'
})
export class CustomerPanelComponent {

  chatStore = inject(ChatStore);
}
