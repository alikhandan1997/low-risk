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

    this.getData();
  }

  getData() {
    if(this.Type == 'learn') {
      this.http.getAdminEducations(this.apiData).subscribe((data) => {
        console.log(data);
        this.editData = (data['result']['results']);
      });

    } else if (this.Type == 'news') {
      this.http.getAdminNews(this.apiData).subscribe((data) => {
        this.editData = (data['result']['results']);
      });

    } else if(this.Type == 'analysis'){
      this.http.getAdminAnalysis(this.apiData).subscribe((data) => {
        console.log(data)
        this.editData = (data['result']['results']);
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
