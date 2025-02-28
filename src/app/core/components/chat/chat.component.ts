import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Message } from '../../../shared/models/message.model';
import { User } from '../../../shared/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  newMessage: string = '';
  selectedUserId: number | null = null; // ID người nhận
  currentUser!: User;
  users: User[] = []; // Danh sách người dùng để chọn
  private userSubscription!: Subscription;

  constructor(private chatService: ChatService, private authService: AuthService) {}

  ngOnInit(): void {
    // Lấy thông tin người dùng hiện tại
    this.userSubscription = this.authService.user().subscribe(user => {
      console.log('Current user:', user); // Kiểm tra thông tin người dùng
      if(user) {
        this.currentUser = user;
        console.log(this.currentUser)
        this.chatService.startConnection();
      } else {
        console.log("bạn chưa đăng nhập")
      }
    });

    // Lắng nghe tin nhắn mới từ server
    this.chatService.onReceiveMessage((senderId, content, sentAt) => {
      this.messages.push({
        messageId: 0, // ID sẽ được cập nhật từ cơ sở dữ liệu
        senderId,
        receiverId: this.currentUser.id, // Hoặc sử dụng ID nếu có
        content,
        sentAt,
        isRead: false
      });
    });

    // Lắng nghe xác nhận tin nhắn đã gửi
    this.chatService.onMessageSentConfirmation((messageId) => {
      const lastMessage = this.messages[this.messages.length - 1];
      if (lastMessage) {
        lastMessage.messageId = messageId;
      }
    });

    // Tải danh sách người dùng
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.chatService.stopConnection();
    if(this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  loadUsers(): void {
    // Gọi API để lấy danh sách người dùng
    this.chatService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users.filter(user => user.id !== this.currentUser.id); // Loại trừ người dùng hiện tại
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  selectUser(userId: number): void {
    this.selectedUserId = userId;
    this.messages = [];
    this.loadConversation(userId);
  }

  loadConversation(userId: number): void {
    this.chatService.getConversation(userId).subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      },
      (error) => {
        console.error('Error loading conversation:', error);
      }
    );
  }

  sendMessage(): void {
    if (this.selectedUserId && this.newMessage.trim() !== '') {
      this.chatService.sendMessage(this.selectedUserId, this.newMessage.trim());
      this.messages.push({
        messageId: 0,
        senderId: this.currentUser.id,
        receiverId: this.selectedUserId,
        content: this.newMessage.trim(),
        sentAt: new Date(),
        isRead: false
      });
      this.newMessage = '';
    }
  }

  getUserName(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.fullName : 'Unknown';
  }

  markAsRead(messageId: number): void {
    this.chatService.markAsRead(messageId).subscribe(
      () => {
        const message = this.messages.find(msg => msg.messageId === messageId);
        if(message) {
          message.isRead = true;
        }
      },
      (error) => {
        console.error('Error marking message as read:', error);
      }
    );
  }
}


