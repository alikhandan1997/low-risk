import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from '../modules/dashboard/dashboard.component';
import { HomePageComponent } from '../modules/home-page/home-page.component';


@NgModule({
  declarations: [
    AdminComponent,
    MainComponent,
    DashboardComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LayoutsModule { }
