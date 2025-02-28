import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./core/components/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "./core/components/sidebar/sidebar.component";
import { FooterComponent } from "./core/components/footer/footer.component";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  isLoading = false;
  progressValue = 0;
  petals = Array.from({ length: 50 }); // Tạo 50 cánh hoa
  private audio: HTMLAudioElement;
  private isAudioStarted: boolean = false;

  constructor(private spinner: NgxSpinnerService) {
    this.audio = new Audio('../assets/audio/world-asian-carnival-china-traditional-music-travel.mp3');
    this.audio.loop = true; // Lặp lại âm thanh
    this.audio.volume = 0.5; // Giảm âm lượng
  }

  ngOnInit():void {
    this.isLoading = true;
    this.progressValue = 100;

    const interval = setInterval(() => {
      this.progressValue += 10; // Tăng giá trị mỗi lần
      if (this.progressValue >= 100) {
        clearInterval(interval); // Dừng setInterval khi đạt 100
        this.isLoading = false;  // Tắt thanh tiến trình
      }
    }, 100);
  }

  // Lắng nghe sự kiện nhấp chuột hoặc chạm từ người dùng
  // @HostListener('document:click', ['$event'])
  // @HostListener('document:touchstart', ['$event'])
  // handleUserInteraction(): void {
  //   if (!this.isAudioStarted) {
  //     this.audio
  //       .play()
  //       .then(() => {
  //         this.isAudioStarted = true; // Đánh dấu đã bật nhạc
  //       })
  //       .catch((err) => console.error('Failed to play audio:', err));
  //   }
  // }

}
