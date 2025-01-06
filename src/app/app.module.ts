import {  CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CommonModule, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { AppRoutingModule } from './app.routes';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RepairComponent } from './pages/repair/repair.component';
import { AddRepairComponent } from './features/repair-feature/add-repair/add-repair.component';
import { PipeStatus } from './core/pipes/pipe-status/pipe-status.component';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';
import { EditRepairComponent } from './features/repair-feature/edit-repair/edit-repair.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { AuthModule } from './pages/auth/auth.module';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { CustomerPageComponent } from './pages/customer-page/customer-page.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatProgressBarModule} from '@angular/material/progress-bar'
import { HomePageModule } from './pages/home-page/home-page.module';
import { CustomerManageComponent } from './pages/manage-pages/customer-manage/customer-manage.component';
import { RepairDetailComponent } from './pages/repair-detail/repair-detail.component';
import { ImageSelectorComponent } from './core/components/image-selector/image-selector.component';
import { ChatComponent } from './core/components/chat/chat.component';
import { FlowerComponent } from './core/components/flower/flower.component';


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomePageComponent,
        RepairComponent,
        AddRepairComponent,
        EditRepairComponent,
        PipeStatus,
        SidebarComponent,
        AuthLayoutComponent,
        DashboardLayoutComponent,
        CustomerPageComponent,
        CustomerManageComponent,
        RepairDetailComponent,
        ImageSelectorComponent,
        ChatComponent,
        FlowerComponent

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        CommonModule,
        HttpClientModule,
        AuthModule,
        RouterModule.forRoot([]),
        HomePageModule,
        LoadingBarRouterModule,
        LoadingBarModule,
        MatProgressBarModule,
    ],
    providers: [PipeStatus, provideAnimationsAsync()],
    bootstrap: [AppComponent]
})
export class AppModule { }
