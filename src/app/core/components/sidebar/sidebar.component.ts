import { Component, AfterViewInit, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.user().subscribe({
      next:(res) => { // next là key, (res) là value => là hàm trong value của obj
        this.user = res;
      }
    })

    this.user = this.authService.getUser();
  }
}
