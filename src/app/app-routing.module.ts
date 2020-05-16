import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './layouts/admin/admin.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { MainComponent } from './layouts/main/main.component';
import { HomePageComponent } from './modules/home-page/home-page.component';


const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      }
    ]
  },{
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomePageComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
