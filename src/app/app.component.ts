import { Component, OnInit } from '@angular/core';
import { ServicesService } from './modules/services/services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  apiData = '';

  constructor(private http: ServicesService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.http.getAdminNews(this.apiData).subscribe((data) => {
    },
    (error) => {
      if(error['status'] == 401) {
        localStorage.clear();
      }
    })
  }
}
