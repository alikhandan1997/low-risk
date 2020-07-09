import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LearnComponent implements OnInit {

  isFilm: boolean = false;
  isArticle: boolean = false;
  isDetail: boolean = false;
  postId;
  apiData = '';
  Post = [];
  otherPost = [];
  otherPostList = [];

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
    this.postId = window.location.href.split('/')[5];

    this.getData();
  }

  getEmbedUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl('assets/video.mp4');
  }

  getData() {
    this.http.getEducations(this.postId).subscribe((data) => {
      this.Post.push(data['result']);
    });


    this.apiData = '?page_size=3&last';
    this.http.getEducations(this.apiData).subscribe((data) => {
      console.log(data);
      this.otherPost = data['result']['results'];
      for(let i=0; i<this.otherPost.length; i++) {
        if(this.otherPost[i]['id'] == this.postId) {
          this.otherPost.splice(i, 1);
        }
      }
      if(this.otherPost.length == 3) {
        this.otherPost.pop();
      }
    });

    this.apiData = '?page_size=6&last';
    this.http.getEducations(this.apiData).subscribe((data) => {
      console.log(data);
      this.otherPostList = data['result']['results'];
      for(let i=0; i<this.otherPostList.length; i++) {
        if(this.otherPostList[i]['id'] == this.postId) {
          this.otherPostList.splice(i, 1);
        }
      }
      if(this.otherPostList.length == 6) {
        this.otherPostList.pop();
      }
    });
  }

}
