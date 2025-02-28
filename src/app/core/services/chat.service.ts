// file chat.service.ts
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as signalR from '@microsoft/signalr';
import { AuthService } from './auth.service';
import { environment } from "../../../environments/environment.development";
import { Message } from "../../shared/models/message.model";
import { Observable } from "rxjs";
import { User } from "../../shared/models/user.model";
import { CookieService } from "ngx-cookie-service";
import { Token } from "@angular/compiler";

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private hubConnection!: signalR.HubConnection;
  private hubUrl = `${environment.apiBaseUrl}/chatHub`; // Sử dụng apiBaseUrl từ environment

  constructor(private http: HttpClient, private authService: AuthService, private cookieService: CookieService) {}

  public startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.hubUrl, {
        withCredentials: true, // Cho phép gửi cookie,
        accessTokenFactory: () => {
          const token = localStorage.getItem('Authorization');
          console.log('Access Token:', token); // Kiểm tra token có trong localStorage không
          return token ? token : '';
        },
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR connected'))
      .catch(err => console.log('Error while starting connection: ' + err));

    // Lắng nghe thông báo lỗi từ server
    this.hubConnection.on('Error', (message: string) => {
      console.error('SignalR Error:', message);
      // Bạn có thể hiển thị thông báo lỗi cho người dùng tại đây
    });
    if (this.hubConnection.state !== signalR.HubConnectionState.Connected) {
      console.error('SignalR hub connection not established.');
    }
  }

  // Gửi tin nhắn
  public sendMessage(receiverId: number, content: string): void {
    if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
      this.hubConnection.invoke('SendMessage', receiverId, content)
        .catch(err => console.error('Error sending message:', err));
    } else {
      console.error('Hub connection is not established.');
    }
  }

  // Lắng nghe khi server gửi tin nhắn
  public onReceiveMessage(callback: (senderId: number, content: string, sentAt: Date) => void): void {
    this.hubConnection.on('ReceiveMessage', (senderId, content, sentAt) => {
      callback(senderId, content, new Date(sentAt));
    });
  }

  // Lắng nghe xác nhận tin nhắn đã gửi
  public onMessageSentConfirmation(callback: (messageId: number) => void): void {
    this.hubConnection.on('MessageSentConfirmation', (messageId) => {
      callback(messageId);
    });
  }

  // Ngắt kết nối
  public stopConnection(): void {
    if (this.hubConnection) {
      this.hubConnection.stop().catch(err => console.log('Error while stopping connection:', err));
    }
  }

  // Lấy cuộc trò chuyện từ API
  public getConversation(userId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.apiBaseUrl}/api/conversation/${userId}`, { withCredentials: true });
  }

  // Đánh dấu tin nhắn đã đọc
  public markAsRead(messageId: number): Observable<any> {
    return this.http.put(`${environment.apiBaseUrl}/api/mark-read/${messageId}`, {}, { withCredentials: true });
  }

    // Thêm phương thức để lấy danh sách người dùng
    public getUsers(): Observable<User[]> {
      const token = localStorage.getItem('Authorization'); // Lấy token từ localStorage
      console.log('Token sent with request:', token); // Kiểm tra token
      return this.http.get<User[]>(`${environment.apiBaseUrl}/api/Account/users`, {
        headers: {
          'Authorization': token || '', // Gửi token trong header
        },
        withCredentials: true // Nếu cần gửi cookie
      });
    }

  public getError(): void {
    this.hubConnection.on('Error', (message: string) => {
      console.log("SignalR Error: ", message)
    })
  }
}
