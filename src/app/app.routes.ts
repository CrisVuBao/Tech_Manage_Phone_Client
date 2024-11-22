import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RepairComponent } from './pages/repair/repair.component';
import { EditRepairComponent } from './features/repair-feature/edit-repair/edit-repair.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { CustomerPageComponent } from './pages/customer-page/customer-page.component';

export const routes: Routes = [

    // AppAdmin Route
    {
      path: '',
      component: DashboardLayoutComponent,
      children: [
        {
          path: '',
          redirectTo: '/trang-chu-khach-hang',
          pathMatch: 'full'
        },
        {
          path: 'admin/home',
          loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule)
        },
        {
          path: 'admin/home',
          component: HomePageComponent
        },
        {
          path: 'admin/sua-chua',
          component: RepairComponent
        },
        {
          path: 'trang-chu-khach-hang',
          component: CustomerPageComponent
        }
      ]
    },

    // Authen Route
    {
      path: '',
      component: AuthLayoutComponent,
      children: [
        {
          path: '',
          redirectTo: '/login-form',
          pathMatch: 'full'
        },
        {
          path: 'login',
          loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
        },
        {
          path: 'register',
          component: RegisterComponent
        }
      ]
    },


    // {
    //     path: '',
    //     component: HomePageComponent
    // },

    // {
    //     path: 'sua-chua/sua-phieu/:id',
    //     component: EditRepairComponent
    // },
    { path: '**', redirectTo: '', pathMatch: 'full' } // Redirect các route không xác định về trang chính
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
