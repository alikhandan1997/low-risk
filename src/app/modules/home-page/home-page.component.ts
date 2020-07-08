import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { ThrowStmt } from '@angular/compiler';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  apiData: string = '';

  mainNews = [];
  subNews = [];

  mainLearn = [];
  subLearn = [];

  analysis = [];
  videoList = [];

  constructor(private http: ServicesService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    // getting main news
    this.apiData = "?page_size=1&last";
    this.http.getNews(this.apiData).subscribe(data => {
      console.log(data);
      this.mainNews = data['result']['results'];
    });

    // getting sub news
    this.apiData = "?page_size=6&last";
    this.http.getNews(this.apiData).subscribe(data => {
      for(let i=1; i<data['result']['results'].length; i++){
        this.subNews.push(data['result']['results'][i])
      }
    });

    // getting main education
    this.apiData = "?page_size=1&last";
    this.http.getEducations(this.apiData).subscribe(data => {
      this.mainLearn = data['result']['results'];
    });

    // getting sub news
    this.apiData = "?page_size=6&last";
    this.http.getEducations(this.apiData).subscribe(data => {
      for(let i=1; i<data['result']['results'].length; i++){
        this.subLearn.push(data['result']['results'][i])
      }
    });

    this.apiData = "?page_size=4&last";
    this.http.getAnalysis(this.apiData).subscribe(data => {
      this.analysis = data['result']['results'];
    });
  }

}
