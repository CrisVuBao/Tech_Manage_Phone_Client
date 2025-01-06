import { Component, AfterViewInit, OnInit, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../../shared/models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user?: User;
  private audio: HTMLAudioElement;
  isMusicPlaying: boolean = false;

  constructor(private authService: AuthService) {
    this.audio = new Audio('../assets/audio/world-asian-carnival-china-traditional-music-travel.mp3');
    this.audio.loop = true; // Lặp lại âm thanh
    this.audio.volume = 0.5; // Giảm âm lượng
  }

  ngOnInit(): void {
    this.authService.user().subscribe({
      next:(res) => { // next là key, (res) là value => là hàm trong value của obj
        this.user = res;
      }
    })

    this.user = this.authService.getUser();
  }

    // Lắng nghe sự kiện nhấp chuột hoặc chạm từ người dùng
  // @HostListener('document:click', ['$event'])
  // @HostListener('document:touchstart', ['$event'])
  playBackgroundMusic(): void {
    this.audio
      .play()
      .then(() => {
        this.isMusicPlaying = true; // Âm nhạc đã bật
      })
      .catch((err) => console.error('Failed to play audio:', err));
  }

  onTurnOffMusic(): void {
    this.audio.pause();
    this.isMusicPlaying = false;
  }

}
