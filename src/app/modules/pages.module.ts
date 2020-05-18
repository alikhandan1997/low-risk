import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DashboardComponent } from '../modules/dashboard/dashboard.component';
import { HomePageComponent } from '../modules/home-page/home-page.component';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar'

import { FlexLayoutModule } from '@angular/flex-layout';
import { NewsComponent } from './news/news.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LearnComponent } from './learn/learn.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { ContactComponent } from './contact/contact.component';
import { DetailsComponent } from './details/details.component';
import { RegisterComponent } from './register/register.component';






@NgModule({
  declarations: [
    DashboardComponent,
    HomePageComponent,
    NewsComponent,
    AboutUsComponent,
    LearnComponent,
    AnalysisComponent,
    ContactComponent,
    DetailsComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule,
    MatTableModule,
    MatListModule,
    MatDividerModule,
    RouterModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    HttpClientModule
  ]
})
export class PagesModule { }
