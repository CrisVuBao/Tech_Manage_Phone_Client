import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddMemberComponent } from "./features/member/add-member/add-member.component";
import { NavbarComponent } from "./core/components/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { MemberListComponent } from "./features/member/member-list/member-list.component";
import { MemberService } from './features/member/services/member.service';
import { SidebarComponent } from "./core/components/sidebar/sidebar.component";
import { FooterComponent } from "./core/components/footer/footer.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, AddMemberComponent, NavbarComponent, MemberListComponent, SidebarComponent, FooterComponent]
})
export class AppComponent {
  title = 'TodoFlowerClient';

}
