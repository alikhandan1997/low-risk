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
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';

import { FlexLayoutModule } from '@angular/flex-layout';
import { HighchartsChartModule } from 'highcharts-angular';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { NewsComponent } from './news/news.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LearnComponent } from './learn/learn.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { ContactComponent } from './contact/contact.component';
import { DetailsComponent } from './details/details.component';
import { RegisterComponent } from './register/register.component';
import { TablePageComponent } from './table-page/table-page.component';
import { MarketMapComponent } from './market-map/market-map.component';
import { AddPostComponent } from './add-post/add-post.component';
import { AnalysisDetailComponent } from './analysis-detail/analysis-detail.component';
import { ListItemsComponent } from './list-items/list-items.component';
import { DialogComponent } from './list-items/dialog/dialog.component';






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
    RegisterComponent,
    TablePageComponent,
    MarketMapComponent,
    AddPostComponent,
    AnalysisDetailComponent,
    ListItemsComponent,
    DialogComponent
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
    HttpClientModule,
    MatIconModule,
    MatPaginatorModule,
    HighchartsChartModule,
    MatTabsModule,
    CKEditorModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule
  ]
})
export class PagesModule { }
