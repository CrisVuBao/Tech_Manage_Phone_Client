import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginRequest } from "../../shared/models/login/login-request.model";
import { BehaviorSubject, Observable } from "rxjs";
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

  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/Account/Login`, {
      email: request.email,
      password: request.password
    });
  }

  setUser(user: User): void {
    this.$user.next(user);
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));
    localStorage.setItem('user-fullName', user.fullName);
  }

  user(): Observable<User | undefined> {
    return this.$user.asObservable();
  }

  getUser(): User | undefined {
    const fullName = localStorage.getItem('user-fullName');
    const email = localStorage.getItem('user-roles');
    const roles = localStorage.getItem('user-roles');

    if(email && roles) {
      const user: User = {
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
