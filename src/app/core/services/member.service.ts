import { Injectable } from '@angular/core';
import { MemberRequest } from '../../shared/models/add-member-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Member } from '../../shared/models/member.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }

  addMember(model: MemberRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/AddMember`, model)
  }

  getAllMember(): Observable<Member[]> {
    return this.http.get<Member[]>(`${environment.apiBaseUrl}/api/getAllMembers`)
  }

  deleteMember(id: string): Observable<Member> {
    return this.http.delete<Member>(`${environment.apiBaseUrl}/api/DeleteMember/${id}`)
  }
}
