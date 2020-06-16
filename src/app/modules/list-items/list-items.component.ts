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

  constructor(private http: ServicesService) { }

  ngOnInit(): void {

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
      this.http.getEducations(this.apiData).subscribe((data) => {
        console.log(data);
      });
    } else if (this.Type == 'news') {
      this.http.getNews(this.apiData).subscribe((data) => {
        console.log(data);
      });
    } else if(this.Type == 'analysis'){}
  }

}
