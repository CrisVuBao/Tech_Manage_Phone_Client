import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./core/components/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "./core/components/sidebar/sidebar.component";
import { FooterComponent } from "./core/components/footer/footer.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, NavbarComponent, SidebarComponent, FooterComponent]
})
export class AppComponent {
  title = 'TodoFlowerClient';

}
