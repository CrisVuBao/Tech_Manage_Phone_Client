import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MemberListComponent } from './features/member/member-list/member-list.component';
import { NgModule } from '@angular/core';
import { EditMemberComponent } from './features/member/edit-member/edit-member.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RepairComponent } from './pages/repair/repair.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'sua-chua',
        component: RepairComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}