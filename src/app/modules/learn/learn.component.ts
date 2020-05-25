import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit {

  isFilm: boolean = false;
  isArticle: boolean = false;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if(window.location.href.split('/')[4] == 'film') {
      this.isFilm = true;
      console.log(this.isFilm);
    } else if(window.location.href.split('/')[4] == 'article') {
      this.isArticle = true;
      console.log(this.isArticle);
    }
  }

  getEmbedUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl('assets/video.mp4');
  }

}
