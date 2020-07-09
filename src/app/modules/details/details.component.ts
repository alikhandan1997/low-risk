import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailsComponent implements OnInit {

  Type: string;
  data = "";
  postId: string;
  apiData = '';

  Post = [];
  otherPost = [];
  otherPostList = [];

  constructor(private http: ServicesService) { }

  ngOnInit(): void {
    // check if is news
    if(window.location.href.split('/')[3] == 'news') {
      this.Type = 'news';
      this.postId = window.location.href.split('/')[5];
    }
    console.log(this.postId)

    this.getData();
  }

  getData(){
    if(this.Type == 'news'){

      // =================================================================

      this.http.getNews(this.postId).subscribe((data) => {
        console.log(data);
        this.Post.push(data['result']);
      });

      // =================================================================

      this.apiData = '?page_size=3&last';
      this.http.getNews(this.apiData).subscribe((data) => {
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

      // =================================================================

      this.apiData = "?page_size=6&last";
      this.http.getNews(this.apiData).subscribe((data) => {
        this.otherPostList = data['result']['results'];
        for(let i=0; i<this.otherPostList.length; i++) {
          if(this.otherPostList[i]['id'] == this.postId) {
            this.otherPostList.splice(i, 1);
          }
        }
        if(this.otherPostList.length == 6) {
          this.otherPostList.pop();
        }
        console.log(this.otherPostList)
      });
    }
  }

}
