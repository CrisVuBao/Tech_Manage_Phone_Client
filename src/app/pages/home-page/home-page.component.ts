import { Component } from '@angular/core';
import { SidebarComponent } from "../../core/components/sidebar/sidebar.component";

@Component({
    selector: 'app-home-page',
    standalone: true,
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css',
    imports: [ SidebarComponent]
})
export class HomePageComponent {

}
