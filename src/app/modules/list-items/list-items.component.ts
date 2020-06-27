import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit {

  Type: string = "";
  apiData: string = "";
  listDisplay: boolean = true;

  newsData;
  educationData = [];

  constructor(private http: ServicesService) { }

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
        this.educationData.push(data['result']);
      });
    } else if (this.Type == 'news') {
      this.http.getAdminNews(this.apiData).subscribe((data) => {
        this.newsData = (data['result']);
      });
    } else if(this.Type == 'analysis'){}
  }

  deletePost(id){
    this.apiData = id
    if(this.Type == 'learn'){
      this.http.deleteEducation(this.apiData).subscribe((data) => {
        console.log(data);
        location.reload();
      });
    } else if(this.Type == 'news'){
      this.http.deleteNews(this.apiData).subscribe((data) => {
        console.log(data);
        location.reload();
      });
    } else if(this.Type == 'analysis'){}
  }
}
