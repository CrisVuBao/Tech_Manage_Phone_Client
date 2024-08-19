import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CommonModule, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { AppRoutingModule } from './app.routes';
import { RouterLink, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RepairComponent } from './pages/repair/repair.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomePageComponent,
        RepairComponent
    ],
    imports: [
        NgModule,
        FormsModule,
        CommonModule,
        HttpClientModule,
        AppRoutingModule,
        RouterLink,
        RouterModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }