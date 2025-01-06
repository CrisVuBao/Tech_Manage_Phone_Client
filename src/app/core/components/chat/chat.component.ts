import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  receiverId?: number;
  messageContent: string = '';
  messages: { senderId: number, content: string, sentAt: Date }[] = [];

  constructor(
    private chatService: ChatService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    // Kết nối SignalR
    this.chatService.startConnection();

    // Lắng nghe tin nhắn
    this.chatService.onReceiveMessage((senderId, content, sentAt) => {
      this.messages.push({ senderId, content, sentAt });
    });

    // Lắng nghe xác nhận gửi tin
    this.chatService.onMessageSentConfirmation((messageId) => {
      console.log('Message Sent, ID =', messageId);
    });

    // (Tuỳ chọn) Gọi API để load conversation với 1 user (ví dụ userId = 2)
    // this.loadConversation(2);
  }

  sendMessage() {
    if (!this.receiverId || !this.messageContent) return;
    this.chatService.sendMessage(this.receiverId, this.messageContent);
    this.messageContent = '';
  }

  loadConversation(userId: number) {
    this.http.get<any[]>(`https://localhost:7141/api/conversation/${userId}`, {
      withCredentials: true
    }).subscribe(data => {
      // data = array Message
      this.messages = data.map(m => {
        return {
          senderId: m.senderId,
          content: m.content,
          sentAt: m.sentAt
        };
      });
    });
  }
}
