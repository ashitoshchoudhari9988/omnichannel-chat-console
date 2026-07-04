import { Component, effect, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ChatStore } from '../../state/chat.store';
import { Message } from '../../models/message.model';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [FormsModule,DatePipe],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.css'
})
export class ChatWindowComponent implements OnInit {

  isRecording = false;


  ngOnInit(): void {
this.recognition = new (window as any).webkitSpeechRecognition();

this.recognition.lang = 'en-US';

this.recognition.continuous = false;

this.recognition.interimResults = true;
  }

  @ViewChild('messageContainer')
messageContainer!: ElementRef;

recognition: any;

   chatStore = inject(ChatStore);

private chatService = inject(ChatService);
  

constructor() {

  effect(() => {

    const conversation = this.chatStore.selectedConversation();

    if (conversation) {
      this.message = conversation.draft ?? '';
    }

  });

}

  message = '';

  sendMessage() {

    const conversation = this.chatStore.selectedConversation();

    if (!conversation || !this.message.trim()) return;

    const newMessage: Message = {

      id: Date.now(),

      conversationId: conversation.id,

      text: this.message,

      sender: 'user',

      timestamp: new Date(),

      status: 'sent'

    };

    this.chatStore.addMessage(newMessage);

this.chatStore.setTyping(true);

    this.chatService.getAIResponse().subscribe((response: any) => {

 const aiMessage: Message = {

  id: Date.now() + 1,

  conversationId: conversation.id,

  text: '',

  sender: 'ai',

  timestamp: new Date(),

  status: 'sent'

};

this.chatStore.addMessage(aiMessage);

this.chatService.streamText(

  response.body,

  (value) => {

    aiMessage.text = value;

    this.chatStore.refreshConversation();

     this.scrollToBottom();

  },

  () => {

    this.chatStore.setTyping(false);
  const speech = new SpeechSynthesisUtterance(response.body);

  speech.lang = 'en-US';

  window.speechSynthesis.speak(speech);

  }

);

});

  conversation.draft = '';

this.chatStore.updateDraft('');

this.message = '';

  }



  private scrollToBottom() {

  setTimeout(() => {

    this.messageContainer.nativeElement.scrollTop =
      this.messageContainer.nativeElement.scrollHeight;

  });

}


startVoice() {

  if (this.isRecording) {
    return;
  }

  this.isRecording = true;

  this.recognition.start();

  this.recognition.onresult = (event: any) => {
    this.message = event.results[0][0].transcript;
  };

  this.recognition.onend = () => {
    this.isRecording = false;
  };

  this.recognition.onerror = () => {
    this.isRecording = false;
  };

}


saveDraft() {

  this.chatStore.updateDraft(this.message);

}


pauseSpeech() {
  window.speechSynthesis.pause();
}

resumeSpeech() {
  window.speechSynthesis.resume();
}

stopSpeech() {
  window.speechSynthesis.cancel();
}
}
