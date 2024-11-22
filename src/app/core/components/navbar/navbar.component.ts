import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  user?: User

  constructor(private authService: AuthService, private route: Router) {

  }

  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (res => {
        this.user = res;
      })
    });

    this.user = this.authService.getUser();
  }

  onLogout(): void {
    this.authService.logout();
    this.route.navigateByUrl('/');
  }
}
