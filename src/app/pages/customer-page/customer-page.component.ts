import { Component } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { Repair } from '../../shared/models/repair.model';
import { HttpClient } from '@angular/common/http';
import { RepairService } from '../../core/services/repair.service';
import { ChatService } from '../../core/services/chat.service';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrl: './customer-page.component.css',
})
export class CustomerPageComponent {

  repair$?: Observable<Repair[]>;
  phoneNumber: string = '';
  hasSearched: boolean = false;
  isChatOpen: boolean = false; // Kiểm tra trạng thái khung chat (mở/đóng)
  messages: { content: string; type: 'sent' | 'received' }[] = [
    { content: 'Xin chào! Bạn cần hỗ trợ gì?', type: 'received' },
    { content: 'Tôi muốn hỏi về đơn hàng.', type: 'sent' },
    { content: 'Vâng, vui lòng cung cấp mã đơn hàng.', type: 'received' },
  ];
  newMessage: string = '';

  constructor(private http: HttpClient,
    private repairService: RepairService,
  ) {}

  searchRepair(): void {
    if(!this.phoneNumber) {
      alert('Vui lòng nhập số điện thoại');
      return;
    }

    this.repair$ = this.repairService.getRepairByNumberPhone(this.phoneNumber);
  }

    // Toggle trạng thái mở/đóng khung chat
    toggleChat(): void {
      this.isChatOpen = !this.isChatOpen;
    }

    // Hàm gửi tin nhắn
    sendMessage(): void {
      if (this.newMessage.trim()) {
        this.messages.push({ content: this.newMessage, type: 'sent' });
        this.newMessage = '';
        this.scrollToBottom();
      }
    }

    // Cuộn xuống cuối khung chat
    scrollToBottom(): void {
      setTimeout(() => {
        const chatBody = document.querySelector('.chat-body');
        if (chatBody) {
          chatBody.scrollTop = chatBody.scrollHeight;
        }
      }, 100);
    }

}
