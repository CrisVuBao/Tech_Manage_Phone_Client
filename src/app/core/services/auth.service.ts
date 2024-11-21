import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginRequest } from "../../shared/models/login/login-request.model";
import { Observable } from "rxjs";
import { LoginResponse } from "../../shared/models/login/login-response.model";
import { environment } from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {

  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/Account/Login`, {
      email: request.email,
      password: request.password
    });
  }
}
