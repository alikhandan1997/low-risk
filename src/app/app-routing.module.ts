import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './layouts/admin/admin.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { MainComponent } from './layouts/main/main.component';
import { HomePageComponent } from './modules/home-page/home-page.component';
import { NewsComponent } from './modules/news/news.component';
import { AboutUsComponent } from './modules/about-us/about-us.component';
import { AnalysisComponent } from './modules/analysis/analysis.component';
import { LearnComponent } from './modules/learn/learn.component';
import { ContactComponent } from './modules/contact/contact.component';
import { DetailsComponent } from './modules/details/details.component';
import { RegisterComponent } from './modules/register/register.component';


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
      },{
        path:'news',
        component: NewsComponent,
        children: [
          {
            path: ':id',
            component:DetailsComponent
          }
        ]
      },{
        path:'about-us',
        component: AboutUsComponent
      },{
        path:'analysis',
        component: AnalysisComponent,
      },{
        path:'learn',
        component: LearnComponent,
        children:[
          {
            path:'film',
            component: DetailsComponent
          },{
            path:'article',
            component: DetailsComponent
          }
        ]
      },{
        path:'contact',
        component: ContactComponent
      },{
        path: 'register',
        component: RegisterComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
