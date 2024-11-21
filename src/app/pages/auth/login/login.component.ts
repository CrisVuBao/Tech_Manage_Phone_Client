import { Component } from '@angular/core';
import { LoginRequest } from '../../../shared/models/login/login-request.model';
import { AuthService } from '../../../core/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  model: LoginRequest;

  constructor(private authService: AuthService, private cookieService: CookieService, private router: Router) {
    this.model = {
      email: '',
      password: ''
    }
  }

  onFormSubmit() {
    this.authService.login(this.model).subscribe({
      next: (res) => {
        // Set Auth Cookie
        this.cookieService.set('Authorization', `Bearer ${res.token}`,
        undefined,'/', undefined, true, 'Strict');

        // Redirect back to Page
        this.router.navigateByUrl('/');
      }
    })
  }
}
