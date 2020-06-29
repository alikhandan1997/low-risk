import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UploadAdapter } from './UploadAdapter';
import { ServicesService } from '../services/services.service';

import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  formArticle: FormGroup;
  formFile: FormGroup;

  public Editor = ClassicEditor;

  imageSrc: any = '';
  isEdit: boolean = false;

  mainTitle: string = "";
  mainImage: File = null;
  ckeditorContent: string = "";
  mainDesc: string = "";
  mainPrice: number = 0;
  mainVideo: File = null;
  mainFile: File = null;

  postData;
  postId;
  Type: string;
  postType: string;

  @ViewChild('preView') dataContainer: ElementRef;

  constructor(
    private http: ServicesService,
    public fb: FormBuilder
    ) {
      this.formArticle = this.fb.group({
        image: [null],
        title: [''],
        description: [''],
        content: ['']
      });

      this.formFile = this.fb.group({
        image: [null],
        title: [''],
        description: [''],
        content: [''],
        price: [0],
        video: [null],
        file: [null]
      });
    }

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
        });

      } else if(this.Type == 'news') {
        this.http.getAdminNews(this.postData).subscribe((data) => {
          console.log(data);
          this.mainTitle = data['result']['title'];
          this.mainDesc = data['result']['description'];
          this.mainImage = data['result']['image'];
          this.imageSrc = data['result']['image'];
          this.ckeditorContent = data['result']['content'];
          this.postId = data['result']['id'];
        });

      }
    }

  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result;
    }
    reader.readAsDataURL(file);
    if(this.postType == "article") {
      this.formArticle.patchValue({
        image: file
      });
      this.formArticle.get('image').updateValueAndValidity();

    } else if(this.postType == "file" || this.postType == "film"){
      this.formFile.patchValue({
        image: file
      });
      this.formFile.get('image').updateValueAndValidity();

    }
  }

  readFile(event, fileType: string): void {

    const file = (event.target as HTMLInputElement).files[0];
    if(fileType == 'video') {
      this.formFile.patchValue({
        video: file
      });
      this.formFile.get('video').updateValueAndValidity();
    } else if(fileType == 'file') {
      this.formFile.patchValue({
        file: file
      });
      this.formFile.get('file').updateValueAndValidity();
    }

  }

  onReady(eventData) {
    console.log("ckeditor image uploader")
    eventData.plugins.get('FileRepository').createUploadAdapter = function (loader) {
      console.log(btoa(loader.file));
      return new UploadAdapter(loader);
    };
  }

  submitForm() {

    console.log(this.formArticle.value);
    console.log(this.formFile.value);

    var newsData: any = new FormData();
    newsData.append("title", this.formArticle.get("title").value);
    newsData.append("image", this.formArticle.get("image").value);
    newsData.append("description", this.formArticle.get("description").value);
    newsData.append("content", this.formArticle.get("content").value);

    var formData: any = new FormData();
    formData.append("title", this.formFile.get("title").value);
    formData.append("image", this.formFile.get("image").value);
    formData.append("description", this.formFile.get("description").value);
    formData.append("content", this.formFile.get("content").value);
    formData.append("price", this.formFile.get("price").value);
    formData.append("video", this.formFile.get("video").value);
    formData.append("file", this.formFile.get("file").value);

    if(!this.isEdit){

    } else if(this.isEdit){
      if(this.postType == "article"){
        if(this.Type == "news"){
          this.http.postٔNews(formData).subscribe((data) => {
            console.log(data);
            console.log("posting news")
          });

        } else if(this.Type == "learn") {
          this.http.postEducation(this.postData).subscribe((data) => {
            console.log(data);
            console.log("posting education")
          });

        } else if(this.Type == "analysis"){

        }
      }
    }

    if(this.postType == "article") {
    // filling the post api data


    if(!this.isEdit){
      if(this.Type == "news") {
        this.http.postٔNews(formData).subscribe((data) => {
          console.log(data);
          console.log("posting news")
        });

      } else if(this.Type == "learn") {
        this.http.postEducation(this.postData).subscribe((data) => {
          console.log(data);
          console.log("posting education")
        });

      }
    } else if(this.isEdit) {
      if(this.Type == "news") {
        this.http.putNews(this.postData,this.postId).subscribe((data) => {
          console.log(data);
          console.log("editing news")
        });

      } else if(this.Type == "learn") {
        this.http.putEducation(this.postData,this.postId).subscribe((data) => {
          console.log(data);
          console.log("editing education")
        });

      }
    }

    } else if(this.postType == "file" || this.postType == "film") {

      console.log(this.formFile.value);
      // filling the post api data


      this.http.postٔNews(formData).subscribe((data) => {
        console.log(data);
        console.log("posting news")
      });

    }
  }

  // ckeditor image uploader function




  send(){
    console.log("sending data")
    if(this.postType != "article"){
      // this.fillData();
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
