import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private hubConnection!: signalR.HubConnection;
  private hubUrl = 'https://localhost:7141/chatHub';

  constructor(private http: HttpClient) {}

  public startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.hubUrl, {
        withCredentials: true // cho phép gửi cookie
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR connected'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  // Gửi tin nhắn
  public sendMessage(receiverId: number, content: string): void {
    this.hubConnection.invoke('SendMessage', receiverId, content)
      .catch(err => console.error(err));
  }

  // Lắng nghe khi server gửi tin nhắn
  public onReceiveMessage(callback: (senderId: number, content: string, sentAt: Date) => void): void {
    this.hubConnection.on('ReceiveMessage', (senderId, content, sentAt) => {
      callback(senderId, content, sentAt);
    });
  }

  // Lắng nghe xác nhận tin nhắn đã gửi
  public onMessageSentConfirmation(callback: (messageId: number) => void): void {
    this.hubConnection.on('MessageSentConfirmation', (messageId) => {
      callback(messageId);
    });
  }
}
