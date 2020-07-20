import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UploadAdapter } from './UploadAdapter';
import { ServicesService } from '../services/services.service';

import { FormBuilder, FormGroup } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';

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
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      "bulletedList",
      "numberedList",
      "|",
      "indent",
      "outdent",
      "|",
      "blockQuote",
      "insertTable",
      "mediaEmbed",
      "undo",
      "redo"
     ]

  };

  imageSrc: any = '';
  imageSrc2: any = '';
  imageSrc3: any = '';
  isEdit: boolean = false;
  isFileVideo = false;
  isFilm: boolean = false;
  isFile: boolean = false;

  postData;
  postId;
  Type: string;
  postType: string;

  imageType;
  imageType2;
  imageType3;
  fileType;
  videoType;
  analysisType;

  selectOptions = [
    {value: '1', viewValue: 'کوتاه مدت'},
    {value: '2', viewValue: 'میان مدت'},
    {value: '3', viewValue: 'بلند مدت'}
  ]

  titleError = '';
  descriptionError = '';

  @ViewChild('preView') dataContainer: ElementRef;

  constructor(
    private http: ServicesService,
    public fb: FormBuilder,
    private _snackBar: MatSnackBar
    ) {
      this.form = this.fb.group({
        image: [''],
        image1: [''],
        image2: [''],
        title: [''],
        description: [''],
        content: [''],
        content1: [''],
        price: [0],
        video: [''],
        file: [''],
        category:[''],
        type:['']
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
        this.isFileVideo = true;

      } else if(window.location.href.split('/')[6] == 'film'){
        this.postType = 'film';
        this.isFileVideo = true;

      } else if(window.location.href.split('/')[6] == 'article') {
        this.postType = 'article';

      }
    // news post and types
    } else if(window.location.href.split('/')[4] == 'news'){
      this.Type = 'news';

      if(window.location.href.split('/')[6] == 'film'){
        this.postType = 'film';
        this.isFileVideo = true;

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
      this.postData = window.location.href.split('/')[8];
      console.log("is edit" ,this.postData);
      if(this.Type == 'learn') {
        this.http.getAdminEducations(this.postData).subscribe((data) => {
          console.log(data,"admin education");
          const image = data['result']['image'];
          this.imageSrc = image;
          const image1 = data['result']['image1'];
          this.imageSrc2 = image1;
          const image2 = data['result']['image2'];
          this.imageSrc3 = image2;

          if(data['result']['category'] == 2 || data['result']['category'] == 3) {
            this.isFileVideo = true;
          }

          if(data['result']['category'] == 2) {
            this.isFilm = true;
          } else if(data['result']['category'] == 3) {
            this.isFile = true;
          }

          this.postId = data['result']['id'];

          this.form.controls['description'].setValue(data['result']['description']);
          this.form.controls['title'].setValue(data['result']['title']);
          this.form.controls['image'].setValue(data['result']['image']);
          this.form.controls['image1'].setValue(data['result']['image1']);
          this.form.controls['image2'].setValue(data['result']['image2']);
          // this.form.controls['video'].setValue(data['result']['video']);
          // this.form.controls['file'].setValue(data['result']['file']);
          this.form.controls['price'].setValue(0);
          this.form.controls['content'].setValue(data['result']['content']);
          this.form.controls['content1'].setValue(data['result']['content1']);
        });

      } else if(this.Type == 'news') {
        this.http.getAdminNews(this.postData).subscribe((data) => {
          console.log(data);

          const image = data['result']['image'];
          this.imageSrc = image;
          const image1 = data['result']['image1'];
          this.imageSrc2 = image1;
          const image2 = data['result']['image2'];
          this.imageSrc3 = image2;

          if(data['result']['category'] == 2 || data['result']['category'] == 3) {
            this.isFileVideo = true;
          }

          if(data['result']['category'] == 2) {
            this.isFilm = true;
          } else if(data['result']['category'] == 3) {
            this.isFile = true;
          }

          this.postId = data['result']['id'];

          this.form.controls['description'].setValue(data['result']['description']);
          this.form.controls['title'].setValue(data['result']['title']);
          this.form.controls['image'].setValue(data['result']['image']);
          this.form.controls['image1'].setValue(data['result']['image1']);
          this.form.controls['image2'].setValue(data['result']['image2']);
          // this.form.controls['video'].setValue(data['result']['video']);
          // this.form.controls['file'].setValue(data['result']['file']);
          this.form.controls['price'].setValue(0);
          this.form.controls['content'].setValue(data['result']['content']);
          this.form.controls['content1'].setValue(data['result']['content1']);

        });

      } else if(this.Type == "analysis") {
        this.http.getAdminAnalysis(this.postData).subscribe((data) => {
          console.log(data);
          const image = data['result']['image'];
          this.imageSrc = image;
          const image1 = data['result']['image1'];
          this.imageSrc2 = image1;
          const image2 = data['result']['image2'];
          this.imageSrc3 = image2;

          this.postId = data['result']['id'];

          this.analysisType = data['result']['type']

          this.form.controls['description'].setValue(data['result']['description']);
          this.form.controls['title'].setValue(data['result']['title']);
          this.form.controls['image'].setValue(data['result']['image']);
          this.form.controls['image1'].setValue(data['result']['image1']);
          this.form.controls['image2'].setValue(data['result']['image2']);
          // this.form.controls['video'].setValue(data['result']['video']);
          // this.form.controls['file'].setValue(data['result']['file']);
          this.form.controls['price'].setValue(0);
          this.form.controls['content'].setValue(data['result']['content']);
          this.form.controls['content1'].setValue(data['result']['content1']);
          this.form.controls['type'].setValue(data['result']['type']);
        });

      }
    }

  }

  uploadFile(event,number) {
    const file = (event.target as HTMLInputElement).files[0];
    if(number == 'first') {
      this.form.patchValue({
        image: file
      });
      this.form.get('image').updateValueAndValidity();
    } else if(number == 'second') {
      this.form.patchValue({
        image1: file
      });
      this.form.get('image1').updateValueAndValidity();
    } else if (number == 'third') {
      this.form.patchValue({
        image2: file
      });
      this.form.get('image2').updateValueAndValidity();
    }

    const reader = new FileReader();
    reader.onload = () => {
      if(number == 'first') {
        this.imageSrc = reader.result;
      } else if(number == 'second'){
        this.imageSrc2 = reader.result;
      } else if(number == 'third') {
        this.imageSrc3 = reader.result;
      }
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
    // eventData.plugins.get('FileRepository').createUploadAdapter = function (loader) {
    //   return new UploadAdapter(loader);
    // };
  }

  submitForm() {

    this.imageType = typeof  this.form.get("image").value;
    this.imageType2 = typeof  this.form.get("image1").value;
    this.imageType3 = typeof  this.form.get("image2").value;
    this.fileType = typeof  this.form.get("file").value;
    this.videoType = typeof  this.form.get("video").value;

    var formData: any = new FormData();
    formData.append("title", this.form.get("title").value);

    if(this.Type == 'analysis') {
      formData.append("type", this.form.get("type").value);
      formData.append("category", 1);
    }

    if(this.isEdit) {
      if(this.imageType == 'object' && this.form.get("image").value != null) {
        formData.append("image", this.form.get("image").value);
      }
      if(this.imageType2 == 'object' && this.form.get("image1").value != null) {
        formData.append("image1", this.form.get("image1").value);
      }
      if(this.imageType3 == 'object' && this.form.get("image2").value != null) {
        formData.append("image2", this.form.get("image2").value);
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
      formData.append("image1", this.form.get("image1").value);
      formData.append("image2", this.form.get("image2").value);
    }
    formData.append("description", this.form.get("description").value);
    formData.append("content", this.form.get("content").value);
    formData.append("content1", this.form.get("content1").value);
    formData.append("price", this.form.get("price").value);
    formData.append("id", this.postId);
    if(!this.isEdit) {
      if(this.postType == 'article') {
        formData.append("category", 1);
      } else if(this.postType == 'film') {
        formData.append("category", 2);
      } else if(this.postType == 'file') {
        formData.append("category", 3);
      }
    }

    // for (var pair of formData.entries())
    // {
    //   console.log(pair[0]+ ', '+ pair[1]);
    // }
    if(this.isEdit){
      if(this.Type == "news") {
        this.http.putNews(formData,this.postId).subscribe((data) => {
          console.log(data['status']);
          if(data['status'] == 200) {
            this._snackBar.open('به روز رسانی با موفقیت انجام شد', '', {
              duration: 2000,
            });
          }
          console.log("editing news")
        },
        (error) => {
          console.log(error['error']);
          if(error['error']['status'] == 400) {
            for(let i=0; i < error['error']['messages'].length; i++) {
              if(error['error']['messages'][i]['field'] == "title") {
                this.titleError = error['error']['messages'][i]['message']
              } else if(error['error']['messages'][i]['field'] == "description") {
                this.descriptionError = error['error']['messages'][i]['message']
              }
            }
          }
        });

      } else if(this.Type == "learn") {
        console.log(this.postId);
        this.http.putEducation(formData,this.postId).subscribe((data) => {
          console.log(data['status']);
          if(data['status'] == 200) {
            this._snackBar.open('به روز رسانی با موفقیت انجام شد', '', {
              duration: 2000,
            });
          }
          console.log("editing education")
        },
        (error) => {
          console.log(error['error']);
          if(error['error']['status'] == 400) {
            for(let i=0; i < error['error']['messages'].length; i++) {
              if(error['error']['messages'][i]['field'] == "title") {
                this.titleError = error['error']['messages'][i]['message']
              } else if(error['error']['messages'][i]['field'] == "description") {
                this.descriptionError = error['error']['messages'][i]['message']
              }
            }
          }
        });

      } else if(this.Type == "analysis") {
        console.log(this.postId);
        this.http.putAnalysis(formData,this.postId).subscribe((data) => {
          console.log(data['status']);
          if(data['status'] == 200) {
            this._snackBar.open('به روز رسانی با موفقیت انجام شد', '', {
              duration: 2000,
            });
          }
          console.log("editing analysis")
        },
        (error) => {
          console.log(error['error']);
          if(error['error']['status'] == 400) {
            for(let i=0; i < error['error']['messages'].length; i++) {
              if(error['error']['messages'][i]['field'] == "title") {
                this.titleError = error['error']['messages'][i]['message']
              } else if(error['error']['messages'][i]['field'] == "description") {
                this.descriptionError = error['error']['messages'][i]['message']
              }
            }
          }
        });
      }
    } else if(!this.isEdit){
      if(this.Type == "news") {
        this.http.postٔNews(formData).subscribe((data) => {
          console.log(data);
          if(data['status'] == 201) {
            this._snackBar.open('پست با موفقیت ثبت شد', '', {
              duration: 2000,
            });
          }
          console.log("posting news")
        });

      } else if(this.Type == "learn") {
        this.http.postEducation(formData).subscribe((data) => {
          console.log(data);
          if(data['status'] == 201) {
            this._snackBar.open('پست با موفقیت ثبت شد', '', {
              duration: 2000,
            });
          }
          console.log("posting education")
        });

      } else if(this.Type == "analysis"){
        this.http.postAnalysis(formData).subscribe((data) => {
          console.log(data);
          if(data['status'] == 201) {
            this._snackBar.open('پست با موفقیت ثبت شد', '', {
              duration: 2000,
            });
          }
          console.log("posting education")
        });

      }
    }
  }

}
