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

       // Set User
       this.authService.setUser({
          fullName: res.fullName,
          email: res.email,
          roles: res.roles
       });

      // Điều hướng dựa trên vai trò
      if (res.roles.includes('Admin')) {
        this.router.navigate(['/admin/home']);
      } else if (res.roles.includes('Member')) {
        this.router.navigate(['/trang-chu-khach-hang']);
      } else {
        this.router.navigate(['/login']); // Quay lại trang đăng nhập nếu vai trò không xác định
      }
        // Redirect back to Page
        this.router.navigateByUrl('/');
      },
    })


  }
}
