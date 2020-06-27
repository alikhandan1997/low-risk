import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UploadAdapter } from './UploadAdapter';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  public Editor = ClassicEditor;

  imageSrc: any = '';
  isEdit: boolean = false;

  mainTitle: string = "";
  mainImage: File = null;
  ckeditorContent: string = "";
  mainDesc: string = "";
  mainPrice: number = 0;
  mainVideo: any = null;
  mainFile: any = null;

  postData;
  postId;
  Type: string;
  postType: string;

  @ViewChild('preView') dataContainer: ElementRef;

  constructor(private http: ServicesService) { }

  ngOnInit(): void {

    if(window.location.href.split('/')[7] == 'edit'){
      this.isEdit = true;
    }

    // learn post and types
    if(window.location.href.split('/')[4] == 'learn') {
      console.log("it is learn")
      this.Type = 'learn';
      if(window.location.href.split('/')[6] == 'file'){
        console.log("learn file")
        this.postType = 'file';
      } else if(window.location.href.split('/')[6] == 'film'){
        console.log("learn film")
        this.postType = 'film';
      } else if(window.location.href.split('/')[6] == 'article') {
        console.log("learn article")
        this.postType = 'article';
      }
    // news post and types
    } else if(window.location.href.split('/')[4] == 'news'){
      console.log("it is news")
      this.Type = 'news';
      if(window.location.href.split('/')[6] == 'film'){
        console.log("news film")
        this.postType = 'film';
      } else if(window.location.href.split('/')[6] == 'article') {
        console.log("news article")
        this.postType = 'article';
      }
    // analysis post and types
    } else if(window.location.href.split('/')[4] == 'analysis') {
      console.log("it is analysis")
      this.Type = 'analysis';
      if(window.location.href.split('/')[6] == 'free'){
        console.log("analysis free")
        this.postType = 'free';
      } else if(window.location.href.split('/')[6] == 'monetary'){
        console.log("analysis monetry")
        this.postType = 'monetary';
      }
    }

    if(this.isEdit){
      console.log("is edit");
      this.postData = window.location.href.split('/')[8];
      if(this.Type == 'learn') {
        this.http.getAdminEducations(this.postData).subscribe((data) => {
          console.log(data);
        })
      } else if(this.Type == 'news') {
        this.http.getAdminNews(this.postData).subscribe((data) => {
          console.log(data);
          this.mainTitle = data['result']['title'];
          this.mainDesc = data['result']['description'];
          this.mainImage = data['result']['image'];
          this.imageSrc = data['result']['image'];
          this.ckeditorContent = data['result']['content'];
          this.postId = data['result']['id'];
        })
      }
    }

  }

  onReady(eventData) {
    console.log("ckeditor image uploader")
    eventData.plugins.get('FileRepository').createUploadAdapter = function (loader) {
      console.log(btoa(loader.file));
      return new UploadAdapter(loader);
    };
  }

  readURL(event): void {

    console.log("main image function")

    if ((<HTMLInputElement>event.target).files && (<HTMLInputElement>event.target).files[0]) {
        const file = (<HTMLInputElement>event.target).files[0];
        const reader = new FileReader();
        reader.onload = () => {
          this.imageSrc = reader.result;
          this.mainImage = <File>event.target.files[0];
          console.log(this.mainImage);
        }
        reader.readAsDataURL(file);
    }
  }

  readFile(event: Event, fileType: string): void {
    console.log(fileType ,"uploader function")

    if ((<HTMLInputElement>event.target).files && (<HTMLInputElement>event.target).files[0]) {
      const file = (<HTMLInputElement>event.target).files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if(fileType == 'video') {
          this.mainVideo = (<HTMLInputElement>event.target).files[0];
        } else if(fileType == 'file') {
          this.mainFile = (<HTMLInputElement>event.target).files[0];
        }
      }
      reader.readAsDataURL(file);
    }
  }

  loadData() {
    if(!this.isEdit){
      console.log("ckeditor filling data")
      // this.postData = {
      //   title: this.mainTitle,
      //   description: this.mainDesc,
      //   image: this.mainImage,
      //   content: this.ckeditorContent
      // }

      this.postData = new FormData();
      this.postData.append('title', this.mainTitle);
      this.postData.append('description', this.mainDesc);
      this.postData.append('image', this.mainImage);
      this.postData.append('content', this.ckeditorContent);
    }
  }

  fillData() {
    console.log("posts without ckeditor")
    if(this.Type == 'learn' && this.postType != "article") {
      this.postData = {
        title: this.mainTitle,
        image: this.mainImage,
        content: this.mainDesc,
        price: this.mainPrice,
        video: this.mainVideo,
        file: this.mainFile
      }
    } else if(this.Type == 'news' && this.postType != "article") {
      this.postData = {
        title: this.mainTitle,
        description: this.mainDesc,
        image: this.mainImage,
        content: this.ckeditorContent
      }
    }
  }

  send(){
    console.log("sending data")
    if(this.postType != "article"){
      this.fillData();
    }
    // if it is not edit do the post
    if(!this.isEdit) {
      // send to news api
      if(this.Type == 'news') {
        console.log("post news",this.postData)
        this.http.postٔNews(this.postData).subscribe((data) => {
          console.log(data);
          console.log("posting news")
        });
      // send to learn api
      } else if(this.Type == 'learn') {
        this.http.postEducation(this.postData).subscribe((data) => {
          console.log(data);
          console.log("posting education")
        });
      // send to analysis api
      } else if(this.Type == 'analysis'){}

      // if it is edit put the post
    } else if(this.isEdit){

      if(this.Type == 'news') {
        this.http.putNews(this.postData,this.postId).subscribe((data) => {
          console.log(data);
          console.log("editing news")
        });

      } else if(this.Type == 'learn') {
        this.http.putEducation(this.postData,this.postId).subscribe((data) => {
          console.log(data);
          console.log("editing education")
        });

      } else if(this.Type == 'analysis'){}
    }
  }

}
