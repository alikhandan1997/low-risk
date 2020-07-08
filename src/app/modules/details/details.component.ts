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
  Post = [];
  data = "";
  // mainImage: string;
  // postTitle: string;
  // postLittleDescription: string;
  // postContent: string;
  postId: string;

  constructor(private http: ServicesService) { }

  ngOnInit(): void {
    // check if is news
    if(window.location.href.split('/')[3] == 'news') {
      this.Type = 'news';
      this.postId = window.location.href.split('/')[4];
    }
    console.log(this.postId)

    this.getData();
  }

  getData(){
    if(this.Type == 'news'){
      this.http.getNews(this.postId).subscribe((data) => {
        console.log(data);
        this.Post.push(data['result']);
        console.log(this.Post)
        // this.mainImage = data['result']['image'];
        // this.postTitle = data['result']['title'];
        // this.postLittleDescription = data['result']['description'];
        // this.postContent = data['result']['content'];
      });
    }
  }

}
