import { Customer } from './customer.model';
import { Message } from './message.model';

export type Channel =
  | 'whatsapp'
  | 'instagram'
  | 'facebook'
  | 'website'
  | 'email';

export interface Conversation {
  id: number;
  customer: Customer;
  channel: Channel;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  pinned: boolean;
  draft?: string;
  messages: Message[];
}