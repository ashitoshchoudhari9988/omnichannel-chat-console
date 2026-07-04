export interface Message {
  id: number;
  conversationId: number;
  text: string;
  sender: 'user' | 'customer' | 'ai';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}