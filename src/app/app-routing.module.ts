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
import { TablePageComponent } from './modules/table-page/table-page.component';
import { MarketMapComponent } from './modules/market-map/market-map.component';
import { AddPostComponent } from './modules/add-post/add-post.component';
import { AnalysisDetailComponent } from './modules/analysis-detail/analysis-detail.component';
import { ListItemsComponent } from './modules/list-items/list-items.component';


const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path:'learn',
        children: [
          {
            path:'post',
            children:[
              {
                path: 'film',
                component: AddPostComponent
              },
              {
                path: 'file',
                component: AddPostComponent
              },
              {
                path: 'article',
                component: AddPostComponent
              },
              {
                path: 'list',
                component: ListItemsComponent
              }
            ]
          }
        ]
      },
      {
        path:'news',
        children: [
          {
            path:'post',
            children: [
              {
                path: 'film',
                component: AddPostComponent
              },
              {
                path: 'article',
                component: AddPostComponent
              },
              {
                path: 'list',
                component: ListItemsComponent
              }
            ]
          }
        ]
      },
      {
        path:'analysis',
        children: [
          {
            path:'post',
            children: [
              {
                path: 'monetary',
                component: AddPostComponent
              },
              {
                path: 'free',
                component: AddPostComponent
              },
              {
                path: 'list',
                component: ListItemsComponent
              }
            ]
          }
        ]
      },
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
        children: [
          {
            path: '',
            component:AnalysisComponent
          },
          {
            path: ':name',
            component: AnalysisComponent,
            children:[
              {
                path: ':id',
                component:AnalysisDetailComponent
              }
            ]
          }
        ]
      },{
        path:'learn',
        children:[
          {
            path: '',
            component: NewsComponent
          },
          {
            path:'film',
            component: NewsComponent,
            children: [
              {
                path: ':id',
                component: LearnComponent
              }
            ]
          },{
            path:'article',
            component: NewsComponent,
            children: [
              {
                path:':id',
                component: LearnComponent
              }
            ]
          }
        ]
      },{
        path:'contact',
        component: ContactComponent
      },{
        path: 'register',
        component: RegisterComponent
      },{
        path: 'marketmap',
        component: MarketMapComponent
      },{
        path: 'indexes',
        component: TablePageComponent
      },{
        path: 'stock',
        component: TablePageComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
