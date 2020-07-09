import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewsComponent implements OnInit {

  constructor(private http: ServicesService) { }

  mainNews: boolean = true;
  isFilm: boolean = false;
  isArticle: boolean = false;
  isNews: boolean = false;
  isLearn: boolean = false;
  apiData: string = '';

  newsData = [];

  ngOnInit(): void {

    if(window.location.href.split('/')[4] == 'film' && window.location.href.split('/').length == 5) {
      this.isFilm = true;
    } else if(window.location.href.split('/')[4] == 'article' && window.location.href.split('/').length == 5){
      this.isArticle = true;
    } else if(window.location.href.split('/')[3] == 'news' && window.location.href.split('/').length == 4){
      this.isNews = true;
    } else if(window.location.href.split('/')[3] == 'learn' && window.location.href.split('/').length == 4){
      this.isLearn = true;
    }

    if(window.location.href.split('/').length == 6){
      this.mainNews = false;
    }

    this.getData();
  }

  getData() {
    if(this.isNews){
      console.log("isnews");
      this.apiData = "?page_size=4&last"
      this.http.getNews(this.apiData).subscribe((data) => {
        console.log(data);
        this.newsData = data['result']['results']
      });
    }
    if(this.isArticle){
      console.log("isArticle");
      this.http.getEducations(this.apiData).subscribe((data) => {
        console.log(data);
      });
    } else if(this.isFilm){
      console.log("isFilm");
      this.http.getEducations(this.apiData).subscribe((data) => {
        console.log(data);
      });
    }

  }

}
