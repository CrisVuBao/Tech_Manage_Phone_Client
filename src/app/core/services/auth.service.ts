// file auth.service.ts
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginRequest } from "../../shared/models/login/login-request.model";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { LoginResponse } from "../../shared/models/login/login-response.model";
import { environment } from "../../../environments/environment.development";
import { User } from "../../shared/models/user.model";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient, private cookieService: CookieService) {
    const user = this.getUser(); // Lấy thông tin người dùng từ localStorage
    this.$user.next(user); // Cập nhật BehaviorSubject ngay khi ứng dụng khởi tạo
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/Account/Login`, {
      id: request.id,
      email: request.email,
      password: request.password
    }).pipe(
      tap((response: LoginResponse) => {
      // Giả sử response chứa token
      if(response.token) {
        this.cookieService.set('Authorization', `Bearer ${response.token}`, undefined, '/');
        localStorage.setItem('Authorization', `Bearer ${response.token}`); // Lưu token vào localStorage
      }
      })
    );
  }

  setUser(user: User): void {
    if (!user || !user.id || !user.email) {
      console.error('Invalid user object:', user);
      return;
    }
    console.log('User set:', user); // Thêm log để kiểm tra
    this.$user.next(user);
    localStorage.setItem('id', user.id.toString())
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));
    localStorage.setItem('user-fullName', user.fullName);
  }

  user(): Observable<User | undefined> {
    console.log('Current user in $user:', this.$user.getValue()); // Kiểm tra giá trị trong BehaviorSubject
    return this.$user.asObservable();
  }

  getUser(): User | undefined {
    const id = localStorage.getItem('id');
    const fullName = localStorage.getItem('user-fullName');
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');


    console.log('User from localStorage:', { id, fullName, email, roles }); // Kiểm tra dữ liệu từ localStorage

    if(email && roles) {
      const user: User = {
        id: id ? parseInt(id) : 0,
        fullName: fullName ?? 'Anonymous',
        email: email,
        roles: roles?.split(',')
      }
      return user;
    }

    return undefined
  }

  logout():void {
    localStorage.clear();
    this.cookieService.delete('Authorization','/');
    this.$user.next(undefined);
  }
}
