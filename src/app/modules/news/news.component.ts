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
  learnArticle = [];
  learnFilm = [];

  learnArticleList = [];
  learnFilmList = [];

  pageNumber = 1;
  pageSize = [];

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


    if(this.isLearn) {
      this.apiData = `?page_size=4&last`;
      this.http.getEducations(this.apiData).subscribe((data) => {
        this.learnArticle = data['result']['results'];
      });

      this.apiData = `?category=2&page_size=4&last`;
      this.http.getEducations(this.apiData).subscribe((data) => {
        this.learnFilm = data['result']['results'];
      });
    }

    if(this.isNews){
      this.apiData = `?page=${this.pageNumber}&page_size=8&last`;
      this.http.getNews(this.apiData).subscribe((data) => {
        this.newsData = data['result']['results'];
        let numb = data['result']['count'];
        numb = numb / 8;
        this.pageSize = Array(Math.ceil(numb)).fill(1).map((x, i) => i + 1);
      });
    }
    if(this.isArticle){
      this.apiData = `?page=${this.pageNumber}&category=1&page_size=8&last`;
      this.http.getEducations(this.apiData).subscribe((data) => {
        this.learnArticleList = data['result']['results'];
        let numb = data['result']['count'];
        numb = numb / 8;
        this.pageSize = Array(Math.ceil(numb)).fill(1).map((x, i) => i + 1);
      });
    } else if(this.isFilm){
      this.apiData = `?page=${this.pageNumber}&category=2&page_size=8&last`;
      this.http.getEducations(this.apiData).subscribe((data) => {
        this.learnFilmList = data['result']['results'];
        let numb = data['result']['count'];
        numb = numb / 8;
        this.pageSize = Array(Math.ceil(numb)).fill(1).map((x, i) => i + 1);
      });
    }

  }

}
