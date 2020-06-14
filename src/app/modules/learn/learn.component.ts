import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit {

  isFilm: boolean = false;
  isArticle: boolean = false;
  isDetail: boolean = false;
  apiData: string = '';

  constructor(
    private sanitizer: DomSanitizer,
    private http: ServicesService) { }

  ngOnInit(): void {

    if (window.location.href.split('/').length == 6 ) {
      this.isDetail = true;
    }
    if(window.location.href.split('/')[4] == "article") {
      this.isArticle = true;
    } else if(window.location.href.split('/')[4] == "film") {
      this.isFilm = true;
    }

    this.getData();
  }

  getEmbedUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl('assets/video.mp4');
  }

  getData() {
    if(this.isFilm) {
      this.http.getEducations(this.apiData).subscribe((data) => {
        console.log(data);
      });
    } else if(this.isArticle){
      this.http.getEducations(this.apiData).subscribe((data) => {
        console.log(data);
      });
    }
  }

}
