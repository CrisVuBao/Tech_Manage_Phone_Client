import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CommonModule, NgFor } from '@angular/common';
import { MemberListComponent } from './features/member/member-list/member-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AddMemberComponent } from './features/member/add-member/add-member.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { AppRoutingModule } from './app.routes';
import { RouterLink, RouterModule } from '@angular/router';
import { EditMemberComponent } from './features/member/edit-member/edit-member.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

@NgModule({
    declarations: [
        AppComponent,
        MemberListComponent,
        AddMemberComponent,
        NavbarComponent,
        EditMemberComponent,
        HomePageComponent
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