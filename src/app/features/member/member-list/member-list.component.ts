import { Component, OnInit } from '@angular/core';
import { Member } from '../models/member.model';
import { MemberService } from '../services/member.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { forkJoin, Observable, switchMap } from 'rxjs';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-member-list',
  standalone: true,
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css',
  imports: [CommonModule, RouterLink, RouterOutlet, FormsModule]
})
export class MemberListComponent implements OnInit {

  id: string | null = null;
  member$?: Observable<Member[]>;
  todoBaoBeo$?: Observable<Todo[]>;
  todoDibeo$?: Observable<Todo[]>;
  memberTodoTasks$?: Observable<{[key: number]: Todo[]}>;
  selectedMemberId: number | null = null;
  todoTask: string = '';

  constructor(private memberService: MemberService, private router: Router, private todoService: TodoService) {

  }

  ngOnInit(): void {
    this.member$ = this.memberService.getAllMember();
    this.todoBaoBeo$ = this.todoService.getAllTodoWithMemberId(1);
    this.todoDibeo$ = this.todoService.getAllTodoWithMemberId(68);
  }

  openTodoForm(memberId: number) {
    this.selectedMemberId = memberId;
  }

  submitTodo() {
    const todo: Todo = {todoId: 0 ,todoName: this.todoTask, memberId: this.selectedMemberId!, createAt: new Date()};
    this.todoService.addTodoWithMember(this.selectedMemberId!, todo).subscribe();
    this.todoTask = '';
    this.selectedMemberId = null;
    alert("Thêm thành công");
    console.log("ok");
    window.location.reload();
  }

  loadTodosWithMember() {
    this.memberService.getAllMember().subscribe(member => {
    })
  }

  onDeleteMember(): void {
    if(this.id) {
      this.memberService.deleteMember(this.id)
      .subscribe({
        next: (res) => {
          this.router.navigateByUrl('');
          console.log("đã xóa");
          
        }
      })
    }
  }

}
