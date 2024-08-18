import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Todo } from "../models/todo.model";
import { environment } from "../../../../environments/environment.development";
import { Observable } from "rxjs";

@Injectable(
    {
        providedIn: 'root'
    }
)

export class TodoService {

    constructor(private http: HttpClient) {

    }

    addTodoWithMember(memberId: number, todo: Todo ): Observable<Todo> {
        return this.http.post<Todo>(`${environment.apiBaseUrl}/api/AddTodoWithMember/${memberId}`, todo);
    }

    getAllTodoWithMemberId(memberId: number): Observable<Todo[]> {
        return this.http.get<Todo[]>(`${environment.apiBaseUrl}/api/GetAllTodoWithMemberId/${memberId}`);
    }
}