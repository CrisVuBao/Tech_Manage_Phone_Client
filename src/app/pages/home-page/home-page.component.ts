import { Component } from '@angular/core';
import { AddMemberComponent } from "../../features/member/add-member/add-member.component";
import { MemberListComponent } from "../../features/member/member-list/member-list.component";
import { SidebarComponent } from "../../core/components/sidebar/sidebar.component";

@Component({
    selector: 'app-home-page',
    standalone: true,
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css',
    imports: [AddMemberComponent, MemberListComponent, SidebarComponent]
})
export class HomePageComponent {

}
