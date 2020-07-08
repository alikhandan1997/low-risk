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

  form: FormGroup;

  public Editor = ClassicEditor;
  editorConfig = {
    placeholder: 'Type the content here!',

  };

  imageSrc: any = '';
  isEdit: boolean = false;

  postData;
  postId;
  Type: string;
  postType: string;

  imageType;
  fileType;
  videoType;

  @ViewChild('preView') dataContainer: ElementRef;

  constructor(
    private http: ServicesService,
    public fb: FormBuilder
    ) {
      this.form = this.fb.group({
        image: [null],
        title: [''],
        description: [''],
        content: [''],
        price: [0],
        video: [''],
        file: ['']
      });
    }

  ngOnInit(): void {

    if(window.location.href.split('/')[7] == 'edit'){
      this.isEdit = true;
    }

    // learn post and types
    if(window.location.href.split('/')[4] == 'learn') {
      this.Type = 'learn';

      if(window.location.href.split('/')[6] == 'file'){
        this.postType = 'file';

      } else if(window.location.href.split('/')[6] == 'film'){
        this.postType = 'film';

      } else if(window.location.href.split('/')[6] == 'article') {
        this.postType = 'article';

      }
    // news post and types
    } else if(window.location.href.split('/')[4] == 'news'){
      this.Type = 'news';

      if(window.location.href.split('/')[6] == 'film'){
        this.postType = 'film';

      } else if(window.location.href.split('/')[6] == 'article') {
        this.postType = 'article';

      }
    // analysis post and types
    } else if(window.location.href.split('/')[4] == 'analysis') {
      this.Type = 'analysis';

      if(window.location.href.split('/')[6] == 'free'){
        this.postType = 'free';

      } else if(window.location.href.split('/')[6] == 'monetary'){
        this.postType = 'monetary';

      }
    }

    if(this.isEdit){
      console.log("is edit");
      this.postData = window.location.href.split('/')[8];
      if(this.Type == 'learn') {
        this.http.getAdminEducations(this.postData).subscribe((data) => {
          console.log(data,"admin education");
          const file = data['result']['image'];
          this.imageSrc = file;
          this.postId = data['result']['id'];
          this.form.setValue({
            description: data['result']['description'],
            title: data['result']['title'],
            image: data['result']['image'],
            video: data['result']['video'],
            file:data['result']['file'],
            price: 0,
            content: data['result']['content']
          });
        });

      } else if(this.Type == 'news') {
        this.http.getAdminNews(this.postData).subscribe((data) => {
          console.log(data['result']['content']);
          const file = data['result']['image'];
          this.imageSrc = file;
          this.postId = data['result']['id'];
          this.form.setValue({
            description: data['result']['description'],
            title: data['result']['title'],
            image: data['result']['image'],
            video: [''],
            file: [''],
            price: 0,
            content: data['result']['content']
          });
        });

      } else if(this.Type == "analysis") {
        this.http.getAdminAnalysis(this.postData).subscribe((data) => {
          console.log(data);
          const file = data['result']['image'];
          this.imageSrc = file;
          this.postId = data['result']['id'];
          this.form.setValue({
            description: data['result']['description'],
            title: data['result']['title'],
            image: data['result']['image'],
            video: [''],
            file: [''],
            price: 0,
            content: data['result']['content']
          });
        });

      }
    }

  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      image: file
    });
    this.form.get('image').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result;
    }
    reader.readAsDataURL(file);
  }

  readFile(event, fileType: string): void {

    const file = (event.target as HTMLInputElement).files[0];
    if(fileType == 'video') {
      this.form.patchValue({
        video: file
      });
      this.form.get('video').updateValueAndValidity();
    } else if(fileType == 'file') {
      this.form.patchValue({
        file: file
      });
      this.form.get('file').updateValueAndValidity();
    }

  }

  onReady(eventData) {
    eventData.plugins.get('FileRepository').createUploadAdapter = function (loader) {
      return new UploadAdapter(loader);
    };
  }

  submitForm() {

    console.log(this.form.get("content").value, "from value");

    this.imageType = typeof  this.form.get("image").value;
    this.fileType = typeof  this.form.get("file").value;
    this.videoType = typeof  this.form.get("video").value;

    var formData: any = new FormData();
    formData.append("title", this.form.get("title").value);
    if(this.isEdit) {
      if(this.imageType == 'object' && this.form.get("image").value != null) {
        formData.append("image", this.form.get("image").value);
      }
      if(this.fileType == 'object' && this.form.get("file").value != null) {
        formData.append("file", this.form.get("file").value);
      }
      if(this.videoType == 'object' && this.form.get("video").value != null) {
        formData.append("video", this.form.get("video").value);
      }
    } else if(!this.isEdit) {
      formData.append("image", this.form.get("image").value);
      formData.append("file", this.form.get("file").value);
      formData.append("video", this.form.get("video").value);
    }
    formData.append("description", this.form.get("description").value);
    formData.append("content", this.form.get("content").value);
    formData.append("price", this.form.get("price").value);
    formData.append("id", this.postId);

    if(this.isEdit){
      if(this.Type == "news") {
        this.http.putNews(formData,this.postId).subscribe((data) => {
          console.log(data);
          console.log("editing news")
        });

      } else if(this.Type == "learn") {
        console.log(this.postId);
        this.http.putEducation(formData,this.postId).subscribe((data) => {
          console.log(data);
          console.log("editing education")
        });

      } else if(this.Type == "analysis") {
        console.log(this.postId);
        this.http.putAnalysis(formData,this.postId).subscribe((data) => {
          console.log(data);
          console.log("editing analysis")
        });
      }
    } else if(!this.isEdit){
      if(this.Type == "news") {
        this.http.postٔNews(formData).subscribe((data) => {
          console.log(data);
          console.log("posting news")
        });

      } else if(this.Type == "learn") {
        this.http.postEducation(formData).subscribe((data) => {
          console.log(data);
          console.log("posting education")
        });

      } else if(this.Type == "analysis"){
        this.http.postAnalysis(formData).subscribe((data) => {
          console.log(data);
          console.log("posting education")
        });

      }
    }
  }

}
