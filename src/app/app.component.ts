import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./core/components/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "./core/components/sidebar/sidebar.component";
import { FooterComponent } from "./core/components/footer/footer.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  isLoading = false;
  progressValue = 0;

  constructor() {

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

}
