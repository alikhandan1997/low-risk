import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  constructor() { }

  mainNews: boolean = true;

  ngOnInit(): void {
    console.log(window.location.href.split('/').length)
    if(window.location.href.split('/').length == 5) {
      this.mainNews = false;
    }
  }

}
