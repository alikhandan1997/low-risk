import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { DialogComponent } from './dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit {

  Type: string = "";
  apiData: string = "";
  listDisplay: boolean = true;

  editData = [];
  empty: boolean = false;

  pageNumber = 1;
  pageSize;

  constructor(
    private http: ServicesService,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    if(window.location.href.split('/')[7] == 'edit') {
      this.listDisplay = false;
    }

    if(window.location.href.split('/')[4] == 'learn') {
      this.Type = 'learn';
    } else if(window.location.href.split('/')[4] == 'news') {
      this.Type = 'news';
    } else if(window.location.href.split('/')[4] == 'analysis') {
      this.Type = 'analysis';
    }

    this.getData(this.pageNumber);
  }

  getData(pageNumber) {

    this.pageNumber = pageNumber;
    if(pageNumber < 1) {
      this.pageNumber = 1;
    }
    if(pageNumber >= 2){
      if(pageNumber >= this.pageSize.length) {
        this.pageNumber = this.pageSize.length;
      }
    }

    if(this.Type == 'learn') {
      this.apiData = `?page=${this.pageNumber}&page_size=8&last`
      this.http.getAdminEducations(this.apiData).subscribe((data) => {
        this.editData = (data['result']['results']);
        if(this.editData.length == 0) {
          this.empty = true;
        }
        let numb = data['result']['count'];
        numb = numb / 8;
        this.pageSize = Array(Math.ceil(numb)).fill(1).map((x, i) => i + 1);
      });

    } else if (this.Type == 'news') {
      this.apiData = `?page=${this.pageNumber}&page_size=8&last`
      this.http.getAdminNews(this.apiData).subscribe((data) => {
        this.editData = data['result']['results'];
        if(this.editData.length == 0) {
          this.empty = true;
        }
        let numb = data['result']['count'];
        numb = numb / 8;
        this.pageSize = Array(Math.ceil(numb)).fill(1).map((x, i) => i + 1);
      });

    } else if(this.Type == 'analysis'){
      this.apiData = `?page=${this.pageNumber}&page_size=8&last`
      this.http.getAdminAnalysis(this.apiData).subscribe((data) => {
        this.editData = (data['result']['results']);
        if(this.editData.length == 0) {
          this.empty = true;
        }
        let numb = data['result']['count'];
        numb = numb / 8;
        this.pageSize = Array(Math.ceil(numb)).fill(1).map((x, i) => i + 1);
      });

    }
  }

  deletePost(item){
    const dialogRef = this.dialog.open(DialogComponent, {
      data:{
        data: item,
        type: this.Type
      },
      width: '350px',
      height: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
