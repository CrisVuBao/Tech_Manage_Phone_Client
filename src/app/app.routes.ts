import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RepairComponent } from './pages/repair/repair.component';
import { EditRepairComponent } from './features/repair-feature/edit-repair/edit-repair.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'sua-chua',
        component: RepairComponent
    },
    {
        path: 'sua-chua/sua-phieu/:id',
        component: EditRepairComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}