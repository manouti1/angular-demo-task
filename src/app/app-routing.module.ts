import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./components/home/dashboard/dashboard.module').then((m) => m.DashboardModule),
    data: { title: 'Home' }
  },
  {
    path: 'users',
    loadChildren: () => import('./components/users/users/users.module').then((m) => m.UsersModule),
    data: { title: 'Users' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
