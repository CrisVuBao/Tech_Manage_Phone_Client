import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MemberRequest } from '../models/add-member-request.model';
import { MemberService } from '../services/member.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-member',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-member.component.html',
  styleUrl: './add-member.component.css'
})
export class AddMemberComponent implements OnDestroy{

  model: MemberRequest;
  private addMemberSubscribtion?: Subscription;

  constructor(private memberService: MemberService, private router: Router) {
    this.model = {
      name: '',
      email: ''

    };
  }


  onFormSubmit() {
    this.addMemberSubscribtion = this.memberService.addMember(this.model)
    .subscribe({
      next: (res) => {
        window.location.reload();
        // this.router.navigateByUrl('/list-member');
        console.log("add success!");
      }
    })
  }

  isCollapsed = false; // Trạng thái của Collapse

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed; // Đảo ngược trạng thái
  }

  closeCollapse() {
    this.isCollapsed = false; // Đặt trạng thái là đóng
  }

  ngOnDestroy(): void {
    this.addMemberSubscribtion?.unsubscribe;
    console.log("đã hủy đăng ký");
    
  }
}
