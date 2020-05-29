import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  constructor() { }

  mainNews: boolean = true;
  isFilm: boolean = false;
  isArticle: boolean = false;
  isNews: boolean = false;

  ngOnInit(): void {

    if(window.location.href.split('/')[4] == 'film') {
      this.isFilm = true;
    } else if(window.location.href.split('/')[4] == 'article'){
      this.isArticle = true;
    } else if(window.location.href.split('/')[3] == 'news' && window.location.href.split('/').length == 4){
      this.isNews = true;
    }
    if(window.location.href.split('/').length == 6){
      this.mainNews = false;
    }

    console.log(window.location.href.split('/')[3], this.isFilm)
  }

}
